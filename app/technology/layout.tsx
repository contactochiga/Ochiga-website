import type { Metadata } from "next";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.technology);

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
