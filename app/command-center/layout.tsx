import type { Metadata } from "next";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.commandCenter);

export default function CommandCenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
