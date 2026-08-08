// Ochiga website email abstraction (Resend).
//
// SCAFFOLDING ONLY — not called from any route yet. Full wiring into the
// generalized lead API (PRIVATE_MEMBERSHIP / LAND_JV / OYI_DEPLOYMENT /
// STRATEGIC_PARTNER / GENERAL_CONTACT) is Phase 3 work. Kept isolated
// from unrelated backend/application logic so the website's email
// concerns don't get coupled to other Ochiga systems.
//
// Do not call sendLeadNotification in production until:
//   1. RESEND_API_KEY is set for the target environment.
//   2. The sending domain is verified in Resend.
//   3. The destination addresses in lib/company.ts actually exist.

import { Resend } from "resend";
import { companyInfo } from "@/lib/company";

export type LeadType =
  | "PRIVATE_MEMBERSHIP"
  | "LAND_JV"
  | "OYI_DEPLOYMENT"
  | "STRATEGIC_PARTNER"
  | "GENERAL_CONTACT";

const leadRouting: Record<LeadType, string | undefined> = {
  PRIVATE_MEMBERSHIP: companyInfo.privateEmail,
  LAND_JV: companyInfo.developmentEmail,
  OYI_DEPLOYMENT: process.env.OCHIGA_EMAIL_OYI || undefined,
  STRATEGIC_PARTNER: companyInfo.partnersEmail,
  GENERAL_CONTACT: companyInfo.helloEmail,
};

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function resolveLeadDestination(type: LeadType): string | null {
  return leadRouting[type] || null;
}

export async function sendLeadNotification(params: {
  type: LeadType;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; skipped?: boolean; reason?: string }> {
  const client = getClient();
  const to = resolveLeadDestination(params.type);

  if (!client) {
    return { ok: false, skipped: true, reason: "resend_not_configured" };
  }
  if (!to) {
    return { ok: false, skipped: true, reason: "no_destination_configured" };
  }

  try {
    await client.emails.send({
      from: process.env.EMAIL_FROM || `Ochiga <${companyInfo.helloEmail}>`,
      to,
      subject: params.subject,
      html: params.html,
    });
    return { ok: true };
  } catch {
    return { ok: false, reason: "send_failed" };
  }
}
