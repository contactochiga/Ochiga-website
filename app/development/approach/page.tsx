import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentApproach);

const principles = [
  { title: "Architecture-first", body: "Built form, rooms, structures, zones and estate hierarchy are established as the base layer before any system is layered on top." },
  { title: "Feasibility before ambition", body: "Concepts are tested against real land economics, planning context and market demand before they are presented as development direction." },
  { title: "Technology-enabled by design", body: "Every development is planned so Oyi can become part of its operational infrastructure from day one, not retrofitted later." },
  { title: "Honest project language", body: "Development studies and concepts are labelled as such. Nothing is presented as acquired, approved, under construction, or completed unless it is." },
];

export default function DevelopmentApproachPage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Approach"
        title="How Ochiga approaches development."
        description="Ochiga is architected as an integrated development and technology system, with a disciplined, staged process from opportunity to operations."
      />

      <SectionBlock eyebrow="Process" title="From opportunity to operations.">
        <ProcessFlow numbered steps={["Opportunity", "Feasibility", "Structure", "Design", "Capital", "Delivery", "Sales / Leasing", "Oyi Integration", "Operations"]} />
      </SectionBlock>

      <SectionBlock eyebrow="Principles" title="What discipline looks like in practice." width="content">
        <ul className="space-y-8">
          {principles.map((principle) => (
            <li key={principle.title}>
              <h3 className="font-display text-xl text-ochiga-white">{principle.title}</h3>
              <p className="mt-2 text-ochiga-white/60 leading-relaxed">{principle.body}</p>
            </li>
          ))}
        </ul>
      </SectionBlock>
    </main>
  );
}
