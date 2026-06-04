import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { featuredInsight, insightCategories, insights } from "@/lib/insights";
import { breadcrumbJsonLd, buildMetadata, collectionPageJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.insights);

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd(seoPages.insights),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
        ]}
      />
      <main className="bg-black text-white">
        <section className="pt-28 pb-32 px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <header className="mb-16 max-w-3xl">
              <p className="mb-5 text-xs uppercase tracking-[0.22em] text-white/38">Insights</p>
              <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.04em] mb-6">
                Notes from infrastructure work.
              </h1>
              <p className="text-white/68 text-lg leading-relaxed">
                Short-form thinking on deployment lessons, technology updates, operational quality, and how built environments become governable systems.
              </p>
            </header>

            <section className="rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,140,42,0.14),transparent_34%),rgba(255,255,255,0.025)] p-8 md:p-10">
              <p className="mb-5 text-xs uppercase tracking-[0.22em] text-orange-200/70">Featured Insight</p>
              <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.04em] leading-tight">{featuredInsight.title}</h2>
                  <p className="mt-5 text-white/55">{featuredInsight.category} · {formatDate(featuredInsight.date)}</p>
                </div>
                <div>
                  <p className="text-white/66 leading-7">{featuredInsight.summary}</p>
                  <div className="mt-7 space-y-4 text-white/62 leading-7">
                    {featuredInsight.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-16">
              <div className="mb-8 flex flex-wrap gap-2">
                {insightCategories.map((category) => (
                  <span key={category} className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-sm text-white/58">
                    {category}
                  </span>
                ))}
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {insights.map((insight) => (
                  <article key={insight.slug} className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7">
                    <div className="mb-4 flex flex-wrap gap-3 text-xs text-white/38">
                      <span>{insight.category}</span>
                      <span>•</span>
                      <span>{formatDate(insight.date)}</span>
                    </div>
                    <h2 className="text-2xl font-medium leading-tight">{insight.title}</h2>
                    <p className="mt-3 text-white/58 leading-7">{insight.summary}</p>
                    <div className="mt-6 space-y-3 text-sm">
                      {insight.relatedLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="block text-white/72 hover:text-white">
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-20 rounded-[28px] border border-white/10 bg-white/[0.02] p-7 md:p-8">
              <h2 className="text-2xl font-medium">Archive foundation</h2>
              <p className="mt-3 text-white/58 leading-7">
                Insights are currently maintained as static editorial content. This keeps the knowledge layer fast and reliable while leaving room for a CMS later.
              </p>
              <Link href="/papers" className="btn-secondary mt-6 inline-block">Open Knowledge Center</Link>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}
