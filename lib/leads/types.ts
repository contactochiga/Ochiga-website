// Shared lead model. A submission is always a base envelope (identity +
// consent + provenance) plus exactly one lead-specific structured object
// — never a single flat bag of fields. See lib/leads/schemas.ts for the
// validation that produces this shape.

export type LeadType =
  | "LAND_JV"
  | "OYI_DEPLOYMENT"
  | "PRIVATE_MEMBERSHIP"
  | "STRATEGIC_PARTNER"
  | "GENERAL_CONTACT";

export type BaseLead = {
  lead_type: LeadType;
  submitted_at: string;
  source: "ochiga_website";
  page_url: string;
  full_name: string;
  email: string;
  phone?: string;
  consent: true;
  metadata: {
    request_id: string;
    ip_hash: string;
    form_age_ms: number;
  };
};

export type LandJvDetails = {
  property_location: string;
  approx_land_size: string;
  property_type: string;
  existing_structure?: string;
  ownership_title: string;
  development_expectation: string;
  premium_expectation?: string;
  opportunity_description?: string;
  preferred_contact_method?: string;
};

export type OyiDeploymentDetails = {
  organisation: string;
  role_type: string;
  property_type: string;
  location: string;
  approx_size: string;
  project_stage: string;
  requirement: string;
  preferred_contact_method?: string;
  expected_timeline?: string;
};

export type PrivateMembershipDetails = {
  investor_profile: string;
  investment_strategy: string[];
  investment_experience: string;
  notes?: string;
};

export type StrategicPartnerDetails = {
  organisation?: string;
  website_or_linkedin?: string;
  location?: string;
  partner_type: string;
  capability_description: string;
  relevant_experience?: string;
  portfolio_link?: string;
  preferred_collaboration?: string;
};

export type GeneralContactDetails = {
  subject: string;
  message: string;
  category?: string;
};

export type LeadPayload =
  | (BaseLead & { lead_type: "LAND_JV"; land_jv: LandJvDetails })
  | (BaseLead & { lead_type: "OYI_DEPLOYMENT"; oyi_deployment: OyiDeploymentDetails })
  | (BaseLead & { lead_type: "PRIVATE_MEMBERSHIP"; private_membership: PrivateMembershipDetails })
  | (BaseLead & { lead_type: "STRATEGIC_PARTNER"; strategic_partner: StrategicPartnerDetails })
  | (BaseLead & { lead_type: "GENERAL_CONTACT"; general_contact: GeneralContactDetails });
