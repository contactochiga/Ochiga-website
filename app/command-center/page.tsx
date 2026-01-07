"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          HERO
      ================================================= */}
      <section className="pt-28 pb-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">

          <header className="mb-32">
            <p className="uppercase text-xs tracking-widest brand-accent mb-4">
              Command Center
            </p>
            <h1 className="text-3xl md:text-5xl font-medium mb-6 max-w-4xl">
              Centralized control for live infrastructure.
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-3xl">
              The Ochiga Command Center is a large-screen operational environment
              designed for real-time oversight of estates, facilities, and
              urban infrastructure.
            </p>
          </header>

          {/* =================================================
              WHAT THE COMMAND CENTER IS
          ================================================= */}
          <section className="mb-36">
            <h2 className="text-2xl font-medium mb-14">
              What the Command Center Is
            </h2>

            <div className="cc-card-wrap">

              <CCCard
                icon={<TopologyIcon />}
                title="Live Infrastructure Topology"
                text="A real-time spatial view of estates, buildings, utilities, and assets rendered directly from the digital twin."
              />

              <CCCard
                icon={<PulseIcon />}
                title="System Health & Alerts"
                text="Continuous visibility into access systems, power, network health, and operational alerts."
              />

              <CCCard
                icon={<IncidentIcon />}
                title="Incident Monitoring & Response"
                text="Security, power, fire, and system incidents monitored and coordinated from one command layer."
              />

              <CCCard
                icon={<ShieldIcon />}
                title="Operator Authority & Control"
                text="Role-based access and authority enforcement for operators and facility managers."
              />

            </div>
          </section>

          {/* =================================================
              HOW IT’S USED
          ================================================= */}
          <section className="mb-36 max-w-4xl">
            <h2 className="text-2xl font-medium mb-12">
              How It’s Used
            </h2>

            <div className="space-y-16 text-white/70">
              <Usage
                title="Estate Operations"
                text="Central monitoring of access points, visitor movement, utilities, and alerts across estates."
              />
              <Usage
                title="Facility Management"
                text="Asset tracking, maintenance visibility, energy oversight, and escalation control."
              />
              <Usage
                title="Incident Response"
                text="Coordinated response to infrastructure failures and security events."
              />
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================= */}
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

/* =================================================
   COMPONENTS
================================================= */

function CCCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="cc-card"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 20,
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Icon */}
      <div className="text-white/80 mb-6">
        {icon}
      </div>

      {/* Push content to bottom */}
      <div style={{ flexGrow: 1 }} />

      {/* Footer content */}
      <div>
        <h3 className="font-medium mb-2 text-sm md:text-base leading-snug">
          {title}
        </h3>
        <p className="text-white/65 text-xs md:text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function Usage({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-white font-medium mb-3">{title}</h3>
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}

/* =================================================
   ICONS — CLEAN, MODERN, SYSTEM-GRADE
================================================= */

function TopologyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1" stroke="white" strokeOpacity="0.7" />
      <rect x="15" y="3" width="6" height="6" rx="1" stroke="white" strokeOpacity="0.7" />
      <rect x="9" y="15" width="6" height="6" rx="1" stroke="white" strokeOpacity="0.7" />
      <path d="M6 9v3m12-3v3M9 12h6" stroke="white" strokeOpacity="0.4" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h4l2-4 4 8 2-4h4"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IncidentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4l8 16H4L12 4z"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.4"
      />
      <path d="M12 9v4" stroke="white" strokeOpacity="0.6" strokeWidth="1.4" />
      <circle cx="12" cy="16" r="1" fill="white" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 4v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
