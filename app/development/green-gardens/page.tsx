import type { Metadata } from "next";
import ProjectTour, { type ProjectTourData } from "@/app/components/ProjectTour";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentGreenGardens);

const STATUS_STAGES = ["Concept", "Design Development", "Project Preview", "Delivery"];
const COMMUNITY_IMAGE = { src: "/images/development/green-gardens-estate-dusk.webp", alt: "Green Gardens residential community entrance at dusk" };

const greenGardens: ProjectTourData = {
  name: "Green Gardens",
  typeLine: "Contemporary Residential Community",
  location: "Lagos, Nigeria",
  status: "In Design Development",
  oneLiner: "A contemporary residential community, designed as one living environment.",
  chapters: [
    {
      key: "introduction",
      title: "Introduction",
      image: COMMUNITY_IMAGE,
      body: [
        "Green Gardens is conceived as a contemporary residential community where modern homes, landscape, privacy and intelligent infrastructure are designed as a complete living environment rather than as isolated houses.",
      ],
    },
    {
      key: "the-community",
      title: "The Community",
      image: COMMUNITY_IMAGE,
      body: [
        "Green Gardens is planned as a gated residential community of contemporary low- and mid-rise homes, set around landscaped streets and shared communal space.",
        "The community is currently in design development.",
      ],
    },
    {
      key: "architecture",
      title: "Architecture",
      image: COMMUNITY_IMAGE,
      body: [
        "Each residence is designed in a contemporary architectural language — layered terraces, natural materials and generous glazing set behind landscaped private frontages.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "the-residence",
      title: "The Residence",
      image: COMMUNITY_IMAGE,
      body: [
        "Individual residences are planned as private, multi-level homes within the wider community — each with its own entrance, balconies and landscaped setback.",
        "Detailed residence layouts are being developed.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "floor-plan",
      title: "Floor Plan",
      tone: "charcoal",
      body: [
        "A detailed residence floor plan has not yet been released for Green Gardens.",
        "Design details are being developed.",
      ],
    },
    {
      key: "landscape-living",
      title: "Landscape & Living",
      image: COMMUNITY_IMAGE,
      body: [
        "Landscape is treated as part of the architecture at Green Gardens — planted streets, private gardens and shared communal areas designed alongside the homes rather than added afterward.",
      ],
    },
    {
      key: "intelligent-infrastructure",
      title: "Intelligent Infrastructure",
      tone: "charcoal",
      body: [
        "Oyi is intended to extend into Green Gardens as its operating layer, in the same way it is intended across Ochiga developments.",
        "Further project information will be released as design development progresses.",
      ],
    },
    {
      key: "development-status",
      title: "Development Status",
      tone: "black",
      body: [
        "Green Gardens is currently in design development.",
        "Further project information — including delivery milestones — will be released as design development progresses.",
      ],
      statusStepper: { stages: STATUS_STAGES, activeIndex: 1 },
    },
  ],
};

export default function GreenGardensTourPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Development", path: "/development" },
          { name: "Green Gardens", path: "/development/green-gardens" },
        ])}
      />
      <ProjectTour project={greenGardens} />
    </>
  );
}
