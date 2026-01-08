"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          HERO
      ================================================= */}
      <section className="pt-40 pb-48 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="hero-frame">
            <img
              src="/media/oyi-os-command-center.png"
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
                Centralized control<br />for live infrastructure
              </h1>
              <p className="hero-description">
                A large-screen operational environment for monitoring,
                governing, and coordinating real-world infrastructure
                in real time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =================================================
          WHAT IT IS
      ================================================= */}
      <section className="py-48 px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-medium mb-24">
            What the Command Center Is
          </h2>

          <div className="cc-card-wrap">

            <FeatureCard
              icon={<TopologyIcon />}
              title="Live Infrastructure Topology"
              text="A real-time spatial view of estates, buildings, utilities, and assets rendered directly from the digital twin."
            />

            <FeatureCard
              icon={<HealthIcon />}
              title="System Health & Alerts"
              text="Continuous visibility into access systems, power, network health, and operational alerts."
            />

            <FeatureCard
              icon={<IncidentIcon />}
              title="Incident Monitoring & Response"
              text="Security, power, fire, and system incidents monitored and coordinated from one command layer."
            />

            <FeatureCard
              icon={<AuthorityIcon />}
              title="Operator Authority & Control"
              text="Role-based access and authority enforcement for infrastructure operators and facility managers."
            />

          </div>

        </div>
      </section>

      {/* =================================================
          HOW IT’S USED
      ================================================= */}
      <section className="py-48 px-6 bg-grid bg-radial-glow">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-medium mb-12">
            How It’s Used
          </h2>

          <p className="text-white/70 max-w-3xl mb-32 leading-relaxed">
            Command Centers are operational environments — not dashboards.
            They coordinate people, systems, and decisions across live infrastructure.
          </p>

          <div className="grid md:grid-cols-3 gap-24">

            <UsageBlock
              icon={<EstateIcon />}
              title="Estate Operations"
              text="Central monitoring of access points, visitor movement, utilities, and alerts across residential estates."
            />

            <UsageBlock
              icon={<FacilityIcon />}
              title="Facility Management"
              text="Asset tracking, maintenance visibility, energy oversight, and escalation control across facilities."
            />

            <UsageBlock
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
      <section className="py-48 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-medium mb-24">
            Built for Scale
          </h2>

          <div className="grid md:grid-cols-3 gap-24 text-white/70">

            <ScaleBlock
              title="Single Estate Control"
              text="Dedicated control rooms operating one estate or facility cluster."
            />

            <ScaleBlock
              title="Multi-Estate Operations"
              text="Centralized hubs coordinating multiple estates and development portfolios."
            />

            <ScaleBlock
              title="City & District Infrastructure"
              text="Large-screen coordination environments for urban districts and shared infrastructure."
            />

          </div>

        </div>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}
      <section className="py-48 px-6 bg-grid bg-radial-glow">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-medium mb-10">
            Operational control, deployed at scale.
          </h2>

          <p className="text-white/70 leading-relaxed mb-16">
            The Ochiga Command Center is deployed as part of a complete
            infrastructure operating system — governed and synchronized
            through Oyi OS.
          </p>

          <Link href="/deployments" className="btn-primary">
            Request Command Center Deployment
          </Link>

        </div>
      </section>

    </main>
  );
}

/* =================================================
   COMPONENTS
================================================= */

function FeatureCard({ icon, title, text }: any) {
  return (
    <div className="cc-card">
      <IconWrap>{icon}</IconWrap>
      <div className="mt-auto">
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-white/65 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function UsageBlock({ icon, title, text }: any) {
  return (
    <div>
      <IconWrap>{icon}</IconWrap>
      <h3 className="font-medium mb-4 mt-6">{title}</h3>
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}

function ScaleBlock({ title, text }: any) {
  return (
    <div>
      <h3 className="font-medium mb-4">{title}</h3>
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}

function IconWrap({ children }: any) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

/* =================================================
   ICONS — CLEAN, MODERN, PRODUCT-GRADE
================================================= */

function TopologyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="white" strokeOpacity="0.8" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" stroke="white" strokeOpacity="0.8" />
      <rect x="9" y="15" width="6" height="6" rx="1.5" stroke="white" strokeOpacity="0.8" />
      <path d="M6 9v3M18 9v3M9 12h6" stroke="white" strokeOpacity="0.4" />
    </svg>
  );
}

function HealthIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h4l2-4 4 8 2-4h4"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IncidentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4l8 16H4L12 4z"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="16" r="1" fill="white" />
    </svg>
  );
}

function AuthorityIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 4v6c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4z"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const EstateIcon = TopologyIcon;
const FacilityIcon = AuthorityIcon;
const ResponseIcon = IncidentIcon;
