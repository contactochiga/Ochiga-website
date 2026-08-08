import { z } from "zod";

// Fields every lead submission carries, regardless of type. Kept small
// on purpose — each form still asks its own specific questions on top.
const baseShape = {
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(180),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you agree to how Ochiga will use this information." }),
  }),
  // Anti-spam — present in every payload, validated server-side, never
  // rendered as a normal visible field (see Honeypot in forms/fields.tsx).
  website: z.string().max(200).optional().or(z.literal("")),
  formStartedAt: z.string().min(1, "Missing form timing"),
  pageUrl: z.string().max(300).optional().or(z.literal("")),
};
const baseSchema = z.object(baseShape);
// `phone` is intentionally NOT in baseFields: required for JV/Oyi/Partner,
// optional for Private/General. Each schema below declares its own —
// spreading baseFields and then redefining a key in the same object
// literal confuses TypeScript's inference for z.infer, so every schema
// adds `phone` fresh instead of overriding a spread key.
const optionalPhone = z.string().trim().max(40).optional().or(z.literal(""));
const requiredPhone = (message: string) => z.string().trim().min(7, message).max(40);

export const landJvSchema = baseSchema.extend({
  phone: requiredPhone("Enter a valid phone or WhatsApp number"),
  preferredContactMethod: z.enum(["Email", "Phone", "WhatsApp"]).optional(),
  propertyLocation: z.string().trim().min(2).max(200),
  approxLandSize: z.string().trim().min(1).max(80),
  propertyType: z.string().trim().min(1).max(120),
  existingStructure: z.string().trim().max(300).optional().or(z.literal("")),
  ownershipTitle: z.string().trim().min(1).max(120),
  developmentExpectation: z.string().trim().min(1).max(120),
  premiumExpectation: z.string().trim().max(200).optional().or(z.literal("")),
  opportunityDescription: z.string().trim().max(1600).optional().or(z.literal("")),
});
export type LandJvInput = z.infer<typeof landJvSchema>;

export const oyiDeploymentSchema = baseSchema.extend({
  phone: requiredPhone("Enter a valid phone number"),
  organisation: z.string().trim().min(1).max(160),
  roleType: z.string().trim().min(1).max(120),
  propertyType: z.string().trim().min(1).max(160),
  location: z.string().trim().min(1).max(200),
  approxSize: z.string().trim().min(1).max(120),
  projectStage: z.string().trim().min(1).max(120),
  requirement: z.string().trim().min(1, "Tell us a little about what you need").max(1600),
  preferredContactMethod: z.enum(["Email", "Phone", "WhatsApp"]).optional(),
  expectedTimeline: z.string().trim().max(120).optional().or(z.literal("")),
});
export type OyiDeploymentInput = z.infer<typeof oyiDeploymentSchema>;

export const privateMembershipSchema = baseSchema.extend({
  phone: optionalPhone,
  investorProfile: z.string().trim().min(1, "Select an investor profile").max(120),
  investmentStrategy: z.array(z.string()).min(1, "Select at least one investment strategy"),
  investmentExperience: z.string().trim().min(1, "Select your experience level").max(120),
  notes: z.string().trim().max(1600).optional().or(z.literal("")),
});
export type PrivateMembershipInput = z.infer<typeof privateMembershipSchema>;

export const strategicPartnerSchema = baseSchema.extend({
  phone: requiredPhone("Enter a valid phone number"),
  organisation: z.string().trim().min(1).max(160),
  websiteOrLinkedin: z.string().trim().max(300).optional().or(z.literal("")),
  location: z.string().trim().min(1).max(200),
  partnerType: z.string().trim().min(1).max(120),
  capabilityDescription: z.string().trim().min(1, "Tell us a little about your capability").max(1600),
  relevantExperience: z.string().trim().max(1600).optional().or(z.literal("")),
  portfolioLink: z.string().trim().max(300).optional().or(z.literal("")),
  preferredCollaboration: z.string().trim().max(300).optional().or(z.literal("")),
});
export type StrategicPartnerInput = z.infer<typeof strategicPartnerSchema>;

export const generalContactSchema = baseSchema.extend({
  phone: optionalPhone,
  subject: z.string().trim().min(2, "Enter a subject").max(160),
  message: z.string().trim().min(5, "Enter a message").max(2000),
  category: z.string().trim().max(80).optional().or(z.literal("")),
});
export type GeneralContactInput = z.infer<typeof generalContactSchema>;

export const leadSchemas = {
  LAND_JV: landJvSchema,
  OYI_DEPLOYMENT: oyiDeploymentSchema,
  PRIVATE_MEMBERSHIP: privateMembershipSchema,
  STRATEGIC_PARTNER: strategicPartnerSchema,
  GENERAL_CONTACT: generalContactSchema,
} as const;
