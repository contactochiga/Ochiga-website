import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentJointVentures);

export default function JointVenturesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Joint Ventures"
        title="Structured partnerships with landowners and strategic partners."
        description="Joint ventures let Ochiga bring development, technology and market access to strategically located land without requiring outright acquisition."
      >
        <CTAButton href="/partnerships/landowners">Propose a Development</CTAButton>
      </PageHero>
      <SectionBlock eyebrow="Process" title="From submission to structured partnership.">
        <ProcessFlow steps={["Submit", "Review", "Feasibility", "Structure", "JV", "Development"]} />
      </SectionBlock>
    </main>
  );
}
