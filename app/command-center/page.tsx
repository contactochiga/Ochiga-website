"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 pb-40 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* ===============================
              HERO
          =============================== */}
          <header className="mb-28">
            <p className="uppercase text-xs tracking-widest brand-accent mb-4">
              Command Center
            </p>
            <h1 className="text-3xl md:text-5xl font-medium mb-6">
              Centralized control for live infrastructure.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
              The Ochiga Command Center is a large-screen operational environment
              designed for real-time oversight of estates, facilities, and urban
              infrastructure.
            </p>
          </header>

          {/* ===============================
              WHAT IT IS — CARD GRID
              Mobile: 2 columns
              Desktop: 1 column
          =============================== */}
          <section className="mb-32">
            <h2 className="text-2xl font-medium mb-10">
              What the Command Center Is
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-10">

              {/* CARD 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
                <TopologyIcon />
                <h3 className="text-lg font-medium mt-4 mb-2">
                  Live Infrastructure Topology
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  A real-time spatial view of estates, buildings, utilities,
                  and assets rendered directly from the digital twin.
                </p>
              </div>

              {/* CARD 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
                <HealthIcon />
                <h3 className="text-lg font-medium mt-4 mb-2">
                  System Health & Alerts
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Continuous visibility into access systems, power networks,
                  device health, and operational alerts.
                </p>
              </div>

              {/* CARD 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
                <IncidentIcon />
                <h3 className="text-lg font-medium mt-4 mb-2">
                  Incident Coordination
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Centralized incident monitoring and response — security,
                  power, fire, and infrastructure faults.
                </p>
              </div>

              {/* CARD 4 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
                <AuthorityIcon />
                <h3 className="text-lg font-medium mt-4 mb-2">
                  Operator Authority & Control
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Role-based authority enforcement ensuring actions reflect
                  governance, permissions, and accountability.
                </p>
              </div>

            </div>
          </section>

          {/* ===============================
              HOW IT’S USED
          =============================== */}
          <section className="space-y-14 mb-32">
            <h2 className="text-2xl font-medium">How It’s Used</h2>

            <div className="space-y-10 text-white/70 max-w-3xl">
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
              SCALE
          =============================== */}
          <section className="space-y-8 mb-32 max-w-3xl">
            <h2 className="text-2xl font-medium">Built for Scale</h2>

            <p className="text-white/70 leading-relaxed">
              The Command Center scales from single-estate control rooms to
              multi-estate operational hubs and district-level coordination centers.
            </p>

            <p className="text-white/60">
              Interfaces adapt to screen size, operational role, and authority context.
            </p>
          </section>

          {/* ===============================
              POWERED BY
          =============================== */}
          <section className="space-y-8 mb-32 max-w-3xl">
            <h2 className="text-2xl font-medium">Powered by Oyi OS</h2>

            <p className="text-white/70 leading-relaxed">
              The Command Center runs on Oyi OS and is synchronized with live
              digital twins — ensuring every action reflects real infrastructure
              state, not delayed reports.
            </p>
          </section>

          {/* ===============================
              CTA
          =============================== */}
          <section className="mt-20">
            <Link href="/deployments" className="btn-primary">
              Request Command Center Deployment
            </Link>
          </section>

        </div>
      </section>
    </main>
  );
}

/* ===============================
   ICONS (INLINE SVGs)
================================ */

function TopologyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" stroke="white" opacity="0.7" />
      <rect x="14" y="3" width="7" height="7" stroke="white" opacity="0.7" />
      <rect x="8.5" y="14" width="7" height="7" stroke="white" opacity="0.7" />
    </svg>
  );
}

function HealthIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h4l2-5 4 10 2-5h4"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.7"
      />
    </svg>
  );
}

function IncidentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" opacity="0.7" />
      <path d="M12 7v6" stroke="white" opacity="0.7" />
      <circle cx="12" cy="16" r="1" fill="white" opacity="0.7" />
    </svg>
  );
}

function AuthorityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 4v5c0 4.5-3 8.5-7 9-4-0.5-7-4.5-7-9V7l7-4z"
        stroke="white"
        opacity="0.7"
      />
    </svg>
  );
}
