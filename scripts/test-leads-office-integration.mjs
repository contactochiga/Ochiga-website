// HTTP-integration smoke test for app/api/leads and app/api/deployments,
// covering the Office CRM intake wiring. Run against a live `next dev`
// (or `next start`) server:
//   BASE_URL=http://localhost:3000 node scripts/test-leads-office-integration.mjs
import assert from "node:assert/strict";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function post(path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await response.json().catch(() => null);
  return { status: response.status, json };
}

function formStartedAt(msAgo = 5000) {
  return String(Date.now() - msAgo);
}

async function main() {
  // A. Contact form (GENERAL_CONTACT): submission is accepted, delivery
  // report includes both an email outcome and an office outcome — proves
  // the two paths are tracked independently, not silently merged.
  {
    const { status, json } = await post("/api/leads", {
      leadType: "GENERAL_CONTACT",
      fullName: "Test Contact",
      email: "test-contact@example.invalid",
      category: "General",
      subject: "Hello",
      message: "Just testing the contact form integration.",
      consent: true,
      website: "",
      formStartedAt: formStartedAt(),
      pageUrl: "/contact",
    });
    assert.ok(json.ok, `expected ok:true, got ${JSON.stringify(json)}`);
    assert.ok("email" in json.delivery, "delivery.email must be present");
    assert.ok("office" in json.delivery, "delivery.office must be present — Office intake must be tracked independently of email");
    assert.ok(["sent", "not_configured", "failed"].includes(json.delivery.email));
    assert.ok(["synced", "duplicate", "not_configured", "failed"].includes(json.delivery.office));
    console.log(`A. GENERAL_CONTACT accepted — status ${status}, delivery=${JSON.stringify(json.delivery)} — PASS`);
  }

  // B/C/D/E — one submission per business-line form, confirming each is
  // accepted end-to-end through the same code path (mapping correctness
  // itself is covered by scripts/test-office-mapping.mjs).
  const businessLineCases = [
    {
      label: "B. LAND_JV (development)",
      body: {
        leadType: "LAND_JV",
        fullName: "Dev Enquirer",
        email: "dev-enquirer@example.invalid",
        phone: "+2348012345678",
        propertyLocation: "Lekki",
        approxLandSize: "3 acres",
        propertyType: "Land",
        ownershipTitle: "Freehold",
        developmentExpectation: "Joint venture",
        preferredContactMethod: "Email",
        consent: true,
        website: "",
        formStartedAt: formStartedAt(),
        pageUrl: "/partnerships/landowners",
      },
    },
    {
      label: "C. OYI_DEPLOYMENT (technology)",
      body: {
        leadType: "OYI_DEPLOYMENT",
        fullName: "Tech Enquirer",
        organisation: "Acme Estates",
        email: "tech-enquirer@example.invalid",
        phone: "+2348012345679",
        roleType: "Facility Manager",
        propertyType: "Estate",
        location: "Abuja",
        approxSize: "200 units",
        projectStage: "planning",
        requirement: "Smart access and monitoring",
        preferredContactMethod: "Email",
        consent: true,
        website: "",
        formStartedAt: formStartedAt(),
        pageUrl: "/technology",
      },
    },
    {
      label: "D. PRIVATE_MEMBERSHIP (private)",
      body: {
        leadType: "PRIVATE_MEMBERSHIP",
        fullName: "Private Enquirer",
        email: "private-enquirer@example.invalid",
        investorProfile: "HNI",
        investmentStrategy: ["long_term"],
        investmentExperience: "5+ years",
        consent: true,
        website: "",
        formStartedAt: formStartedAt(),
        pageUrl: "/private",
      },
    },
    {
      label: "E. STRATEGIC_PARTNER (partnerships)",
      body: {
        leadType: "STRATEGIC_PARTNER",
        fullName: "Partner Enquirer",
        organisation: "Capital Partners Ltd",
        email: "partner-enquirer@example.invalid",
        phone: "+2348012345680",
        partnerType: "Capital Partner",
        capabilityDescription: "We invest in real estate developments.",
        consent: true,
        website: "",
        formStartedAt: formStartedAt(),
        pageUrl: "/partnerships",
      },
    },
  ];
  for (const { label, body } of businessLineCases) {
    const { status, json } = await post("/api/leads", body);
    assert.ok(json.ok, `${label}: expected ok:true, got ${JSON.stringify(json)}`);
    assert.ok(status === 201 || status === 202, `${label}: expected 201/202, got ${status}`);
    console.log(`${label} accepted — delivery=${JSON.stringify(json.delivery)} — PASS`);
  }

  // F. Repeat submission — the website itself doesn't dedupe (Office does,
  // by email/phone); two legitimate submissions from the same visitor
  // must each be accepted, not silently dropped.
  {
    const submission = {
      leadType: "GENERAL_CONTACT",
      fullName: "Repeat Visitor",
      email: "repeat-visitor@example.invalid",
      subject: "First message",
      message: "This is my first message.",
      consent: true,
      website: "",
      formStartedAt: formStartedAt(),
      pageUrl: "/contact",
    };
    const first = await post("/api/leads", submission);
    const second = await post("/api/leads", { ...submission, subject: "Second message", message: "Following up on my first message." });
    assert.ok(first.json.ok && second.json.ok, "both submissions from the same visitor must be accepted");
    assert.notEqual(first.json.requestId, second.json.requestId, "each submission gets its own request id");
    console.log("F. repeat submission from same visitor: both accepted independently — PASS");
  }

  // I. Malicious/invalid input — safely rejected, no crash.
  {
    const missingFields = await post("/api/leads", { leadType: "GENERAL_CONTACT" });
    assert.equal(missingFields.status, 400, "missing required fields must be rejected with 400");
    assert.equal(missingFields.json.ok, false);

    const badEmail = await post("/api/leads", {
      leadType: "GENERAL_CONTACT",
      fullName: "Bad Email",
      email: "not-an-email",
      subject: "x",
      message: "x",
      consent: true,
      website: "",
      formStartedAt: formStartedAt(),
    });
    assert.equal(badEmail.status, 400, "invalid email must be rejected with 400");

    const honeypot = await post("/api/leads", {
      leadType: "GENERAL_CONTACT",
      fullName: "Bot",
      email: "bot@example.invalid",
      subject: "x",
      message: "x",
      consent: true,
      website: "http://spam.example", // honeypot field filled — bot signal
      formStartedAt: formStartedAt(),
    });
    assert.equal(honeypot.status, 400, "filled honeypot field must be rejected with 400");

    const unknownType = await post("/api/leads", { leadType: "NOT_A_REAL_TYPE" });
    assert.equal(unknownType.status, 400, "unknown lead type must be rejected with 400");

    const xssAttempt = await post("/api/leads", {
      leadType: "GENERAL_CONTACT",
      fullName: "<script>alert(1)</script>",
      email: "xss@example.invalid",
      subject: "<img src=x onerror=alert(1)>",
      message: "'; DROP TABLE leads; --",
      consent: true,
      website: "",
      formStartedAt: formStartedAt(),
    });
    // Should be accepted as plain text (Zod validates shape, not content —
    // the point is it must not crash the server or be executed anywhere).
    assert.ok(xssAttempt.status === 201 || xssAttempt.status === 202, "script-tag/SQL-like content must be safely accepted as inert text, not crash the request");

    console.log("I. malicious/invalid input: missing fields, bad email, honeypot, unknown type, XSS/SQLi-shaped text all handled safely — PASS");
  }

  // Legacy /deployments route still functions with the new Office CRM
  // addition (best-effort, independent of its existing cascade).
  {
    const { status, json } = await post("/api/deployments", {
      name: "Deployment Tester",
      company: "Test Estates",
      email: "deployment-tester@example.invalid",
      phone: "+2348012345681",
      location: "Lagos",
      projectType: "Estate",
      projectSize: "150",
      deploymentInterest: "Smart access",
      notes: "Testing the deployments route.",
      website: "",
      formStartedAt: formStartedAt(),
    });
    assert.ok(json.ok, `expected ok:true, got ${JSON.stringify(json)}`);
    assert.ok("officeCrm" in json.delivery, "delivery.officeCrm must be present on the legacy deployments route too");
    console.log(`/api/deployments accepted — status ${status}, delivery=${JSON.stringify(json.delivery)} — PASS`);
  }

  console.log("website leads/office integration smoke passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
