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

      {/* =================================================
          SECTION 1 — HERO
      ================================================= */}
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

      {/* =================================================
          SECTION 1.5 — CORE STATEMENT
      ================================================= */}
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

      {/* =================================================
          SECTION 2 — INFRASTRUCTURE LIFECYCLE
      ================================================= */}
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
          {/* Pre-Construction */}
          <div className="service-card">
            <div className="service-bg" style={{ backgroundImage: "url(/media/pre-construction.png)" }} />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Pre-Construction Infrastructure</h4>
              <p className="service-text">
                Digital infrastructure designed before construction begins —
                systems, assets, and utilities modeled through a live digital twin.
              </p>
              <Link href="/pre-construction" className="service-cta">
                Plan Infrastructure →
              </Link>
            </div>
          </div>

          {/* Construction */}
          <div className="service-card">
            <div className="service-bg" style={{ backgroundImage: "url(/media/construction.png)" }} />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Construction-Phase Deployment</h4>
              <p className="service-text">
                Hardware, fiber, and networks deployed directly into the build —
                synchronized in real time with the digital model.
              </p>
              <Link href="/deployment" className="service-cta">
                Deploy Infrastructure →
              </Link>
            </div>
          </div>

          {/* Operations */}
          <div className="service-card">
            <div className="service-bg" style={{ backgroundImage: "url(/media/operations.png)" }} />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Live Operations & Control</h4>
              <p className="service-text">
                Estates operated as live infrastructure with centralized monitoring,
                access control, and system intelligence.
              </p>
              <Link href="/operations" className="service-cta">
                Operate Infrastructure →
              </Link>
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

      {/* =================================================
          SECTION 2.5 — OYI OS INTRO
      ================================================= */}
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

      {/* =================================================
          SECTION 3 — OYI OS HERO
      ================================================= */}
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

      {/* =================================================
          SECTION 3.5 — DIGITAL TWIN INTRO
      ================================================= */}
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

      {/* =================================================
          SECTION 4 — DIGITAL TWIN HERO
      ================================================= */}
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

      {/* =================================================
          SECTION 4.5 — SOLUTIONS INTRO
      ================================================= */}
      <section className="py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            Solutions
          </p>
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Infrastructure systems, delivered end-to-end.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Ochiga designs, deploys, and operates integrated infrastructure systems
            across buildings, estates, and urban environments.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 5 — SOLUTIONS
      ================================================= */}
      <section className="py-24">
        <div className="service-rail no-scrollbar">
          {[
            {
              img: "/media/smartBuilding.png",
              title: "Smart Buildings",
              text: "Digitally managed buildings with live access, utilities, and asset intelligence.",
              cta: "/solutions/smart-buildings",
            },
            {
              img: "/media/estate-systems.png",
              title: "Estate Systems",
              text: "Centralized infrastructure operating residential and mixed-use estates.",
              cta: "/solutions/estate-systems",
            },
            {
              img: "/media/command-center.png",
              title: "Command Centers",
              text: "Unified control rooms for monitoring, coordination, and response.",
              cta: "/solutions/command-centers",
            },
            {
              img: "/media/urban-systems.png",
              title: "Urban Systems",
              text: "Connected gated communities operated as integrated digital environments.",
              cta: "/solutions/urban-systems",
            },
            {
              img: "/media/infrastructure-deployment.png",
              title: "Infrastructure Deployment",
              text: "End-to-end deployment of digital systems into physical environments.",
              cta: "/solutions/deployment",
            },
          ].map((item, i) => (
            <div className="service-card" key={i}>
              <div className="service-bg" style={{ backgroundImage: `url(${item.img})` }} />
              <div className="solution-overlay" />
              <div className="service-content">
                <h4 className="service-title">{item.title}</h4>
                <p className="service-text">{item.text}</p>
                <Link href={item.cta} className="service-cta">
                  View Solution →
                </Link>
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

      {/* =================================================
          SECTION 5.5 — ENTERPRISE READINESS
      ================================================= */}
      <section className="py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            Built for Operators
          </p>
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Infrastructure designed for scale, governance, and long-term operation.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Ochiga is built for developers, estate operators, facility managers,
            and institutions responsible for real-world infrastructure.
            <br /><br />
            Our systems are deployed as long-term operational infrastructure —
            designed to integrate with physical assets, scale across environments,
            and remain governable over decades.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 6 — FINAL CONVERSION
      ================================================= */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Deploy infrastructure that operates itself.
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-10">
            Whether you’re planning a new development, upgrading an existing estate,
            or exploring live digital twins — our team works directly with operators
            to design, deploy, and run infrastructure systems.
          </p>

          <div className="hero-cta justify-center">
            <Link href="/contact" className="btn-primary">
              Request Deployment
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to Infrastructure Team
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
