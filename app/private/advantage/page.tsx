import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import SplitSection from "@/app/components/SplitSection";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.privateAdvantage);

const advantages = [
  { title: "Curated Access", body: "Opportunities are selectively reviewed, not broadly listed or marketed to the public." },
  { title: "Development-Led", body: "Ochiga can originate, structure, develop or add value — rather than simply reposting listings from elsewhere." },
  { title: "Built-Environment Intelligence", body: "Construction, development and technology understanding sits behind every opportunity Ochiga brings forward." },
  { title: "Technology Advantage", body: "Suitable developments can benefit from Oyi's operating layer — a differentiator most private real estate networks don't have." },
  { title: "Private by Design", body: "Briefings and opportunities may be shared selectively, based on member fit rather than volume." },
];

export default function PrivateAdvantagePage() {
  return (
    <main>
      <PageHero eyebrow="Ochiga Private / Advantage" title="What makes Ochiga Private different." />

      <SectionBlock>
        <div className="grid gap-10 md:grid-cols-2">
          {advantages.map((item) => (
            <div key={item.title} className="border-t border-ochiga-white/10 pt-6">
              <h3 className="font-display text-lg text-ochiga-white md:text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ochiga-white/60">{item.body}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SplitSection
        eyebrow="The Technology Advantage"
        title="Real estate access, backed by a technology company."
        description="Ochiga Private opportunities that involve Ochiga-developed or Ochiga-adjacent assets can carry the Oyi operating layer — durable value most private real-estate networks simply cannot offer."
        surfaceLabel="Oyi Operating Layer"
        tone="red"
        reverse
      >
        <CTAButton href="/technology" variant="secondary">Discover Oyi</CTAButton>
      </SplitSection>
    </main>
  );
}
