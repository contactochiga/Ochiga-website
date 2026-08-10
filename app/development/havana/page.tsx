import type { Metadata } from "next";
import ProjectTour, { type ProjectTourData } from "@/app/components/ProjectTour";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentHavana);

const STATUS_STAGES = ["Concept", "Design Development", "Project Preview", "Delivery"];

const havana: ProjectTourData = {
  name: "Havana Residences",
  typeLine: "Premium Vertical Living",
  location: "Lagos, Nigeria",
  status: "In Design Development",
  oneLiner: "A new generation of vertical living, considered from the ground up.",
  chapters: [
    {
      key: "introduction",
      title: "Introduction",
      image: { src: "/images/development/havana-tower-dusk.webp", alt: "Havana Residences tower at dusk on the Lagos waterfront" },
      body: [
        "Havana Residences explores a new generation of vertical living — combining contemporary residential architecture, generous private spaces, intelligent-building infrastructure and long-term operational thinking within one development.",
      ],
    },
    {
      key: "the-development",
      title: "The Development",
      image: { src: "/images/development/havana-tower-dusk.webp", alt: "Havana Residences tower at dusk on the Lagos waterfront" },
      body: [
        "Havana is conceived as a landmark residential tower along Lagos's waterfront skyline, positioned where location, density and long-term operating potential support a vertical development.",
        "The development is currently in design development — architecture, engineering and technology are being considered together from the outset, rather than sequenced one after another.",
      ],
    },
    {
      key: "architecture",
      title: "Architecture",
      image: {
        src: "/images/development/havana-architecture-plan.webp",
        alt: "Havana Residences architectural elevation, floor stacking diagram and typical floor plan",
      },
      body: [
        "The tower's architecture is organised around a clear vertical circulation core, with paired residences on each typical floor and a rooftop amenities level above the residential floors.",
        "Balconies and generous glazing frame views outward across the surrounding skyline and waterfront.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "typical-residence",
      title: "Typical Residence",
      image: {
        src: "/images/development/havana-typical-residence-plan.webp",
        alt: "Havana Residences typical residence floor plan with room dimensions",
      },
      body: [
        "Each typical residence is organised around a private lobby, with living and dining space set between paired bedroom suites.",
        "The plan shown includes ensuite bedrooms and a separate master suite with a walk-in closet and master bathroom, a family lounge, staff room, utility room and a wraparound balcony.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "floor-plan",
      title: "Floor Plan",
      image: {
        src: "/images/development/havana-architecture-plan.webp",
        alt: "Havana Residences typical floor plan and per-floor unit stacking",
      },
      body: [
        "Each typical floor stacks residences around the central core, arranged as shown in the unit key.",
        "Room-by-room dimensions for the plan are shown in the Typical Residence chapter.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "intelligent-building",
      title: "Intelligent Building",
      image: {
        src: "/images/oyi/oyi-hero-operating-intelligence.webp",
        alt: "Oyi building-intelligence overlays for access control, energy, climate and security",
      },
      body: [
        "Oyi is intended to become Havana's operating layer — connecting access, energy, climate and building systems as part of how the development runs day to day.",
        "Specific systems and device specifications for Havana have not yet been finalised.",
      ],
    },
    {
      key: "development-status",
      title: "Development Status",
      tone: "black",
      body: [
        "Havana Residences is currently in design development.",
        "Further project information — including delivery milestones — will be released as design development progresses.",
      ],
      statusStepper: { stages: STATUS_STAGES, activeIndex: 1 },
    },
  ],
};

export default function HavanaTourPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Development", path: "/development" },
          { name: "Havana Residences", path: "/development/havana" },
        ])}
      />
      <ProjectTour project={havana} />
    </>
  );
}
