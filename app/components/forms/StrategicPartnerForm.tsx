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
} from "@/app/components/forms/fields";
import { formatPartnershipReference } from "@/lib/leads/reference";
import { track } from "@/lib/analytics";

const DEFAULT_PARTNER_TYPES = [
  "Architecture", "Structural Engineering", "MEP", "Quantity Surveying", "Construction",
  "Sales & Marketing", "Finance", "Legal", "Valuation", "Facility Management", "Hardware", "Technology", "Other",
];

// Same STRATEGIC_PARTNER lead type and schema, generalized via optional
// props so it can serve both /partnerships/professional's discipline
// intake (defaults below, unchanged) and the broader Partnerships page
// intake (Capital / Buyer-Offtake / Strategic categories) without a
// second duplicate form. Existing callers that pass no props render
// exactly as before.
export default function StrategicPartnerForm({
  partnerTypeOptions = DEFAULT_PARTNER_TYPES,
  partnerTypeLabel = "Partner type",
  descriptionLabel = "Short capability / profile description",
  typePrefillMap,
  submitLabel = "Work With Ochiga",
}: {
  partnerTypeOptions?: string[];
  partnerTypeLabel?: string;
  descriptionLabel?: string;
  typePrefillMap?: Record<string, string>;
  submitLabel?: string;
} = {}) {
  const { state, error, fieldErrors, requestId, submit, errorSummaryRef } = useLeadSubmit("STRATEGIC_PARTNER");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "", organisation: "", email: "", phone: "", websiteOrLinkedin: "", location: "",
    partnerType: "", capabilityDescription: "", relevantExperience: "", portfolioLink: "", preferredCollaboration: "",
  });

  useEffect(() => {
    track("partner_form_start");

    if (!typePrefillMap) return;
    const type = new URLSearchParams(window.location.search).get("type");
    const prefill = type ? typePrefillMap[type] : undefined;
    if (prefill && partnerTypeOptions.includes(prefill)) {
      setForm((prev) => ({ ...prev, partnerType: prev.partnerType || prefill }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const firstName = form.fullName.trim().split(/\s+/)[0] || "there";
    return (
      <div role="status" className="rounded border border-ochiga-white/15 bg-ochiga-charcoal px-6 py-10 text-center md:px-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">Ochiga</p>
        <h3 className="mt-4 font-display text-2xl text-ochiga-white md:text-3xl">Partnership Request Received</h3>
        <p className="mt-5 text-base leading-relaxed text-ochiga-white/70">
          Thank you, {firstName}. Your enquiry has been received and will be reviewed by the appropriate
          Ochiga team. We will contact you if additional information is required.
        </p>
        {requestId ? (
          <p className="mt-6 text-xs text-ochiga-white/35">Reference: {formatPartnershipReference(requestId)}</p>
        ) : null}
      </div>
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
        <TextField id="organisation" label="Company / Organisation (if applicable)" value={form.organisation} onChange={(v) => set("organisation", v)} error={fieldErrors.organisation} />
        <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} error={fieldErrors.email} autoComplete="email" />
        <TextField id="phone" label="Phone" required value={form.phone} onChange={(v) => set("phone", v)} error={fieldErrors.phone} autoComplete="tel" />
        <TextField id="websiteOrLinkedin" label="Website / LinkedIn (optional)" value={form.websiteOrLinkedin} onChange={(v) => set("websiteOrLinkedin", v)} />
        <TextField id="location" label="Location (if applicable)" value={form.location} onChange={(v) => set("location", v)} error={fieldErrors.location} />
      </div>

      <RadioGroupField id="partnerType" label={partnerTypeLabel} required value={form.partnerType} onChange={(v) => set("partnerType", v)} options={partnerTypeOptions} error={fieldErrors.partnerType} />

      <TextAreaField id="capabilityDescription" label={descriptionLabel} required value={form.capabilityDescription} onChange={(v) => set("capabilityDescription", v)} error={fieldErrors.capabilityDescription} />
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
        {state === "submitting" ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}
