"use client";

import { useState } from "react";

export default function DeploymentRequestPage() {
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
  };

  return (
    <main className="bg-black text-white">
      {/* Page-safe offset for fixed header */}
      <div className="pt-[96px] pb-32 px-5 md:px-8">
        <div className="mx-auto w-full max-w-[560px]">

          {/* =============================
              INTRO
          ============================== */}
          <header className="mb-16">
            <h1 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
              Let’s talk about your infrastructure.
            </h1>
            <p className="text-white/65 text-base md:text-[17px] leading-relaxed">
              Whether you’re planning a new development, upgrading an existing
              estate, or deploying a serious system for a single property —
              our team works directly with operators to design infrastructure
              built for long-term operation.
            </p>
          </header>

          {/* =============================
              FORM
          ============================== */}
          <form onSubmit={handleSubmit} className="space-y-14">

            {/* ---- CONTACT ---- */}
            <section className="space-y-7">
              <div>
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

              <div>
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

              <div>
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
            <section className="space-y-7">
              <div>
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

              <div>
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
            <section className="pt-6">
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#ff8c2a] hover:bg-[#ff9c47] transition-all py-4 text-black font-medium text-[15px]"
              >
                Submit deployment request
              </button>
            </section>

          </form>

          {/* =============================
              FOOTNOTE
          ============================== */}
          <p className="text-white/45 text-sm mt-12 leading-relaxed">
            Every request is reviewed manually. If your project aligns with our
            infrastructure model, our team will reach out directly.
          </p>

        </div>
      </div>
    </main>
  );
}
