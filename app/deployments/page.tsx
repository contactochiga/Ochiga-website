"use client";

import { useState } from "react";

export default function RequestDeploymentPage() {
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
    // wiring later
    console.log(form);
  };

  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-40 px-6">
      <div className="max-w-3xl mx-auto">

        {/* ============================
            HEADER
        ============================ */}
        <div className="text-center mb-20">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            Request Deployment
          </p>
          <h1 className="text-3xl md:text-5xl font-medium mb-6">
            Let’s talk about your infrastructure.
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Whether you’re planning a new development, upgrading an existing estate,
            or deploying a serious smart system for a single property —
            our team works directly with operators to design and deploy
            infrastructure that lasts.
          </p>
        </div>

        {/* ============================
            FORM
        ============================ */}
        <form
          onSubmit={handleSubmit}
          className="space-y-10"
        >
          {/* Name */}
          <div>
            <label className="block text-sm mb-2 text-white/80">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-white/80">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50"
              placeholder="you@company.com"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm mb-2 text-white/80">
              Organization / Estate / Company
            </label>
            <input
              type="text"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50"
              placeholder="Optional"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm mb-2 text-white/80">
              Project Type
            </label>
            <select
              name="projectType"
              required
              value={form.projectType}
              onChange={handleChange}
              className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50"
            >
              <option value="">Select one</option>
              <option value="estate">Residential / Mixed-Use Estate</option>
              <option value="building">Commercial or Institutional Building</option>
              <option value="urban">Urban or District-Scale Infrastructure</option>
              <option value="single-property">Single Property (Advanced Deployment)</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm mb-2 text-white/80">
              Project Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50"
              placeholder="City, State, Country"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-2 text-white/80">
              Brief Project Description
            </label>
            <textarea
              name="description"
              required
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 resize-none"
              placeholder="What are you building? What problems are you trying to solve?"
            />
          </div>

          {/* Submit */}
          <div className="pt-6 text-center">
            <button
              type="submit"
              className="btn-primary"
            >
              Submit Request
            </button>

            <p className="text-xs text-white/50 mt-6">
              We review every request manually. If your project is a good fit,
              our infrastructure team will reach out directly.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
