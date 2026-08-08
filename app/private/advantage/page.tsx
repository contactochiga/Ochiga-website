import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.privateAdvantage);

const advantages = [
  { title: "Curated Access", body: "Opportunities are selectively reviewed, not broadly listed." },
  { title: "Development-Led", body: "Ochiga can originate, structure, develop or add value rather than simply reposting listings." },
  { title: "Built-Environment Intelligence", body: "Ochiga brings construction, development and technology understanding to every opportunity." },
  { title: "Technology Advantage", body: "Suitable developments can benefit from Oyi's operating layer." },
  { title: "Private by Design", body: "Briefings and opportunities may be shared selectively based on fit." },
];

export default function PrivateAdvantagePage() {
  return (
    <main>
      <PageHero
        eyebrow="Ochiga Private / Advantage"
        title="What makes Ochiga Private different."
      />
      <SectionBlock>
        <div className="grid gap-8 md:grid-cols-2">
          {advantages.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-lg text-ochiga-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ochiga-white/60">{item.body}</p>
            </div>
          ))}
        </div>
      </SectionBlock>
    </main>
  );
}
