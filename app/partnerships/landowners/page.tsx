import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import PlaceholderNotice from "@/app/components/PlaceholderNotice";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnershipsLandowners);

const whatWeLookFor = [
  { title: "Strategic Location", body: "Sites in locations where development demand and planning context support a serious project." },
  { title: "Clear Title", body: "Documented ownership and a title status that can be structured into a partnership with confidence." },
  { title: "Genuine Scale", body: "Land size and context capable of supporting a real development outcome, not a speculative listing." },
];

export default function LandownersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships / Landowners"
        title="Unlock the potential of your land."
        description="Ochiga evaluates strategically located real estate for structured development partnerships with landowners — bringing development strategy, capital structuring, professional delivery and Oyi to sites landowners could not unlock alone."
      >
        <CTAButton href="/contact">Propose a Development</CTAButton>
      </PageHero>

      <SectionBlock eyebrow="Process" title="From submission to structured joint venture.">
        <ProcessFlow numbered steps={["Submit", "Review", "Feasibility", "Structure", "JV", "Development"]} />
      </SectionBlock>

      <SectionBlock eyebrow="What We Look For" title="Not every site is the right fit — and that's by design.">
        <TileGrid columns={3}>
          {whatWeLookFor.map((item) => (
            <TileCard key={item.title} title={item.title} body={item.body} />
          ))}
        </TileGrid>
      </SectionBlock>

      <PlaceholderNotice note="the full multi-step JV proposal form (site details, ownership status, document upload) is Phase 3 conversion work, built on the generalized lead API. The CTA above currently routes to Contact." />
    </main>
  );
}
