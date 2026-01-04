// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — ENTERPRISE HERO (LOCKED)
      ================================================== */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
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

          {/* Hero Content */}
          <div className="hero-content animate-fade-up">

            {/* REMOVED: Ochiga eyebrow */}

            <h1 className="hero-title">
              Infrastructure
              <br />
              Operating System
            </h1>

            <p className="hero-subtitle">
              Operate digital infrastructure across estates and buildings —
              access, assets, utilities, payments, and live digital twins.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <Link href="/oyi" className="btn-primary">
                Explore Oyi
              </Link>

              <Link href="/deployments" className="btn-secondary">
                Request Deployment
              </Link>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="hero-dots">
            <span className="slider-dot active" />
            <span className="slider-dot" />
            <span className="slider-dot" />
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — CORE STATEMENT
      ================================================== */}
      <section className="px-6 md:px-20 py-28 md:py-36">
        <h2 className="text-3xl md:text-6xl font-medium max-w-5xl mb-10">
          One system for real-world infrastructure.
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-3xl">
          Ochiga designs and operates the digital backbone that governs access,
          assets, utilities, payments, and live systems across physical
          environments.
          <br />
          <br />
          We deliver integrated, operator-focused infrastructure — not apps,
          not dashboards, but systems that run estates, buildings, and cities.
        </p>
      </section>

      {/* =================================================
          SECTION 3 — PRODUCT: OYI
      ================================================== */}
      <section className="px-6 md:px-20 py-28 md:py-36 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-6">
          Oyi
        </h2>

        <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-3xl">
          Smart Building & Estate Infrastructure Operating System
        </p>

        <ul className="space-y-4 text-white/70 text-lg max-w-3xl mb-12">
          <li>• Identity-driven access control and governance</li>
          <li>• Building systems and shared infrastructure operations</li>
          <li>• Utilities, metering, billing, and payments</li>
          <li>• Estate-wide operations, events, and audit trails</li>
        </ul>

        <Link href="/oyi" className="btn-secondary inline-block">
          View Oyi
        </Link>
      </section>

      {/* =================================================
          SECTION 4 — DIGITAL TWIN
      ================================================== */}
      <section className="px-6 md:px-20 py-28 md:py-36 border-t border-white/10">
        <p className="uppercase text-xs tracking-widest text-white/50 mb-4">
          Digital Twin Infrastructure
        </p>

        <h2 className="text-3xl md:text-6xl font-medium mb-8 max-w-4xl">
          Live digital twins for real-world infrastructure.
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-3xl mb-12">
          Ochiga builds digital twins as operational infrastructure —
          not visual simulations.
        </p>

        <Link href="/digital-twin" className="btn-secondary">
          View Read-Only Demo
        </Link>
      </section>

      {/* =================================================
          SECTION 5 — DEPLOYMENT CTA
      ================================================== */}
      <section className="px-6 md:px-20 py-32 md:py-40 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-6">
          Deploy Ochiga
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-3xl mb-12">
          Ochiga is deployed as core infrastructure — tailored to the physical,
          operational, and regulatory realities of its environment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/deployments" className="btn-primary">
            Request Deployment
          </Link>

          <Link href="/papers" className="btn-secondary">
            Read Infrastructure Papers
          </Link>
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
