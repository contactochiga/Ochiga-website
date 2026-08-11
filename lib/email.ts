// Ochiga lead-notification email (Resend).
//
// Two emails per submission:
//   1. Internal notification -> the single office inbox
//      (OCHIGA_EMAIL_OFFICE), reply-to the submitter, so a reply goes
//      straight to them. All five lead types route here — there is no
//      per-department split.
//   2. Acknowledgement -> the submitter, confirming receipt only. Never
//      implies acceptance, approval, or commitment of any kind.
//
// Fails clearly: if RESEND_API_KEY is missing in production, sending is
// refused rather than silently discarded. In non-production, sending is
// skipped with a console warning so local development doesn't require
// real credentials, and the lead API route falls back to local JSONL
// storage for that case (see lib/leads/persist.ts).
import { Resend } from "resend";
import type { LeadPayload, LeadType } from "@/lib/leads/types";
import { formatPrivateReference } from "@/lib/leads/reference";
import { absoluteUrl } from "@/lib/seo";
import { companyInfo } from "@/lib/company";

// Single source of truth for the internal notification destination — every
// lead type resolves here so office@ochiga.com.ng is never hardcoded in
// more than one place.
function officeInbox(): string | undefined {
  return process.env.OCHIGA_EMAIL_OFFICE || undefined;
}

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
    subject: "Your Ochiga Private membership request has been received",
    // Unused by the HTML body (see privateMembershipAcknowledgementHtml
    // below) — kept accurate here since this record still supplies the
    // email subject line for this lead type.
    body: "Your request to join Ochiga Private has been received and will be reviewed by our team.",
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
  if (payload.lead_type === "PRIVATE_MEMBERSHIP") return privateMembershipInternalHtml(payload);
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;">
      <p style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b3241b;">${payload.lead_type.replace("_", " ")}</p>
      <h2 style="font-size:18px;margin:8px 0 20px;">${escapeHtml(summaryLine(payload))}</h2>
      <table>${rowsToHtml(detailRows(payload))}</table>
    </div>
  `;
}

function acknowledgementEmailHtml(payload: LeadPayload) {
  if (payload.lead_type === "PRIVATE_MEMBERSHIP") return privateMembershipAcknowledgementHtml(payload);
  const copy = acknowledgementCopy[payload.lead_type];
  return `
    <div style="font-family:Arial,sans-serif;max-width:520px;">
      <p style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b3241b;">Ochiga</p>
      <p style="font-size:15px;line-height:1.6;color:#141414;">${copy.body}</p>
      <p style="font-size:12px;color:#8c887f;margin-top:24px;">Reference: ${payload.metadata.request_id}</p>
    </div>
  `;
}

// ---------------------------------------------------------------------
// Ochiga Private — branded internal + acknowledgement emails. Private
// membership requests get a properly designed HTML email rather than
// the shared generic template above; every other lead type is
// untouched (see the branches in internalEmailHtml/acknowledgementEmailHtml).
// ---------------------------------------------------------------------

function privateMembershipInternalHtml(payload: LeadPayload & { lead_type: "PRIVATE_MEMBERSHIP" }) {
  const d = payload.private_membership;
  const rows: Array<[string, string]> = [
    ["Reference", payload.metadata.request_id],
    ["Name", payload.full_name],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Profile", d.investor_profile],
    ["Preferred strategy", d.investment_strategy.join(", ") || "—"],
    ["Experience", d.investment_experience],
    ["Reason / note", d.notes || "—"],
    ["Source page", payload.page_url || "—"],
    ["Submission date", payload.submitted_at],
  ];
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;">
      <p style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#b3241b;">Ochiga Private</p>
      <h2 style="font-size:18px;margin:8px 0 20px;">New Ochiga Private Membership Request</h2>
      <table>${rowsToHtml(rows)}</table>
    </div>
  `;
}

function privateMembershipAcknowledgementHtml(payload: LeadPayload & { lead_type: "PRIVATE_MEMBERSHIP" }) {
  const d = payload.private_membership;
  const firstName = payload.full_name.trim().split(/\s+/)[0] || "there";
  const reference = formatPrivateReference(payload.metadata.request_id, new Date(payload.submitted_at));
  const submittedDate = new Date(payload.submitted_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const privateUrl = absoluteUrl("/private");
  const privacyUrl = absoluteUrl("/privacy");

  const summaryRows: Array<[string, string]> = [
    ["Name", payload.full_name],
    ["Profile", d.investor_profile],
    ["Preferred strategy", d.investment_strategy.join(", ") || "—"],
    ["Submitted", submittedDate],
    ["Reference", reference],
  ];

  const steps = [
    { number: "01", title: "Review", body: "We review your profile and interests." },
    { number: "02", title: "Qualification", body: "Where appropriate, we may contact you to better understand your objectives." },
    { number: "03", title: "Access", body: "Approved members may receive access to relevant Ochiga Private opportunities and communications." },
  ];

  return `
  <div style="background:#050505;padding:40px 16px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#141414;border-radius:6px;overflow:hidden;">
      <tr>
        <td style="padding:40px 40px 8px;">
          <p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#b3241b;font-weight:600;">Ochiga Private</p>
          <h1 style="margin:16px 0 0;font-family:Georgia,'Iowan Old Style','Times New Roman',serif;font-size:24px;line-height:1.25;color:#ffffff;">Membership Request Received</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 40px 0;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#f6f3ec;">Thank you, ${escapeHtml(firstName)}.</p>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#d8d5cf;">Your request to join Ochiga Private has been received. Ochiga Private is a private network built around selected real-estate opportunities, development participation and long-term relationships within the Ochiga ecosystem.</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#d8d5cf;">Our team will review the information provided and contact you if anything further is required.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 40px 0;">
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0;" />
        </td>
      </tr>
      <tr>
        <td style="padding:28px 40px 0;">
          <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8c887f;">Request Summary</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${summaryRows
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:5px 12px 5px 0;font-size:13px;color:#8c887f;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:5px 0;font-size:13px;color:#f6f3ec;">${escapeHtml(value)}</td></tr>`
              )
              .join("")}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 40px 0;">
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0;" />
        </td>
      </tr>
      <tr>
        <td style="padding:28px 40px 0;">
          <p style="margin:0 0 18px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8c887f;">What Happens Next</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${steps
              .map(
                (step) => `
              <tr>
                <td style="padding:0 12px 18px 0;vertical-align:top;width:34px;">
                  <span style="font-size:12px;color:#b3241b;font-weight:600;">${step.number}</span>
                </td>
                <td style="padding:0 0 18px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#ffffff;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(step.title)}</p>
                  <p style="margin:0;font-size:13px;line-height:1.6;color:#8c887f;">${escapeHtml(step.body)}</p>
                </td>
              </tr>`
              )
              .join("")}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 40px 40px;">
          <a href="${privateUrl}" style="display:inline-block;background:#b3241b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:4px;">Visit Ochiga Private</a>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 40px 32px;border-top:1px solid rgba(255,255,255,0.1);">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#f6f3ec;">Ochiga Private</p>
          <p style="margin:0 0 16px;font-size:12px;color:#8c887f;">Selected opportunities. Long-term relationships.</p>
          <p style="margin:0;font-size:11px;line-height:1.6;color:#57534a;">Ochiga · ${escapeHtml(companyInfo.location)} · <a href="${privacyUrl}" style="color:#57534a;text-decoration:underline;">Privacy Policy</a></p>
        </td>
      </tr>
    </table>
  </div>
  `;
}

// `type` is kept in the signature (rather than dropped) so a future need
// to differentiate routing per lead type again doesn't require touching
// every call site — today every LeadType resolves to the same office inbox.
export function resolveLeadDestination(_type: LeadType): string | null {
  return officeInbox() || null;
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
