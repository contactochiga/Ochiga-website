import type { Metadata } from "next";
import KnowledgeCenter from "@/app/components/KnowledgeCenter";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, collectionPageJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.papers);

export default function PapersPage() {
  return (
    <>
      <JsonLd data={collectionPageJsonLd(seoPages.papers)} />
      <KnowledgeCenter />
    </>
  );
}
