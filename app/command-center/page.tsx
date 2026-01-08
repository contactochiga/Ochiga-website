"use client";

import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          HERO
      ================================================= */}
      <section className="pt-32 pb-40 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          <div className="hero-frame mb-40">
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
                A large-screen operational environment designed for real-time
                oversight of estates, facilities, and urban infrastructure.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =================================================
          WHAT IT IS
      ================================================= */}
      <section className="py-40 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-medium mb-24">
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
      <section className="py-40 px-6 md:px-10 bg-grid bg-radial-glow">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-medium mb-12">
            How It’s Used
          </h2>

          <p className="text-white/65 max-w-2xl mb-28 leading-relaxed">
            Command Centers are operational environments — not dashboards.
            They coordinate people, systems, and decisions across live infrastructure.
          </p>

          <div className="space-y-32">
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
      <section className="py-40 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-2xl font-medium mb-24">
            Built for Scale
          </h2>

          <div className="space-y-32">
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
          FINAL CTA — TIED TO CONTENT
      ================================================= */}
      <section className="py-40 px-6 md:px-10 bg-grid bg-radial-glow">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl font-medium mb-10">
            Deploy operational control that scales.
          </h2>

          <p className="text-white/65 leading-relaxed mb-16">
            The Ochiga Command Center is deployed as part of a complete
            infrastructure operating system — designed, integrated, and
            operated in real environments through Oyi OS.
          </p>

          <Link href="/deployments" className="btn-primary">
            Request Command Center Deployment
          </Link>

        </div>
      </section>

    </main>
  );
}
