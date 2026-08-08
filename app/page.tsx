import Link from "next/link";
import EngineTriad from "@/app/components/EngineTriad";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import PlaceholderNotice from "@/app/components/PlaceholderNotice";
import { companyInfo, ctas } from "@/lib/company";
import { getAllInsights } from "@/lib/content";

export default async function HomePage() {
  const insights = (await getAllInsights()).slice(0, 3);

  return (
    <main>
      {/* A — HERO (static Phase 1 version; cinematic WebGL build is Phase 4) */}
      <section className="flex min-h-screen flex-col justify-end border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-20 pt-40 md:px-10">
        <div className="mx-auto w-full max-w-cinematic">
          <p className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">
            {companyInfo.tagline}
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ochiga-white md:text-7xl">
            We Build Intelligent Places.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ochiga-white/65">
            {companyInfo.supportingStatement}
          </p>
          <p className="mt-4 text-sm uppercase tracking-wide text-ochiga-white/40">
            Development. Technology. Private Capital.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CTAButton href={ctas.exploreDevelopment.href}>{ctas.exploreDevelopment.label}</CTAButton>
            <CTAButton href={ctas.discoverOyi.href} variant="secondary">{ctas.discoverOyi.label}</CTAButton>
          </div>
        </div>
      </section>

      <PlaceholderNotice note="the cinematic scroll-driven hero (Chapter 01 Develop / 02 Operate / 03 Participate, WebGL + R3F) is Phase 4. This is the static foundation version." />

      {/* B — DEVELOPMENT + OYI + OCHIGA PRIVATE */}
      <SectionBlock eyebrow="The Ochiga Ecosystem" title="Three engines. One ecosystem.">
        <EngineTriad />
      </SectionBlock>

      {/* C — FROM LAND TO LIVING ASSET */}
      <SectionBlock
        eyebrow="From Land to Living Asset"
        title="Land, capital, expertise, technology and market access, brought together deliberately."
        description="Ochiga brings together land, capital, specialist expertise, technology and market access around carefully selected development opportunities."
      >
        <ProcessFlow steps={["Land", "Capital", "Development", "Buyers", "Oyi", "Operations", "Long-Term Asset Value"]} />
      </SectionBlock>

      {/* D — DEVELOPMENT */}
      <SectionBlock
        eyebrow="Ochiga Development"
        title="Development built for what comes next."
        description="Ochiga's initial development studies span prime vertical living and contemporary residential communities — concepts and studies, not an existing portfolio."
      >
        <CTAButton href="/development" variant="secondary">Explore Development</CTAButton>
      </SectionBlock>

      {/* E — OYI */}
      <SectionBlock
        eyebrow="Oyi"
        title="Buildings that continue to evolve."
        description="Traditional development ends at handover. Ochiga developments continue: design, build, connect, operate, learn, improve."
      >
        <CTAButton href="/oyi" variant="secondary">Discover Oyi</CTAButton>
      </SectionBlock>

      {/* F — OCHIGA PRIVATE */}
      <SectionBlock
        eyebrow="Ochiga Private"
        title="Private access to real estate opportunities."
        description="A private investment circle connecting selected investors to carefully considered real-estate opportunities and development partnerships."
        tone="light"
      >
        <CTAButton href={ctas.requestMembership.href}>{ctas.requestMembership.label}</CTAButton>
      </SectionBlock>

      {/* G — PARTNER WITH OCHIGA */}
      <SectionBlock eyebrow="Partner With Ochiga" title="Pathways to work with us.">
        <div className="flex flex-wrap gap-4">
          <CTAButton href="/partnerships/landowners" variant="secondary">Landowner</CTAButton>
          <CTAButton href="/partnerships/capital" variant="secondary">Capital Partner</CTAButton>
          <CTAButton href="/partnerships/buyers" variant="secondary">Buyer</CTAButton>
          <CTAButton href="/partnerships/professional" variant="secondary">Professional Partner</CTAButton>
        </div>
      </SectionBlock>

      {/* H — JOURNEY / COMPANY */}
      <SectionBlock eyebrow="Our Journey" title="Built environment experience, brought into an integrated ecosystem.">
        <p className="max-w-2xl text-ochiga-white/65 leading-relaxed">
          Ochiga&apos;s journey began in 2013 in the built environment, through specialist construction
          finishes, flooring and project delivery — expanding through broader construction delivery,
          building technology, and Oyi, into the integrated development and technology company Ochiga
          is today.
        </p>
        <CTAButton href="/about" variant="ghost">Read our journey →</CTAButton>
      </SectionBlock>

      {/* I — INSIGHTS */}
      {insights.length ? (
        <SectionBlock eyebrow="Insights" title="Recent Ochiga perspectives.">
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((insight) => (
              <Link key={insight.slug} href={`/insights/${insight.slug}`} className="rounded border border-ochiga-white/10 p-6 transition-colors duration-base hover:border-ochiga-white/30">
                <p className="text-xs uppercase tracking-wide text-ochiga-red">{insight.category}</p>
                <h3 className="mt-3 font-display text-base text-ochiga-white">{insight.title}</h3>
              </Link>
            ))}
          </div>
        </SectionBlock>
      ) : null}
    </main>
  );
}
