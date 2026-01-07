"use client";

import Link from "next/link";

export default function TechnologyPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — TECHNOLOGY HERO
      ================================================= */}
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">
          <img
            src="/media/infrastructure.png"
            className="hero-bg"
            alt="Ochiga Technology"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Technology
            </h1>
            <p className="hero-description">
              Infrastructure-grade systems for real-world environments —
              designed to operate, scale, and endure.
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
          SECTION 1.5 — PHILOSOPHY
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Built as infrastructure, not software.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Ochiga is engineered as long-term operational infrastructure —
            not a consumer app or a collection of dashboards.
            <br /><br />
            Every system decision is made with durability, governance,
            and physical environments in mind.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — MODULAR ARCHITECTURE
      ================================================= */}
      <section className="py-36 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Modular, not monolithic.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Ochiga is composed of independent but connected modules —
            each responsible for a specific layer of infrastructure.
            <br /><br />
            This allows systems to evolve, expand, or be replaced
            without breaking the entire platform.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-white/70">
            <span>Access systems</span>
            <span>•</span>
            <span>Utilities</span>
            <span>•</span>
            <span>Assets</span>
            <span>•</span>
            <span>Payments</span>
            <span>•</span>
            <span>Operations</span>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 3 — CORE SYSTEM LAYERS
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-10">
            Three core layers.
          </h2>

          <div className="space-y-12 text-left max-w-3xl mx-auto text-white/70">

            <div>
              <h3 className="text-white font-medium mb-2">
                Physical Layer
              </h3>
              <p>
                Hardware, sensors, access devices, utilities, meters,
                and physical assets embedded within the environment.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Digital Twin Layer
              </h3>
              <p>
                A real-time digital representation of the physical environment —
                continuously synchronized with on-ground systems.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Operational Layer
              </h3>
              <p>
                Governance, automation, analytics, workflows, and
                system intelligence that operators interact with.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 4 — DIGITAL TWIN ENGINE
      ================================================= */}
      <section className="py-36 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Digital twins as a system core.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Digital twins in Ochiga are not visualizations.
            <br /><br />
            They are operational models that reflect the current state
            of infrastructure — assets, access, utilities, and activity —
            in real time.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 5 — INTERFACES
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-8">
            Multiple interfaces. One system.
          </h2>

          <div className="space-y-12 text-left max-w-3xl mx-auto text-white/70">

            <div>
              <h3 className="text-white font-medium mb-2">
                Mobile Interfaces
              </h3>
              <p>
                Resident and field-level access —
                designed for simplicity and task-based interaction.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Web & Tablet Interfaces
              </h3>
              <p>
                Operational dashboards for estate managers,
                facility teams, and administrators.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Command Interfaces
              </h3>
              <p>
                Large-screen environments for multi-site monitoring,
                coordination, and governance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 6 — SECURITY & GOVERNANCE
      ================================================= */}
      <section className="py-36 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Security and governance by default.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Ochiga systems are designed with role-based access,
            auditability, and operational accountability from day one.
            <br /><br />
            Infrastructure cannot rely on trust alone —
            it must be governable.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 7 — BUILT TO EVOLVE
      ================================================= */}
      <section className="py-36 px-6 bg-grid bg-radial-glow section-core text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">
            Built to evolve over decades.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Ochiga deployments are designed to adapt —
            new devices, new systems, new requirements.
            <br /><br />
            Infrastructure changes. The system remains.
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 8 — FINAL CTA
      ================================================= */}
      <section className="px-4 md:px-8 pb-40">
        <div className="hero-frame">
          <img
            src="/media/infrastructure-operators.png"
            className="hero-bg"
            alt="Infrastructure Deployment"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">
              Deploy infrastructure<br />that lasts.
            </h1>
            <p className="hero-description">
              Work with our team to design and deploy
              infrastructure-grade systems.
            </p>

            <div className="hero-cta">
              <Link href="/deployments" className="btn-primary">
                Request Deployment
              </Link>
              <Link href="/oyi" className="btn-secondary">
                Explore Oyi OS
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
