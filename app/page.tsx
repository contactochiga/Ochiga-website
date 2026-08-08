import Link from "next/link";
import EngineTriad from "@/app/components/EngineTriad";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import StatementBlock from "@/app/components/StatementBlock";
import SplitSection from "@/app/components/SplitSection";
import CTABand from "@/app/components/CTABand";
import InsightCard from "@/app/components/InsightCard";
import PlaceholderNotice from "@/app/components/PlaceholderNotice";
import { companyInfo, ctas } from "@/lib/company";
import { getAllInsights } from "@/lib/content";

export default async function HomePage() {
  const insights = (await getAllInsights()).slice(0, 3);

  return (
    <main>
      {/* HERO — static Phase 2 version. DOM is deliberately simple and
          section-scoped so Phase 4 can swap in a WebGL/cinematic layer
          (id="hero-stage") without restructuring the page. */}
      <section id="hero-stage" className="relative flex min-h-screen flex-col justify-end overflow-hidden border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-20 pt-40 md:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: "linear-gradient(rgba(246,243,236,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(246,243,236,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />
        <div className="relative z-10 mx-auto w-full max-w-cinematic">
          <p className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">
            {companyInfo.tagline}
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ochiga-white md:text-7xl">
            We Build Intelligent Places.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ochiga-white/65">
            Ochiga develops real estate and the technology that powers how buildings live, operate and evolve.
          </p>
          <p className="mt-4 text-sm uppercase tracking-wide text-ochiga-white/40">
            Development. Technology. Private Capital.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CTAButton href={ctas.exploreDevelopment.href}>{ctas.exploreDevelopment.label}</CTAButton>
            <CTAButton href={ctas.discoverOyi.href} variant="secondary">{ctas.discoverOyi.label}</CTAButton>
            <Link href="/private" className="text-sm text-ochiga-white/55 underline decoration-ochiga-red/60 underline-offset-4 hover:text-ochiga-white">
              Ochiga Private →
            </Link>
          </div>
        </div>
      </section>

      <PlaceholderNotice note="the cinematic scroll-driven hero (Chapter 01 Develop / 02 Operate / 03 Participate, WebGL + R3F) is Phase 4. #hero-stage is scoped so that layer can be added without restructuring this page." />

      {/* THREE ENGINES */}
      <SectionBlock eyebrow="The Ochiga Ecosystem" title="Three engines. One ecosystem.">
        <EngineTriad />
      </SectionBlock>

      {/* FROM LAND TO LIVING ASSET */}
      <SectionBlock
        eyebrow="From Land to Living Asset"
        title="Land, capital, expertise, technology and market access, brought together deliberately."
        description="Ochiga brings together land, capital, specialist expertise, technology and market access around carefully selected development opportunities."
      >
        <ProcessFlow numbered steps={["Opportunity", "JV", "Design", "Capital", "Development", "Sales / Offtake", "Oyi Integration", "Operations"]} />
      </SectionBlock>

      {/* DEVELOPMENT PREVIEW */}
      <SplitSection
        eyebrow="Ochiga Development"
        title="Development built for what comes next."
        description="Ochiga originates, structures and delivers intelligent real-estate developments through direct development, joint ventures and strategic partnerships — starting with a disciplined residential focus."
        surfaceLabel="Prime Vertical Living — Development Study"
        tone="charcoal"
        imageSrc="/images/development/development-skyline-dusk.webp"
        imageAlt="Illustrative concept render of a premium waterfront residential skyline at dusk"
      >
        <CTAButton href="/development" variant="secondary">Explore Development</CTAButton>
      </SplitSection>

      {/* OYI PREVIEW */}
      <SplitSection
        eyebrow="Oyi"
        title="Buildings that continue to evolve."
        description="Traditional development ends at handover. Ochiga developments continue: design, build, connect, operate, learn, improve — with Oyi as the operating layer."
        surfaceLabel="Oyi — Building Operating Technology"
        tone="red"
        reverse
        imageSrc="/images/oyi/oyi-smart-lobby-dashboard.webp"
        imageAlt="Illustrative concept render of an Oyi-powered building lobby showing residents, access and utility data"
      >
        <CTAButton href="/oyi" variant="secondary">Discover Oyi</CTAButton>
      </SplitSection>

      {/* OCHIGA PRIVATE PREVIEW */}
      <SectionBlock
        eyebrow="Ochiga Private"
        title="Private access to real estate opportunities."
        description="A private investment circle connecting selected investors to carefully considered real-estate opportunities and development partnerships."
        tone="light"
      >
        <CTAButton href={ctas.requestMembership.href}>{ctas.requestMembership.label}</CTAButton>
      </SectionBlock>

      {/* PARTNER WITH OCHIGA */}
      <CTABand
        eyebrow="Partner With Ochiga"
        title="Pathways to work with us."
        description="Landowners, capital partners, buyers and professional partners — Ochiga works through a structured ecosystem, not a single generic enquiry form."
        ctas={[
          { label: "Landowner", href: "/partnerships/landowners", variant: "secondary" },
          { label: "Capital Partner", href: "/partnerships/capital", variant: "secondary" },
          { label: "Buyer", href: "/partnerships/buyers", variant: "secondary" },
          { label: "Professional Partner", href: "/partnerships/professional", variant: "secondary" },
        ]}
      />

      {/* OUR JOURNEY */}
      <SectionBlock eyebrow="Our Journey" title="Built environment experience, brought into an integrated ecosystem.">
        <p className="max-w-2xl text-ochiga-white/65 leading-relaxed">
          Ochiga&apos;s journey began in the built environment, through specialist construction finishes,
          flooring and project delivery — expanding through broader construction delivery, building
          technology, and Oyi, into the integrated development and technology company Ochiga is today.
        </p>
        <CTAButton href="/about" variant="ghost">Read our journey →</CTAButton>
      </SectionBlock>

      {/* INSIGHTS */}
      {insights.length ? (
        <SectionBlock eyebrow="Insights" title="Recent Ochiga perspectives.">
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {/* FINAL CTA */}
      <StatementBlock eyebrow="Ochiga" statement="We Build Intelligent Places.">
        <CTAButton href={ctas.primary.href}>{ctas.primary.label}</CTAButton>
      </StatementBlock>
    </main>
  );
}
