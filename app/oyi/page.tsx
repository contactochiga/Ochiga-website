"use client";

import Link from "next/link";

export default function OyiPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — OYI OS HERO
      ================================================= */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">
          <img
            src="/media/oyi-os-command-center.png"
            className="hero-bg"
            alt="Oyi OS Command Layer"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Oyi OS
            </h1>

            <p className="hero-description">
              Infrastructure Operating System
              <br />
              <span className="text-white/70">
                The digital control layer for real-world environments.
              </span>
            </p>

            <div className="hero-cta">
              <Link href="/deployments" className="btn-primary">
                Request Deployment
              </Link>
              <Link href="/" className="btn-secondary">
                Back to Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 1.5 — SYSTEM DEFINITION
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            One system for operating physical environments.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Oyi OS is not a dashboard and not a single application.
            <br /><br />
            It is a unified operating system that governs access, utilities,
            assets, payments, and activity across real-world infrastructure —
            from individual residences to large estates and facilities.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — INFRASTRUCTURE-FIRST
      ================================================= */}
      <section className="py-36 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Infrastructure-first by design.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Most systems start with devices.
            <br /><br />
            Oyi OS starts with infrastructure.
            <br /><br />
            Devices, automation, and software are treated as assets within
            a larger operational system — not standalone features.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-white/70">
            <span>Estate-native system</span>
            <span>•</span>
            <span>Digital twin driven</span>
            <span>•</span>
            <span>Modular, not monolithic</span>
            <span>•</span>
            <span>Built for long-term operation</span>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 2.5 — MULTIPLE INTERFACES
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-8">
            One infrastructure system.<br />Multiple operational surfaces.
          </h2>

          <div className="space-y-12 text-left max-w-3xl mx-auto text-white/70">

            <div>
              <h3 className="text-white font-medium mb-2">
                Resident Interface (Mobile)
              </h3>
              <p>
                Mobile-first access layer for residents and occupants.
                Personal, task-focused, and AI-assisted.
                Available on App Store, Play Store, and mobile web.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Operations Interface (Web / Tablet)
              </h3>
              <p>
                Built for estate operators and facility managers.
                System oversight, access control, utilities, incidents,
                and digital twin-aware operations.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Command Interface (Large Screens)
              </h3>
              <p>
                Control room environments for multi-site and estate-wide visibility.
                Real-time monitoring, coordination, and operational governance.
              </p>
            </div>

          </div>

          <p className="mt-12 text-white/60">
            Different interfaces. Same operating system.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 3 — DIGITAL TWIN CORE
      ================================================= */}
      <section className="py-36 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Digital twins as operational reality.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Every deployment of Oyi OS is backed by a live digital twin —
            a real-time representation of physical infrastructure.
            <br /><br />
            Assets, access, utilities, activity, and system state are
            synchronized continuously with reality.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 4 — USE CASES
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Designed for real environments.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Oyi OS operates across:
            <br /><br />
            Residential developments, gated estates, commercial buildings,
            mixed-use facilities, and infrastructure-heavy properties.
            <br /><br />
            The same system can run a single property or scale across
            entire estates without changing architecture.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 5 — OPERATOR FOCUS
      ================================================= */}
      <section className="py-36 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Built for operators, not demos.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Oyi OS is designed for developers, estate operators,
            facility managers, and institutions responsible for
            real-world infrastructure.
            <br /><br />
            It is deployed as long-term operational infrastructure —
            not a temporary software tool.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 6 — FINAL CTA
      ================================================= */}
      <section className="px-4 md:px-8 pb-40">
        <div className="hero-frame">
          <img
            src="/media/infrastructure-operators.png"
            className="hero-bg"
            alt="Infrastructure Operators"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Deploy infrastructure<br />that operates as a system.
            </h1>
            <p className="hero-description">
              Work directly with our infrastructure team to design,
              deploy, and operate systems built to last.
            </p>
            <div className="hero-cta">
              <Link href="/deployments" className="btn-primary">
                Request Deployment
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to Infrastructure Team
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
