// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-black text-white">

      {/* ===============================
          HERO — BACKGROUND IMAGE + COPY
      =============================== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-32 text-center overflow-hidden">

        {/* Background image */}
        <img
          src="/media/infrastructure.png"
          alt="Digital infrastructure"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Infrastructure,
            <br className="hidden md:block" />
            Operated Digitally.
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Ochiga operates digital infrastructure across estates and buildings —
            governing access, assets, utilities, payments, and live systems from
            one unified platform.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              href="/oyi"
              className="px-7 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Explore Oyi
            </Link>

            <Link
              href="/deployments"
              className="px-7 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
            >
              Request Deployment
            </Link>
          </div>
        </div>
      </section>

      {/* ===============================
          SECTION — WHAT WE DO
      =============================== */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-10">
          One system for real-world infrastructure.
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-white/70">
          Ochiga replaces fragmented tools with a single operating layer for
          physical environments — from smart buildings and estates to large-scale
          infrastructure projects.
        </p>
      </section>

      {/* ===============================
          SECTION — CORE CAPABILITIES
      =============================== */}
      <section className="px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-2">Smart Buildings</h3>
            <p className="text-white/70">
              Operate access control, shared systems, and building services from
              one infrastructure layer.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-2">Estate Operations</h3>
            <p className="text-white/70">
              Utilities, billing, residents, visitors, payments, and operational
              governance — unified.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-2">Digital Twins</h3>
            <p className="text-white/70">
              Live representations of physical assets and systems used for real
              operational control.
            </p>
          </div>

        </div>
      </section>

      {/* ===============================
          SECTION — WHO IT’S FOR
      =============================== */}
      <section className="px-6 py-24 text-center bg-white/5 backdrop-blur-xl">
        <h2 className="text-4xl font-bold mb-6">
          Built for operators, not consumers.
        </h2>

        <p className="max-w-3xl mx-auto text-white/70">
          Ochiga is designed for estate owners, facility managers, developers,
          utilities, and government agencies operating real infrastructure at
          scale.
        </p>
      </section>

      {/* ===============================
          FOOTER CTA
      =============================== */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to deploy Ochiga?
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <Link
            href="/deployments"
            className="px-7 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Request Deployment
          </Link>

          <Link
            href="/papers"
            className="px-7 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
          >
            Read Infrastructure Papers
          </Link>
        </div>
      </section>

      <footer className="text-center py-10 opacity-50 text-sm">
        OCHIGA © 2026
      </footer>
    </div>
  );
}
