import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import PlaceholderNotice from "@/app/components/PlaceholderNotice";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnershipsLandowners);

export default function LandownersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships / Landowners"
        title="Unlock the potential of your land."
        description="Ochiga evaluates strategically located real estate for structured development partnerships with landowners."
      >
        <CTAButton href="/contact">Propose a Development</CTAButton>
      </PageHero>
      <SectionBlock eyebrow="Process" title="From submission to structured joint venture.">
        <ProcessFlow steps={["Submit", "Review", "Feasibility", "Structure", "JV", "Development"]} />
      </SectionBlock>
      <PlaceholderNotice note="the full multi-step JV proposal form (site details, ownership status, document upload) is Phase 3 conversion work, built on the generalized lead API. The CTA above currently routes to Contact." />
    </main>
  );
}
