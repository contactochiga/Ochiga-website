// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
      "Operational digital twins representing real buildings, assets, and systems in real time.",
    image: "/media/infrastructure.png",
  },
];

export default function HomePage() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 60) {
      setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else if (diff < -60) {
      setActive((prev) => (prev + 1) % slides.length);
    }
    touchStartX.current = null;
  };

  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — ENTERPRISE HERO (LOCKED)
      ================================================== */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div
          className="hero-frame"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Background */}
          <img
            src={slides[active].image}
            alt="Infrastructure"
            className="hero-bg"
          />

          {/* Overlays */}
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          {/* Content */}
          <div className="hero-content animate-fade-up">
            <h1 className="text-4xl md:text-[52px] font-semibold leading-tight mb-4">
              {slides[active].title}
            </h1>

            <p className="text-[15px] md:text-[17px] text-white/75 max-w-xl mb-6">
              {slides[active].description}
            </p>

            {/* CTA GROUP — MICRO-TUNED */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-2">
              <Link
                href="/oyi"
                className="btn-primary text-center text-[13px] px-4 py-[9px]"
              >
                Explore Oyi
              </Link>

              <Link
                href="/deployments"
                className="btn-secondary text-center text-[13px] px-4 py-[9px]"
              >
                Request Deployment
              </Link>
            </div>
          </div>

          {/* Slider dots — manual control */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
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
        </p>
      </section>

      <footer className="py-12 text-center text-white/40 text-sm">
        OCHIGA © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
