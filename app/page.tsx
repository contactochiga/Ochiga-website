// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — HERO (TESLA / ENTERPRISE STYLE)
      ================================================= */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Background Image */}
        <img
          src="/media/infrastructure.png"
          alt="Smart estate infrastructure"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20 max-w-3xl">

          {/* Eyebrow */}
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/60">
            Ochiga
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Infrastructure <br className="hidden md:block" />
            Operating System
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base md:text-xl text-white/80 max-w-xl">
            Operate digital infrastructure across estates and buildings —
            access, assets, utilities, payments, and live digital twins.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/oyi"
              className="inline-flex items-center justify-center rounded-full bg-[#ff9f2d] px-8 py-3 text-sm font-medium text-black transition hover:bg-[#ffb04d]"
            >
              Explore Oyi
            </Link>

            <Link
              href="/deployments"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/10 transition"
            >
              Request Deployment
            </Link>
          </div>
        </div>

        {/* SLIDER DOTS */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          <span className="h-2 w-2 rounded-full bg-white"></span>
          <span className="h-2 w-2 rounded-full bg-white/40"></span>
          <span className="h-2 w-2 rounded-full bg-white/40"></span>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — SIMPLE CONTINUATION (STABLE)
      ================================================= */}
      <section className="px-6 md:px-20 py-24">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          One system for real-world infrastructure.
        </h2>

        <p className="max-w-3xl text-white/70 text-lg">
          Ochiga designs and operates the digital backbone that governs access,
          assets, utilities, payments, and live systems across physical
          environments.
        </p>
      </section>

    </main>
  );
}
