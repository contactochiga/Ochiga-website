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

          <header className="mb-28">
            <p className="uppercase text-xs tracking-widest brand-accent mb-4">
              Command Center
            </p>
            <h1 className="text-3xl md:text-5xl font-medium mb-6 max-w-4xl">
              Centralized control for live infrastructure.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
              The Ochiga Command Center is the operational environment where
              estates, facilities, and districts are monitored, governed,
              and coordinated in real time.
            </p>
          </header>

          {/* =================================================
              WHAT IT IS — ICON CARDS
          ================================================= */}
          <section className="mb-32">
            <h2 className="text-2xl font-medium mb-12">
              What the Command Center Is
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              <FeatureCard
                icon={<TopologyIcon />}
                title="Live Infrastructure Topology"
                text="A real-time spatial view of estates, buildings, utilities, and assets — rendered directly from the digital twin."
              />

              <FeatureCard
                icon={<PulseIcon />}
                title="System Health & Alerts"
                text="Continuous visibility into power, access, network, and operational health with immediate alerting."
              />

              <FeatureCard
                icon={<IncidentIcon />}
                title="Incident Monitoring"
                text="Security, power, fire, or system incidents tracked, escalated, and resolved from a single operational view."
              />

              <FeatureCard
                icon={<ShieldIcon />}
                title="Operator Authority"
                text="Role-based control and authority enforcement designed for facility managers and infrastructure operators."
              />
            </div>
          </section>

          {/* =================================================
              HOW IT’S USED
          ================================================= */}
          <section className="mb-32">
            <h2 className="text-2xl font-medium mb-12">
              How It’s Used
            </h2>

            <div className="space-y-16 max-w-4xl">
              <UsageBlock
                title="Estate Operations"
                text="Central monitoring of access points, visitor flow, utilities, and system alerts across residential estates."
              />

              <UsageBlock
                title="Facility Management"
                text="Asset tracking, maintenance visibility, energy oversight, and escalation control across facilities."
              />

              <UsageBlock
                title="Incident Response"
                text="Coordinated response to infrastructure failures and security events from a unified command view."
              />
            </div>
          </section>

          {/* =================================================
              SCALE & SCREENS
          ================================================= */}
          <section className="mb-32">
            <h2 className="text-2xl font-medium mb-10">
              Built for Scale
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              <ScaleCard title="Single Estate">
                Control rooms operating one estate or facility cluster.
              </ScaleCard>

              <ScaleCard title="Multi-Estate Hub">
                Central operations overseeing multiple estates or developments.
              </ScaleCard>

              <ScaleCard title="City / District">
                Large-screen coordination centers for urban infrastructure.
              </ScaleCard>
            </div>

            <p className="text-white/60 mt-10 max-w-3xl">
              Interfaces adapt fluidly to screen size, operational role, and context.
            </p>
          </section>

          {/* =================================================
              POWERED BY
          ================================================= */}
          <section className="mb-36 max-w-4xl">
            <h2 className="text-2xl font-medium mb-6">
              Powered by Oyi OS & Digital Twin
            </h2>

            <p className="text-white/70 leading-relaxed">
              The Command Center runs on Oyi OS and is synchronized directly
              with live digital twins.
              <br /><br />
              Every control action reflects the real state of infrastructure —
              not delayed reports or static dashboards.
            </p>
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

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function UsageBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div>
      <h3 className="font-medium mb-3">{title}</h3>
      <p className="text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

function ScaleCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

/* =================================================
   ICONS (INLINE SVG — CLEAN & SEMANTIC)
================================================= */

function TopologyIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9z" stroke="white" strokeOpacity="0.8" strokeWidth="1.5"/>
      <path d="M10 7h4M12 10v4" stroke="white" strokeOpacity="0.5" strokeWidth="1.2"/>
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
      <path d="M3 12h4l2-5 4 10 2-5h4" stroke="white" strokeOpacity="0.8" strokeWidth="1.5"/>
    </svg>
  );
}

function IncidentIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
      <path d="M12 3l9 18H3L12 3z" stroke="white" strokeOpacity="0.8" strokeWidth="1.5"/>
      <circle cx="12" cy="16" r="1" fill="white" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
      <path d="M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z" stroke="white" strokeOpacity="0.8" strokeWidth="1.5"/>
    </svg>
  );
}
