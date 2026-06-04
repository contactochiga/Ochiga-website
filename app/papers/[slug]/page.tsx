import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  const pullQuote = paper.sections[1]?.body[0] || paper.summary;

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
      <main className="publication-page">
        <section className="publication-hero">
          <div className="publication-hero-copy animate-fade-up">
            <Link href="/papers" className="publication-back">Knowledge Center</Link>
            <span className="publication-badge">{paper.category}</span>
            <h1>{paper.title}</h1>
            <p>{paper.subtitle}</p>
            <div className="publication-meta">
              <span>{paper.author}</span>
              <span>{formatDate(paper.publishDate)}</span>
              <span>{paper.readingTime}</span>
            </div>
          </div>
          <div className="publication-visual" aria-hidden="true">
            <i className="pub-sheet pub-sheet-a" />
            <i className="pub-sheet pub-sheet-b" />
            <i className="pub-grid" />
            <span>Architecture</span>
            <span>Infrastructure</span>
            <span>Knowledge</span>
          </div>
        </section>

        <section className="publication-shell">
          <aside className="publication-sidebar">
            <div className="publication-panel">
              <p>Contents</p>
              <nav aria-label="Paper table of contents">
                {paper.sections.map((section) => (
                  <a key={section.heading} href={`#${toId(section.heading)}`}>
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>

            <div className="publication-panel pdf-panel">
              <p>PDF Edition</p>
              {paper.pdfPath ? (
                <a href={paper.pdfPath}>Download PDF</a>
              ) : (
                <span>PDF edition currently being prepared.</span>
              )}
            </div>
          </aside>

          <article className="publication-article">
            <section className="publication-abstract">
              <p>Abstract</p>
              <h2>{paper.summary}</h2>
            </section>

            <blockquote>
              <p>{pullQuote}</p>
            </blockquote>

            {paper.sections.map((section, index) => (
              <section key={section.heading} id={toId(section.heading)} className="publication-section">
                <div className="publication-section-rule">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        </section>

        <section className="publication-related">
          <div className="publication-related-head">
            <p>Related reading</p>
            <h2>Continue the infrastructure thread.</h2>
          </div>
          <div className="publication-related-grid">
            {related.map((item) => (
              <Link key={item.slug} href={`/papers/${item.slug}`}>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="publication-cta">
          <div>
            <p>Apply the thinking</p>
            <h2>Discuss how this applies to your building, estate, or infrastructure plan.</h2>
          </div>
          <div>
            <Link href="/deployments" className="btn-primary">Discuss a deployment</Link>
            <Link href="/contact" className="btn-secondary">Contact Ochiga</Link>
          </div>
        </section>
      </main>
    </>
  );
}

function toId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));
}
