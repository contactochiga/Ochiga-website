import { hashIp, formAgeMs } from "@/lib/leads/security";
import type {
  LeadPayload,
  LeadType,
} from "@/lib/leads/types";
import type {
  LandJvInput,
  OyiDeploymentInput,
  PrivateMembershipInput,
  StrategicPartnerInput,
  GeneralContactInput,
} from "@/lib/leads/schemas";

type Context = { requestId: string; ip: string };

function base(input: { fullName: string; email: string; phone?: string; pageUrl?: string; formStartedAt: string }, leadType: LeadType, ctx: Context) {
  return {
    lead_type: leadType,
    submitted_at: new Date().toISOString(),
    source: "ochiga_website" as const,
    page_url: input.pageUrl || "",
    full_name: input.fullName,
    email: input.email,
    phone: input.phone || undefined,
    consent: true as const,
    metadata: {
      request_id: ctx.requestId,
      ip_hash: hashIp(ctx.ip),
      form_age_ms: formAgeMs(input.formStartedAt),
    },
  };
}

export function buildLandJvPayload(input: LandJvInput, ctx: Context): LeadPayload {
  return {
    ...base(input, "LAND_JV", ctx),
    lead_type: "LAND_JV",
    land_jv: {
      property_location: input.propertyLocation,
      approx_land_size: input.approxLandSize,
      property_type: input.propertyType,
      existing_structure: input.existingStructure || undefined,
      ownership_title: input.ownershipTitle,
      development_expectation: input.developmentExpectation,
      premium_expectation: input.premiumExpectation || undefined,
      opportunity_description: input.opportunityDescription || undefined,
      preferred_contact_method: input.preferredContactMethod,
    },
  };
}

export function buildOyiDeploymentPayload(input: OyiDeploymentInput, ctx: Context): LeadPayload {
  return {
    ...base(input, "OYI_DEPLOYMENT", ctx),
    lead_type: "OYI_DEPLOYMENT",
    oyi_deployment: {
      organisation: input.organisation,
      role_type: input.roleType,
      property_type: input.propertyType,
      location: input.location,
      approx_size: input.approxSize,
      project_stage: input.projectStage,
      requirement: input.requirement,
      preferred_contact_method: input.preferredContactMethod,
      expected_timeline: input.expectedTimeline || undefined,
    },
  };
}

export function buildPrivateMembershipPayload(input: PrivateMembershipInput, ctx: Context): LeadPayload {
  return {
    ...base(input, "PRIVATE_MEMBERSHIP", ctx),
    lead_type: "PRIVATE_MEMBERSHIP",
    private_membership: {
      investor_profile: input.investorProfile,
      investment_strategy: input.investmentStrategy,
      investment_experience: input.investmentExperience,
      notes: input.notes || undefined,
    },
  };
}

export function buildStrategicPartnerPayload(input: StrategicPartnerInput, ctx: Context): LeadPayload {
  return {
    ...base(input, "STRATEGIC_PARTNER", ctx),
    lead_type: "STRATEGIC_PARTNER",
    strategic_partner: {
      organisation: input.organisation || undefined,
      website_or_linkedin: input.websiteOrLinkedin || undefined,
      location: input.location || undefined,
      partner_type: input.partnerType,
      capability_description: input.capabilityDescription,
      relevant_experience: input.relevantExperience || undefined,
      portfolio_link: input.portfolioLink || undefined,
      preferred_collaboration: input.preferredCollaboration || undefined,
    },
  };
}

export function buildGeneralContactPayload(input: GeneralContactInput, ctx: Context): LeadPayload {
  return {
    ...base(input, "GENERAL_CONTACT", ctx),
    lead_type: "GENERAL_CONTACT",
    general_contact: {
      subject: input.subject,
      message: input.message,
      category: input.category || undefined,
    },
  };
}
