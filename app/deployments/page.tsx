"use client";

import { useState } from "react";
import Link from "next/link";

export default function DeploymentRequestPage() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    projectType: "",
    location: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    setSubmitted(true);
  };

  return (
    <main className="bg-black text-white">
      {/* Header-safe offset */}
      <div className="pt-[104px] pb-28 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[520px]">

          {/* =============================
              SUCCESS STATE
          ============================== */}
          {submitted ? (
            <div className="animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-medium mb-6">
                Request received.
              </h1>

              <p className="text-white/70 text-base leading-relaxed mb-10">
                Thanks for reaching out. We review every deployment request
                manually. If your project is a good fit, our infrastructure
                team will contact you directly.
              </p>

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
                    <label className="form-label">
                      Organization / Estate
                      <span className="text-white/40 ml-1">(optional)</span>
                    </label>
                    <input
                      name="organization"
                      value={form.organization}
                      onChange={handleChange}
                      placeholder="Company or estate name"
                      className="form-input"
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
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What are you building? What problems are you trying to solve?"
                    className="form-input resize-none"
                    required
                  />
                </section>

                {/* ---- SUBMIT ---- */}
                <section className="pt-4">
                  <button type="submit" className="btn-primary w-full py-4">
                    Submit request
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
