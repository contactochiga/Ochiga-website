// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — HERO (TESLA STYLE FRAME)
      ================================================= */}
      <section className="py-20 px-4">
        <div className="hero-frame">

          {/* Background image */}
          <img
            src="/media/infrastructure.png"
            alt="Smart estate infrastructure"
            className="hero-bg"
          />

          {/* Overlays */}
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          {/* Content */}
          <div className="hero-content animate-fade-up">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4">
              Ochiga
            </p>

            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
              Infrastructure
              <br />
              Operating System
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10">
              Operate digital infrastructure across estates and buildings —
              access, assets, utilities, payments, and live digital twins.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/oyi" className="btn-primary text-center">
                Explore Oyi
              </Link>

              <Link href="/deployments" className="btn-secondary text-center">
                Request Deployment
              </Link>
            </div>
          </div>

          {/* Slider dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            <div className="slider-dot active" />
            <div className="slider-dot" />
            <div className="slider-dot" />
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — WHAT OCHIGA DOES
      ================================================= */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-10 max-w-4xl">
          One system for real-world infrastructure.
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70">
          Ochiga designs and operates the digital backbone that governs
          access, assets, utilities, payments, and live systems across
          physical environments.
        </p>
      </section>

    </main>
  );
}
