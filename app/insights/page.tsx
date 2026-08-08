import type { Metadata } from "next";
import InsightsExplorer from "@/app/components/InsightsExplorer";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import { getAllInsights, getFeaturedInsight } from "@/lib/content";
import { buildMetadata, collectionPageJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.insights);

export default async function InsightsPage() {
  const [insights, featured] = await Promise.all([getAllInsights(), getFeaturedInsight()]);

  return (
    <main>
      <JsonLd data={collectionPageJsonLd(seoPages.insights)} />
      <PageHero
        eyebrow="Insights"
        title="Perspectives on development, real estate, and building technology."
        description="Ochiga writing on real estate development, African urbanisation, architecture, building technology, Oyi, and property investment."
      />
      <div className="mx-auto max-w-wide px-6 py-20 md:px-10">
        <InsightsExplorer insights={insights} featured={featured} />
      </div>
    </main>
  );
}
