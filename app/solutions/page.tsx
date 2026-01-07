"use client";

import Link from "next/link";

export default function SolutionsPage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 pb-40 px-6 md:px-8">
        <div className="max-w-4xl mx-auto space-y-44">

          {/* =================================================
              INTRO
          ================================================= */}
          <header>
            <h1 className="text-3xl md:text-5xl font-medium mb-6">
              Solutions & Services
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
              Ochiga designs, deploys, and operates digital infrastructure systems
              across estates, buildings, and urban environments.
            </p>
          </header>

          {/* =================================================
              INFRASTRUCTURE LIFECYCLE
          ================================================= */}
          <section>
            <p className="uppercase text-xs tracking-widest brand-accent mb-6">
              Infrastructure Lifecycle
            </p>

            <div className="space-y-28">

              {/* PRE-CONSTRUCTION */}
              <div id="pre-construction" className="scroll-mt-28">
                <h2 className="text-2xl font-medium mb-4">
                  Pre-Construction Infrastructure
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Digital infrastructure designed before construction begins.
                  <br /><br />
                  Systems, utilities, access logic, and operational models are
                  planned upfront using digital twins — preventing fragmentation,
                  retrofits, and operational blind spots.
                </p>
              </div>

              {/* CONSTRUCTION */}
              <div id="construction" className="scroll-mt-28">
                <h2 className="text-2xl font-medium mb-4">
                  Construction-Phase Deployment
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Hardware, fiber, access systems, and core infrastructure are
                  deployed directly into the build.
                  <br /><br />
                  Physical installation is synchronized with the digital model
                  to ensure accuracy, traceability, and readiness for operations.
                </p>
              </div>

              {/* OPERATIONS */}
              <div id="operations" className="scroll-mt-28">
                <h2 className="text-2xl font-medium mb-4">
                  Live Operations & Control
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Once live, infrastructure is operated as a real-time system.
                  <br /><br />
                  Estates and facilities are monitored, governed, and controlled
                  through Oyi OS, digital twins, and command-center environments.
                </p>
              </div>

            </div>
          </section>

          {/* =================================================
              INFRASTRUCTURE SYSTEMS
          ================================================= */}
          <section>
            <p className="uppercase text-xs tracking-widest brand-accent mb-6">
              Infrastructure Systems
            </p>

            <div className="space-y-28">

              {/* SMART BUILDINGS */}
              <div id="smart-buildings" className="scroll-mt-28">
                <h2 className="text-2xl font-medium mb-4">
                  Smart Buildings
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Digitally managed buildings with unified access control,
                  utility monitoring, and asset visibility.
                </p>
              </div>

              {/* ESTATE SYSTEMS */}
              <div id="estate-systems" className="scroll-mt-28">
                <h2 className="text-2xl font-medium mb-4">
                  Estate Systems
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Centralized infrastructure platforms for residential and
                  mixed-use estates — managing access, utilities, payments,
                  and daily operations.
                </p>
              </div>

              {/* COMMAND CENTERS */}
              <div id="command-centers" className="scroll-mt-28">
                <h2 className="text-2xl font-medium mb-4">
                  Command Centers
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Large-screen operational environments for monitoring,
                  coordination, and real-time decision-making across estates
                  and districts.
                </p>

                <Link
                  href="/command-center"
                  className="inline-block mt-4 text-sm brand-accent"
                >
                  Explore Command Center →
                </Link>
              </div>

              {/* URBAN SYSTEMS */}
              <div id="urban-systems" className="scroll-mt-28">
                <h2 className="text-2xl font-medium mb-4">
                  Urban Systems
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Integrated digital infrastructure for gated communities,
                  districts, and urban developments operating at scale.
                </p>
              </div>

              {/* DEPLOYMENT */}
              <div id="deployment" className="scroll-mt-28">
                <h2 className="text-2xl font-medium mb-4">
                  Infrastructure Deployment
                </h2>
                <p className="text-white/70 leading-relaxed">
                  End-to-end deployment of digital infrastructure — from design
                  and installation to operational onboarding.
                </p>

                <Link
                  href="/deployments"
                  className="btn-primary inline-block mt-6"
                >
                  Request Deployment
                </Link>
              </div>

            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
