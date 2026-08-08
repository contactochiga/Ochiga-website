import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/JsonLd";
import { getAllInsights, getInsightBySlug } from "@/lib/content";
import { articleJsonLd, buildMetadata, insightToSeo } from "@/lib/seo";

export async function generateStaticParams() {
  const insights = await getAllInsights();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) return {};
  return buildMetadata(insightToSeo(insight));
}

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) notFound();

  const seo = insightToSeo(insight);

  return (
    <main className="px-6 pb-28 pt-36 md:px-10 md:pt-44">
      <JsonLd data={articleJsonLd(seo, insight.publishedAt || new Date().toISOString())} />
      <article className="mx-auto max-w-content">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">{insight.category}</p>
        <h1 className="mt-4 font-display text-3xl leading-tight text-ochiga-white md:text-5xl">{insight.title}</h1>
        <p className="mt-6 text-sm text-ochiga-white/45">
          {insight.author} · {formatDate(insight.publishedAt)}
          {insight.readingTime ? ` · ${insight.readingTime}` : ""}
        </p>

        <div className="mt-12 space-y-6 text-base leading-relaxed text-ochiga-white/75">
          {insight.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-16 border-t border-ochiga-white/10 pt-8">
          <Link href="/insights" className="text-sm text-ochiga-white/60 hover:text-ochiga-white">
            ← Back to Insights
          </Link>
        </div>
      </article>
    </main>
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
