import Section from "@/app/components/Section";
import ConsoleFrame from "@/app/components/ConsoleFrame";

export default function Entry() {
  return (
    <ConsoleFrame>
      <Section title="The Operating System for Physical Infrastructure">
        <p>
          Ochiga provides the core backend infrastructure used to manage people,
          assets, access, events, payments, and digital twins in physical
          environments.
        </p>

        <p>This is not an application. This is infrastructure.</p>
      </Section>
    </ConsoleFrame>
  );
}
