import Section from "@/app/components/Section";

export default function ArchitecturePage() {
  return (
    <Section title="Architecture">
      {/* ===============================
          INTRO
      =============================== */}
      <div className="max-w-3xl">
        <p className="text-lg text-white/75 leading-relaxed">
          Ochiga is architected as an <strong>Infrastructure Operating System</strong> —
          not an application, not a dashboard, and not a collection of tools.
        </p>

        <p className="mt-6 text-white/65 leading-relaxed">
          The system is designed to govern real-world environments by establishing
          authority, identity, and operational continuity before automation.
          This architecture allows Ochiga to scale from single buildings to
          multi-estate and city-scale infrastructure.
        </p>
      </div>

      {/* ===============================
          CORE PRINCIPLES
      =============================== */}
      <div className="mt-20 max-w-3xl">
        <h3 className="text-xl font-medium mb-6">Architectural Principles</h3>

        <ul className="space-y-4 text-white/70">
          <li>
            <strong>Infrastructure-first:</strong> Systems are modeled before devices,
            ensuring long-term operability and governance.
          </li>
          <li>
            <strong>Estate-native:</strong> The platform understands estates, buildings,
            facilities, and zones as first-class entities.
          </li>
          <li>
            <strong>Digital twin driven:</strong> All operations are reflected against a
            live spatial and operational model.
          </li>
          <li>
            <strong>Modular, not monolithic:</strong> Components evolve independently
            without breaking the core.
          </li>
          <li>
            <strong>Governance-aware:</strong> Identity, access, and authority are enforced
            across all layers.
          </li>
        </ul>
      </div>

      {/* ===============================
          SYSTEM LAYERS
      =============================== */}
      <div className="mt-24">
        <h3 className="text-xl font-medium mb-8">System Layers</h3>

        <ArchitectureDiagram />
      </div>

      {/* ===============================
          LAYER EXPLANATION
      =============================== */}
      <div className="mt-24 max-w-3xl space-y-6 text-white/70 leading-relaxed">
        <p>
          <strong>Interface Layer</strong> — Web, mobile, and command center interfaces
          used by residents, operators, and administrators.
        </p>

        <p>
          <strong>Operational Systems</strong> — Power, water, access, payments,
          security, communications, and facility operations.
        </p>

        <p>
          <strong>Digital Twin</strong> — A real-time spatial and logical representation
          of infrastructure, assets, and activity.
        </p>

        <p>
          <strong>Identity & Access</strong> — Unified identity for people, devices,
          assets, and zones, enforcing permissions and accountability.
        </p>

        <p>
          <strong>Governance Layer</strong> — Policies, auditability, lifecycle control,
          and long-term system continuity.
        </p>
      </div>

      {/* ===============================
          CLOSING
      =============================== */}
      <div className="mt-28 max-w-3xl">
        <p className="text-white/75 leading-relaxed">
          This architecture allows Ochiga to operate infrastructure as a living system —
          continuously observable, governable, and adaptable across decades.
        </p>
      </div>
    </Section>
  );
}

/* ===============================
   ARCHITECTURE DIAGRAM
================================ */

function ArchitectureDiagram() {
  return (
    <div className="overflow-x-auto">
      <svg
        width="640"
        height="360"
        viewBox="0 0 640 360"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%" }}
      >
        {[
          "Interface Layer",
          "Operational Systems",
          "Digital Twin",
          "Identity & Access",
          "Governance",
        ].map((label, i) => (
          <g key={label}>
            <rect
              x="120"
              y={40 + i * 58}
              width="400"
              height="44"
              rx="10"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.14)"
            />
            <text
              x="320"
              y={68 + i * 58}
              fill="white"
              fontSize="13"
              textAnchor="middle"
              fontFamily="Inter, system-ui"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
