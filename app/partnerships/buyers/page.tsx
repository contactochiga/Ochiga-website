import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnershipsBuyers);

export default function BuyersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships / Buyers"
        title="Priority access to Ochiga development inventory."
        description="Buyers and offtake partners get priority access to selected Ochiga development studies as they progress toward launch — early visibility on unit types, pricing direction, and release timing."
      >
        <CTAButton href="/development/studies">View Development Studies</CTAButton>
      </PageHero>

      <SectionBlock width="content">
        <p className="text-ochiga-white/60 leading-relaxed">
          This pathway is for people buying a home or unit within an Ochiga development, not for capital
          or investment partnerships — those are handled through{" "}
          <a href="/partnerships/capital" className="text-ochiga-white underline decoration-ochiga-red/60 underline-offset-4">
            Capital Partners
          </a>{" "}
          or{" "}
          <a href="/private" className="text-ochiga-white underline decoration-ochiga-red/60 underline-offset-4">
            Ochiga Private
          </a>
          .
        </p>
      </SectionBlock>
    </main>
  );
}
