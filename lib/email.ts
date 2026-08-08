// Ochiga lead-notification email (Resend).
//
// Two emails per submission:
//   1. Internal notification -> the routed Ochiga mailbox, reply-to the
//      submitter, so a reply goes straight to them.
//   2. Acknowledgement -> the submitter, confirming receipt only. Never
//      implies acceptance, approval, or commitment of any kind.
//
// Fails clearly: if RESEND_API_KEY is missing in production, sending is
// refused rather than silently discarded. In non-production, sending is
// skipped with a console warning so local development doesn't require
// real credentials, and the lead API route falls back to local JSONL
// storage for that case (see lib/leads/persist.ts).
import { Resend } from "resend";
import { companyInfo } from "@/lib/company";
import type { LeadPayload, LeadType } from "@/lib/leads/types";

const leadRouting: Record<LeadType, string | undefined> = {
  LAND_JV: companyInfo.developmentEmail,
  PRIVATE_MEMBERSHIP: companyInfo.privateEmail,
  STRATEGIC_PARTNER: companyInfo.partnersEmail,
  GENERAL_CONTACT: companyInfo.helloEmail,
  OYI_DEPLOYMENT: process.env.OCHIGA_EMAIL_OYI || undefined,
};

const acknowledgementCopy: Record<LeadType, { subject: string; body: string }> = {
  LAND_JV: {
    subject: "We've received your development opportunity — Ochiga",
    body: "Thank you. Our development team will review the opportunity and contact you where the property fits our development criteria.",
  },
  OYI_DEPLOYMENT: {
    subject: "We've received your Oyi deployment request — Ochiga",
    body: "Thank you. Our team will review your deployment request and contact you with the appropriate next step.",
  },
  PRIVATE_MEMBERSHIP: {
    subject: "Thank you for your interest in Ochiga Private",
    body: "Thank you for your interest in Ochiga Private. Membership is considered individually. Our team will review your request and share further information where appropriate.",
  },
  STRATEGIC_PARTNER: {
    subject: "We've received your partner profile — Ochiga",
    body: "Thank you. We'll review your profile and reach out where there is a relevant collaboration opportunity.",
  },
  GENERAL_CONTACT: {
    subject: "We've received your message — Ochiga",
    body: "Thank you for contacting Ochiga. Our team will review your message and respond as soon as possible.",
  },
};

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function summaryLine(payload: LeadPayload): string {
  switch (payload.lead_type) {
    case "LAND_JV":
      return `New Development Opportunity — ${payload.land_jv.property_location} — ${payload.land_jv.approx_land_size}`;
    case "OYI_DEPLOYMENT":
      return `New Oyi Deployment Request — ${payload.oyi_deployment.role_type} — ${payload.oyi_deployment.location}`;
    case "PRIVATE_MEMBERSHIP":
      return `New Ochiga Private Membership Request — ${payload.private_membership.investor_profile}`;
    case "STRATEGIC_PARTNER":
      return `New Strategic Partner Request — ${payload.strategic_partner.partner_type}`;
    case "GENERAL_CONTACT":
      return `New General Enquiry — ${payload.general_contact.subject}`;
  }
}

function detailRows(payload: LeadPayload): Array<[string, string]> {
  const rows: Array<[string, string]> = [
    ["Name", payload.full_name],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Page", payload.page_url || "—"],
    ["Submitted", payload.submitted_at],
  ];

  switch (payload.lead_type) {
    case "LAND_JV":
      rows.push(
        ["Property location", payload.land_jv.property_location],
        ["Approx. land size", payload.land_jv.approx_land_size],
        ["Property type", payload.land_jv.property_type],
        ["Existing structure", payload.land_jv.existing_structure || "—"],
        ["Ownership / title", payload.land_jv.ownership_title],
        ["Development expectation", payload.land_jv.development_expectation],
        ["Premium expectation", payload.land_jv.premium_expectation || "—"],
        ["Description", payload.land_jv.opportunity_description || "—"],
        ["Preferred contact", payload.land_jv.preferred_contact_method || "—"],
      );
      break;
    case "OYI_DEPLOYMENT":
      rows.push(
        ["Organisation", payload.oyi_deployment.organisation],
        ["Role / org type", payload.oyi_deployment.role_type],
        ["Property type", payload.oyi_deployment.property_type],
        ["Location", payload.oyi_deployment.location],
        ["Approx. size", payload.oyi_deployment.approx_size],
        ["Project stage", payload.oyi_deployment.project_stage],
        ["Requirement", payload.oyi_deployment.requirement],
        ["Expected timeline", payload.oyi_deployment.expected_timeline || "—"],
        ["Preferred contact", payload.oyi_deployment.preferred_contact_method || "—"],
      );
      break;
    case "PRIVATE_MEMBERSHIP":
      rows.push(
        ["Investor profile", payload.private_membership.investor_profile],
        ["Investment strategy", payload.private_membership.investment_strategy.join(", ")],
        ["Experience", payload.private_membership.investment_experience],
        ["Notes", payload.private_membership.notes || "—"],
      );
      break;
    case "STRATEGIC_PARTNER":
      rows.push(
        ["Organisation", payload.strategic_partner.organisation],
        ["Website / LinkedIn", payload.strategic_partner.website_or_linkedin || "—"],
        ["Location", payload.strategic_partner.location],
        ["Partner type", payload.strategic_partner.partner_type],
        ["Capability", payload.strategic_partner.capability_description],
        ["Relevant experience", payload.strategic_partner.relevant_experience || "—"],
        ["Portfolio link", payload.strategic_partner.portfolio_link || "—"],
        ["Preferred collaboration", payload.strategic_partner.preferred_collaboration || "—"],
      );
      break;
    case "GENERAL_CONTACT":
      rows.push(
        ["Subject", payload.general_contact.subject],
        ["Category", payload.general_contact.category || "—"],
        ["Message", payload.general_contact.message],
      );
      break;
  }

  rows.push(["Request ID", payload.metadata.request_id], ["Consent", "Confirmed"]);
  return rows;
}

function rowsToHtml(rows: Array<[string, string]>) {
  return rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#57534a;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:13px;color:#141414;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] as string));
}

function internalEmailHtml(payload: LeadPayload) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;">
      <p style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b3241b;">${payload.lead_type.replace("_", " ")}</p>
      <h2 style="font-size:18px;margin:8px 0 20px;">${escapeHtml(summaryLine(payload))}</h2>
      <table>${rowsToHtml(detailRows(payload))}</table>
    </div>
  `;
}

function acknowledgementEmailHtml(payload: LeadPayload) {
  const copy = acknowledgementCopy[payload.lead_type];
  return `
    <div style="font-family:Arial,sans-serif;max-width:520px;">
      <p style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b3241b;">Ochiga</p>
      <p style="font-size:15px;line-height:1.6;color:#141414;">${copy.body}</p>
      <p style="font-size:12px;color:#8c887f;margin-top:24px;">Reference: ${payload.metadata.request_id}</p>
    </div>
  `;
}

export function resolveLeadDestination(type: LeadType): string | null {
  return leadRouting[type] || null;
}

export async function sendLeadEmails(payload: LeadPayload): Promise<{
  internal: { ok: boolean; skipped?: boolean; reason?: string };
  acknowledgement: { ok: boolean; skipped?: boolean; reason?: string };
}> {
  const client = getClient();
  const from = process.env.EMAIL_FROM || `Ochiga <notifications@ochiga.com.ng>`;
  const to = resolveLeadDestination(payload.lead_type);

  if (!client) {
    if (process.env.NODE_ENV === "production") {
      // Fail clearly — do not pretend the lead was delivered.
      return {
        internal: { ok: false, reason: "resend_not_configured" },
        acknowledgement: { ok: false, reason: "resend_not_configured" },
      };
    }
    console.warn(`[lib/email] RESEND_API_KEY not set — skipping email for ${payload.lead_type} (${payload.metadata.request_id}). Falling back to local persistence in dev.`);
    return {
      internal: { ok: false, skipped: true, reason: "resend_not_configured_dev" },
      acknowledgement: { ok: false, skipped: true, reason: "resend_not_configured_dev" },
    };
  }

  if (!to) {
    return {
      internal: { ok: false, reason: "no_destination_configured" },
      acknowledgement: { ok: false, skipped: true, reason: "internal_not_sent" },
    };
  }

  let internalResult: { ok: boolean; reason?: string } = { ok: false, reason: "not_attempted" };
  let ackResult: { ok: boolean; reason?: string } = { ok: false, reason: "not_attempted" };

  try {
    await client.emails.send({
      from,
      to,
      reply_to: payload.email,
      subject: summaryLine(payload),
      html: internalEmailHtml(payload),
    });
    internalResult = { ok: true };
  } catch {
    internalResult = { ok: false, reason: "send_failed" };
  }

  try {
    await client.emails.send({
      from,
      to: payload.email,
      subject: acknowledgementCopy[payload.lead_type].subject,
      html: acknowledgementEmailHtml(payload),
    });
    ackResult = { ok: true };
  } catch {
    ackResult = { ok: false, reason: "send_failed" };
  }

  return { internal: internalResult, acknowledgement: ackResult };
}
