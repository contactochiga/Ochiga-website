// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: (
      <>
        Infrastructure
        <br />
        Operating System
      </>
    ),
    description:
      "Operate digital infrastructure across estates and buildings — access, assets, utilities, payments, and live digital twins.",
    image: "/media/infrastructure.png",
  },
  {
    title: (
      <>
        Smart Estate
        <br />
        Operations
      </>
    ),
    description:
      "Unified control for access management, utilities, billing, and shared infrastructure across modern estates.",
    image: "/media/infrastructure.png",
  },
  {
    title: (
      <>
        Live Digital
        <br />
        Twins
      </>
    ),
    description:
      "Operational digital twins representing real buildings, assets, and systems — in real time.",
    image: "/media/infrastructure.png",
  },
];

export default function HomePage() {
  const [active, setActive] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — ENTERPRISE HERO SLIDER
      ================================================== */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">

          {/* Background */}
          <img
            src={slides[active].image}
            alt="Infrastructure background"
            className="hero-bg transition-opacity duration-700"
          />

          {/* Overlays */}
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          {/* Content */}
          <div className="hero-content animate-fade-up">

            {/* REMOVE EXTRA LABEL — CLEAN */}
            <h1 className="text-4xl md:text-[56px] font-semibold mb-6 leading-tight">
              {slides[active].title}
            </h1>

            <p className="text-base md:text-lg text-white/75 max-w-xl mb-10">
              {slides[active].description}
            </p>

            {/* Buttons — balanced spacing */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/oyi" className="btn-primary text-center">
                Explore Oyi
              </Link>

              <Link href="/deployments" className="btn-secondary text-center">
                Request Deployment
              </Link>
            </div>
          </div>

          {/* Slider dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`slider-dot ${active === i ? "active" : ""}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — CORE STATEMENT
      ================================================== */}
      <section className="px-6 md:px-20 py-28 md:py-36">
        <h2 className="text-3xl md:text-6xl font-medium max-w-5xl mb-10">
          One system for real-world infrastructure.
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-3xl">
          Ochiga designs and operates the digital backbone that governs access,
          assets, utilities, payments, and live systems across physical
          environments.
          <br />
          <br />
          We deliver integrated, operator-focused infrastructure — not apps,
          not dashboards, but systems that run cities, estates, and buildings.
        </p>
      </section>

      {/* =================================================
          SECTION 3 — OYI
      ================================================== */}
      <section className="px-6 md:px-20 py-28 md:py-36 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-6">
          Oyi
        </h2>

        <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-3xl">
          Smart Building & Estate Infrastructure Operating System
        </p>

        <ul className="space-y-4 text-white/70 text-lg max-w-3xl mb-12">
          <li>• Identity-driven access control and governance</li>
          <li>• Building systems and shared infrastructure operations</li>
          <li>• Utilities, metering, billing, and payments</li>
          <li>• Estate-wide operations, events, and audit trails</li>
        </ul>

        <Link href="/oyi" className="btn-secondary inline-block">
          View Oyi
        </Link>
      </section>

      {/* =================================================
          FOOTER
      ================================================== */}
      <footer className="py-12 text-center text-white/40 text-sm">
        OCHIGA © {new Date().getFullYear()}
      </footer>

    </main>
  );
}
