"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { featuredPaper, paperCategories, papers, type PaperCategory } from "@/lib/papers";

export default function KnowledgeCenter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PaperCategory | "All">("All");

  const filteredPapers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return papers.filter((paper) => {
      const matchesCategory = category === "All" || paper.category === category;
      const searchable = `${paper.title} ${paper.subtitle} ${paper.summary} ${paper.category}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <main className="inner-page">
      <section className="inner-hero inner-hero-papers">
        <div className="inner-hero-copy animate-fade-up">
          <p>Knowledge Center</p>
          <h1>Infrastructure thinking for serious operators.</h1>
          <span>
            Papers, frameworks, and field notes on digital infrastructure, smart estates, digital twins, identity, AI, governance, and built-environment operations.
          </span>
        </div>
        <div className="inner-arch-panel editorial-visual" aria-hidden="true">
          <i className="editorial-sheet sheet-a" />
          <i className="editorial-sheet sheet-b" />
          <i className="editorial-sheet sheet-c" />
          <span>Research</span>
          <span>Frameworks</span>
          <span>Operational Notes</span>
        </div>
      </section>

      <section className="inner-section">
        <FeaturedPaper />

        <section className="knowledge-tools">
          <div>
            <label htmlFor="paper-search">Search papers</label>
            <input
              id="paper-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search digital twins, identity, AI, smart estates..."
              className="inner-input"
            />
          </div>
          <div className="knowledge-filters">
            <FilterButton active={category === "All"} onClick={() => setCategory("All")}>All</FilterButton>
            {paperCategories.map((item) => (
              <FilterButton key={item} active={category === item} onClick={() => setCategory(item)}>
                {item}
              </FilterButton>
            ))}
          </div>
        </section>

        <section className="knowledge-list">
            <div className="knowledge-list-head">
              <h2>Latest papers</h2>
              <span>{filteredPapers.length} shown</span>
            </div>

            {filteredPapers.length ? (
              <div className="paper-card-grid">
                {filteredPapers.map((paper) => (
                  <article key={paper.slug} className="paper-card">
                    <div className="paper-meta">
                      <span>{paper.category}</span>
                      <span>{paper.readingTime}</span>
                      <span>{formatDate(paper.publishDate)}</span>
                    </div>
                    <h3>{paper.title}</h3>
                    <p>{paper.summary}</p>
                    <div className="paper-actions">
                      <Link href={`/papers/${paper.slug}`}>
                        Read paper →
                      </Link>
                      <PdfStatus pdfPath={paper.pdfPath} />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="inner-empty-card">
                No papers match that search yet. Try a broader infrastructure term.
              </div>
            )}
          </section>

          <section className="knowledge-related">
            <RelatedCard href="/insights" title="Insights" body="Short-form observations from deployment, product, and infrastructure work." />
            <RelatedCard href="/technology" title="Technology" body="How Ochiga structures realtime, AI, device, security, and edge systems." />
            <RelatedCard href="/trust" title="Trust" body="Security, privacy, ownership, and deployment principles behind Ochiga." />
          </section>
      </section>
    </main>
  );
}

function FeaturedPaper() {
  return (
    <section className="featured-paper-card">
      <div>
        <div>
          <p>Featured Paper</p>
          <h2>{featuredPaper.title}</h2>
          <span>{featuredPaper.subtitle}</span>
        </div>
        <div className="featured-paper-summary">
          <p>{featuredPaper.summary}</p>
          <div>
            <span>{featuredPaper.category}</span>
            <span>•</span>
            <span>{featuredPaper.readingTime}</span>
            <span>•</span>
            <span>{formatDate(featuredPaper.publishDate)}</span>
          </div>
          <Link href={`/papers/${featuredPaper.slug}`} className="btn-primary">
            Read featured paper
          </Link>
        </div>
      </div>
    </section>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`knowledge-filter ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

function PdfStatus({ pdfPath }: { pdfPath?: string }) {
  if (pdfPath) {
    return (
      <a href={pdfPath} className="text-white/58 hover:text-white">
        Download PDF
      </a>
    );
  }

  return <span className="text-white/35">PDF edition currently being prepared.</span>;
}

function RelatedCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="inner-mini-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </Link>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}
