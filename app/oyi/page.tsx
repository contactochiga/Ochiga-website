"use client";

import Link from "next/link";

export default function OyiPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — OYI HERO
      ================================================= */}
      <section className="px-4 md:px-8 pt-28 pb-36">
        <div className="hero-frame">
          <img
            src="/media/oyi-os-command-center.png"
            className="hero-bg"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Oyi OS
            </h1>
            <p className="hero-description">
              The operating system for real-world infrastructure —
              governing access, utilities, assets, and operations
              across estates and built environments.
            </p>

            <div className="hero-cta">
              <Link href="/deployments" className="btn-primary">
                Request Deployment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 1.5 — WHAT OYI IS
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core text-center">
        <div className="max-w-3xl mx-auto">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            What is Oyi
          </p>
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Infrastructure-first. Estate-native.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Oyi is not a dashboard or a collection of tools.
            <br /><br />
            It is an infrastructure operating system — designed to
            govern how physical environments function, scale, and
            remain operable over time.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — WHAT OYI CONTROLS
      ================================================= */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-medium mb-10">
            What Oyi governs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            {[
              {
                title: "Access & Identity",
                text: "Gates, doors, permissions, and resident access governed centrally."
              },
              {
                title: "Utilities & Consumption",
                text: "Power, water, and shared resources monitored and managed as infrastructure."
              },
              {
                title: "Assets & Equipment",
                text: "Physical assets tracked, maintained, and linked to their digital state."
              },
              {
                title: "Payments & Operations",
                text: "Infrastructure-linked payments, service charges, and operational workflows."
              },
            ].map((item, i) => (
              <div key={i}>
                <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                <p className="text-white/65 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 2.5 — DIGITAL TWIN FOUNDATION
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core text-center">
        <div className="max-w-3xl mx-auto">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            Digital Twin Driven
          </p>
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Infrastructure seen as a live system.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Every estate or building operated by Oyi exists as a
            real-time digital twin — synchronizing physical reality
            with system state.
            <br /><br />
            Decisions are made on live infrastructure, not assumptions.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 3 — HOW OYI IS DEPLOYED
      ================================================= */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-medium mb-10">
            Designed for phased deployment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {[
              {
                title: "Single Property",
                text: "Deploy Oyi to govern access, utilities, and automation for one building or residence."
              },
              {
                title: "Estate-Wide",
                text: "Operate residential or mixed-use estates as unified infrastructure systems."
              },
              {
                title: "Urban Systems",
                text: "Scale governance across gated communities and urban developments."
              },
            ].map((item, i) => (
              <div key={i}>
                <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                <p className="text-white/65 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 3.5 — WHO IT'S FOR
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core text-center">
        <div className="max-w-3xl mx-auto">
          <p className="uppercase text-xs tracking-widest brand-accent mb-4">
            Built for operators
          </p>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Developers, estate operators, facility managers, and
            institutions responsible for long-term infrastructure.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 4 — SYSTEM PRINCIPLES
      ================================================= */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-medium mb-8">
            System principles
          </h3>

          <ul className="space-y-4 text-white/70">
            <li>• Infrastructure-first, not app-first</li>
            <li>• Modular, not monolithic</li>
            <li>• Built for long-term operation</li>
            <li>• Governable, auditable, and extensible</li>
          </ul>
        </div>
      </section>

      {/* =================================================
          SECTION 5 — CTA
      ================================================= */}
      <section className="py-36 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-medium mb-6">
          Deploy Oyi OS.
        </h2>
        <p className="text-lg md:text-xl text-white/70 mb-10">
          Work directly with our infrastructure team to deploy
          Oyi for your environment.
        </p>

        <div className="hero-cta justify-center">
          <Link href="/deployments" className="btn-primary">
            Request Deployment
          </Link>
        </div>
      </section>

    </main>
  );
}
