import type { Metadata } from "next";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.infrastructure);

export default function InfrastructureLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
