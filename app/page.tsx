"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ThreeLanding from "./components/ThreeLanding";
import Header from "./components/Header";
import { fadeInUp } from "../lib/animate";

export default function Home() {
  const [slide, setSlide] = useState(0);

  // Animation refs
  const heroRef = useRef<HTMLElement>(null);
  const lifecycleRef = useRef<HTMLElement>(null);
  const trainingRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);

  // Scroll target
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) fadeInUp(heroRef.current);
    if (lifecycleRef.current) fadeInUp(lifecycleRef.current);
    if (trainingRef.current) fadeInUp(trainingRef.current);
    if (whyRef.current) fadeInUp(whyRef.current);
  }, []);

  const slides = [
    {
      title: "The Operating System for Smart Infrastructure",
      subtitle:
        "Digital-twin powered platforms for estates, buildings, and connected communities.",
      cta: "Explore Platform",
    },
    {
      title: "Design. Deploy. Operate Smart Estates at Scale.",
      subtitle:
        "From pre-construction planning to long-term operations — all in one unified system.",
      cta: "Talk to Sales",
    },
  ];

  const nextSlide = () => setSlide((slide + 1) % slides.length);
  const prevSlide = () =>
    setSlide((slide - 1 + slides.length) % slides.length);

  const handleCTAClick = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="pt-16 w-full min-h-screen overflow-x-hidden bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-[#140A0A] text-white flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Image
            src="/hero-architecture.jpg"
            alt="Smart Infrastructure"
            fill
            className="object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {slides[slide].title}
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-8">
            {slides[slide].subtitle}
          </p>

          <button
            onClick={handleCTAClick}
            className="px-8 py-4 bg-white text-[#140A0A] rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            {slides[slide].cta}
          </button>

          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prevSlide}
              className="w-3 h-3 bg-white rounded-full opacity-50 hover:opacity-100"
            />
            <button
              onClick={nextSlide}
              className="w-3 h-3 bg-white rounded-full opacity-50 hover:opacity-100"
            />
          </div>
        </div>
      </section>

      {/* 3D DIGITAL TWIN SECTION */}
      <section className="w-full h-[80vh] md:h-[90vh] bg-[#140A0A] flex items-center justify-center">
        <ThreeLanding />
      </section>

      {/* INFRASTRUCTURE LIFECYCLE */}
      <section
        ref={(el) => {
          servicesRef.current = el;
          lifecycleRef.current = el;
        }}
        className="py-24 px-6 bg-[#f8f8f8]"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Our Infrastructure Lifecycle
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-14">
          Ochiga delivers smart infrastructure across the full lifecycle — from
          design to deployment, operations, and capacity building.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-2xl p-8 border">
            <h3 className="text-2xl font-semibold mb-4">
              Pre-Construction & Design
            </h3>
            <p className="text-gray-600 mb-6">
              Smart infrastructure planning, digital-twin modeling, network
              architecture, and automation-first design for developers.
            </p>
            <span className="text-[#7A0026] font-semibold">
              Infrastructure Planning →
            </span>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 border">
            <h3 className="text-2xl font-semibold mb-4">
              Deployment & FTTH Infrastructure
            </h3>
            <p className="text-gray-600 mb-6">
              Fiber-to-the-Home (FTTH), IoT systems, estate automation, and smart
              building deployments — fully commissioned and integrated.
            </p>
            <span className="text-[#7A0026] font-semibold">
              Deploy Infrastructure →
            </span>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 border">
            <h3 className="text-2xl font-semibold mb-4">
              Cloud OS, Aftercare & Operations
            </h3>
            <p className="text-gray-600 mb-6">
              Oyi Cloud OS powers billing, access control, maintenance workflows,
              analytics, and AI-driven estate operations.
            </p>
            <span className="text-[#7A0026] font-semibold">
              Explore Oyi OS →
            </span>
          </div>
        </div>
      </section>

      {/* TRAINING & CERTIFICATION */}
      <section ref={trainingRef} className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Training & Certification
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Ochiga trains and certifies estate managers, facility teams,
            integrators, and developers to operate smart infrastructure
            efficiently and sustainably.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border rounded-2xl">
              <h4 className="font-semibold text-xl mb-2">
                Estate & Facility Managers
              </h4>
              <p className="text-gray-600">
                Digital operations, billing systems, maintenance workflows.
              </p>
            </div>

            <div className="p-8 border rounded-2xl">
              <h4 className="font-semibold text-xl mb-2">
                Technicians & Integrators
              </h4>
              <p className="text-gray-600">
                Infrastructure deployment, device setup, system maintenance.
              </p>
            </div>

            <div className="p-8 border rounded-2xl">
              <h4 className="font-semibold text-xl mb-2">
                Developers & Partners
              </h4>
              <p className="text-gray-600">
                Platform integration, APIs, and Ochiga ecosystem standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY OCHIGA */}
      <section
        ref={whyRef}
        className="py-24 px-6 bg-[#140A0A] text-white"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why Ochiga</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Ochiga is infrastructure-first — built for scale, reliability, and
              long-term operations.
              <br />
              <br />
              We unify architecture, connectivity, automation, and cloud
              intelligence into one operating system for smart estates.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 p-6 rounded-xl">
              <h4 className="font-semibold text-xl">
                End-to-End Infrastructure Delivery
              </h4>
              <p className="text-gray-300">
                Plan → Deploy → Operate → Train.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
              <h4 className="font-semibold text-xl">
                Digital-Twin Native Platform
              </h4>
              <p className="text-gray-300">
                Real-world infrastructure mirrored digitally for insight and
                control.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
              <h4 className="font-semibold text-xl">
                Enterprise-Grade Cloud OS
              </h4>
              <p className="text-gray-300">
                Secure, scalable systems designed for estates and cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-gray-500">
        © {new Date().getFullYear()} Ochiga — Smart Infrastructure Systems.
      </footer>
    </main>
  );
}
