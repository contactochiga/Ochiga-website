import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.privateInvestmentApproaches);

export default function InvestmentApproachesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ochiga Private / Investment Approaches"
        title="Access across different stages of the real-estate value cycle."
        description="Ochiga Private gives selected members access to opportunities across different stages of the real-estate value cycle — from origination through to hold or exit."
      />
      <SectionBlock>
        <ProcessFlow steps={["Discover", "Underwrite", "Structure", "Develop / Operate", "Create Value", "Hold / Exit"]} />
      </SectionBlock>
    </main>
  );
}
