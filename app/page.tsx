// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — HERO (LOCKED)
      ================================================== */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">
          <img src="/media/infrastructure.png" className="hero-bg" />
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
              <Link href="/oyi" className="btn-primary">Explore Oyi</Link>
              <Link href="/deployments" className="btn-secondary">Request Deployment</Link>
            </div>
          </div>

          <div className="hero-dots">
            <div className="slider-dot active" />
            <div className="slider-dot" />
            <div className="slider-dot" />
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 1.5 — CORE STATEMENT
      ================================================== */}
      <section className="relative py-32 px-6 bg-grid bg-radial-glow">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            One system for real-world infrastructure.
          </h2>

          <p className="text-lg md:text-xl text-white/70">
            Ochiga designs and operates the digital backbone that governs access,
            assets, utilities, payments, and live systems across physical environments.
            <br /><br />
            We deliver operator-focused infrastructure — not apps, not dashboards,
            but systems that run estates, buildings, and cities.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — SERVICES (HORIZONTAL)
      ================================================== */}
      <section className="py-24">

        <div className="px-6 md:px-20 mb-12">
          <p className="uppercase text-xs tracking-widest text-white/50 mb-2">
            Infrastructure Lifecycle
          </p>
          <h3 className="text-2xl md:text-4xl font-medium">
            From planning to live operations
          </h3>
        </div>

        <div className="service-rail no-scrollbar px-6 md:px-20">

          {/* Pre-Construction */}
          <div className="service-card">
            <div
              className="service-bg"
              style={{ backgroundImage: "url(/media/pre-construction.png)" }}
            />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Pre-Construction Infrastructure</h4>
              <p className="service-text">
                Digital infrastructure is designed before construction begins —
                assets, systems, and utilities modelled through a live digital twin.
              </p>
              <Link href="/pre-construction" className="service-cta">
                Plan Infrastructure →
              </Link>
            </div>
          </div>

          {/* Construction */}
          <div className="service-card">
            <div
              className="service-bg"
              style={{ backgroundImage: "url(/media/construction.png)" }}
            />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Construction-Phase Deployment</h4>
              <p className="service-text">
                Hardware, networks, fiber, and systems are deployed directly into
                the build — mapped in real time to the digital twin.
              </p>
              <Link href="/deployment" className="service-cta">
                Deploy Infrastructure →
              </Link>
            </div>
          </div>

          {/* Operations */}
          <div className="service-card">
            <div
              className="service-bg"
              style={{ backgroundImage: "url(/media/operations.png)" }}
            />
            <div className="service-overlay" />
            <div className="service-content">
              <h4 className="service-title">Live Operations & Control</h4>
              <p className="service-text">
                Ochiga operates estates as live infrastructure — managing access,
                utilities, assets, payments, and command systems.
              </p>
              <Link href="/operations" className="service-cta">
                Operate Infrastructure →
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
