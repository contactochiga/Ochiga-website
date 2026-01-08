"use client";

import Link from "next/link";

/* =================================================
   PAGE
================================================= */

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          HERO
      ================================================= */}
      <section className="pt-32 pb-48 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          <div className="hero-frame mb-32">
            <img
              src="/media/command-center.png"
              className="hero-bg"
              alt="Ochiga Command Center"
            />
            <div className="hero-overlay" />
            <div className="hero-gradient" />

            <div className="hero-content">
              <p className="uppercase text-xs tracking-widest brand-accent mb-4">
                Command Center
              </p>
              <h1 className="hero-title">
                Centralized control for<br />live infrastructure.
              </h1>
              <p className="hero-description">
                The Ochiga Command Center is a large-screen operational environment
                designed for real-time oversight of estates, facilities,
                and urban infrastructure.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =================================================
          WHAT IT IS
      ================================================= */}
      <section className="pb-64 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-medium mb-20">
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
        </div>
      </section>

      {/* =================================================
          HOW IT’S USED
      ================================================= */}
      <section className="pb-64 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-medium mb-10">
            How It’s Used
          </h2>

          <p className="text-white/65 max-w-2xl mb-24 leading-relaxed">
            Command Centers are operational environments — not dashboards.
            They are designed to coordinate people, systems, and decisions
            across live infrastructure.
          </p>

          <div className="space-y-28">

            <UsageRow
              icon={<EstateIcon />}
              title="Estate Operations"
              text="Central monitoring of access points, visitor movement, utilities, and alerts across residential estates."
            />

            <UsageRow
              icon={<FacilityIcon />}
              title="Facility Management"
              text="Asset tracking, maintenance visibility, energy oversight, and escalation control across facilities."
            />

            <UsageRow
              icon={<ResponseIcon />}
              title="Incident Response"
              text="Coordinated response to infrastructure failures and security events from a unified operational view."
            />

          </div>
        </div>
      </section>

      {/* =================================================
          BUILT FOR SCALE
      ================================================= */}
      <section className="pb-64 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-medium mb-20">
            Built for Scale
          </h2>

          <div className="space-y-28">

            <ScaleRow
              icon={<EstateScaleIcon />}
              title="Single Estate Operations"
              text="Dedicated control rooms operating one estate or facility cluster with live access, utilities, and incident control."
            />

            <ScaleRow
              icon={<HubScaleIcon />}
              title="Multi-Estate Hubs"
              text="Centralized operational centers coordinating multiple estates, developments, or facility portfolios."
            />

            <ScaleRow
              icon={<CityScaleIcon />}
              title="City & District Infrastructure"
              text="Large-screen coordination environments for urban districts, shared services, and critical infrastructure."
            />

          </div>
        </div>
      </section>

      {/* =================================================
          CTA
      ================================================= */}
      <section className="pb-48 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="pt-20 border-t border-white/10">
            <Link href="/deployments" className="btn-primary">
              Request Command Center Deployment
            </Link>
          </div>
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
      <div className="mb-8">{icon}</div>
      <div style={{ flexGrow: 1 }} />
      <h3 className="font-medium mb-3">{title}</h3>
      <p className="text-white/65 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function UsageRow({ icon, title, text }: any) {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <CircleIcon>{icon}</CircleIcon>
      <div>
        <h3 className="font-medium mb-4">{title}</h3>
        <p className="text-white/70 max-w-xl leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function ScaleRow({ icon, title, text }: any) {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <CircleIcon>{icon}</CircleIcon>
      <div>
        <h3 className="font-medium mb-4">{title}</h3>
        <p className="text-white/70 max-w-xl leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function CircleIcon({ children }: any) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

/* =================================================
   ICONS (SYSTEM-GRADE)
================================================= */

function TopologyIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" />
      <rect x="15" y="3" width="6" height="6" rx="1" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" />
      <rect x="9" y="15" width="6" height="6" rx="1" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" />
      <path d="M6 9v4M18 9v4M9 12h6" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M3 12h4l2-4 4 8 2-4h4" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" />
    </svg>
  );
}

function IncidentIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M12 4l8 16H4L12 4z" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" />
      <circle cx="12" cy="16" r="1" fill="white" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 4v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function EstateIcon() {
  return <TopologyIcon />;
}
function FacilityIcon() {
  return <ShieldIcon />;
}
function ResponseIcon() {
  return <IncidentIcon />;
}

function EstateScaleIcon() {
  return <ShieldIcon />;
}
function HubScaleIcon() {
  return <TopologyIcon />;
}
function CityScaleIcon() {
  return <PulseIcon />;
}
