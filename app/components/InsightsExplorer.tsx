"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import InsightCard from "@/app/components/InsightCard";
import type { Insight } from "@/lib/content";

export default function InsightsExplorer({ insights, featured }: { insights: Insight[]; featured: Insight | null }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(insights.map((item) => item.category)))],
    [insights]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insights.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const searchable = `${item.title} ${item.summary} ${item.category} ${item.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !q || searchable.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query, insights]);

  return (
    <div>
      {featured ? (
        <div className="mb-16 rounded border border-ochiga-white/10 bg-ochiga-charcoal p-8 md:p-10">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">Featured</p>
          <h2 className="mt-4 max-w-2xl font-display text-2xl leading-snug text-ochiga-white md:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ochiga-white/60 md:text-base">
            {featured.summary}
          </p>
          <Link
            href={`/insights/${featured.slug}`}
            className="mt-6 inline-flex text-sm font-medium text-ochiga-white underline decoration-ochiga-red underline-offset-4"
          >
            Read insight →
          </Link>
        </div>
      ) : null}

      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search insights…"
          aria-label="Search insights"
          className="w-full max-w-sm rounded border border-ochiga-white/15 bg-transparent px-4 py-2.5 text-sm text-ochiga-white placeholder:text-ochiga-white/35 focus:border-ochiga-red"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded px-3.5 py-1.5 text-xs font-medium transition-colors duration-fast ${
                category === item
                  ? "bg-ochiga-red text-ochiga-white"
                  : "border border-ochiga-white/15 text-ochiga-white/60 hover:text-ochiga-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <InsightCard key={item.slug} insight={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-ochiga-white/50">No insights match that search yet.</p>
      )}
    </div>
  );
}
