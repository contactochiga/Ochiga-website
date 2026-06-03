import type { Metadata } from "next";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.governance);

export default function GovernanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
