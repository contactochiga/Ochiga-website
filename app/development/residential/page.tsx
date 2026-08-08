import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentResidential);

export default function ResidentialPage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Residential"
        title="Residential development is Ochiga's initial focus."
        description="Ochiga is concentrating on premium residential development first, where architecture, land economics and Oyi's operating layer combine most directly."
      />

      <SectionBlock eyebrow="Development Study" title="Prime Vertical Living" width="content">
        <p className="text-ochiga-white/65 leading-relaxed">
          A concept for an approximately 18–21 storey high-end residential development, for sites where
          location, planning and land economics support vertical density. Potential components include
          premium apartments, larger family residences and penthouses, alongside wellness, pool, gym,
          residents&apos; lounge, concierge, smart access, parking, intelligent utilities and Oyi throughout.
        </p>
      </SectionBlock>

      <SectionBlock eyebrow="Development Study" title="Contemporary Residential Community" width="content">
        <p className="text-ochiga-white/65 leading-relaxed">
          A concept for approximately 40 premium homes on larger sites, subject to feasibility — a mix of
          terraces, townhouses, duplexes and low-rise apartments where appropriate, with landscaped
          communal space, a clubhouse, wellness and recreation, smart infrastructure and Oyi integration.
        </p>
      </SectionBlock>

      <SectionBlock width="content">
        <p className="mb-8 text-sm text-ochiga-white/45">
          These are development studies and concepts, not acquired sites, approved projects or an
          existing Ochiga portfolio. Working names are internal and subject to trademark and domain review.
        </p>
        <CTAButton href="/development/studies">View all Development Studies</CTAButton>
      </SectionBlock>
    </main>
  );
}
