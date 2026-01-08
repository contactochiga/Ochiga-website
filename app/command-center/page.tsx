"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          HERO — COMMAND CENTER CONTEXT
      ================================================= */}
      <section className="px-4 md:px-8 pt-28">
        <div className="hero-frame">
          {/* TEMP: reuse command center image from homepage */}
          <img
            src="/media/oyi-os-command-center.png"
            className="hero-bg"
            alt="Ochiga Command Center"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <p className="uppercase text-xs tracking-widest brand-accent mb-4">
              Command Center
            </p>
            <h1 className="hero-title">
              Centralized control<br />for live infrastructure.
            </h1>
            <p className="hero-description">
              A large-screen operational environment designed for real-time
              oversight of estates, facilities, and urban infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          PAGE CONTENT
      ================================================= */}
      <section className="pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* =================================================
              WHAT THE COMMAND CENTER IS
          ================================================= */}
          <section className="mb-44">
            <h2 className="text-2xl font-medium mb-16">
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
              HOW IT’S USED — OPERATIONAL LAYER
          ================================================= */}
          <section
            className="mb-48"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 28,
              padding: "64px 56px",
            }}
          >
            <div className="max-w-4xl">
              <h2 className="text-2xl font-medium mb-6">
                How It’s Used
              </h2>

              <p className="text-white/65 mb-20 max-w-2xl">
                The Command Center operates as a unified control environment,
                adapting to different operational contexts while maintaining
                real-time authority, visibility, and escalation control.
              </p>

              <div className="space-y-20">
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
              CTA — DECISION POINT
          ================================================= */}
          <section className="pt-24">
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
        padding: 22,
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="text-white/80 mb-8">{icon}</div>
      <div style={{ flexGrow: 1 }} />
      <div>
        <h3 className="font-medium mb-2 text-sm md:text-base">
          {title}
        </h3>
        <p className="text-white/65 text-xs md:text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function UsageRow({ icon, title, text }: any) {
  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
      <div
        style={{
          width: 56,
          height: 56,
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

      <div>
        <h3 className="font-medium mb-3">{title}</h3>
        <p className="text-white/65 leading-relaxed max-w-xl">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =================================================
   ICONS — USAGE CONTEXT
================================================= */

function EstateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 10l9-6 9 6v9H3v-9z" stroke="white" strokeOpacity="0.7" strokeWidth="1.5"/>
    </svg>
  );
}

function FacilityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="white" strokeOpacity="0.7" strokeWidth="1.5"/>
      <path d="M9 21V3M15 21V3" stroke="white" strokeOpacity="0.4"/>
    </svg>
  );
}

function ResponseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.7" strokeWidth="1.5"/>
      <path d="M12 7v6l4 2" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"/>
    </svg>
  );
}

/* Existing icons (unchanged) */
function TopologyIcon() { return null }
function PulseIcon() { return null }
function IncidentIcon() { return null }
function ShieldIcon() { return null }
