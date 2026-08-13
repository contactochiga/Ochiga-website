// Unit tests for lib/office/mapping.ts — run with:
//   node --experimental-strip-types scripts/test-office-mapping.mjs
// Pure-logic checks, no server/network required.
import assert from "node:assert/strict";
import { mapLeadToOffice } from "../lib/office/mapping.ts";

function payload(leadType, extra = {}) {
  return {
    lead_type: leadType,
    submitted_at: new Date().toISOString(),
    source: "ochiga_website",
    page_url: "/test",
    full_name: "Test Person",
    email: "test@example.com",
    consent: true,
    metadata: { request_id: "r1", ip_hash: "h1", form_age_ms: 5000 },
    ...extra,
  };
}

// A/B (business_unit routing) — Development
{
  const routing = mapLeadToOffice(
    payload("LAND_JV", { land_jv: { property_location: "Lekki", approx_land_size: "3 acres", property_type: "Land", ownership_title: "Freehold", development_expectation: "JV" } })
  );
  assert.equal(routing.business_unit, "development");
  assert.equal(routing.inquiry_type, "land_jv");
  console.log("LAND_JV -> development/land_jv — PASS");
}

// C — Technology
{
  const routing = mapLeadToOffice(
    payload("OYI_DEPLOYMENT", { oyi_deployment: { organisation: "Acme", roleType: "Owner", propertyType: "Estate", location: "Abuja", approx_size: "10", project_stage: "planning", requirement: "smart access" } })
  );
  assert.equal(routing.business_unit, "technology");
  assert.equal(routing.inquiry_type, "oyi_deployment_request");
  console.log("OYI_DEPLOYMENT -> technology/oyi_deployment_request — PASS");
}

// D — Private
{
  const routing = mapLeadToOffice(
    payload("PRIVATE_MEMBERSHIP", { private_membership: { investor_profile: "HNI", investment_strategy: ["long_term"], investment_experience: "5 years" } })
  );
  assert.equal(routing.business_unit, "private");
  assert.equal(routing.inquiry_type, "membership_request");
  console.log("PRIVATE_MEMBERSHIP -> private/membership_request — PASS");
}

// E — Partnerships, every partner_type free-text variant maps correctly
{
  const cases = [
    ["Landowner / Joint Venture", "landowner_jv"],
    ["Capital Partner", "capital_partner"],
    ["Buyer / Offtake", "buyer_offtake"],
    ["Delivery / Professional", "delivery_professional"],
    ["Technology / Oyi Integrator", "integrator_interest"],
    ["Strategic Partner", "strategic_partner"],
    ["Something Unrecognized", "strategic_partner"],
  ];
  for (const [partnerType, expected] of cases) {
    const routing = mapLeadToOffice(
      payload("STRATEGIC_PARTNER", {
        strategic_partner: { partner_type: partnerType, capability_description: "We do things." },
      })
    );
    assert.equal(routing.business_unit, "partnerships");
    assert.equal(routing.inquiry_type, expected, `partner_type "${partnerType}" should map to ${expected}, got ${routing.inquiry_type}`);
  }
  console.log("STRATEGIC_PARTNER -> partnerships/* (all partner_type variants) — PASS");
}

// B — generic contact form must map to corporate/general_enquiry (never
// a fabricated business-specific inquiry_type).
{
  const routing = mapLeadToOffice(payload("GENERAL_CONTACT", { general_contact: { subject: "Hi", message: "Just saying hello." } }));
  assert.equal(routing.business_unit, "corporate");
  assert.equal(routing.inquiry_type, "general_enquiry");
  console.log("GENERAL_CONTACT -> corporate/general_enquiry — PASS");
}

console.log("office mapping unit tests passed");
