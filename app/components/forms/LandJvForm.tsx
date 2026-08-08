"use client";

import { useEffect, useState } from "react";
import { useLeadSubmit } from "@/app/components/forms/useLeadSubmit";
import {
  TextField,
  TextAreaField,
  SelectField,
  RadioGroupField,
  ConsentField,
  Honeypot,
  ErrorSummary,
  SuccessPanel,
} from "@/app/components/forms/fields";
import { track } from "@/lib/analytics";

const ownershipOptions = [
  "C of O", "Governor's Consent", "Deed of Assignment", "Registered Conveyance",
  "Family / Community Title", "Other", "Not Sure",
];
const expectationOptions = ["Joint Venture", "Outright Sale", "Development Partnership", "Open to Discussion"];
const contactMethods = ["Email", "Phone", "WhatsApp"];

const steps = ["Contact", "Property", "Ownership & Expectation", "Review"];

export default function LandJvForm() {
  const { state, error, fieldErrors, requestId, submit, errorSummaryRef } = useLeadSubmit("LAND_JV");
  const [step, setStep] = useState(0);
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", preferredContactMethod: "",
    propertyLocation: "", approxLandSize: "", propertyType: "", existingStructure: "",
    ownershipTitle: "", developmentExpectation: "", premiumExpectation: "", opportunityDescription: "",
  });

  useEffect(() => {
    track("land_jv_start");
  }, []);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    const result = await submit({ ...form, website, consent });
    if (result.ok) track("land_jv_submit");
  }

  if (state === "success") {
    return (
      <SuccessPanel
        message="Thank you. Our development team will review the opportunity and contact you where the property fits our development criteria."
        requestId={requestId}
      />
    );
  }

  return (
    <div>
      <ol className="mb-8 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-ochiga-white/40">
        {steps.map((label, index) => (
          <li key={label} className={`rounded px-3 py-1.5 ${index === step ? "bg-ochiga-red/15 text-ochiga-red" : "border border-ochiga-white/10"}`}>
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      {error ? (
        <div ref={errorSummaryRef} tabIndex={-1} className="mb-6">
          <ErrorSummary errors={fieldErrors && Object.keys(fieldErrors).length ? fieldErrors : { form: error }} />
        </div>
      ) : null}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (step < steps.length - 1) {
            setStep((s) => s + 1);
          } else {
            handleSubmit();
          }
        }}
        className="space-y-6"
      >
        <Honeypot value={website} onChange={setWebsite} />

        {step === 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField id="fullName" label="Full name" required value={form.fullName} onChange={(v) => set("fullName", v)} error={fieldErrors.fullName} autoComplete="name" />
            <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} error={fieldErrors.email} autoComplete="email" />
            <TextField id="phone" label="Phone / WhatsApp" required value={form.phone} onChange={(v) => set("phone", v)} error={fieldErrors.phone} autoComplete="tel" />
            <SelectField id="preferredContactMethod" label="Preferred contact method" value={form.preferredContactMethod} onChange={(v) => set("preferredContactMethod", v)} options={contactMethods} />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField id="propertyLocation" label="Property location" required value={form.propertyLocation} onChange={(v) => set("propertyLocation", v)} error={fieldErrors.propertyLocation} />
            <TextField id="approxLandSize" label="Approximate land size" required value={form.approxLandSize} onChange={(v) => set("approxLandSize", v)} error={fieldErrors.approxLandSize} />
            <TextField id="propertyType" label="Property type" required value={form.propertyType} onChange={(v) => set("propertyType", v)} error={fieldErrors.propertyType} />
            <TextField id="existingStructure" label="Existing structure, if any" value={form.existingStructure} onChange={(v) => set("existingStructure", v)} />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <SelectField id="ownershipTitle" label="Ownership / title" required value={form.ownershipTitle} onChange={(v) => set("ownershipTitle", v)} options={ownershipOptions} error={fieldErrors.ownershipTitle} />
            <RadioGroupField id="developmentExpectation" label="Development expectation" required value={form.developmentExpectation} onChange={(v) => set("developmentExpectation", v)} options={expectationOptions} error={fieldErrors.developmentExpectation} />
            <TextField id="premiumExpectation" label="Premium expectation (optional)" value={form.premiumExpectation} onChange={(v) => set("premiumExpectation", v)} />
            <TextAreaField id="opportunityDescription" label="Short opportunity description (optional)" value={form.opportunityDescription} onChange={(v) => set("opportunityDescription", v)} />
            <p className="text-xs text-ochiga-white/40">
              Supporting documents can be requested by our development team after initial review — no upload is needed at this stage.
            </p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-6">
            <div className="rounded border border-ochiga-white/10 p-6">
              <p className="mb-4 text-xs uppercase tracking-wide text-ochiga-white/40">Review your submission</p>
              <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                {Object.entries({
                  "Full name": form.fullName, Email: form.email, Phone: form.phone,
                  Location: form.propertyLocation, "Land size": form.approxLandSize,
                  "Property type": form.propertyType, Ownership: form.ownershipTitle,
                  Expectation: form.developmentExpectation,
                }).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-ochiga-white/40">{label}</dt>
                    <dd className="text-ochiga-white">{value || "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ConsentField id="consent" checked={consent} onChange={setConsent} error={fieldErrors.consent} />
          </div>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="text-sm text-ochiga-white/55 hover:text-ochiga-white">
              ← Back
            </button>
          ) : <span />}

          {step < steps.length - 1 ? (
            <button type="submit" className="rounded bg-ochiga-red px-6 py-3 text-sm font-medium text-ochiga-white hover:bg-ochiga-red-bright">
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={state === "submitting"}
              className="rounded bg-ochiga-red px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright disabled:opacity-60"
            >
              {state === "submitting" ? "Submitting…" : "Propose a Development"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
