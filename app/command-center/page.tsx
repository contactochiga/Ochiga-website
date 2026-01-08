"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          HERO — COMMAND CENTER VISUAL
      ================================================= */}
      <section className="px-4 md:px-8 pt-32 pb-48">
        <div className="hero-frame">
          <img
            src="/media/oyi-os-command-center.png"
            alt="Ochiga Command Center"
            className="hero-bg"
          />
          <div className="hero-overlay" />
          <div className="hero-gradient" />

          <div className="hero-content animate-fade-up">
            <p className="uppercase text-xs tracking-widest brand-accent mb-4">
              Command Center
            </p>
            <h1 className="hero-title">
              Centralized control for
              <br />
              live infrastructure
            </h1>
            <p className="hero-description">
              A large-screen operational environment for monitoring,
              coordinating, and governing estates, facilities, and districts
              in real time.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          PAGE BODY
      ================================================= */}
      <section className="px-6 md:px-8 pb-40">
        <div className="max-w-6xl mx-auto">

          {/* =================================================
              WHAT THE COMMAND CENTER IS
          ================================================= */}
          <section className="mb-56">
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
                text="Continuous visibility into access systems, power, network health, and operational alerts as they happen."
              />
              <CCCard
                icon={<IncidentIcon />}
                title="Incident Monitoring & Response"
                text="Security, power, fire, and system incidents monitored and coordinated from one command layer."
              />
              <CCCard
                icon={<ShieldIcon />}
                title="Operator Authority & Control"
                text="Role-based access and authority enforcement for infrastructure operators and facility managers."
              />
            </div>
          </section>

          {/* =================================================
              HOW IT’S USED
          ================================================= */}
          <section
            className="mb-64"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 32,
              padding: "88px 72px",
            }}
          >
            <h2 className="text-2xl font-medium mb-10">
              How It’s Used
            </h2>

            <p className="text-white/65 mb-24 max-w-2xl">
              The Command Center is operated by estate managers,
              facility teams, and infrastructure operators responsible
              for live environments.
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
          </section>

          {/* =================================================
              BUILT FOR SCALE
          ================================================= */}
          <section className="mb-64">
            <h2 className="text-2xl font-medium mb-20">
              Built for Scale
            </h2>

            <div className="grid md:grid-cols-3 gap-20 text-white/70">
              <Scale
                title="Single Estate"
                text="Dedicated control rooms operating one estate or facility cluster."
              />
              <Scale
                title="Multi-Estate Hubs"
                text="Centralized operations overseeing multiple estates or developments."
              />
              <Scale
                title="City & District Operations"
                text="Large-screen coordination centers for urban infrastructure and services."
              />
            </div>
          </section>

          {/* =================================================
              POWERED BY OYI OS
          ================================================= */}
          <section className="mb-64 max-w-3xl">
            <h2 className="text-2xl font-medium mb-8">
              Powered by Oyi OS
            </h2>
            <p className="text-white/70 leading-relaxed">
              The Command Center runs on Oyi OS and remains synchronized
              with live digital twins.
              <br /><br />
              Every control action reflects real infrastructure state —
              not delayed reports, dashboards, or manual updates.
            </p>
          </section>

          {/* =================================================
              FINAL CTA
          ================================================= */}
          <section className="pt-32 pb-16 text-center">
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
        padding: 24,
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
    <div style={{ display: "flex", gap: 36 }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-4">{title}</h3>
        <p className="text-white/70 max-w-xl">{text}</p>
      </div>
    </div>
  );
}

function Scale({ title, text }: any) {
  return (
    <div>
      <h3 className="font-medium mb-3">{title}</h3>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}

/* =================================================
   ICONS
================================================= */

const TopologyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="6" height="6" stroke="white" strokeOpacity="0.7" />
    <rect x="15" y="3" width="6" height="6" stroke="white" strokeOpacity="0.7" />
    <rect x="9" y="15" width="6" height="6" stroke="white" strokeOpacity="0.7" />
  </svg>
);

const PulseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M3 12h4l2-4 4 8 2-4h4" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" />
  </svg>
);

const IncidentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M12 4l8 16H4L12 4z" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l7 4v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" />
  </svg>
);

const EstateIcon = ShieldIcon;
const FacilityIcon = TopologyIcon;
const ResponseIcon = IncidentIcon;
