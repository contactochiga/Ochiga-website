import type { Metadata } from "next";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.console);

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
