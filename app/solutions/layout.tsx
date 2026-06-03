import type { Metadata } from "next";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.solutions);

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
