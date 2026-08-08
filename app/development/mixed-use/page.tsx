import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentMixedUse);

const sectors = [
  { title: "Residential", body: "Ochiga's current focus, and the foundation for how the approach extends elsewhere." },
  { title: "Hospitality", body: "Future-facing — evaluated where an opportunity genuinely fits Ochiga's model." },
  { title: "Commercial", body: "Future-facing — evaluated where an opportunity genuinely fits Ochiga's model." },
  { title: "Healthcare", body: "Future-facing — evaluated where an opportunity genuinely fits Ochiga's model." },
];

export default function MixedUsePage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Future Sectors"
        title="Future development direction beyond residential."
        description="While residential leads Ochiga's current focus, the development approach is built to extend across suitable residential, hospitality, commercial, healthcare and mixed-use environments as opportunities are evaluated."
      />
      <SectionBlock>
        <TileGrid columns={4}>
          {sectors.map((sector) => (
            <TileCard key={sector.title} title={sector.title} body={sector.body} />
          ))}
        </TileGrid>
        <p className="mt-10 max-w-2xl text-sm text-ochiga-white/45">
          This is a statement of future direction, not a current pipeline. Nothing here represents an
          active or acquired project.
        </p>
      </SectionBlock>
    </main>
  );
}
