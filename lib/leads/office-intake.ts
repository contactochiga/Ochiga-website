import crypto from "crypto";
import type { LeadPayload } from "@/lib/leads/types";

type OfficeIntakeResult =
  | { ok: true; status: number; data: unknown }
  | { ok: false; skipped?: boolean; status?: number; reason: string };

function businessUnitFor(payload: LeadPayload) {
  switch (payload.lead_type) {
    case "LAND_JV":
      return "development";
    case "OYI_DEPLOYMENT":
      return "technology";
    case "PRIVATE_MEMBERSHIP":
      return "private";
    case "STRATEGIC_PARTNER":
      return "partnerships";
    case "GENERAL_CONTACT":
    default:
      return "corporate";
  }
}

function inquiryTypeFor(payload: LeadPayload) {
  switch (payload.lead_type) {
    case "LAND_JV":
      return "land_jv";
    case "OYI_DEPLOYMENT":
      return "oyi_deployment";
    case "PRIVATE_MEMBERSHIP":
      return "membership_request";
    case "STRATEGIC_PARTNER":
      return payload.strategic_partner.partner_type || "partner_enquiry";
    case "GENERAL_CONTACT":
    default:
      return payload.general_contact.category || "general_enquiry";
  }
}

function organizationFor(payload: LeadPayload) {
  if (payload.lead_type === "OYI_DEPLOYMENT") {
    return {
      name: payload.oyi_deployment.organisation,
      type: payload.oyi_deployment.role_type,
      location: payload.oyi_deployment.location,
      unit_count: payload.oyi_deployment.approx_size,
    };
  }
  if (payload.lead_type === "STRATEGIC_PARTNER") {
    return {
      name: payload.strategic_partner.organisation,
      type: payload.strategic_partner.partner_type,
      location: payload.strategic_partner.location,
      website: payload.strategic_partner.website_or_linkedin,
    };
  }
  if (payload.lead_type === "LAND_JV") {
    return {
      name: "",
      type: payload.land_jv.property_type,
      location: payload.land_jv.property_location,
      unit_count: payload.land_jv.approx_land_size,
    };
  }
  return { name: "", type: "", location: "" };
}

function idempotencyKeyFor(payload: LeadPayload) {
  const explicit = payload.metadata.request_id;
  const basis = [
    payload.source,
    payload.lead_type,
    payload.email,
    payload.phone || "",
    explicit,
  ].join("|");
  return crypto.createHash("sha256").update(basis).digest("hex");
}

export function buildOfficeIntakeEnvelope(payload: LeadPayload) {
  return {
    request_id: payload.metadata.request_id,
    idempotency_key: idempotencyKeyFor(payload),
    submitted_at: payload.submitted_at,
    source_channel: "website",
    source_site: "ochiga_website",
    source_page: payload.page_url,
    source_form: payload.lead_type,
    business_unit: businessUnitFor(payload),
    inquiry_type: inquiryTypeFor(payload),
    contact: {
      name: payload.full_name,
      email: payload.email,
      phone: payload.phone || "",
      preferred_channel:
        payload.lead_type === "OYI_DEPLOYMENT"
          ? payload.oyi_deployment.preferred_contact_method || ""
          : payload.lead_type === "LAND_JV"
            ? payload.land_jv.preferred_contact_method || ""
            : "",
    },
    organization: organizationFor(payload),
    payload,
    consent: { website_contact: payload.consent },
    campaign: {},
    metadata: payload.metadata,
  };
}

export async function submitOfficeIntake(payload: LeadPayload): Promise<OfficeIntakeResult> {
  const endpoint =
    process.env.OCHIGA_OFFICE_INTAKE_ENDPOINT ||
    process.env.OCHIGA_DEPLOYMENT_LEAD_ENDPOINT ||
    "";
  if (!endpoint) {
    return { ok: false, skipped: true, reason: "missing_office_intake_endpoint" };
  }

  const token = process.env.OCHIGA_OFFICE_INTAKE_TOKEN || process.env.OCHIGA_DEPLOYMENT_LEAD_TOKEN || "";
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-ochiga-surface": "website",
  };
  if (token) headers.authorization = `Bearer ${token}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(buildOfficeIntakeEnvelope(payload)),
  });

  if (!response.ok) {
    return { ok: false, status: response.status, reason: "office_intake_rejected" };
  }

  const data = await response.json().catch(() => ({}));
  return { ok: true, status: response.status, data };
}
