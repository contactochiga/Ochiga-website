import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import TrustDisclaimer from "@/app/components/TrustDisclaimer";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnershipsCapital);

export default function CapitalPartnersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships / Capital"
        title="Structured relationships around qualifying opportunities."
        description="Ochiga works with private and institutional capital relationships around qualifying real-estate development opportunities — evaluated and structured on a per-opportunity basis, alongside Ochiga Development and Ochiga Private."
      >
        <CTAButton href="/partnerships?type=capital#partner-with-ochiga">Discuss Capital Partnership</CTAButton>
      </PageHero>

      <SectionBlock width="content">
        <TrustDisclaimer>
          Ochiga does not currently hold committed capital facilities to disclose publicly, and this page
          does not represent an offer, commitment, or solicitation of capital. Capital relationships are
          explored individually, opportunity by opportunity.
        </TrustDisclaimer>
      </SectionBlock>
    </main>
  );
}
