import type { Metadata } from "next";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.engage);

export default function EngageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
