import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentStudies);

const studies = [
  {
    name: "Prime Vertical Living",
    status: "Development Study — Concept",
    body: "Approximately 18–21 storeys of high-end residential development for sites where location, planning and land economics support vertical density. Premium apartments, larger family residences, penthouses, wellness, pool, gym, residents' lounge, concierge, smart access, parking, intelligent utilities and Oyi throughout.",
  },
  {
    name: "Contemporary Residential Community",
    status: "Development Study — Concept",
    body: "Approximately 40 premium homes on larger sites, subject to feasibility. Terraces, townhouses, duplexes and low-rise apartments where appropriate, landscaped communal space, a clubhouse, wellness and recreation, smart infrastructure and Oyi integration.",
  },
];

export default function DevelopmentStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Studies"
        title="Coming soon: Ochiga's current development studies."
        description="These are development studies and concepts — not acquired sites, approved projects, developments under construction, or an existing Ochiga portfolio."
      />
      <SectionBlock>
        <div className="grid gap-8 md:grid-cols-2">
          {studies.map((study) => (
            <article key={study.name} className="rounded border border-ochiga-white/10 p-8">
              <span className="inline-block rounded-sm border border-ochiga-red/40 px-2.5 py-1 text-[11px] uppercase tracking-wide text-ochiga-red">
                {study.status}
              </span>
              <h2 className="mt-5 font-display text-2xl text-ochiga-white">{study.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ochiga-white/60">{study.body}</p>
            </article>
          ))}
        </div>
      </SectionBlock>
    </main>
  );
}
