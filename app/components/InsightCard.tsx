import Link from "next/link";
import AbstractSurface from "@/app/components/AbstractSurface";
import type { Insight } from "@/lib/content";

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded border border-ochiga-white/10 transition-colors duration-base hover:border-ochiga-white/30"
    >
      <AbstractSurface tone="charcoal" aspect="aspect-[16/10]" src={insight.coverImage?.src} alt={insight.coverImage?.alt || insight.title} />
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-ochiga-red">{insight.category}</p>
          <h3 className="mt-3 font-display text-lg leading-snug text-ochiga-white">{insight.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ochiga-white/55">{insight.summary}</p>
        </div>
        <span className="mt-6 text-xs text-ochiga-white/40">{formatDate(insight.publishedAt)}</span>
      </div>
    </Link>
  );
}

function formatDate(date?: string) {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
  } catch {
    return date;
  }
}
