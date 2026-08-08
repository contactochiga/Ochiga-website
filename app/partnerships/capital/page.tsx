import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnershipsCapital);

export default function CapitalPartnersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships / Capital"
        title="Capital partnerships around structured development."
        description="Ochiga works with capital partners around carefully structured real estate development opportunities, aligned with Ochiga Development and Ochiga Private."
      >
        <CTAButton href="/contact">Work With Ochiga</CTAButton>
      </PageHero>
    </main>
  );
}
