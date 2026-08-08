import Link from "next/link";
import type { Insight } from "@/lib/content";

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="flex flex-col justify-between rounded border border-ochiga-white/10 p-6 transition-colors duration-base hover:border-ochiga-white/30"
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-ochiga-red">{insight.category}</p>
        <h3 className="mt-3 font-display text-lg leading-snug text-ochiga-white">{insight.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ochiga-white/55">{insight.summary}</p>
      </div>
      <span className="mt-6 text-xs text-ochiga-white/40">{formatDate(insight.publishedAt)}</span>
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
