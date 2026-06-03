"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type SubmitState = "idle" | "submitting" | "success" | "error";

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
    <main className="bg-black text-white">
      {/* Header-safe offset */}
      <div className="pt-[104px] pb-28 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[520px]">

          {/* =============================
              SUCCESS STATE
          ============================== */}
          {submitState === "success" ? (
            <div className="animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-medium mb-6">
                Request received.
              </h1>

              <p className="text-white/70 text-base leading-relaxed mb-10">
                Thanks for reaching out. We review every deployment request
                manually. If your project is a good fit, our infrastructure
                team will contact you directly.
              </p>

              {requestId ? (
                <p className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/45">
                  Reference: {requestId}
                </p>
              ) : null}

              <div className="flex gap-4">
                <Link href="/" className="btn-secondary">
                  Back to Home
                </Link>
                <Link href="/oyi" className="btn-primary">
                  Explore Oyi
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* =============================
                  INTRO
              ============================== */}
              <header className="mb-14">
                <h1 className="text-3xl md:text-4xl font-medium mb-5 leading-tight">
                  Let’s talk about your infrastructure.
                </h1>
                <p className="text-white/65 text-[15px] md:text-[16px] leading-relaxed">
                  Whether you’re planning a new development, upgrading an
                  existing estate, or deploying a serious system for a single
                  property — our team works directly with operators to design
                  infrastructure built for long-term operation.
                </p>
              </header>

              {/* =============================
                  FORM
              ============================== */}
              <form onSubmit={handleSubmit} className="space-y-12">
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

                {/* ---- CONTACT ---- */}
                <section className="space-y-6">
                  <div className="form-group">
                    <label className="form-label">Full name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company / Estate</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company or estate name"
                      className="form-input"
                      required
                    />
                  </div>
                </section>

                {/* ---- PROJECT ---- */}
                <section className="space-y-6">
                  <div className="form-group">
                    <label className="form-label">Project type</label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select one</option>
                      <option>New development</option>
                      <option>Existing estate upgrade</option>
                      <option>Single property deployment</option>
                      <option>Infrastructure audit / planning</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project size</label>
                    <select
                      name="projectSize"
                      value={form.projectSize}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select one</option>
                      <option>Single property</option>
                      <option>2–20 homes / units</option>
                      <option>21–100 homes / units</option>
                      <option>101–500 homes / units</option>
                      <option>500+ homes / units</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Deployment interest</label>
                    <select
                      name="deploymentInterest"
                      value={form.deploymentInterest}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select one</option>
                      <option>Oyi Home / resident app</option>
                      <option>Facility OS</option>
                      <option>Access control and visitors</option>
                      <option>Smart devices and Oyi Edge</option>
                      <option>Digital twin / command center</option>
                      <option>Full infrastructure operating system</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project location</label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, State, Country"
                      className="form-input"
                      required
                    />
                  </div>
                </section>

                {/* ---- CONTEXT ---- */}
                <section className="space-y-3">
                  <label className="form-label">Project context</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What are you building? What problems are you trying to solve?"
                    className="form-input resize-none"
                    required
                  />
                </section>

                {/* ---- SUBMIT ---- */}
                <section className="pt-4">
                  {submitState === "error" ? (
                    <div className="mb-5 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitState === "submitting" ? "Submitting request…" : submitState === "error" ? "Retry request" : "Submit request"}
                  </button>
                </section>
              </form>

              {/* =============================
                  FOOTNOTE
              ============================== */}
              <p className="text-white/45 text-sm mt-12 leading-relaxed">
                Every request is reviewed manually. If your project aligns
                with our infrastructure model, our team will reach out directly.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
