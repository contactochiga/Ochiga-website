import Section from "@/app/components/Section";

export default function Paper() {
  return (
    <Section title="The Infrastructure Operating System">
      <article className="max-w-3xl mx-auto space-y-10 text-white/85 leading-relaxed">

        {/* Meta */}
        <div className="text-sm text-white/50">
          <p>Published by Ochiga</p>
          <p>Version 1.0 · Foundational Paper</p>
        </div>

        {/* Abstract */}
        <section>
          <h2 className="text-lg font-medium text-white mb-3">
            Abstract
          </h2>
          <p>
            Physical infrastructure continues to fail not due to a lack of
            technology, but due to the absence of a unified operating model.
            While software has transformed nearly every industry, infrastructure
            remains fragmented, reactive, and manually governed.
          </p>
          <p className="mt-4">
            This paper introduces the concept of an Infrastructure Operating
            System — a persistent operational layer designed to govern access,
            assets, utilities, and live systems across estates and physical
            environments.
          </p>
        </section>

        {/* Problem */}
        <section>
          <h2 className="text-lg font-medium text-white mb-3">
            The Problem of Fragmented Infrastructure
          </h2>
          <p>
            Most infrastructure systems are designed around construction and
            delivery, not long-term operation. Once deployed, systems are handed
            over as isolated components — access control, power, water, security —
            each operating independently.
          </p>
          <p className="mt-4">
            This fragmentation results in operational blind spots, security
            gaps, maintenance inefficiencies, and governance failures over time.
          </p>
        </section>

        {/* Why Existing Models Fail */}
        <section>
          <h2 className="text-lg font-medium text-white mb-3">
            Why Existing Models Fail
          </h2>
          <p>
            Current “smart” infrastructure solutions focus on devices and
            dashboards rather than systems. Applications manage interfaces,
            but they do not govern infrastructure.
          </p>
          <p className="mt-4">
            Without a unified authority layer, infrastructure decisions remain
            human-bound, undocumented, and inconsistent across time.
          </p>
        </section>

        {/* Infrastructure as a System */}
        <section>
          <h2 className="text-lg font-medium text-white mb-3">
            Infrastructure as a Continuous System
          </h2>
          <p>
            Infrastructure must be treated as a continuous lifecycle —
            from planning to deployment to long-term operation.
          </p>
          <p className="mt-4">
            Estates, buildings, and campuses represent the true atomic units
            of infrastructure control. They are the boundaries within which
            systems must operate coherently.
          </p>
        </section>

        {/* Infrastructure OS */}
        <section>
          <h2 className="text-lg font-medium text-white mb-3">
            The Infrastructure Operating System
          </h2>
          <p>
            An Infrastructure Operating System is not an application or a
            dashboard. It is a persistent operational layer that governs
            infrastructure state, access, assets, and events over time.
          </p>
          <p className="mt-4">
            This operating layer remains independent of hardware vendors,
            enabling long-term stability and scalability.
          </p>
        </section>

        {/* Digital Twins */}
        <section>
          <h2 className="text-lg font-medium text-white mb-3">
            Digital Twins as an Operational Core
          </h2>
          <p>
            Digital twins within an Infrastructure OS are not visualization
            tools. They act as live system mirrors — synchronizing assets,
            utilities, access, and activity in real time.
          </p>
          <p className="mt-4">
            This creates infrastructure memory, operational traceability,
            and long-term intelligence.
          </p>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-lg font-medium text-white mb-3">
            Conclusion
          </h2>
          <p>
            Infrastructure must be designed to operate, not merely exist.
            The Infrastructure Operating System represents a necessary shift
            toward governance-driven, systemized physical environments.
          </p>
          <p className="mt-4">
            Ochiga exists to build this operating layer — enabling infrastructure
            that can be planned, deployed, and operated as a living system.
          </p>
        </section>

      </article>
    </Section>
  );
}
