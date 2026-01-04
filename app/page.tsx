// app/page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

const images = [
  "/media/infrastructure.png",
  // add more images if you want a carousel:
  // "/media/hero-2.jpg",
  // "/media/hero-3.jpg",
];

export default function HomePage() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setIdx((s) => (s + 1) % images.length);
    }, 4500);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing]);

  return (
    <main className="bg-black text-white antialiased">
      {/* ===============================
         HERO (framed canvas — Tesla style)
         - framed card with rounded corners & shadow
         - background is set via inline style to permit dynamic images
      =============================== */}
      <section className="w-full px-6 md:px-12 py-8">
        <div
          className="mx-auto max-w-6xl rounded-2xl overflow-hidden border border-white/6 shadow-2xl relative"
          style={{ minHeight: "64vh" }}
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
        >
          {/* Background */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundImage: `url(${images[idx]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />

          {/* Cinematic overlay for better contrast */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Content container */}
          <div className="relative z-10 flex min-h-[64vh] flex-col md:flex-row items-end md:items-center">
            {/* Left content (desktop) / centered content (mobile) */}
            <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-3">
                Ochiga
              </p>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Infrastructure
                <br />
                Operating System
              </h1>

              <p className="text-sm md:text-lg text-white/80 mb-6 max-w-lg">
                Operate digital infrastructure across estates and buildings —
                access, assets, utilities, payments, and live digital twins.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/oyi"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#ff8b2d] text-black font-medium shadow hover:brightness-95 transition"
                >
                  Explore Oyi
                </Link>

                <Link
                  href="/deployments"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
                >
                  Request Deployment
                </Link>
              </div>
            </div>

            {/* Right side filler — leave space for design balance on large screens */}
            <div className="hidden md:block md:flex-1" />
          </div>

          {/* Slider dots (bottom center) */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 w-8 rounded-full transition-all duration-200 ${
                  i === idx ? "bg-white scale-110" : "bg-white/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* optional left/right arrows (desktop-only) */}
          <div className="hidden md:flex absolute inset-y-0 left-4 items-center z-20">
            <button
              onClick={() => setIdx((s) => (s - 1 + images.length) % images.length)}
              className="p-2 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 transition"
              aria-label="Previous slide"
            >
              ‹
            </button>
          </div>
          <div className="hidden md:flex absolute inset-y-0 right-4 items-center z-20">
            <button
              onClick={() => setIdx((s) => (s + 1) % images.length)}
              className="p-2 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 transition"
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* ===============================
         SECTION 2 — WHAT OCHIGA DOES
      =============================== */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            One system for real-world infrastructure.
          </h2>

          <p className="text-lg text-white/80 max-w-3xl">
            Ochiga designs and operates the digital backbone that governs access,
            assets, utilities, payments, and live systems across physical
            environments. We deliver integrated, operator-focused systems that
            scale from single buildings to estates and portfolios.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto text-sm text-white/60">
          © OCHIGA — Built for operators. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
