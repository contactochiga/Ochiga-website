import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnerships);

const pathways = [
  { title: "Landowners / Joint Ventures", body: "Unlock the potential of your land through a structured development partnership.", href: "/partnerships/landowners" },
  { title: "Capital Partners", body: "Work with Ochiga around structured real estate development opportunities.", href: "/partnerships/capital" },
  { title: "Buyers / Offtake", body: "Priority access and offtake pathways for Ochiga development studies and inventory.", href: "/partnerships/buyers" },
  { title: "Professional / Strategic Partners", body: "Architecture, engineering, construction, sales, finance, legal, valuation, facility management and technology partners.", href: "/partnerships/professional" },
];

export default function PartnershipsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships"
        title="Pathways to work with Ochiga."
        description="Ochiga works with the entities responsible for real infrastructure and real estate outcomes — landowners, capital partners, buyers and professional partners."
      />
      <SectionBlock>
        <div className="grid gap-6 md:grid-cols-2">
          {pathways.map((item) => (
            <a key={item.href} href={item.href} className="rounded border border-ochiga-white/10 p-7 transition-colors duration-base hover:border-ochiga-white/30">
              <h3 className="font-display text-xl text-ochiga-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ochiga-white/60">{item.body}</p>
            </a>
          ))}
        </div>
      </SectionBlock>
    </main>
  );
}
