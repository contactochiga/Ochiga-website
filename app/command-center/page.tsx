"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">

      {/* ===============================
          HERO
      =============================== */}
      <section className="pt-40 pb-56 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="hero-frame">
            <img
              src="/media/oyi-os-command-center.png"
              alt="Ochiga Command Center"
              className="hero-bg"
            />
            <div className="hero-overlay" />
            <div className="hero-gradient" />

            <div className="hero-content">
              <p className="uppercase text-xs tracking-widest brand-accent mb-6">
                Command Center
              </p>
              <h1 className="hero-title mb-8">
                Centralized control for<br />live infrastructure
              </h1>
              <p className="hero-description max-w-xl">
                A large-screen operational environment for governing estates,
                facilities, and urban infrastructure in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===============================
          WHAT IT IS
      =============================== */}
      <section className="py-56 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="What the Command Center Is"
            subtitle="A unified operational layer designed for live environments, not dashboards."
          />

          <div className="grid md:grid-cols-4 gap-10 mt-32">
            <Feature
              title="Live Infrastructure View"
              text="Real-time spatial visibility into estates, buildings, utilities, and assets."
            />
            <Feature
              title="System Health & Alerts"
              text="Continuous monitoring of access systems, power, networks, and faults."
            />
            <Feature
              title="Incident Coordination"
              text="Security, fire, power, and system incidents handled from one control layer."
            />
            <Feature
              title="Operational Authority"
              text="Role-based access and command enforcement for operators and managers."
            />
          </div>
        </div>
      </section>

      {/* ===============================
          HOW IT’S USED
      =============================== */}
      <section className="py-56 px-6 bg-grid bg-radial-glow">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="How It’s Used"
            subtitle="Designed for real operations — not passive monitoring."
          />

          <div className="space-y-40 mt-40">
            <Usage
              title="Estate Operations"
              text="Central oversight of access points, visitors, utilities, and alerts across residential estates."
            />
            <Usage
              title="Facility Management"
              text="Asset tracking, maintenance visibility, energy oversight, and escalation control."
            />
            <Usage
              title="Incident Response"
              text="Coordinated response to infrastructure failures and security events in real time."
            />
          </div>
        </div>
      </section>

      {/* ===============================
          BUILT FOR SCALE
      =============================== */}
      <section className="py-56 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Built for Scale"
            subtitle="From single control rooms to multi-estate and district operations."
          />

          <div className="grid md:grid-cols-3 gap-24 mt-40 text-white/70">
            <Scale
              title="Single Estate"
              text="Dedicated control rooms managing one estate or facility cluster."
            />
            <Scale
              title="Multi-Estate Hubs"
              text="Centralized hubs coordinating multiple estates and developments."
            />
            <Scale
              title="City & District Control"
              text="Large-screen coordination environments for urban infrastructure."
            />
          </div>
        </div>
      </section>

      {/* ===============================
          FINAL CTA
      =============================== */}
      <section className="py-56 px-6 bg-grid bg-radial-glow">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-10">
            Operational control, deployed at scale
          </h2>

          <p className="text-white/70 leading-relaxed mb-20">
            The Ochiga Command Center is deployed as part of a complete
            infrastructure operating system — designed, integrated, and governed
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

/* ===============================
   COMPONENTS
================================ */

function SectionHeader({ title, subtitle }: any) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-medium mb-6">{title}</h2>
      <p className="text-white/60 leading-relaxed">{subtitle}</p>
    </div>
  );
}

function Feature({ title, text }: any) {
  return (
    <div className="flex flex-col gap-4">
      <SoftIcon />
      <h3 className="font-medium">{title}</h3>
      <p className="text-white/65 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Usage({ title, text }: any) {
  return (
    <div className="flex gap-10 max-w-3xl">
      <SoftIcon />
      <div>
        <h3 className="font-medium mb-4">{title}</h3>
        <p className="text-white/70 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function Scale({ title, text }: any) {
  return (
    <div>
      <h3 className="font-medium mb-4">{title}</h3>
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}

/* ===============================
   ICON — SOFT SYSTEM MARK
================================ */

function SoftIcon() {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.15), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.18)",
        flexShrink: 0,
      }}
    />
  );
}
