import type { LeadPayload } from "@/lib/leads/types";

// Business-unit/inquiry-type vocabulary shared with Ochiga Office
// (ochiga-office src/lead-agents/office-intake.js) and the Backend's
// corporate intelligence contract (Ochiga-backend
// src/contracts/corporateIntelligence.ts CorporateInquiryType) — using
// the same strings everywhere means a website enquiry, an Office CRM
// record, and an Oyi Core conversation all describe the same thing the
// same way.
export type OfficeBusinessUnit = "development" | "technology" | "private" | "partnerships" | "corporate";

function partnerInquiryType(partnerType: string): string {
  const value = partnerType.toLowerCase();
  if (/landowner|joint venture|\bjv\b/.test(value)) return "landowner_jv";
  if (/capital/.test(value)) return "capital_partner";
  if (/buyer|offtake/.test(value)) return "buyer_offtake";
  if (/delivery|professional/.test(value)) return "delivery_professional";
  if (/technology|integrator|oyi/.test(value)) return "integrator_interest";
  return "strategic_partner";
}

export function mapLeadToOffice(payload: LeadPayload): { business_unit: OfficeBusinessUnit; inquiry_type: string } {
  switch (payload.lead_type) {
    case "LAND_JV":
      return { business_unit: "development", inquiry_type: "land_jv" };
    case "OYI_DEPLOYMENT":
      return { business_unit: "technology", inquiry_type: "oyi_deployment_request" };
    case "PRIVATE_MEMBERSHIP":
      return { business_unit: "private", inquiry_type: "membership_request" };
    case "STRATEGIC_PARTNER":
      return { business_unit: "partnerships", inquiry_type: partnerInquiryType(payload.strategic_partner.partner_type) };
    case "GENERAL_CONTACT":
      return { business_unit: "corporate", inquiry_type: "general_enquiry" };
  }
}

// Best-effort extraction of a free-text message/notes field per lead
// type, used as the intake envelope's payload.message — this is the
// text Office staff actually read first on a new enquiry.
export function extractMessage(payload: LeadPayload): string {
  switch (payload.lead_type) {
    case "LAND_JV":
      return payload.land_jv.opportunity_description || payload.land_jv.development_expectation;
    case "OYI_DEPLOYMENT":
      return payload.oyi_deployment.requirement;
    case "PRIVATE_MEMBERSHIP":
      return payload.private_membership.notes || payload.private_membership.investor_profile;
    case "STRATEGIC_PARTNER":
      return payload.strategic_partner.capability_description;
    case "GENERAL_CONTACT":
      return payload.general_contact.message;
  }
}

export function extractOrganization(payload: LeadPayload): string {
  switch (payload.lead_type) {
    case "LAND_JV":
      return "";
    case "OYI_DEPLOYMENT":
      return payload.oyi_deployment.organisation;
    case "PRIVATE_MEMBERSHIP":
      return "";
    case "STRATEGIC_PARTNER":
      return payload.strategic_partner.organisation || "";
    case "GENERAL_CONTACT":
      return "";
  }
}

export function extractLocation(payload: LeadPayload): string {
  switch (payload.lead_type) {
    case "LAND_JV":
      return payload.land_jv.property_location;
    case "OYI_DEPLOYMENT":
      return payload.oyi_deployment.location;
    case "STRATEGIC_PARTNER":
      return payload.strategic_partner.location || "";
    default:
      return "";
  }
}
