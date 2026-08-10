import type { Metadata } from "next";
import ProjectTour, { type ProjectTourData } from "@/app/components/ProjectTour";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.technologyCore);

const ILLUSTRATIVE_UI_DISCLAIMER =
  "Illustrative interface concept, shown for illustration. Specific integrations and screens are configured per deployment.";

const core: ProjectTourData = {
  name: "Oyi Core",
  typeLine: "Building Intelligence",
  oneLiner: "The intelligence and orchestration layer beneath Oyi.",
  chapters: [
    {
      key: "introduction",
      title: "Introduction",
      image: { src: "/images/oyi/oyi-digital-twin-preview.webp", alt: "Live digital twin of a building with asset status and alert data panels" },
      body: [
        "Oyi Core is the intelligence and orchestration layer beneath Oyi — interpreting what is happening across a building and coordinating a secure, permissioned response, so Oyi Facility OS and Oyi Experience have a shared, consistent view of the building underneath them.",
      ],
      disclaimer: ILLUSTRATIVE_UI_DISCLAIMER,
    },
    {
      key: "awareness",
      title: "Awareness",
      image: { src: "/images/oyi/oyi-command-center.webp", alt: "Building operations control room with a wall of monitors showing live building data" },
      body: [
        "Oyi Core continuously takes in signals from a building's connected systems and devices, forming an up-to-date picture of building state as its starting point.",
      ],
    },
    {
      key: "understand",
      title: "Understand",
      image: { src: "/images/oyi/oyi-platform-digital-twin.webp", alt: "Digital twin and data analytics overlay on a building render", position: "object-[50%_40%]" },
      body: [
        "Raw signals are interpreted into meaningful building context — for example, recognising that a pattern of readings represents a maintenance issue rather than treating each signal in isolation.",
      ],
    },
    {
      key: "investigate",
      title: "Investigate",
      image: { src: "/images/oyi/oyi-infrastructure.webp", alt: "Underground utility infrastructure with a tablet showing a connected building model" },
      body: [
        "Where a situation needs closer attention, Oyi Core is designed to draw together the related data across systems so a person reviewing it sees the fuller picture, not just one isolated alert.",
      ],
    },
    {
      key: "recommend",
      title: "Recommend",
      tone: "charcoal",
      body: [
        "Oyi Core turns its understanding of a situation into a recommended course of action for the appropriate person or team — surfaced through Facility OS or Experience, rather than acted on silently in the background.",
      ],
    },
    {
      key: "permission-validation",
      title: "Permission & Validation",
      tone: "black",
      body: [
        "Any action Oyi Core coordinates is checked against who is permitted to take it and under what conditions, before it is allowed to proceed.",
        "This permission layer is what lets Oyi Core coordinate across sensitive systems like access and security safely.",
      ],
    },
    {
      key: "execute",
      title: "Execute",
      image: { src: "/images/oyi/oyi-command-center-ui.webp", alt: "Building operations desk with monitors overlooking a residential skyline" },
      body: [
        "Once validated, an action is carried out through the relevant connected system, and the outcome is recorded as part of the building's operating history.",
      ],
    },
    {
      key: "audit-learn",
      title: "Audit & Learn",
      image: { src: "/images/oyi/oyi-infrastructure-operators.webp", alt: "Team reviewing a building operations dashboard in a meeting room" },
      body: [
        "Every action Oyi Core coordinates is logged, giving building owners and operators an auditable record of what happened, when, and under whose permission — and a basis for refining how the building is run over time.",
      ],
    },
    {
      key: "edge-integration",
      title: "Edge & Integration",
      tone: "red",
      body: [
        "Oyi Core is designed so that awareness and decisions can run close to the building itself, not only in the cloud, and to integrate with the third-party systems a building already uses through open interfaces.",
        "Specific hardware requirements for edge or local execution are determined per deployment and are not fixed in advance.",
      ],
    },
  ],
};

export default function CoreTourPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
          { name: "Oyi Core", path: "/technology/core" },
        ])}
      />
      <ProjectTour project={core} backHref="/technology" />
    </>
  );
}
