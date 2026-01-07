"use client";

function GovernanceDiagram() {
  return (
    <div className="overflow-x-auto mt-12 mb-16">
      <svg
        width="720"
        height="420"
        viewBox="0 0 720 420"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%" }}
      >
        <rect width="720" height="420" fill="none" />

        {/* Top Authority */}
        <rect
          x="210"
          y="40"
          width="300"
          height="52"
          rx="10"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.18)"
        />
        <text
          x="360"
          y="72"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontFamily="Inter, system-ui"
        >
          Ownership & Legal Authority
        </text>

        {/* Middle Layer */}
        {[
          { label: "Estate / Facility Management", y: 120 },
          { label: "Operational Rules & Policies", y: 175 },
        ].map((item) => (
          <g key={item.label}>
            <rect
              x="180"
              y={item.y}
              width="360"
              height="44"
              rx="8"
              fill="rgba(255,255,255,0.06)"
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

        {/* Bottom Layer */}
        {[
          { label: "Residents & Users", y: 245 },
          { label: "Vendors & Service Providers", y: 295 },
          { label: "Automated Systems", y: 345 },
        ].map((item) => (
          <g key={item.label}>
            <rect
              x="200"
              y={item.y}
              width="320"
              height="40"
              rx="8"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.1)"
            />
            <text
              x="360"
              y={item.y + 26}
              textAnchor="middle"
              fill="white"
              fontSize="12.5"
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

export default function GovernancePage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 pb-32 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">

          {/* ===============================
              INTRO
          =============================== */}
          <header className="mb-20">
            <h1 className="text-3xl md:text-5xl font-medium mb-6">
              Governance
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Infrastructure fails when authority is unclear.
              <br /><br />
              Governance defines who can act, who can decide, who can override,
              and who is accountable — across people, systems, and assets.
              <br /><br />
              Ochiga embeds governance directly into infrastructure operations.
            </p>
          </header>

          {/* ===============================
              DIAGRAM
          =============================== */}
          <GovernanceDiagram />

          {/* ===============================
              WHY GOVERNANCE
          =============================== */}
          <section className="space-y-14">

            <div>
              <h2 className="text-xl font-medium mb-3">
                Why Governance Matters
              </h2>
              <p className="text-white/70 leading-relaxed">
                Many estates and facilities operate without clear operational
                authority.
                <br /><br />
                Decisions are informal. Overrides are undocumented.
                Access is shared. Accountability is blurred.
                <br /><br />
                Ochiga treats governance as a system — not a policy document.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Authority Before Automation
              </h2>
              <p className="text-white/70 leading-relaxed">
                Automation without authority creates risk.
                <br /><br />
                Ochiga enforces identity, roles, and permissions before systems
                can act — whether it is access control, billing, shutdowns,
                or emergency overrides.
              </p>
            </div>

          </section>

          {/* ===============================
              GOVERNANCE LAYERS
          =============================== */}
          <section className="mt-24 space-y-16">

            <div>
              <h2 className="text-xl font-medium mb-3">
                Ownership & Legal Authority
              </h2>
              <p className="text-white/70 leading-relaxed">
                Property owners, developers, and institutions define the
                highest level of authority.
                <br /><br />
                Ochiga records ownership boundaries, legal constraints, and
                governance scope — forming the foundation of all decisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Estate & Facility Management
              </h2>
              <p className="text-white/70 leading-relaxed">
                Facility managers and estate operators act within defined
                authority.
                <br /><br />
                Ochiga enforces what actions are permitted, logged, delegated,
                or escalated — eliminating informal control.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Operational Rules & Policies
              </h2>
              <p className="text-white/70 leading-relaxed">
                Rules govern how infrastructure behaves.
                <br /><br />
                Time-based access, billing cycles, emergency conditions,
                maintenance windows, and override rules are encoded into
                the system.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Residents, Users & Vendors
              </h2>
              <p className="text-white/70 leading-relaxed">
                Residents and service providers interact with infrastructure
                under strict boundaries.
                <br /><br />
                Ochiga ensures access is scoped, revocable, auditable, and
                aligned with governance — not convenience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Automated Systems
              </h2>
              <p className="text-white/70 leading-relaxed">
                Automation operates under governance.
                <br /><br />
                Systems can act only within approved rules, escalation paths,
                and authority limits — preventing runaway automation.
              </p>
            </div>

          </section>

          {/* ===============================
              AUDITABILITY
          =============================== */}
          <section className="mt-24 space-y-10">
            <h2 className="text-2xl font-medium">
              Auditability & Accountability
            </h2>
            <p className="text-white/70 leading-relaxed">
              Every action matters.
              <br /><br />
              Ochiga logs decisions, access events, overrides, and system actions
              as part of the operational record — enabling audits, dispute
              resolution, and regulatory compliance.
            </p>
          </section>

          {/* ===============================
              SCALE
          =============================== */}
          <section className="mt-24 space-y-10">
            <h2 className="text-2xl font-medium">
              Governance at Scale
            </h2>
            <p className="text-white/70 leading-relaxed">
              Governance scales from a single building to multi-estate operators
              and urban systems.
              <br /><br />
              The same principles apply — authority, accountability, visibility,
              and control — without fragmentation.
            </p>
          </section>

          {/* ===============================
              CLOSING
          =============================== */}
          <section className="mt-28">
            <p className="text-white/60 leading-relaxed">
              Infrastructure is power.
              <br /><br />
              Governance ensures that power is exercised responsibly,
              transparently, and sustainably.
              <br /><br />
              Ochiga makes governance operational.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
