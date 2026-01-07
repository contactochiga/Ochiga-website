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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // email / backend wiring comes next
    console.log(form);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-28 pb-32">
      <div className="max-w-xl mx-auto">

        {/* =============================
            HEADER
        ============================== */}
        <header className="mb-14">
          <h1 className="text-3xl md:text-4xl font-medium mb-5">
            Let’s talk about your infrastructure.
          </h1>
          <p className="text-white/70 leading-relaxed">
            Whether you’re planning a new development, upgrading an existing estate,
            or deploying a serious smart system for a single property — our team works
            directly with operators to design and deploy infrastructure that lasts.
          </p>
        </header>

        {/* =============================
            FORM
        ============================== */}
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ---- Identity ---- */}
          <section className="space-y-6">
            <div>
              <label className="form-label">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Email Address</label>
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
                Organization / Estate / Company
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

          {/* ---- Project Context ---- */}
          <section className="space-y-6">
            <div>
              <label className="form-label">Project Type</label>
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
              <label className="form-label">Project Location</label>
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

          {/* ---- Description ---- */}
          <section>
            <label className="form-label">Brief Project Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="What are you building? What problems are you trying to solve?"
              className="form-input resize-none"
              required
            />
          </section>

          {/* ---- Submit ---- */}
          <section className="pt-4">
            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 transition py-4 text-black font-medium text-lg"
            >
              Submit Request
            </button>
          </section>

        </form>

        {/* =============================
            FOOTNOTE
        ============================== */}
        <p className="text-white/50 text-sm mt-10 leading-relaxed">
          We review every request manually. If your project is a good fit,
          our infrastructure team will reach out directly.
        </p>

      </div>
    </main>
  );
}
