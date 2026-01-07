// app/papers/digital-twins-operational/page.tsx

import Section from "@/app/components/Section";

export default function DigitalTwinsOperationalPaper() {
  return (
    <Section title="Digital Twins as Operational Infrastructure">
      <p className="text-white/70 mb-8">
        <strong>Abstract</strong><br />
        Digital twins are often reduced to visual models or monitoring tools.
        This paper reframes digital twins as operational infrastructure —
        authoritative system representations that govern assets, access,
        utilities, and activity across physical environments in real time.
      </p>

      <h3>1. The Digital Twin Misconception</h3>
      <p>
        Most digital twin implementations today focus on visualization:
        dashboards, 3D models, and static asset maps. These approaches treat
        digital twins as outputs rather than systems.
      </p>
      <p>
        As a result, they fail to enforce rules, coordinate systems, or persist
        operational state over time.
      </p>

      <h3>2. Why Visualization-First Twins Fail</h3>
      <p>
        Visualization-first digital twins sit outside real operational control.
        They observe infrastructure but do not govern it.
      </p>
      <p>
        Without authority, a digital twin cannot control access, enforce
        permissions, or act as a system of record. Over time, it degrades into
        a stale diagram.
      </p>

      <h3>3. Digital Twins as System Authority</h3>
      <p>
        A true digital twin must function as an authoritative layer — not a
        mirror. It must define what exists, what is allowed, and what has
        changed within an infrastructure environment.
      </p>
      <p>
        In this model, every asset, action, and permission flows through the
        digital twin.
      </p>

      <h3>4. Estate-Level Operational Twins</h3>
      <p>
        Infrastructure does not operate at device level. It operates at estate,
        building, and zone levels.
      </p>
      <p>
        Estate-level digital twins enable unified access control, asset
        lifecycle tracking, utility governance, and coordinated response across
        complex environments.
      </p>

      <h3>5. Digital Twins Inside an Infrastructure OS</h3>
      <p>
        Within an Infrastructure Operating System, the digital twin becomes the
        system core. Assets register to it. Permissions are enforced by it.
        Events are logged through it.
      </p>
      <p>
        This creates infrastructure memory — a persistent operational record
        that survives personnel changes and system upgrades.
      </p>

      <h3>6. From Monitoring to Governance</h3>
      <p>
        Monitoring answers what is happening. Governance determines what is
        allowed to happen.
      </p>
      <p>
        Operational digital twins enable policy-driven infrastructure:
        predictive maintenance, controlled access, and automated enforcement
        across systems.
      </p>

      <h3>7. Implications for Emerging Cities</h3>
      <p>
        In environments where infrastructure suffers from poor maintenance,
        fragmented ownership, and manual processes, operational digital twins
        provide continuity without dependency on individuals.
      </p>
      <p>
        This is critical for long-term infrastructure governance across African
        cities.
      </p>

      <h3>8. Conclusion</h3>
      <p>
        Digital twins are not visualization layers. They are operational systems.
      </p>
      <p>
        When embedded within an Infrastructure Operating System, digital twins
        become the mechanism through which infrastructure is governed, evolved,
        and sustained over time.
      </p>
      <p>
        Ochiga builds digital twins not as representations, but as living
        operational infrastructure.
      </p>
    </Section>
  );
}
