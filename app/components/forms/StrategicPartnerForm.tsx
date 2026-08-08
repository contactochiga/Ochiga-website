"use client";

import { useEffect, useState } from "react";
import { useLeadSubmit } from "@/app/components/forms/useLeadSubmit";
import {
  TextField,
  TextAreaField,
  RadioGroupField,
  ConsentField,
  Honeypot,
  ErrorSummary,
  SuccessPanel,
} from "@/app/components/forms/fields";
import { track } from "@/lib/analytics";

const partnerTypes = [
  "Architecture", "Structural Engineering", "MEP", "Quantity Surveying", "Construction",
  "Sales & Marketing", "Finance", "Legal", "Valuation", "Facility Management", "Hardware", "Technology", "Other",
];

export default function StrategicPartnerForm() {
  const { state, error, fieldErrors, requestId, submit, errorSummaryRef } = useLeadSubmit("STRATEGIC_PARTNER");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "", organisation: "", email: "", phone: "", websiteOrLinkedin: "", location: "",
    partnerType: "", capabilityDescription: "", relevantExperience: "", portfolioLink: "", preferredCollaboration: "",
  });

  useEffect(() => {
    track("partner_form_start");
  }, []);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = await submit({ ...form, website, consent });
    if (result.ok) track("partner_form_submit");
  }

  if (state === "success") {
    return (
      <SuccessPanel
        message="Thank you. We'll review your profile and reach out where there is a relevant collaboration opportunity."
        requestId={requestId}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Honeypot value={website} onChange={setWebsite} />

      {error ? (
        <div ref={errorSummaryRef} tabIndex={-1}>
          <ErrorSummary errors={fieldErrors && Object.keys(fieldErrors).length ? fieldErrors : { form: error }} />
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="fullName" label="Full name" required value={form.fullName} onChange={(v) => set("fullName", v)} error={fieldErrors.fullName} autoComplete="name" />
        <TextField id="organisation" label="Organisation" required value={form.organisation} onChange={(v) => set("organisation", v)} error={fieldErrors.organisation} />
        <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} error={fieldErrors.email} autoComplete="email" />
        <TextField id="phone" label="Phone" required value={form.phone} onChange={(v) => set("phone", v)} error={fieldErrors.phone} autoComplete="tel" />
        <TextField id="websiteOrLinkedin" label="Website / LinkedIn (optional)" value={form.websiteOrLinkedin} onChange={(v) => set("websiteOrLinkedin", v)} />
        <TextField id="location" label="Location" required value={form.location} onChange={(v) => set("location", v)} error={fieldErrors.location} />
      </div>

      <RadioGroupField id="partnerType" label="Partner type" required value={form.partnerType} onChange={(v) => set("partnerType", v)} options={partnerTypes} error={fieldErrors.partnerType} />

      <TextAreaField id="capabilityDescription" label="Short capability / profile description" required value={form.capabilityDescription} onChange={(v) => set("capabilityDescription", v)} error={fieldErrors.capabilityDescription} />
      <TextAreaField id="relevantExperience" label="Relevant experience (optional)" value={form.relevantExperience} onChange={(v) => set("relevantExperience", v)} rows={3} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="portfolioLink" label="Portfolio / company profile link (optional)" value={form.portfolioLink} onChange={(v) => set("portfolioLink", v)} />
        <TextField id="preferredCollaboration" label="Preferred area of collaboration (optional)" value={form.preferredCollaboration} onChange={(v) => set("preferredCollaboration", v)} />
      </div>

      <ConsentField id="consent" checked={consent} onChange={setConsent} error={fieldErrors.consent} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded bg-ochiga-red px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Work With Ochiga"}
      </button>
    </form>
  );
}
