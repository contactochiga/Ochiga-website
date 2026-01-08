"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          HERO — COMMAND CENTER
      ================================================= */}
      <section className="pt-40 pb-40 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">

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
                Centralized control<br />for live infrastructure.
              </h1>
              <p className="hero-description">
                A large-screen operational environment for monitoring, governing,
                and coordinating estates, facilities, and urban infrastructure
                in real time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =================================================
          WHAT THE COMMAND CENTER IS
      ================================================= */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-medium mb-20">
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
              text="Role-based access and authority enforcement for infrastructure operators and facility managers."
            />

          </div>

        </div>
      </section>

      {/* =================================================
          HOW IT’S USED
      ================================================= */}
      <section className="py-40 px-6 bg-grid bg-radial-glow">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-medium mb-10">
            How It’s Used
          </h2>

          <p className="text-white/70 max-w-3xl mb-24 leading-relaxed">
            The Command Center is designed for real operational environments —
            where decisions, incidents, and infrastructure performance are managed
            continuously.
          </p>

          <div className="grid md:grid-cols-3 gap-20">

            <UsageBlock
              icon={<EstateIcon />}
              title="Estate Operations"
              text="Central monitoring of access points, visitor movement, utilities, and system alerts across residential estates."
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
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-medium mb-20">
            Built for Scale
          </h2>

          <div className="grid md:grid-cols-3 gap-20 text-white/70">

            <ScaleBlock
              title="Single Estate"
              text="Dedicated control rooms operating one estate or facility cluster."
            />

            <ScaleBlock
              title="Multi-Estate Operations"
              text="Centralized hubs overseeing multiple estates and developments."
            />

            <ScaleBlock
              title="City & District Control"
              text="Large-screen coordination centers for urban-scale infrastructure."
            />

          </div>

        </div>
      </section>

      {/* =================================================
          FINAL — DEPLOYMENT CLOSE
      ================================================= */}
      <section className="py-48 px-6 bg-grid bg-radial-glow">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-medium mb-10">
            Operational control, deployed at scale.
          </h2>

          <p className="text-white/70 leading-relaxed mb-16">
            The Ochiga Command Center is deployed as part of a complete
            infrastructure operating system — designed, integrated, and operated
            in real environments.
            <br /><br />
            From single-estate control rooms to multi-estate and district-level
            operations, each deployment is governed and synchronized through Oyi OS.
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

function CCCard({ icon, title, text }: any) {
  return (
    <div className="cc-card">
      <div className="mb-8">{icon}</div>
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
      <div className="usage-icon mb-6">{icon}</div>
      <h3 className="font-medium mb-4">{title}</h3>
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

/* =================================================
   ICONS (CLEAN, SYSTEM-GRADE)
================================================= */

function TopologyIcon() {
  return <IconBox />;
}
function PulseIcon() {
  return <IconPulse />;
}
function IncidentIcon() {
  return <IconAlert />;
}
function ShieldIcon() {
  return <IconShield />;
}

function EstateIcon() {
  return <IconCircle />;
}
function FacilityIcon() {
  return <IconCircle />;
}
function ResponseIcon() {
  return <IconCircle />;
}

/* Simple SVG primitives (replace later if desired) */
function IconBox() {
  return <svg width="28" height="28"><rect width="28" height="28" stroke="white" fill="none" opacity="0.7"/></svg>;
}
function IconPulse() {
  return <svg width="28" height="28"><path d="M0 14h28" stroke="white" opacity="0.7"/></svg>;
}
function IconAlert() {
  return <svg width="28" height="28"><polygon points="14,2 26,26 2,26" stroke="white" fill="none" opacity="0.7"/></svg>;
}
function IconShield() {
  return <svg width="28" height="28"><path d="M14 2 L26 8 V18 C26 24 14 28 14 28 C14 28 2 24 2 18 V8 Z" stroke="white" fill="none" opacity="0.7"/></svg>;
}
function IconCircle() {
  return <div style={{
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.4)"
  }} />;
}
