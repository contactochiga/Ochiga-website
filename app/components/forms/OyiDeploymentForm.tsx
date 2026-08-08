"use client";

import { useEffect, useState } from "react";
import { useLeadSubmit } from "@/app/components/forms/useLeadSubmit";
import {
  TextField,
  TextAreaField,
  RadioGroupField,
  SelectField,
  ConsentField,
  Honeypot,
  ErrorSummary,
  SuccessPanel,
} from "@/app/components/forms/fields";
import { track } from "@/lib/analytics";

const roleOptions = ["Developer", "Property Owner", "Facility Manager", "Hospitality Operator", "Healthcare Operator", "Enterprise / Corporate", "Other"];
const stageOptions = ["Planning", "Under Construction", "Existing Building", "Portfolio Deployment"];
const contactMethods = ["Email", "Phone", "WhatsApp"];

export default function OyiDeploymentForm() {
  const { state, error, fieldErrors, requestId, submit, errorSummaryRef } = useLeadSubmit("OYI_DEPLOYMENT");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "", organisation: "", email: "", phone: "", roleType: "",
    propertyType: "", location: "", approxSize: "", projectStage: "",
    requirement: "", preferredContactMethod: "", expectedTimeline: "",
  });

  useEffect(() => {
    track("oyi_deployment_start");
  }, []);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = await submit({ ...form, website, consent });
    if (result.ok) track("oyi_deployment_submit");
  }

  if (state === "success") {
    return (
      <SuccessPanel
        message="Thank you. Our team will review your deployment request and contact you with the appropriate next step."
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
      </div>

      <RadioGroupField id="roleType" label="Role / organisation type" required value={form.roleType} onChange={(v) => set("roleType", v)} options={roleOptions} error={fieldErrors.roleType} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="propertyType" label="Property / building type" required value={form.propertyType} onChange={(v) => set("propertyType", v)} error={fieldErrors.propertyType} />
        <TextField id="location" label="Location" required value={form.location} onChange={(v) => set("location", v)} error={fieldErrors.location} />
        <TextField id="approxSize" label="Approximate units / building size" required value={form.approxSize} onChange={(v) => set("approxSize", v)} error={fieldErrors.approxSize} />
        <SelectField id="projectStage" label="Project stage" required value={form.projectStage} onChange={(v) => set("projectStage", v)} options={stageOptions} error={fieldErrors.projectStage} />
      </div>

      <TextAreaField id="requirement" label="Primary requirement / short description" required value={form.requirement} onChange={(v) => set("requirement", v)} error={fieldErrors.requirement} />

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField id="preferredContactMethod" label="Preferred contact method" value={form.preferredContactMethod} onChange={(v) => set("preferredContactMethod", v)} options={contactMethods} />
        <TextField id="expectedTimeline" label="Expected deployment timeline (optional)" value={form.expectedTimeline} onChange={(v) => set("expectedTimeline", v)} />
      </div>

      <ConsentField id="consent" checked={consent} onChange={setConsent} error={fieldErrors.consent} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded bg-ochiga-red px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Request Deployment"}
      </button>
    </form>
  );
}
