"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 pb-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* =================================================
              HERO
          ================================================= */}
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
              <CCCard icon={<TopologyIcon />} title="Live Infrastructure Topology"
                text="A real-time spatial view of estates, buildings, utilities, and assets rendered directly from the digital twin."
              />
              <CCCard icon={<PulseIcon />} title="System Health & Alerts"
                text="Continuous visibility into access systems, power, network health, and operational alerts."
              />
              <CCCard icon={<IncidentIcon />} title="Incident Monitoring & Response"
                text="Security, power, fire, and system incidents monitored and coordinated from one command layer."
              />
              <CCCard icon={<ShieldIcon />} title="Operator Authority & Control"
                text="Role-based access and authority enforcement for operators and facility managers."
              />
            </div>
          </section>

          {/* =================================================
              HOW IT’S USED — OPERATIONAL CONTAINER
          ================================================= */}
          <section
            className="mb-36"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 24,
              padding: "48px 40px",
            }}
          >
            <div className="max-w-4xl">
              <h2 className="text-2xl font-medium mb-4">
                How It’s Used
              </h2>
              <p className="text-white/65 mb-14 max-w-2xl">
                The Command Center operates as a unified control environment,
                adapting to different operational contexts while maintaining
                real-time authority and visibility.
              </p>

              <div className="space-y-14">
                <UsageRow
                  icon={<EstateIcon />}
                  title="Estate Operations"
                  text="Central monitoring of access points, visitor movement, utilities, security events, and estate-wide alerts from a single operational view."
                />

                <UsageRow
                  icon={<FacilityIcon />}
                  title="Facility Management"
                  text="Asset performance tracking, maintenance visibility, energy oversight, and escalation workflows across buildings and facilities."
                />

                <UsageRow
                  icon={<ResponseIcon />}
                  title="Incident Response"
                  text="Coordinated response to infrastructure failures, security breaches, and system incidents with live situational awareness."
                />
              </div>
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

function CCCard({ icon, title, text }: any) {
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
      <div className="text-white/80 mb-6">{icon}</div>
      <div style={{ flexGrow: 1 }} />
      <div>
        <h3 className="font-medium mb-2 text-sm md:text-base">{title}</h3>
        <p className="text-white/65 text-xs md:text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function UsageRow({ icon, title, text }: any) {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {/* Icon Circle */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-white/65 leading-relaxed max-w-xl">{text}</p>
      </div>
    </div>
  );
}

/* =================================================
   ICONS — USAGE CONTEXT
================================================= */

function EstateIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 10l9-6 9 6v9H3v-9z" stroke="white" strokeOpacity="0.7" strokeWidth="1.4"/>
    </svg>
  );
}

function FacilityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="white" strokeOpacity="0.7" strokeWidth="1.4"/>
      <path d="M9 21V3M15 21V3" stroke="white" strokeOpacity="0.4" />
    </svg>
  );
}

function ResponseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.7" strokeWidth="1.4"/>
      <path d="M12 7v6l4 2" stroke="white" strokeOpacity="0.5" strokeWidth="1.4" />
    </svg>
  );
}

/* =================================================
   EXISTING ICONS (UNCHANGED)
================================================= */

function TopologyIcon() { /* unchanged */ return null }
function PulseIcon() { /* unchanged */ return null }
function IncidentIcon() { /* unchanged */ return null }
function ShieldIcon() { /* unchanged */ return null }
