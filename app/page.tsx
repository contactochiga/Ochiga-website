"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ThreeLanding from "./components/ThreeLanding";
import Header from "./components/Header";
import { fadeInUp } from "../lib/animate";

export default function HomeClient({
  featuredPosts = [],
}: {
  featuredPosts: any[];
}) {
  const [slide, setSlide] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const lifecycleRef = useRef<HTMLElement>(null);
  const trainingRef = useRef<HTMLElement>(null);

  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) fadeInUp(heroRef.current);
    if (lifecycleRef.current) fadeInUp(lifecycleRef.current);
    if (trainingRef.current) fadeInUp(trainingRef.current);
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
          src="/8EF3039C-5E31-4A61-9296-745B359E6916.png"
          alt="Ochiga smart infrastructure digital twin estate"
          fill
          priority
          unoptimized
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

      {/* BLOG SNIPPETS */}
      <section className="py-24 px-6 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">
            Insights & Publications
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white border rounded-2xl overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />

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

      <footer className="py-12 text-center text-gray-500">
        © {new Date().getFullYear()} Ochiga — Smart Infrastructure Systems.
      </footer>
    </main>
  );
}
