"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const lifecycleRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  const [lifecycleIndex, setLifecycleIndex] = useState(0);
  const [solutionsIndex, setSolutionsIndex] = useState(0);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    setIndex: (n: number) => void
  ) => {
    if (!ref.current) return;
    const scrollLeft = ref.current.scrollLeft;
    const cardWidth = ref.current.firstElementChild?.clientWidth || 1;
    setIndex(Math.round(scrollLeft / cardWidth));
  };

  const scrollToCard = (
    ref: React.RefObject<HTMLDivElement>,
    index: number
  ) => {
    if (!ref.current) return;
    const cardWidth = ref.current.firstElementChild?.clientWidth || 1;
    ref.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
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
              <Link href="/deployments" className="btn-secondary">
                Request Deployment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 1.5 — CORE STATEMENT
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core text-center">
        <div className="max-w-3xl mx-auto">
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
      <section className="py-28">
        <div className="px-6 md:px-20 mb-14">
          <p className="uppercase text-xs tracking-widest brand-accent mb-2">
            Infrastructure Lifecycle
          </p>
          <h3 className="text-2xl md:text-4xl font-medium">
            From planning to live operations
          </h3>
        </div>

        <div
          ref={lifecycleRef}
          onScroll={() => handleScroll(lifecycleRef, setLifecycleIndex)}
          className="service-rail no-scrollbar"
        >
          {[
            {
              img: "/media/pre-construction.png",
              title: "Pre-Construction Infrastructure",
              text: "Digital infrastructure designed before construction begins — systems, assets, and utilities modeled through a live digital twin.",
              cta: "/pre-construction",
              label: "Plan Infrastructure →",
            },
            {
              img: "/media/construction.png",
              title: "Construction-Phase Deployment",
              text: "Hardware, fiber, and networks deployed directly into the build — synchronized in real time with the digital model.",
              cta: "/deployments",
              label: "Deploy Infrastructure →",
            },
            {
              img: "/media/operations.png",
              title: "Live Operations & Control",
              text: "Estates operated as live infrastructure with centralized monitoring, access control, and system intelligence.",
              cta: "/operations",
              label: "Operate Infrastructure →",
            },
          ].map((item, i) => (
            <div className="service-card" key={i}>
              <div
                className="service-bg"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="service-overlay" />
              <div className="service-content">
                <h4 className="service-title">{item.title}</h4>
                <p className="service-text">{item.text}</p>
                <Link href={item.cta} className="service-cta">
                  {item.label}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="services-dots mt-6">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => scrollToCard(lifecycleRef, i)}
              className={`slider-dot ${lifecycleIndex === i ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* =================================================
          SECTION 6 — FINAL CONVERSION (WITH IMAGE)
      ================================================= */}
      <section className="px-4 md:px-8 pb-40">
        <div className="hero-frame">
          <img
            src="/media/infrastructure-operators.png"
            className="hero-bg"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />
          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Deploy infrastructure<br />that operates itself.
            </h1>
            <p className="hero-description">
              Work directly with our infrastructure team to design, deploy,
              and operate systems that last decades.
            </p>
            <div className="hero-cta">
              <Link href="/deployments" className="btn-primary">
                Request Deployment
              </Link>
              <Link href="/deployments" className="btn-secondary">
                Talk to Infrastructure Team
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
