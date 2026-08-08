import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnerships);

const pathways = [
  { title: "Landowners / Joint Ventures", body: "Unlock the potential of your land through a structured development partnership.", href: "/partnerships/landowners", tag: "Origination" },
  { title: "Capital Partners", body: "Structured relationships with private and institutional capital around qualifying opportunities.", href: "/partnerships/capital", tag: "Capital" },
  { title: "Buyers / Offtake", body: "Priority access and offtake pathways for Ochiga development studies and inventory.", href: "/partnerships/buyers", tag: "Offtake" },
  { title: "Professional / Strategic Partners", body: "Architecture, engineering, construction, sales, finance, legal, valuation, facility management and technology partners.", href: "/partnerships/professional", tag: "Delivery" },
];

export default function PartnershipsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships"
        title="Ochiga works through an ecosystem."
        description="No single Ochiga project happens alone — landowners, capital partners, buyers and professional partners each play a distinct role across the development lifecycle."
      />
      <SectionBlock>
        <TileGrid columns={2}>
          {pathways.map((item) => (
            <TileCard key={item.href} href={item.href} tag={item.tag} title={item.title} body={item.body} />
          ))}
        </TileGrid>
      </SectionBlock>
    </main>
  );
}
