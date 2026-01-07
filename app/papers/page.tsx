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
    <Section title="Papers">
      <div className="mx-auto max-w-4xl">

        {/* =============================
            INTRO
        ============================== */}
        <div className="max-w-3xl mb-20">
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            These papers outline Ochiga’s foundational thinking on infrastructure
            systems — focusing on governance, operational authority, and
            long-term infrastructure continuity.
          </p>
        </div>

        {/* Divider */}
        <div className="divider-hairline mb-20" />

        {/* =============================
            DOCUMENTS EYEBROW
        ============================== */}
        <div className="mb-10">
          <p className="uppercase text-xs tracking-widest text-white/40">
            Documents
          </p>
        </div>

        {/* =============================
            PAPERS (CARDS)
        ============================== */}
        <div className="space-y-16">

          {papers.map((paper) => (
            <article
              key={paper.slug}
              className="
                rounded-[28px]
                border border-white/10
                bg-white/[0.015]
                px-8 py-10 md:px-12 md:py-14
                transition-all duration-300
                hover:border-white/20
                hover:bg-white/[0.03]
              "
            >
              <h2 className="text-2xl md:text-3xl font-medium leading-snug mb-5">
                {paper.title}
              </h2>

              <p className="text-white/60 leading-relaxed max-w-2xl mb-10">
                {paper.description}
              </p>

              <div className="flex items-center gap-6 text-sm">

                {/* Read */}
                <Link
                  href={`/papers/${paper.slug}`}
                  className="text-white/80 hover:text-white transition"
                >
                  Read document →
                </Link>

                {/* PDF (placeholder) */}
                <span className="text-white/35 cursor-not-allowed">
                  Download PDF
                </span>

              </div>
            </article>
          ))}

        </div>

        {/* Divider */}
        <div className="divider-hairline mt-24 mb-16" />

        {/* =============================
            FOOTNOTE
        ============================== */}
        <div className="max-w-3xl">
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
