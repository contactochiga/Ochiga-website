"use client";

import { useEffect, useState } from "react";
import { useLeadSubmit } from "@/app/components/forms/useLeadSubmit";
import {
  TextField,
  TextAreaField,
  SelectField,
  ConsentField,
  Honeypot,
  ErrorSummary,
  SuccessPanel,
} from "@/app/components/forms/fields";
import { track } from "@/lib/analytics";

const categories = ["Corporate", "Media", "General", "Other"];

export default function GeneralContactForm() {
  const { state, error, fieldErrors, requestId, submit, errorSummaryRef } = useLeadSubmit("GENERAL_CONTACT");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", subject: "", message: "", category: "" });

  useEffect(() => {
    track("contact_start");
  }, []);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = await submit({ ...form, website, consent });
    if (result.ok) track("contact_submit");
  }

  if (state === "success") {
    return (
      <SuccessPanel
        message="Thank you for contacting Ochiga. Our team will review your message and respond as soon as possible."
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
        <TextField id="phone" label="Phone (optional)" value={form.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />
        <SelectField id="category" label="Category (optional)" value={form.category} onChange={(v) => set("category", v)} options={categories} />
      </div>

      <TextField id="subject" label="Subject" required value={form.subject} onChange={(v) => set("subject", v)} error={fieldErrors.subject} />
      <TextAreaField id="message" label="Message" required value={form.message} onChange={(v) => set("message", v)} error={fieldErrors.message} />

      <ConsentField id="consent" checked={consent} onChange={setConsent} error={fieldErrors.consent} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded bg-ochiga-red px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Send Message"}
      </button>
    </form>
  );
}
