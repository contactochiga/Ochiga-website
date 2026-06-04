"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type SubmitState = "idle" | "submitting" | "success" | "error";

const projectTypes = [
  "New development",
  "Existing estate upgrade",
  "Single property deployment",
  "Infrastructure audit / planning",
  "Not sure yet",
];

export default function DeploymentRequestPage() {
  const formStartedAt = useMemo(() => String(Date.now()), []);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    projectSize: "",
    deploymentInterest: "",
    location: "",
    notes: "",
    website: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitState === "error") {
      setSubmitState("idle");
      setError("");
    }
  };

  const setProjectType = (projectType: string) => {
    setForm({ ...form, projectType });
    if (submitState === "error") {
      setSubmitState("idle");
      setError("");
    }
  };

  const validate = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return "Enter a valid email address.";
    }
    const digits = form.phone.replace(/[^\d]/g, "");
    if (digits.length < 7 || digits.length > 16) {
      return "Enter a valid phone number.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    setError("");

    try {
      const response = await fetch("/api/deployments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          formStartedAt,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "We could not submit your request right now.");
      }

      setRequestId(data.requestId || "");
      setSubmitState("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We could not submit your request right now."
      );
      setSubmitState("error");
    }
  };

  return (
    <main className="deployment-page">
      <section className="deployment-hero">
        <div className="deployment-visual" aria-hidden="true">
          <div className="deployment-tower" />
          <div className="deployment-grid" />
          <div className="deployment-scan" />
        </div>
        <div className="deployment-copy">
          <p>Deployment Intake</p>
          <h1>Plan intelligent infrastructure with Ochiga.</h1>
          <span>
            This is a structured intake for buildings, estates, command centers, digital twins, edge infrastructure, and Oyi platform deployments.
          </span>
        </div>
      </section>

      <section className="deployment-shell">
        {submitState === "success" ? (
          <div className="deployment-success animate-fade-up">
            <p>Request received</p>
            <h2>Our infrastructure team will review your context.</h2>
            <span>
              If your project is aligned, Ochiga will follow up to clarify site structure, operator readiness, source requirements, and deployment scope.
            </span>
            {requestId ? <strong>Reference: {requestId}</strong> : null}
            <div>
              <Link href="/" className="btn-secondary">Back to Home</Link>
              <Link href="/oyi" className="btn-primary">Explore Oyi</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="deployment-form">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <FormSection step="01" title="Contact" body="Who should Ochiga speak with about this environment?">
              <div className="deployment-fields two">
                <Field label="Full name">
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                </Field>
                <Field label="Email address">
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required />
                </Field>
                <Field label="Phone number">
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" required />
                </Field>
                <Field label="Company / Estate">
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Company or estate name" required />
                </Field>
              </div>
            </FormSection>

            <FormSection step="02" title="Project" body="Tell us what kind of built environment or infrastructure system you are planning.">
              <div className="project-type-grid">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={form.projectType === type ? "selected" : ""}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <select className="sr-fallback" name="projectType" value={form.projectType} onChange={handleChange} required aria-label="Project type">
                <option value="">Select one</option>
                {projectTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
              <div className="deployment-fields two">
                <Field label="Project size">
                  <select name="projectSize" value={form.projectSize} onChange={handleChange} required>
                    <option value="">Select one</option>
                    <option>Single property</option>
                    <option>2-20 homes / units</option>
                    <option>21-100 homes / units</option>
                    <option>101-500 homes / units</option>
                    <option>500+ homes / units</option>
                    <option>Not sure yet</option>
                  </select>
                </Field>
                <Field label="Deployment interest">
                  <select name="deploymentInterest" value={form.deploymentInterest} onChange={handleChange} required>
                    <option value="">Select one</option>
                    <option>Oyi Home / resident app</option>
                    <option>Facility OS</option>
                    <option>Access control and visitors</option>
                    <option>Smart devices and Oyi Edge</option>
                    <option>Digital twin / command center</option>
                    <option>Full digital infrastructure layer</option>
                  </select>
                </Field>
                <Field label="Project location">
                  <input name="location" value={form.location} onChange={handleChange} placeholder="City, State, Country" required />
                </Field>
              </div>
            </FormSection>

            <FormSection step="03" title="Challenge" body="Describe the operational problem, architectural ambition, or infrastructure gap.">
              <Field label="Project context">
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={6}
                  placeholder="What are you building, upgrading, or trying to solve? Include current access, utility, device, facility, resident, command center, or digital twin needs."
                  required
                />
              </Field>
            </FormSection>

            <section className="deployment-review">
              <div>
                <p>04 · Submit</p>
                <h2>What happens next</h2>
                <span>Ochiga reviews every request manually. If aligned, the next step is a discovery conversation around site structure, source readiness, and deployment scope.</span>
              </div>
              {submitState === "error" ? <div className="deployment-error">{error}</div> : null}
              <button type="submit" disabled={submitState === "submitting"} className="btn-primary">
                {submitState === "submitting" ? "Submitting request..." : submitState === "error" ? "Retry request" : "Submit Deployment Request"}
              </button>
            </section>
          </form>
        )}

        <aside className="deployment-aside">
          <InfoCard title="Journey" items={["Discover", "Design", "Connect", "Operate", "Evolve"]} />
          <InfoCard title="Prepare" items={["Estate or building context", "Approximate unit count", "Current operational problems", "Existing vendors or systems", "Operator readiness"]} />
          <InfoCard title="Honest source states" items={["Live", "Pending integration", "Awaiting telemetry", "No source configured"]} />
        </aside>
      </section>
    </main>
  );
}

function FormSection({ step, title, body, children }: { step: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <section className="deployment-form-section">
      <div className="deployment-section-head">
        <span>{step}</span>
        <div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="deployment-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}
