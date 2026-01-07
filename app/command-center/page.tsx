"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 pb-40 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* ===============================
              HERO
          =============================== */}
          <header className="mb-28 max-w-4xl">
            <p className="uppercase text-xs tracking-widest brand-accent mb-4">
              Command Center
            </p>
            <h1 className="text-3xl md:text-5xl font-medium mb-6">
              Centralized control for live infrastructure.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              The Ochiga Command Center is a large-screen operational environment
              designed for real-time oversight of estates, facilities, and urban
              infrastructure.
            </p>
          </header>

          {/* ===============================
              WHAT THE COMMAND CENTER IS
              Mobile: 2 columns
              Desktop: 4 columns
          =============================== */}
          <section className="mb-36">
            <h2 className="text-2xl font-medium mb-12">
              What the Command Center Is
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">

              {/* CARD 1 */}
              <Card
                icon={<TopologyIcon />}
                title="Live Infrastructure Topology"
                text="A real-time spatial view of estates, buildings, utilities, and assets rendered directly from the digital twin."
              />

              {/* CARD 2 */}
              <Card
                icon={<HealthIcon />}
                title="System Health & Alerts"
                text="Continuous visibility into access systems, power networks, device health, and operational alerts."
              />

              {/* CARD 3 */}
              <Card
                icon={<IncidentIcon />}
                title="Incident Coordination"
                text="Centralized monitoring and coordinated response to security, power, fire, and infrastructure incidents."
              />

              {/* CARD 4 */}
              <Card
                icon={<AuthorityIcon />}
                title="Operator Authority & Control"
                text="Role-based access and authority enforcement aligned with governance and accountability."
              />

            </div>
          </section>

          {/* ===============================
              HOW IT’S USED
          =============================== */}
          <section className="space-y-14 mb-32 max-w-4xl">
            <h2 className="text-2xl font-medium">How It’s Used</h2>

            <div className="space-y-10 text-white/70">
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
          <section className="space-y-8 mb-32 max-w-4xl">
            <h2 className="text-2xl font-medium">Built for Scale</h2>
            <p className="text-white/70">
              Scales from single-estate control rooms to multi-estate operational
              hubs and district-level coordination centers.
            </p>
          </section>

          {/* ===============================
              POWERED BY
          =============================== */}
          <section className="space-y-8 mb-32 max-w-4xl">
            <h2 className="text-2xl font-medium">Powered by Oyi OS</h2>
            <p className="text-white/70">
              The Command Center runs on Oyi OS and synchronizes directly with
              live digital twins — ensuring every action reflects real
              infrastructure state.
            </p>
          </section>

          {/* ===============================
              CTA
          =============================== */}
          <section>
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
   CARD COMPONENT
================================ */

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
      {/* Icon */}
      <div className="flex justify-end mb-3 text-white/70">
        {icon}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10 mb-4" />

      <h3 className="text-sm md:text-base font-medium mb-2">
        {title}
      </h3>

      <p className="text-xs md:text-sm text-white/70 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

/* ===============================
   SVG ICONS
================================ */

function TopologyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" stroke="currentColor" />
      <rect x="14" y="3" width="7" height="7" stroke="currentColor" />
      <rect x="8.5" y="14" width="7" height="7" stroke="currentColor" />
    </svg>
  );
}

function HealthIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h4l2-5 4 10 2-5h4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IncidentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M12 7v6" stroke="currentColor" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function AuthorityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 4v5c0 4.5-3 8.5-7 9-4-0.5-7-4.5-7-9V7l7-4z"
        stroke="currentColor"
      />
    </svg>
  );
}
