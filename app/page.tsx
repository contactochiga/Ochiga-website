"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ThreeLanding from "./components/ThreeLanding";
import Header from "./components/Header";
import { fadeInUp } from "../lib/animate";

export default function Home({
  featuredPosts = [],
}: {
  featuredPosts: any[];
}) {
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

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative w-full h-screen bg-[#140A0A] text-white flex items-center justify-center"
      >
        <Image
          src="/hero-architecture.jpg"
          alt="Smart Infrastructure"
          fill
          className="object-cover opacity-40"
        />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {slides[slide].title}
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-8">
            {slides[slide].subtitle}
          </p>

          <button
            onClick={handleCTAClick}
            className="px-8 py-4 bg-white text-[#140A0A] rounded-lg font-semibold"
          >
            {slides[slide].cta}
          </button>
        </div>
      </section>

      {/* THREE JS */}
      <section className="h-[90vh] bg-[#140A0A] flex items-center justify-center">
        <ThreeLanding />
      </section>

      {/* INFRASTRUCTURE */}
      <section
        ref={(el) => {
          servicesRef.current = el;
          lifecycleRef.current = el;
        }}
        className="py-24 px-6 bg-[#f8f8f8]"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Infrastructure Lifecycle
        </h2>
      </section>

      {/* TRAINING */}
      <section ref={trainingRef} className="py-24 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          Training & Certification
        </h2>
      </section>

      {/* BLOG SNIPPETS */}
      <section className="py-24 px-6 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                Insights & Publications
              </h2>
              <p className="text-gray-600">
                Perspectives on smart infrastructure and digital twins.
              </p>
            </div>

            <Link
              href="/blog"
              className="text-[#7A0026] font-semibold hidden md:block"
            >
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white border rounded-2xl overflow-hidden"
              >
                <div className="h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-[#7A0026] font-semibold"
                  >
                    Read →
                  </Link>
                </div>
              </article>
            ))}
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
