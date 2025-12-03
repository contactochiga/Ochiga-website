"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import ThreeLanding from "./components/ThreeLanding"; // ✅ Correct path

export default function Home() {
  const [slide, setSlide] = useState(0);

  const servicesRef = useRef<HTMLElement>(null);

  const slides = [
    {
      title: "Ochiga Smart Estate Dashboard",
      subtitle: "Launching January 15th – Be among the first.",
      cta: "Join Waitlist",
    },
    {
      title: "The Future of Smart Communities",
      subtitle:
        "High-tech infrastructure, automation, and digital management built into every estate.",
      cta: "See Demo",
    },
  ];

  const nextSlide = () => setSlide((slide + 1) % slides.length);
  const prevSlide = () =>
    setSlide((slide - 1 + slides.length) % slides.length);

  const handleCTAClick = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-white text-[#1A1A1A]">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden bg-[#140A0A] text-white flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/hero-architecture.jpg"
            alt="Architecture"
            fill
            className="object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {slides[slide].title}
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-6">
            {slides[slide].subtitle}
          </p>

          <button
            onClick={handleCTAClick}
            className="px-6 py-3 bg-white text-[#140A0A] rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            {slides[slide].cta}
          </button>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-3 h-3 bg-white rounded-full opacity-50 hover:opacity-100"
            ></button>
            <button
              onClick={nextSlide}
              className="w-3 h-3 bg-white rounded-full opacity-50 hover:opacity-100"
            ></button>
          </div>
        </div>
      </section>

      {/* 3D / THREEJS LANDING SECTION */}
      <section className="w-full h-[80vh] md:h-[90vh] bg-[#140A0A] flex items-center justify-center">
        <ThreeLanding />
      </section>

      {/* SERVICES SECTION */}
      <section ref={servicesRef} className="py-20 px-6 bg-[#f8f8f8]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Core Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-2xl p-8 hover:-translate-y-1 transition cursor-pointer border">
            <h3 className="text-2xl font-semibold mb-4">
              Pre-Construction Consultation
            </h3>
            <p className="text-gray-600 mb-6">
              From estate planning to smart backbone infrastructure. We guide
              developers with technical clarity and automation-first design.
            </p>
            <button className="text-[#7A0026] font-semibold hover:underline">
              Start Consultation →
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 hover:-translate-y-1 transition cursor-pointer border">
            <h3 className="text-2xl font-semibold mb-4">
              On-Construction Smart Infrastructure
            </h3>
            <p className="text-gray-600 mb-6">
              FTTH, estate automation, smart building systems & IoT deployment
              — fully integrated into your development.
            </p>
            <button className="text-[#7A0026] font-semibold hover:underline">
              Begin Project →
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 hover:-translate-y-1 transition cursor-pointer border">
            <h3 className="text-2xl font-semibold mb-4">Oyi Cloud OS</h3>
            <p className="text-gray-600 mb-6">
              The brain of your estate — digital management, automation,
              facility workflows, billing, and resident engagement.
            </p>
            <button className="text-[#7A0026] font-semibold hover:underline">
              Explore Oyi →
            </button>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Brands & Technologies We Work With
        </h2>

        <div className="flex flex-wrap justify-center gap-12 opacity-80">
          <Image src="/partner1.png" alt="Partner" width={120} height={40} />
          <Image src="/partner2.png" alt="Partner" width={120} height={40} />
          <Image src="/partner3.png" alt="Partner" width={120} height={40} />
          <Image src="/partner4.png" alt="Partner" width={120} height={40} />
        </div>
      </section>

      {/* WHY OCHIGA */}
      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why Choose Ochiga?</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              We are Africa’s new standard for real estate technology — merging
              architecture, infrastructure, and cloud intelligence into one
              unified ecosystem.
              <br />
              <br />
              From planning to building to digital operations, Ochiga transforms
              estates into fully connected, automated smart environments.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 p-6 rounded-xl">
              <h4 className="font-semibold text-xl">End-to-End Delivery</h4>
              <p className="text-gray-300">
                Consultation → Construction → Ongoing Smart Management.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
              <h4 className="font-semibold text-xl">Oyi: The Brain</h4>
              <p className="text-gray-300">
                A cloud OS powering automation, billing, access, and workflows.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
              <h4 className="font-semibold text-xl">Future-Proof Systems</h4>
              <p className="text-gray-300">
                Built with the latest in IoT, fiber, and estate automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-gray-500">
        © {new Date().getFullYear()} Ochiga — Smart Estate & Building Technology.
      </footer>
    </main>
  );
}
