// app/papers/page.tsx

import Link from "next/link";
import Section from "@/app/components/Section";

const papers = [
  {
    slug: "identity-as-infrastructure",
    index: "01",
    title: "Identity as the Foundation of Smart Infrastructure",
    description:
      "Why authority, identity, and system ownership must precede automation in physical environments.",
  },
  {
    slug: "digital-twins-operational",
    index: "02",
    title: "Digital Twins as Operational Infrastructure",
    description:
      "Reframing digital twins as authoritative systems for governing assets, access, and infrastructure operations.",
  },
];

export default function PapersPage() {
  return (
    <Section title="Papers">
      <div className="max-w-4xl mx-auto">

        {/* =============================
            HERO / CONTEXT (SEPARATE ZONE)
        ============================== */}
        <div className="mb-20">
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl">
            These papers outline Ochiga’s foundational thinking on infrastructure
            systems — focusing on governance, operational authority, and
            long-term infrastructure continuity.
          </p>
        </div>

        {/* =============================
            PAPERS SHELF
        ============================== */}
        <div className="space-y-10">

          {papers.map((paper) => (
            <Link
              key={paper.slug}
              href={`/papers/${paper.slug}`}
              className="block group"
            >
              <article
                className="
                  relative rounded-3xl
                  border border-white/10
                  bg-white/[0.02]
                  p-7 md:p-10
                  transition-all duration-300
                  hover:border-white/20
                  hover:bg-white/[0.04]
                "
              >
                {/* Paper index */}
                <div className="text-xs tracking-widest text-white/40 mb-4">
                  PAPER {paper.index}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-medium leading-snug mb-4">
                  {paper.title}
                </h3>

                {/* Description */}
                <p className="text-white/65 leading-relaxed max-w-2xl mb-8">
                  {paper.description}
                </p>

                {/* CTA */}
                <div className="text-sm font-medium text-white/60 group-hover:text-white transition">
                  Read paper →
                </div>
              </article>
            </Link>
          ))}

        </div>

        {/* =============================
            FOOTNOTE
        ============================== */}
        <div className="mt-20 max-w-3xl">
          <p className="text-white/40 text-sm leading-relaxed">
            These documents are positioning papers — not academic publications.
            They reflect active system design, operational experience, and
            real-world infrastructure constraints.
          </p>
        </div>

      </div>
    </Section>
  );
}
