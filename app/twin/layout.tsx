import type { Metadata } from "next";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.twin);

export default function TwinLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
