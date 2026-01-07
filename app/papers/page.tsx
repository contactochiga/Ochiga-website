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
      <div className="max-w-3xl space-y-14">

        <p className="text-white/70 text-lg leading-relaxed">
          These papers outline Ochiga’s foundational thinking on infrastructure
          systems — focusing on governance, operational authority, and long-term
          infrastructure continuity.
        </p>

        <div className="space-y-10">
          {papers.map((paper) => (
            <Link
              key={paper.slug}
              href={`/papers/${paper.slug}`}
              className="block group"
            >
              <div className="border border-white/10 rounded-2xl p-6 md:p-7 transition-all group-hover:border-white/20 group-hover:bg-white/5">
                <h3 className="text-xl md:text-2xl font-medium mb-3">
                  {paper.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {paper.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-white/40 text-sm leading-relaxed pt-8">
          These documents are positioning papers — not academic publications.
          They reflect active system design, operational experience, and
          real-world infrastructure constraints.
        </p>

      </div>
    </Section>
  );
}
