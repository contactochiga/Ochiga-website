import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentMixedUse);

export default function MixedUsePage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Future Sectors"
        title="Future development direction beyond residential."
        description="While residential leads Ochiga's initial focus, the development approach is built to extend into mixed-use and other built-environment sectors as opportunities are evaluated."
      />
      <SectionBlock width="content">
        <p className="text-ochiga-white/65 leading-relaxed">
          Future asset sectors under evaluation may include hospitality, commercial, healthcare and
          mixed-use environments — always grounded in the same approach: architecture-led planning,
          disciplined delivery, and Oyi as the operating layer. Nothing here represents an active or
          acquired project; this is a statement of future direction, not a current pipeline.
        </p>
      </SectionBlock>
    </main>
  );
}
