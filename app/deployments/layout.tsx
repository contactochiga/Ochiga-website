import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, faqJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.deployments);

const deploymentFaq = [
  {
    question: "Can Ochiga start without a complete digital twin model?",
    answer: "Yes. A deployment can start with estate structure, identity, homes, devices, and operational workflows before richer spatial model layers are added.",
  },
  {
    question: "Is Oyi Edge required for every deployment?",
    answer: "Not for every initial pilot. Oyi Edge is recommended when the site needs deeper LAN discovery, local execution, camera awareness, or offline maturity.",
  },
  {
    question: "How are missing telemetry sources represented?",
    answer: "Ochiga shows honest source states such as pending integration, awaiting telemetry, no live source configured, or permission required instead of inventing metrics.",
  },
];

export default function DeploymentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqJsonLd(deploymentFaq)} />
      {children}
    </>
  );
}
