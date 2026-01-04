"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  /* =====================================================
     HERO SLIDES (TESLA-STYLE)
  ====================================================== */
  const slides = [
    {
      image: "/media/infrastructure.png",
      title: "Transform Estates Into Smart Ecosystems",
      subtitle:
        "Elevate your property with Ochiga’s operating system for smart estates.",
      primaryCta: {
        label: "Explore Oyi",
        href: "/oyi",
      },
      secondaryCta: {
        label: "Request Deployment",
        href: "/deployments",
      },
    },
    {
      image: "/media/infrastructure-2.png",
      title: "The Operating System for Smart Infrastructure",
      subtitle:
        "Digital twin–powered control for estates, buildings, and communities.",
      primaryCta: {
        label: "View Platform",
        href: "/oyi",
      },
      secondaryCta: {
        label: "Talk to Us",
        href: "/deployments",
      },
    },
    {
      image: "/media/infrastructure-3.png",
      title: "Design. Deploy. Operate.",
      subtitle:
        "One unified system to manage access, utilities, assets, and payments.",
      primaryCta: {
        label: "Get Started",
        href: "/deployments",
      },
      secondaryCta: {
        label: "Read Papers",
        href: "/papers",
      },
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <main className="bg-black text-white">

      {/* =====================================================
         SECTION 1 — TESLA-STYLE HERO
      ====================================================== */}
      <section className="relative h-[100svh] w-full overflow-hidden">

        {/* Background Image */}
        <img
          src={slides[active].image}
          alt="Ochiga smart infrastructure"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6 md:px-20 max-w-4xl">

            <h1 className="text-4xl md:text-7xl font-semibold leading-tight mb-6">
              {slides[active].title}
            </h1>

            <p className="text-lg md:text-2xl text-white/80 mb-10">
              {slides[active].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={slides[active].primaryCta.href}
                className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
              >
                {slides[active].primaryCta.label}
              </Link>

              <Link
                href={slides[active].secondaryCta.href}
                className="px-8 py-3 rounded-full border border-white/40 text-sm hover:bg-white/10 transition"
              >
                {slides[active].secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                active === index
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
         SECTION 2 — WHAT OCHIGA DOES
      ====================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-10 max-w-4xl">
          One system to govern access, assets, utilities, and payments.
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70">
          Ochiga designs, deploys, and operates the digital backbone that runs
          modern estates, buildings, and physical environments.
          <br /><br />
          We replace fragmented tools and manual processes with a unified
          infrastructure operating layer.
        </p>
      </section>

      {/* =====================================================
         SECTION 3 — PRODUCT: OYI
      ====================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-6">
          Oyi
        </h2>

        <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-3xl">
          Smart Building & Estate Infrastructure Operating System
        </p>

        <ul className="space-y-4 text-white/70 text-lg mb-12">
          <li>• Identity-driven access control and governance</li>
          <li>• Building systems and shared infrastructure operations</li>
          <li>• Utilities, metering, billing, and payments</li>
          <li>• Estate-wide operations, events, and audit trails</li>
        </ul>

        <Link
          href="/oyi"
          className="inline-block px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
        >
          View Oyi
        </Link>
      </section>

      {/* =====================================================
         SECTION 4 — DIGITAL TWIN
      ====================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <p className="uppercase text-xs tracking-widest text-white/50 mb-4">
          Digital Twin Infrastructure
        </p>

        <h2 className="text-3xl md:text-6xl font-medium mb-8 max-w-4xl">
          Live digital twins for real-world infrastructure.
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70 mb-12">
          Ochiga builds digital twins as operational infrastructure —
          not visual simulations.
        </p>

        <Link
          href="/digital-twin"
          className="inline-block px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
        >
          View Read-Only Demo
        </Link>
      </section>

      {/* =====================================================
         SECTION 5 — DEPLOYMENT CTA
      ====================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-6">
          Deploy Ochiga
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70 mb-12">
          Ochiga is deployed as core infrastructure —
          tailored to the physical, operational,
          and regulatory realities of its environment.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/deployments"
            className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
          >
            Request Deployment
          </Link>

          <Link
            href="/papers"
            className="px-8 py-3 rounded-full border border-white/30 text-sm hover:bg-white/10 transition"
          >
            Read Infrastructure Papers
          </Link>
        </div>
      </section>

    </main>
  );
}
