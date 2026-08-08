import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/JsonLd";
import CTABand from "@/app/components/CTABand";
import { getAllInsights, getInsightBySlug } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, insightToSeo } from "@/lib/seo";

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
    <main>
      <JsonLd
        data={[
          articleJsonLd(seo, insight.publishedAt || new Date().toISOString()),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: insight.title, path: `/insights/${insight.slug}` },
          ]),
        ]}
      />
      <article className="px-6 pb-20 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto max-w-content">
          <Link href="/insights" className="text-sm text-ochiga-white/45 hover:text-ochiga-white">
            ← Insights
          </Link>
          <p className="mt-8 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">{insight.category}</p>
          <h1 className="mt-4 font-display text-3xl leading-tight text-ochiga-white md:text-5xl">{insight.title}</h1>
          <p className="mt-6 text-sm text-ochiga-white/45">
            {insight.author} · {formatDate(insight.publishedAt)}
            {insight.readingTime ? ` · ${insight.readingTime}` : ""}
          </p>

          <div className="mt-14 space-y-6 text-lg leading-[1.9] text-ochiga-white/75">
            {insight.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {insight.tags.length ? (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-ochiga-white/10 pt-8">
              {insight.tags.map((tag) => (
                <span key={tag} className="rounded-sm border border-ochiga-white/15 px-2.5 py-1 text-[11px] text-ochiga-white/50">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>

      {insight.related.length ? (
        <section className="border-t border-ochiga-white/10 px-6 py-16 md:px-10">
          <div className="mx-auto max-w-content">
            <p className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">Related Insights</p>
            <ul className="space-y-4">
              {insight.related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ochiga-white/75 underline decoration-ochiga-red/50 underline-offset-4 hover:text-ochiga-white">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTABand
        eyebrow="Continue exploring"
        title="More on Ochiga Development, Oyi, and Ochiga Private."
        ctas={[{ label: "Browse all Insights", href: "/insights" }]}
      />
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
