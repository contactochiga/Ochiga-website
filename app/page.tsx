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
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  };

  const scrollToCard = (index: number) => {
    if (!railRef.current) return;
    const cardWidth = railRef.current.firstElementChild?.clientWidth || 1;
    railRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  return (
    <main className="bg-black text-white">

      {/* ============================
          SECTION 1 — HERO
      ============================ */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">
          <img src="/media/infrastructure.png" className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Infrastructure<br />Operating System
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
        </div>
      </section>

      {/* ============================
          SECTION 1.5 — CORE STATEMENT
      ============================ */}
      <section className="py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            One system for real-world infrastructure.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Ochiga designs and operates the digital backbone that governs access,
            assets, utilities, payments, and live systems across physical environments.
            <br /><br />
            Systems that run estates, buildings, and cities.
          </p>
        </div>
      </section>

      {/* ============================
          SECTION 2 — INFRASTRUCTURE LIFECYCLE (FIXED)
      ============================ */}
      <section className="py-24">
        <div className="px-6 md:px-20 mb-12">
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
          <div className="service-card">
            <div className="service-bg" style={{ backgroundImage: "url(/media/pre-construction.png)" }} />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Pre-Construction Infrastructure</h4>
              <p className="service-text">
                Digital infrastructure designed before construction begins —
                systems, assets, and utilities modeled through a live digital twin.
              </p>
            </div>
          </div>

          <div className="service-card">
            <div className="service-bg" style={{ backgroundImage: "url(/media/construction.png)" }} />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Construction-Phase Deployment</h4>
              <p className="service-text">
                Hardware, fiber, and networks deployed directly into the build —
                synchronized in real time with the digital model.
              </p>
            </div>
          </div>

          <div className="service-card">
            <div className="service-bg" style={{ backgroundImage: "url(/media/operations.png)" }} />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Live Operations & Control</h4>
              <p className="service-text">
                Estates operated as live infrastructure with centralized monitoring,
                access control, and system intelligence.
              </p>
            </div>
          </div>
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

      {/* ============================
          SECTION 2.5 — OYI OS INTRO
      ============================ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            Oyi OS
          </p>
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            The control layer for real-world infrastructure.
          </h2>
          <p className="text-lg md:text-xl text-white/70">
            A unified operational core governing estates and cities in real time.
          </p>
        </div>
      </section>

      {/* ============================
          SECTION 3 — OYI OS HERO
      ============================ */}
      <section className="px-4 md:px-8 pb-32">
        <div className="hero-frame">
          <img src="/media/oyi-os-command-center.png" className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">Oyi OS</h1>
            <p className="hero-description">
              Monitor, control, and govern infrastructure through a unified command layer.
            </p>
            <div className="hero-cta">
              <Link href="/oyi" className="btn-primary">Enter Oyi OS</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 3.5 — DIGITAL TWIN INTRO
      ============================ */}
      <section className="py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            Digital Twin
          </p>
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            See infrastructure as a live system.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            A real-time digital representation of estates and buildings —
            synchronizing assets, utilities, access, and activity with reality.
          </p>
        </div>
      </section>

      {/* ============================
          SECTION 4 — DIGITAL TWIN HERO
      ============================ */}
      <section className="px-4 md:px-8 pb-40">
        <div className="hero-frame">
          <img src="/media/digital-twin-preview.png" className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Live<br />Digital Twin
            </h1>
            <p className="hero-description">
              Assets, utilities, access, and activity rendered as a living digital environment.
            </p>
            <div className="hero-cta">
              <Link href="/digital-twin-demo" className="btn-primary">
                View Digital Twin Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 4.5–5 — SOLUTIONS (COMPLETED)
      ============================ */}
      <section className="py-24">
        <div className="px-6 md:px-20 mb-12">
          <p className="uppercase text-xs tracking-widest brand-accent mb-2">
            Solutions
          </p>
          <h3 className="text-2xl md:text-4xl font-medium">
            Infrastructure we design and operate
          </h3>
        </div>

        <div className="service-rail no-scrollbar">
          {[
            {
              img: "/media/smartBuilding.png",
              title: "Smart Buildings",
              text: "Digitally managed buildings with live access, utilities, and asset intelligence.",
            },
            {
              img: "/media/estate-systems.png",
              title: "Estate Systems",
              text: "Centralized infrastructure operating residential and mixed-use estates.",
            },
            {
              img: "/media/command-center.png",
              title: "Command Centers",
              text: "Unified control rooms for monitoring, coordination, and response.",
            },
            {
              img: "/media/urban-systems.png",
              title: "Urban Systems",
              text: "Connected gated communities operated as integrated digital environments.",
            },
            {
              img: "/media/infrastructure-deployment.png",
              title: "Infrastructure Deployment",
              text: "End-to-end deployment of digital systems into physical environments.",
            },
          ].map((item, i) => (
            <div className="service-card" key={i}>
              <div className="service-bg" style={{ backgroundImage: `url(${item.img})` }} />
              <div className="solution-overlay" />
              <div className="service-content">
                <h4 className="service-title">{item.title}</h4>
                <p className="service-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="btn-primary">
            Request Infrastructure Deployment
          </Link>
        </div>
      </section>

    </main>
  );
}
