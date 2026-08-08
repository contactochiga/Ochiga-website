import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.development);

const studies = [
  {
    slug: "prime-vertical-living",
    name: "Prime Vertical Living",
    tag: "Development Study",
    body: "An approximately 18–21 storey high-end residential concept for sites where location, planning and land economics support vertical density.",
  },
  {
    slug: "contemporary-residential-community",
    name: "Contemporary Residential Community",
    tag: "Development Study",
    body: "A concept for approximately 40 premium homes on larger sites, subject to feasibility — terraces, townhouses, duplexes and landscaped communal space.",
  },
];

export default function DevelopmentPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Development", path: "/development" }])} />
      <PageHero
        eyebrow="Ochiga Development"
        title="Development built for what comes next."
        description="Ochiga Development is the physical development engine behind Ochiga — we create the physical asset, conceived from day one as a technology-enabled environment."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href="/development/studies">View Development Studies</CTAButton>
          <CTAButton href="/partnerships/landowners" variant="secondary">Propose a Development</CTAButton>
        </div>
      </PageHero>

      <SectionBlock
        eyebrow="Focus"
        title="A disciplined residential focus, with future optionality."
        description="Ochiga initially concentrates on residential development while maintaining optionality across mixed-use and other built-environment sectors as opportunities are evaluated."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((study) => (
            <Link
              key={study.slug}
              href="/development/studies"
              className="rounded border border-ochiga-white/10 p-7 transition-colors duration-base hover:border-ochiga-white/30"
            >
              <span className="inline-block rounded-sm border border-ochiga-red/40 px-2.5 py-1 text-[11px] uppercase tracking-wide text-ochiga-red">
                {study.tag}
              </span>
              <h3 className="mt-4 font-display text-xl text-ochiga-white">{study.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ochiga-white/60">{study.body}</p>
            </Link>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="From Land to Living Asset"
        title="Land, capital, expertise, technology and market access, brought together deliberately."
        description="Ochiga brings together land, capital, specialist expertise, technology and market access around carefully selected development opportunities."
      >
        <ProcessFlow steps={["Land", "Capital", "Development", "Buyers", "Oyi", "Operations", "Long-Term Asset Value"]} />
      </SectionBlock>

      <SectionBlock
        eyebrow="Technology-Enabled by Design"
        title="Every Ochiga development is conceived to run on Oyi."
        description="Traditional development ends at handover. Ochiga developments continue: design, build, connect, operate, learn, improve — with Oyi as the operating layer."
      >
        <CTAButton href="/oyi" variant="secondary">Discover Oyi</CTAButton>
      </SectionBlock>
    </main>
  );
}
