import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnershipsBuyers);

export default function BuyersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships / Buyers"
        title="Priority access to Ochiga development inventory."
        description="Buyers and offtake partners get priority access to selected Ochiga development studies as they progress toward launch."
      >
        <CTAButton href="/development/studies">View Development Studies</CTAButton>
      </PageHero>
    </main>
  );
}
