import type { ReactNode } from "react";
import JsonLd from "@/app/components/JsonLd";
import { softwareApplicationJsonLd } from "@/lib/seo";

export default function TechnologyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      {children}
    </>
  );
}
