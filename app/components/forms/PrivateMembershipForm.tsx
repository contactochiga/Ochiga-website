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
} from "@/app/components/forms/fields";
import { formatPrivateReference } from "@/lib/leads/reference";
import { track } from "@/lib/analytics";

const investorProfiles = ["Individual", "Institutional / Corporate"];
const strategyOptions = [
  "Income-generating property",
  "Capital appreciation",
  "Property / development opportunities",
  "Open to selected opportunities",
];
const experienceOptions = ["New", "Some experience", "Previously invested / participated"];

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
    const firstName = form.fullName.trim().split(/\s+/)[0] || "there";
    return (
      <div role="status" className="rounded border border-ochiga-white/15 bg-ochiga-charcoal px-6 py-10 text-center md:px-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">Ochiga Private</p>
        <h3 className="mt-4 font-display text-2xl text-ochiga-white md:text-3xl">Membership Request Received</h3>
        <p className="mt-5 text-base leading-relaxed text-ochiga-white/70">
          Thank you, {firstName}. Your request has been received and will be reviewed by the Ochiga Private
          team. We will contact you if any additional information is required.
        </p>
        {requestId ? (
          <p className="mt-6 text-xs text-ochiga-white/35">Reference: {formatPrivateReference(requestId)}</p>
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
        <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} error={fieldErrors.email} autoComplete="email" />
        <TextField id="phone" label="Phone / WhatsApp (optional)" value={form.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />
      </div>

      <RadioGroupField id="investorProfile" label="Profile" required value={form.investorProfile} onChange={(v) => set("investorProfile", v)} options={investorProfiles} error={fieldErrors.investorProfile} />

      <CheckboxGroupField
        id="investmentStrategy"
        label="Preferred strategy (select all that apply)"
        required
        values={investmentStrategy}
        onChange={setInvestmentStrategy}
        options={strategyOptions}
        error={fieldErrors.investmentStrategy}
      />

      <RadioGroupField id="investmentExperience" label="Experience" required value={form.investmentExperience} onChange={(v) => set("investmentExperience", v)} options={experienceOptions} error={fieldErrors.investmentExperience} />

      <TextAreaField id="notes" label="Reason for joining / note (optional)" value={form.notes} onChange={(v) => set("notes", v)} />

      <ConsentField id="consent" checked={consent} onChange={setConsent} error={fieldErrors.consent} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded bg-ochiga-red px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Request Membership"}
      </button>
    </form>
  );
}
