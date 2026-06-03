import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, seoPages, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.oyi);

export default function OyiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      {children}
    </>
  );
}
