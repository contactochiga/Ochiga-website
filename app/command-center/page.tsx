"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 pb-36 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">

          {/* ===============================
              HERO
          =============================== */}
          <header className="mb-24">
            <p className="uppercase text-xs tracking-widest brand-accent mb-4">
              Command Center
            </p>
            <h1 className="text-3xl md:text-5xl font-medium mb-6">
              Centralized control for live infrastructure.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
              The Ochiga Command Center is the operational environment where
              estates, facilities, and districts are monitored, governed, and
              coordinated in real time.
            </p>
          </header>

          {/* ===============================
              WHAT IT IS
          =============================== */}
          <section className="space-y-10 mb-28">
            <h2 className="text-2xl font-medium">What the Command Center Is</h2>

            <p className="text-white/70 leading-relaxed">
              The Command Center is not a consumer dashboard.
              <br /><br />
              It is a large-screen, multi-context operational interface designed
              for operators responsible for access, utilities, incidents, assets,
              and system health.
            </p>

            <ul className="space-y-3 text-white/70">
              <li>• Live estate and building topology</li>
              <li>• Real-time system health and alerts</li>
              <li>• Incident monitoring and response coordination</li>
              <li>• Operator-level access and authority enforcement</li>
            </ul>
          </section>

          {/* ===============================
              HOW IT'S USED
          =============================== */}
          <section className="space-y-12 mb-28">
            <h2 className="text-2xl font-medium">How It’s Used</h2>

            <div className="space-y-8 text-white/70">
              <p>
                <strong className="text-white">Estate Operations</strong><br />
                Central monitoring of access points, utilities, visitor flow,
                and system alerts across residential estates.
              </p>

              <p>
                <strong className="text-white">Facility Management</strong><br />
                Asset tracking, maintenance visibility, energy oversight,
                and escalation control.
              </p>

              <p>
                <strong className="text-white">Incident Response</strong><br />
                Coordinated response to security, power, fire, or system failures
                from a single operational view.
              </p>
            </div>
          </section>

          {/* ===============================
              SCREENS & SCALE
          =============================== */}
          <section className="space-y-10 mb-28">
            <h2 className="text-2xl font-medium">Built for Scale</h2>

            <p className="text-white/70 leading-relaxed">
              The Command Center scales from:
            </p>

            <ul className="space-y-3 text-white/70">
              <li>• Single-estate control rooms</li>
              <li>• Multi-estate operational hubs</li>
              <li>• City or district-level coordination centers</li>
            </ul>

            <p className="text-white/60 leading-relaxed">
              Interfaces adapt to screen size, context, and operational role.
            </p>
          </section>

          {/* ===============================
              RELATION TO OYI & TWIN
          =============================== */}
          <section className="space-y-10 mb-28">
            <h2 className="text-2xl font-medium">Powered by Oyi OS</h2>

            <p className="text-white/70 leading-relaxed">
              The Command Center runs on Oyi OS and is directly synchronized
              with live digital twins.
              <br /><br />
              Every action reflects real infrastructure state — not delayed reports.
            </p>
          </section>

          {/* ===============================
              CTA
          =============================== */}
          <section className="mt-24">
            <Link href="/deployments" className="btn-primary">
              Request Command Center Deployment
            </Link>
          </section>

        </div>
      </section>
    </main>
  );
}
