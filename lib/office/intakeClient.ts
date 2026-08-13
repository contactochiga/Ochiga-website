import type { LeadPayload } from "@/lib/leads/types";
import { extractLocation, extractMessage, extractOrganization, mapLeadToOffice } from "@/lib/office/mapping";

// Server-only bridge from the website's lead/enquiry forms into Ochiga
// Office's canonical intake contract (ochiga-office
// src/lead-agents/office-intake.js, mounted at POST /api/office/intake).
// Office remains the CRM source of truth — this module only ever sends
// data there, never reads it back for display, and the credential here
// is never sent to the browser.
const DEFAULT_OFFICE_BASE_URL = "https://ochiga-lead-agents.onrender.com";
const OFFICE_INTAKE_TIMEOUT_MS = 12_000;

function officeBaseUrl() {
  return (process.env.OCHIGA_OFFICE_BASE_URL || DEFAULT_OFFICE_BASE_URL).replace(/\/$/, "");
}

function officeApiKey() {
  return String(process.env.OCHIGA_OFFICE_API_KEY || "").trim();
}

export type OfficeIntakeEnvelope = {
  request_id: string;
  idempotency_key: string;
  submitted_at?: string;
  source_channel: "website";
  source_site: string;
  source_page: string;
  source_form: string;
  business_unit: string;
  inquiry_type: string;
  contact: { name: string; email: string; phone: string };
  organization: { name: string; location: string };
  payload: { message: string };
  consent?: Record<string, boolean>;
  metadata?: Record<string, unknown>;
};

export type OfficeIntakeResult = {
  ok: boolean;
  skipped: boolean;
  status?: number;
  duplicate?: boolean;
  reason?: string;
};

// Low-level poster — shared by every website caller so the auth header,
// timeout, and error handling stay in exactly one place. Never throws.
export async function postOfficeIntakeEnvelope(envelope: OfficeIntakeEnvelope): Promise<OfficeIntakeResult> {
  const apiKey = officeApiKey();
  if (!apiKey) {
    return { ok: false, skipped: true, reason: "office_not_configured" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OFFICE_INTAKE_TIMEOUT_MS);
  try {
    const response = await fetch(`${officeBaseUrl()}/api/office/intake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "x-office-api-key": apiKey,
        "x-request-id": envelope.request_id,
      },
      body: JSON.stringify(envelope),
      signal: controller.signal,
    });
    const rawText = await response.text();
    let json: Record<string, unknown> | null = null;
    try {
      json = rawText ? JSON.parse(rawText) : null;
    } catch {
      json = null;
    }
    if (!response.ok) {
      if (process.env.OCHIGA_OFFICE_DEBUG === "true") {
        console.error(
          `[office/intakeClient] debug: status=${response.status} url=${officeBaseUrl()}/api/office/intake key_len=${apiKey.length} body_head=${rawText.slice(0, 300)}`
        );
      }
      const errorText = typeof json?.error === "string" ? json.error : "";
      return { ok: false, skipped: false, status: response.status, reason: errorText || `office_http_${response.status}` };
    }
    return { ok: true, skipped: false, status: response.status, duplicate: Boolean(json?.duplicate) };
  } catch (error) {
    return {
      ok: false,
      skipped: false,
      reason: error instanceof Error && error.name === "AbortError" ? "office_timeout" : "office_unreachable",
    };
  } finally {
    clearTimeout(timeout);
  }
}

// The 5 canonical lead-system submissions (app/api/leads/route.ts).
export async function sendOfficeIntake(
  payload: LeadPayload,
  ctx: { requestId: string; sourceForm: string }
): Promise<OfficeIntakeResult> {
  const routing = mapLeadToOffice(payload);
  return postOfficeIntakeEnvelope({
    request_id: ctx.requestId,
    idempotency_key: ctx.requestId,
    submitted_at: payload.submitted_at,
    source_channel: "website",
    source_site: payload.source,
    source_page: payload.page_url,
    source_form: ctx.sourceForm,
    business_unit: routing.business_unit,
    inquiry_type: routing.inquiry_type,
    contact: {
      name: payload.full_name,
      email: payload.email,
      phone: payload.phone || "",
    },
    organization: {
      name: extractOrganization(payload),
      location: extractLocation(payload),
    },
    payload: {
      message: extractMessage(payload),
    },
    consent: { marketing_followup: payload.consent === true },
    metadata: { website_request_id: payload.metadata.request_id },
  });
}
