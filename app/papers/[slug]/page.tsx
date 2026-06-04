import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/app/components/Section";
import JsonLd from "@/app/components/JsonLd";
import { getPaper, getRelatedPapers, papers } from "@/lib/papers";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, paperToSeo } from "@/lib/seo";

export function generateStaticParams() {
  return papers.map((paper) => ({ slug: paper.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const paper = getPaper(params.slug);
  if (!paper) {
    return buildMetadata({ path: "/papers", title: "Papers — Ochiga", description: "Ochiga infrastructure papers." });
  }
  return buildMetadata(paperToSeo(paper));
}

export default function PaperPage({ params }: { params: { slug: string } }) {
  const paper = getPaper(params.slug);
  if (!paper) {
    notFound();
  }

  const related = getRelatedPapers(paper);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(paperToSeo(paper), paper.publishDate, paper.author),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Papers", path: "/papers" },
            { name: paper.title, path: `/papers/${paper.slug}` },
          ]),
        ]}
      />
      <Section title={paper.title}>
        <article className="mx-auto max-w-3xl text-white/82 leading-relaxed">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/38">{paper.category} · {paper.readingTime}</p>
          <p className="text-xl md:text-2xl leading-relaxed text-white/70">{paper.subtitle}</p>

          <div className="mt-10 rounded-[26px] border border-white/10 bg-white/[0.025] p-6 text-sm text-white/52">
            <p>Published {formatDate(paper.publishDate)} by {paper.author}</p>
            <p className="mt-3">{paper.summary}</p>
            <div className="mt-5">
              {paper.pdfPath ? (
                <a href={paper.pdfPath} className="text-white/80 hover:text-white">Download PDF</a>
              ) : (
                <span className="text-white/38">PDF edition currently being prepared.</span>
              )}
            </div>
          </div>

          <div className="mt-14 space-y-12">
            {paper.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-2xl font-medium text-white">{section.heading}</h2>
                <div className="space-y-4 text-white/70">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        <section className="mx-auto mt-20 max-w-4xl">
          <div className="divider-hairline mb-10" />
          <h2 className="mb-6 text-2xl font-medium">Related reading</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/papers/${item.slug}`} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-[0.16em] text-white/35">{item.category}</p>
                <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/52">{item.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/papers" className="btn-secondary">Back to Knowledge Center</Link>
            <Link href="/deployments" className="btn-primary">Discuss a deployment</Link>
          </div>
        </section>
      </Section>
    </>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));
}
