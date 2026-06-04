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
    <main className="bg-black text-white">
      <section className="pt-28 pb-32 px-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-16 max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.22em] text-white/38">Knowledge Center</p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.04em] mb-6">
              Infrastructure thinking for serious operators.
            </h1>
            <p className="text-white/68 text-lg leading-relaxed">
              Papers, field notes, and system frameworks from Ochiga. This center focuses on infrastructure operating systems, digital twins, identity, AI, and estate operations.
            </p>
          </header>

          <FeaturedPaper />

          <section className="mt-20 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.16em] text-white/38" htmlFor="paper-search">
                Search papers
              </label>
              <input
                id="paper-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search digital twins, identity, AI, smart estates..."
                className="form-input"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton active={category === "All"} onClick={() => setCategory("All")}>All</FilterButton>
              {paperCategories.map((item) => (
                <FilterButton key={item} active={category === item} onClick={() => setCategory(item)}>
                  {item}
                </FilterButton>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-8 flex items-center justify-between gap-5">
              <h2 className="text-2xl font-medium">Latest papers</h2>
              <span className="text-sm text-white/38">{filteredPapers.length} shown</span>
            </div>

            {filteredPapers.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredPapers.map((paper) => (
                  <article key={paper.slug} className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/20 hover:bg-white/[0.04]">
                    <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-white/42">
                      <span className="rounded-full border border-white/10 px-3 py-1">{paper.category}</span>
                      <span>{paper.readingTime}</span>
                      <span>{formatDate(paper.publishDate)}</span>
                    </div>
                    <h3 className="text-2xl font-medium leading-tight">{paper.title}</h3>
                    <p className="mt-3 text-white/58 leading-7">{paper.summary}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-5 text-sm">
                      <Link href={`/papers/${paper.slug}`} className="text-white/82 hover:text-white">
                        Read paper →
                      </Link>
                      <PdfStatus pdfPath={paper.pdfPath} />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-8 text-white/58">
                No papers match that search yet. Try a broader infrastructure term.
              </div>
            )}
          </section>

          <section className="mt-20 grid gap-5 md:grid-cols-3">
            <RelatedCard href="/insights" title="Insights" body="Short-form observations from deployment, product, and infrastructure work." />
            <RelatedCard href="/technology" title="Technology" body="How Ochiga structures realtime, AI, device, security, and edge systems." />
            <RelatedCard href="/trust" title="Trust" body="Security, privacy, ownership, and deployment principles behind Ochiga." />
          </section>
        </div>
      </section>
    </main>
  );
}

function FeaturedPaper() {
  return (
    <section className="rounded-[34px] border border-orange-300/20 bg-[radial-gradient(circle_at_top_left,rgba(255,140,42,0.16),transparent_34%),rgba(255,255,255,0.025)] p-8 md:p-10">
      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.22em] text-orange-200/70">Featured Paper</p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.04em] leading-tight">{featuredPaper.title}</h2>
          <p className="mt-5 text-white/64 leading-7">{featuredPaper.subtitle}</p>
        </div>
        <div className="rounded-[26px] border border-white/10 bg-black/28 p-6">
          <p className="text-white/62 leading-7">{featuredPaper.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/44">
            <span>{featuredPaper.category}</span>
            <span>•</span>
            <span>{featuredPaper.readingTime}</span>
            <span>•</span>
            <span>{formatDate(featuredPaper.publishDate)}</span>
          </div>
          <Link href={`/papers/${featuredPaper.slug}`} className="btn-primary mt-7 inline-block">
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
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active ? "border-orange-300/55 bg-orange-300/14 text-orange-100" : "border-white/10 bg-white/[0.025] text-white/58 hover:border-white/20 hover:text-white"
      }`}
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
    <Link href={href} className="rounded-[26px] border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/55">{body}</p>
    </Link>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}
