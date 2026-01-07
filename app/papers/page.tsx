// app/papers/page.tsx

import Link from "next/link";
import Section from "@/app/components/Section";

const papers = [
  {
    slug: "identity-as-infrastructure",
    title: "Identity as the Foundation of Smart Infrastructure",
    description:
      "Why authority, identity, and system ownership must precede automation in physical environments.",
  },
  {
    slug: "digital-twins-operational",
    title: "Digital Twins as Operational Infrastructure",
    description:
      "Reframing digital twins as authoritative systems for governing assets, access, and infrastructure operations.",
  },
];

export default function PapersPage() {
  return (
    <Section title="Infrastructure Papers">
      <div className="max-w-3xl space-y-16">

        {/* Intro */}
        <p className="text-white/70 text-base md:text-lg leading-relaxed">
          These papers outline Ochiga’s foundational thinking on infrastructure
          systems — focusing on governance, operational authority, and long-term
          infrastructure continuity.
        </p>

        {/* Papers */}
        <div className="space-y-12">
          {papers.map((paper, index) => (
            <Link
              key={paper.slug}
              href={`/papers/${paper.slug}`}
              className="block group"
            >
              <article className="relative rounded-2xl border border-white/10 p-6 md:p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]">

                {/* Index marker (subtle, enterprise feel) */}
                <div className="absolute -top-3 left-6 text-xs tracking-widest text-white/30">
                  PAPER {index + 1}
                </div>

                <h3 className="text-xl md:text-2xl font-medium mb-4 leading-snug">
                  {paper.title}
                </h3>

                <p className="text-white/60 leading-relaxed mb-6">
                  {paper.description}
                </p>

                <div className="text-sm text-white/50 group-hover:text-white/80 transition">
                  Read paper →
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-white/40 text-sm leading-relaxed pt-6">
          These documents are positioning papers — not academic publications.
          They reflect active system design, operational experience, and
          real-world infrastructure constraints.
        </p>

      </div>
    </Section>
  );
}
