"use client";

function InfrastructureDiagram() {
  return (
    <div className="overflow-x-auto mt-12 mb-16">
      <svg
        width="720"
        height="420"
        viewBox="0 0 720 420"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%" }}
      >
        {/* Background */}
        <rect width="720" height="420" fill="none" />

        {/* Central Core */}
        <rect
          x="210"
          y="40"
          width="300"
          height="56"
          rx="10"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.18)"
        />
        <text
          x="360"
          y="74"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontFamily="Inter, system-ui"
        >
          Ochiga Infrastructure Core
        </text>

        {/* Infrastructure Blocks */}
        {[
          { label: "Power Systems", y: 130 },
          { label: "Water Systems", y: 180 },
          { label: "Access & Security", y: 230 },
          { label: "Communications & Fiber", y: 280 },
          { label: "Payments & Billing", y: 330 },
        ].map((item) => (
          <g key={item.label}>
            <rect
              x="160"
              y={item.y}
              width="400"
              height="44"
              rx="8"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text
              x="360"
              y={item.y + 28}
              textAnchor="middle"
              fill="white"
              fontSize="13"
              fontFamily="Inter, system-ui"
            >
              {item.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function InfrastructurePage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 pb-32 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">

          {/* ===============================
              PAGE INTRO
          =============================== */}
          <header className="mb-20">
            <h1 className="text-3xl md:text-5xl font-medium mb-6">
              Infrastructure
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Infrastructure is not software.
              <br /><br />
              It is power, water, access, and systems that must work every day.
              Ochiga is designed to operate real-world infrastructure — not as
              isolated devices, but as interconnected systems across estates,
              buildings, and urban environments.
            </p>
          </header>

          {/* ===============================
              DIAGRAM
          =============================== */}
          <InfrastructureDiagram />

          {/* ===============================
              DOMAINS
          =============================== */}
          <section className="space-y-16">

            <div>
              <h2 className="text-xl font-medium mb-3">Power Infrastructure</h2>
              <p className="text-white/70 leading-relaxed">
                Electricity distribution, metering, monitoring, and fault
                detection across estates and buildings.
                <br /><br />
                Ochiga provides real-time power visibility, consumption tracking,
                outage detection, and coordination between grid, generators,
                and backup systems.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">Water Infrastructure</h2>
              <p className="text-white/70 leading-relaxed">
                Water distribution, storage, pumping, and monitoring are treated
                as first-class infrastructure systems.
                <br /><br />
                Ochiga enables usage visibility, leakage detection, pump status
                monitoring, and estate-level water governance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">Access & Security</h2>
              <p className="text-white/70 leading-relaxed">
                Physical access is governed by identity, role, and authority.
                <br /><br />
                Ochiga controls gates, doors, zones, and visitor access while
                logging security events as part of the operational system —
                not as disconnected tools.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Communications & Fiber
              </h2>
              <p className="text-white/70 leading-relaxed">
                Infrastructure cannot operate without connectivity.
                <br /><br />
                Ochiga models fiber routes, junction points, and connectivity
                health, treating communications as a critical utility rather
                than background IT.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Payments & Billing
              </h2>
              <p className="text-white/70 leading-relaxed">
                Infrastructure usage must be measurable and billable.
                <br /><br />
                Ochiga integrates payments directly into operations —
                utilities, estate fees, service charges — linking financial
                events to physical assets and units.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Facilities & Maintenance
              </h2>
              <p className="text-white/70 leading-relaxed">
                Assets age. Systems degrade.
                <br /><br />
                Ochiga tracks facilities, assets, maintenance events, and
                operational health, enabling proactive maintenance rather
                than reactive firefighting.
              </p>
            </div>

          </section>

          {/* ===============================
              OPERATIONS
          =============================== */}
          <section className="mt-24 space-y-10">
            <h2 className="text-2xl font-medium">
              How Ochiga Operates Infrastructure
            </h2>
            <p className="text-white/70 leading-relaxed">
              Ochiga does not replace existing infrastructure.
              <br /><br />
              It governs and coordinates it — observing systems in real time,
              logging events, enforcing access and operational rules, and
              reflecting reality into a live Digital Twin.
            </p>
          </section>

          {/* ===============================
              SCALE
          =============================== */}
          <section className="mt-24 space-y-10">
            <h2 className="text-2xl font-medium">
              From Single Buildings to City-Scale
            </h2>
            <p className="text-white/70 leading-relaxed">
              The same core system adapts across different scales:
              <br /><br />
              Individual buildings, residential estates, mixed-use developments,
              multi-estate operators, and urban infrastructure systems — without
              fragmentation.
            </p>
          </section>

          {/* ===============================
              CLOSING
          =============================== */}
          <section className="mt-28">
            <p className="text-white/60 leading-relaxed">
              Infrastructure is measured in decades, not product cycles.
              <br /><br />
              Ochiga is built to survive hardware changes, adapt to regulatory
              shifts, support governance, and maintain operational continuity.
              <br /><br />
              This is infrastructure designed to last.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
