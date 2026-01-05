// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* =================================================
          SECTION 1 — ENTERPRISE HERO (LOCKED)
      ================================================== */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">

          <img
            src="/media/infrastructure.png"
            alt="Smart estate infrastructure"
            className="hero-bg"
          />

          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Infrastructure
              <br />
              Operating System
            </h1>

            <p className="hero-description">
              Operate digital infrastructure across estates and buildings —
              access, assets, utilities, payments, and live digital twins.
            </p>

            <div className="hero-cta">
              <Link href="/oyi" className="btn-primary">
                Explore Oyi
              </Link>

              <Link href="/deployments" className="btn-secondary">
                Request Deployment
              </Link>
            </div>
          </div>

          {/* Slider dots */}
          <div className="hero-dots">
            <span className="slider-dot active" />
            <span className="slider-dot" />
            <span className="slider-dot" />
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 1.5 — CORE STATEMENT (ACTIVE DARK)
      ================================================== */}
      <section className="relative px-6 md:px-20 py-32 md:py-40">

        {/* Subtle active background */}
        <div className="absolute inset-0 bg-grid opacity-[0.35]" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-6xl font-medium max-w-5xl mb-10">
            One system for real-world infrastructure.
          </h2>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
            Ochiga designs and operates the digital backbone that governs access,
            assets, utilities, payments, and live systems across physical
            environments.
            <br /><br />
            We deliver integrated, operator-focused infrastructure — not apps,
            not dashboards, but systems that run estates, buildings, and cities.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — INFRASTRUCTURE SERVICES (CANVAS)
      ================================================== */}
      <section className="relative py-28">

        <div className="flex gap-6 overflow-x-auto px-6 md:px-20 scroll-smooth no-scrollbar">

          {/* PRE-CONSTRUCTION */}
          <div className="service-card">
            <div
              className="service-bg"
              style={{ backgroundImage: "url(/media/pre-construction.png)" }}
            />

            <div className="service-overlay" />

            <div className="service-content">
              <h3 className="service-title">
                Pre-Construction Infrastructure
              </h3>

              <p className="service-text">
                We design the digital and operational infrastructure of estates
                before construction begins. Using a live digital twin, Ochiga
                models systems, assets, and utilities at scale — ensuring every
                build decision aligns with long-term operations.
              </p>

              <Link href="/pre-construction" className="service-cta">
                Plan Infrastructure →
              </Link>
            </div>
          </div>

          {/* CONSTRUCTION PHASE */}
          <div className="service-card">
            <div
              className="service-bg"
              style={{ backgroundImage: "url(/media/construction.png)" }}
            />

            <div className="service-overlay" />

            <div className="service-content">
              <h3 className="service-title">
                Construction-Phase Deployment
              </h3>

              <p className="service-text">
                During construction, Ochiga deploys and integrates hardware,
                networks, fiber, sensors, and systems directly into the build —
                all mapped in real time to the digital twin.
              </p>

              <Link href="/deployment" className="service-cta">
                Deploy Infrastructure →
              </Link>
            </div>
          </div>

          {/* POST-CONSTRUCTION */}
          <div className="service-card">
            <div
              className="service-bg"
              style={{ backgroundImage: "url(/media/operations.png)" }}
            />

            <div className="service-overlay" />

            <div className="service-content">
              <h3 className="service-title">
                Infrastructure Operations
              </h3>

              <p className="service-text">
                After construction, Ochiga operates the estate’s infrastructure
                through centralized command and control — managing assets,
                access, utilities, events, and live systems at scale.
              </p>

              <Link href="/operations" className="service-cta">
                Operate Infrastructure →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =================================================
          FOOTER
      ================================================== */}
      <footer className="py-12 text-center text-white/40 text-sm">
        OCHIGA © {new Date().getFullYear()}
      </footer>

    </main>
  );
}
