"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#140A0A]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Ochiga
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/platform">Platform</Link>
          <Link href="/services">Services</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/innovation">Innovation</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/company">Company</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition"
          >
            Talk to Sales
          </Link>
          <Link
            href="/partners"
            className="px-4 py-2 rounded-lg bg-white text-[#140A0A] font-semibold hover:bg-gray-200 transition"
          >
            Become a Partner
          </Link>
        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-[#140A0A] border-t border-white/10 px-6 py-6 space-y-4 text-white">
          {[
            "Platform",
            "Services",
            "Solutions",
            "Projects",
            "Innovation",
            "Partners",
            "Company",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
