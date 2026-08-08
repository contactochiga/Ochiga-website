"use client";

import { useEffect, useState } from "react";
import { useLeadSubmit } from "@/app/components/forms/useLeadSubmit";
import {
  TextField,
  TextAreaField,
  RadioGroupField,
  CheckboxGroupField,
  ConsentField,
  Honeypot,
  ErrorSummary,
  SuccessPanel,
} from "@/app/components/forms/fields";
import { track } from "@/lib/analytics";

const investorProfiles = ["Individual Investor", "Institutional Investor", "Family Office / Private Investment Company", "Corporate Investor"];
const strategyOptions = [
  "Income-Generating Assets", "Capital Appreciation", "Joint Venture Development", "Property Acquisition",
  "Development Opportunities", "Property Transformation / Conversion", "Strategic / Short-Term Property Trading",
  "Off-Plan / Early-Stage Acquisition", "Open to Selected Opportunities",
];
const experienceOptions = ["New Investor", "Some Previous Investment Experience", "Experienced Investor", "Professional / Institutional Investor"];

export default function PrivateMembershipForm() {
  const { state, error, fieldErrors, requestId, submit, errorSummaryRef } = useLeadSubmit("PRIVATE_MEMBERSHIP");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    investorProfile: "", investmentExperience: "", notes: "",
  });
  const [investmentStrategy, setInvestmentStrategy] = useState<string[]>([]);

  useEffect(() => {
    track("private_membership_start");
  }, []);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = await submit({ ...form, investmentStrategy, website, consent });
    if (result.ok) track("private_membership_submit");
  }

  if (state === "success") {
    return (
      <SuccessPanel
        message="Thank you for your interest in Ochiga Private. Membership is considered individually. Our team will review your request and share further information where appropriate."
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
        <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} error={fieldErrors.email} autoComplete="email" />
        <TextField id="phone" label="Phone / WhatsApp (optional)" value={form.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />
      </div>

      <RadioGroupField id="investorProfile" label="Investor profile" required value={form.investorProfile} onChange={(v) => set("investorProfile", v)} options={investorProfiles} error={fieldErrors.investorProfile} />

      <CheckboxGroupField
        id="investmentStrategy"
        label="Preferred investment strategy (select all that apply)"
        required
        values={investmentStrategy}
        onChange={setInvestmentStrategy}
        options={strategyOptions}
        error={fieldErrors.investmentStrategy}
      />

      <RadioGroupField id="investmentExperience" label="Real estate / investment experience" required value={form.investmentExperience} onChange={(v) => set("investmentExperience", v)} options={experienceOptions} error={fieldErrors.investmentExperience} />

      <TextAreaField id="notes" label="Anything you'd like us to know? (optional)" value={form.notes} onChange={(v) => set("notes", v)} />

      <ConsentField id="consent" checked={consent} onChange={setConsent} error={fieldErrors.consent} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded bg-ochiga-red px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Request Membership Requirements"}
      </button>
    </form>
  );
}
