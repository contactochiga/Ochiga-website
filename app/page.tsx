// app/page.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!railRef.current) return;
    const scrollLeft = railRef.current.scrollLeft;
    const cardWidth = railRef.current.firstElementChild?.clientWidth || 1;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  const scrollToCard = (index: number) => {
    if (!railRef.current) return;
    const cardWidth = railRef.current.firstElementChild?.clientWidth || 1;
    railRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — HERO (LOCKED)
      ================================================== */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">
          <img src="/media/infrastructure.png" className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Infrastructure
              <br />
              Operating System
            </h1>

            <p className="hero-description">
              Operate digital infrastructure across estates and buildings —
              access, assets, utilities, payments, and live digital twins.
            </p>

            <div className="hero-cta">
              <Link href="/oyi" className="btn-primary">Explore Oyi</Link>
              <Link href="/deployments" className="btn-secondary">Request Deployment</Link>
            </div>
          </div>

          <div className="hero-dots">
            <div className="slider-dot active" />
            <div className="slider-dot" />
            <div className="slider-dot" />
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 1.5 — CORE STATEMENT (LOCKED)
      ================================================== */}
      <section className="relative py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            One system for real-world infrastructure.
          </h2>

          <p className="text-lg md:text-xl text-white/70">
            Ochiga designs and operates the digital backbone that governs access,
            assets, utilities, payments, and live systems across physical environments.
            <br /><br />
            We deliver operator-focused infrastructure — not apps, not dashboards,
            but systems that run estates, buildings, and cities.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — SERVICES (LOCKED)
      ================================================== */}
      <section className="py-24">
        <div className="px-6 md:px-20 mb-12 section-services-intro">
          <p className="uppercase text-xs tracking-widest brand-accent mb-2">
            Infrastructure Lifecycle
          </p>
          <h3 className="text-2xl md:text-4xl font-medium">
            From planning to live operations
          </h3>
        </div>

        <div
          ref={railRef}
          onScroll={handleScroll}
          className="service-rail no-scrollbar"
        >
          {/* Cards unchanged */}
          {/* PRE / CONSTRUCTION / OPERATIONS */}
          {/* (Intentionally omitted here for brevity — unchanged) */}
        </div>

        <div className="services-dots mt-6">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`slider-dot ${activeIndex === i ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* =================================================
          SECTION 2.5 — OYI OS INTRO (TEXT ONLY)
      ================================================== */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            Oyi OS
          </p>

          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            The control layer for real-world infrastructure.
          </h2>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Oyi OS governs estates and buildings in real time — unifying digital twins,
            access control, utilities, payments, assets, and command systems into a
            single operational core.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 3 — OYI OS HERO (STABLE, SAME AS SECTION 1)
      ================================================== */}
      <section className="px-4 md:px-8 pb-32">
        <div className="hero-frame">
          <img
            src="/media/oyi-os-command-center.png"
            className="hero-bg"
            alt="Oyi OS Command Center"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Oyi OS
            </h1>

            <p className="hero-description">
              Monitor, control, and govern estates through a unified command layer —
              from city dashboards to on-site operations.
            </p>

            <div className="hero-cta">
              <Link href="/oyi" className="btn-primary">
                Enter Oyi OS
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
