import type { Metadata } from "next";
import ProjectTour, { type ProjectTourData } from "@/app/components/ProjectTour";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";
import { getDevelopmentProjectOverride, mergeProjectTourData } from "@/lib/development";

export const metadata: Metadata = buildMetadata(seoPages.developmentCentralOne);

const STATUS_STAGES = ["Concept", "Design Development", "Project Preview", "Delivery"];
const AERIAL_IMAGE = { src: "/images/development/central-one-aerial-night.webp", alt: "Central One mixed-use development, aerial night render" };

const centralOne: ProjectTourData = {
  name: "Central One",
  typeLine: "Mixed-Use Urban Development",
  location: "Central Area, Abuja, Nigeria",
  status: "In Design Development",
  oneLiner: "A proposed integrated mixed-use development for Central Area, Abuja.",
  chapters: [
    {
      key: "introduction",
      title: "Introduction",
      image: AERIAL_IMAGE,
      body: [
        "Central One is a proposed integrated mixed-use development bringing together contemporary residences, hospitality, commercial activity, landscaped outdoor spaces and lifestyle amenities within one connected development.",
      ],
    },
    {
      key: "the-development",
      title: "The Development",
      image: AERIAL_IMAGE,
      body: [
        "Central One is conceived for Central Area, Abuja — an integrated mixed-use development bringing residential, hospitality and commercial components together on one site rather than as separate, disconnected projects.",
        "The development is currently in design/concept development.",
      ],
    },
    {
      key: "architecture",
      title: "Architecture",
      image: {
        src: "/images/development/central-one-site-plan.webp",
        alt: "Central One site plan showing twin towers, terrace duplexes, one-floor villas, amenities and landscaped areas",
      },
      body: [
        "The overall composition is organised around twin mid-rise towers and a shared podium, with lower-density terrace duplexes and one-floor villas arranged around landscaped public and private spaces.",
        "Retail, arrival and amenity areas — including a pool, clubhouse, courts and a landscaped park — are woven through the site rather than added at the edges.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "twin-towers",
      title: "Twin Towers",
      image: {
        src: "/images/development/central-one-twin-towers-plan.webp",
        alt: "Central One twin towers elevation and typical floor plan (levels 3-10)",
      },
      body: [
        "The twin towers are proposed as 10–12 floor mixed-use structures — one oriented toward residential use, the other toward hotel and serviced-apartment use — sharing a podium amenities deck and arrival plaza.",
        "The typical floor plan shown includes a mix of studio, one- and two-bedroom units arranged around a central service core.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "terrace-residences",
      title: "Terrace Residences",
      image: {
        src: "/images/development/central-one-terrace-duplex-plan.webp",
        alt: "Central One terrace duplex render and floor plan (Type A)",
      },
      body: [
        "Lower-density terrace duplexes are proposed around the perimeter of the site, offering two- and three-bedroom homes with private terraces, gardens and parking.",
        "The plan shown includes a ground-floor living and dining arrangement with bedrooms and a family lounge above.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "master-plan-amenities",
      title: "Master Plan & Amenities",
      image: {
        src: "/images/development/central-one-masterplan-amenities.webp",
        alt: "Central One aerial view paired with the 2D master plan",
      },
      body: [
        "The master plan sets the towers and podium at the centre of the site, with terrace duplexes framing the perimeter and shared amenities — a swimming pool, tennis court, football pitch and landscaped park — distributed across the development.",
        "Internal roads and parking are planned to keep vehicle circulation to the edges of the site, away from the landscaped and residential areas.",
      ],
      disclaimer: "Concept imagery shown for design-development presentation. Final architecture and specifications may evolve.",
    },
    {
      key: "intelligent-development",
      title: "Intelligent Development",
      image: {
        src: "/images/oyi/oyi-hero-operating-intelligence.webp",
        alt: "Oyi building-intelligence overlays for access control, energy, climate and security",
      },
      body: [
        "Central One is conceived to support connected building operations, resident services, infrastructure intelligence and future Oyi integration from the development stage.",
        "Specific systems and device specifications for Central One have not yet been confirmed.",
      ],
    },
    {
      key: "development-status",
      title: "Development Status",
      tone: "black",
      body: [
        "Central One is currently a concept/design-stage Ochiga development. Construction has not started.",
        "Further project information — including delivery milestones — will be released as design development progresses.",
      ],
      statusStepper: { stages: STATUS_STAGES, activeIndex: 1 },
    },
  ],
};

export default async function CentralOneTourPage() {
  const override = await getDevelopmentProjectOverride("central-one");
  const project = mergeProjectTourData(centralOne, override);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Development", path: "/development" },
          { name: "Central One", path: "/development/central-one" },
        ])}
      />
      <ProjectTour project={project} />
    </>
  );
}
