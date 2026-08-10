import type { Metadata } from "next";
import ProjectTour, { type ProjectTourData } from "@/app/components/ProjectTour";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.technologyExperience);

const ILLUSTRATIVE_UI_DISCLAIMER =
  "Illustrative interface concept, shown for illustration. Specific integrations and screens are configured per deployment.";

const experience: ProjectTourData = {
  name: "Oyi Experience",
  typeLine: "Resident & Occupant Experience",
  oneLiner: "A connected experience for the people who live in, work in and visit a building.",
  chapters: [
    {
      key: "introduction",
      title: "Introduction",
      image: { src: "/images/oyi/oyi-smart-lobby-dashboard.webp", alt: "Building lobby overlaid with resident access, visitor and utility interface elements" },
      body: [
        "Oyi Experience is the connected building experience for residents, tenants and guests — bringing access, devices, services, utilities and everyday interactions into one interface.",
      ],
      disclaimer: ILLUSTRATIVE_UI_DISCLAIMER,
    },
    {
      key: "my-building-my-home",
      title: "My Building, My Home",
      image: { src: "/images/oyi/oyi-smart-building.webp", alt: "Aerial night view of a residential tower cluster", position: "object-[50%_35%]" },
      body: [
        "Each resident or occupant gets a home base within Oyi Experience — a single place to see what's happening in their building and manage their own space, rather than a generic building-wide app.",
      ],
    },
    {
      key: "devices-scenes",
      title: "Devices & Scenes",
      image: { src: "/images/oyi/oyi-platform-digital-twin.webp", alt: "Digital twin and energy data overlay on a home render", position: "object-[50%_40%]" },
      body: [
        "Connected devices within a resident's own space — lighting, climate and similar systems where installed — can be grouped into scenes for everyday convenience, where a building's device infrastructure supports it.",
      ],
    },
    {
      key: "visitors-access",
      title: "Visitors & Access",
      image: { src: "/images/oyi/oyi-hero-operating-intelligence.webp", alt: "Smart building lobby overlaid with access control, energy, climate and security interface elements" },
      body: [
        "Residents and occupants can manage visitor access and see relevant access activity for their own space, coordinated with the building's broader access and security systems.",
      ],
      disclaimer: ILLUSTRATIVE_UI_DISCLAIMER,
    },
    {
      key: "maintenance",
      title: "Maintenance",
      image: { src: "/images/oyi/oyi-infrastructure-deployment.webp", alt: "Construction site utility trench with a tablet showing a connected building model", position: "object-[50%_30%]" },
      body: [
        "Residents can raise maintenance requests for their own unit or common areas directly through Oyi Experience, with visibility into status as the request is actioned.",
      ],
    },
    {
      key: "utilities-wallet",
      title: "Utilities & Wallet",
      image: { src: "/images/oyi/oyi-estate-systems.webp", alt: "Aerial night view of a residential estate with landscaping and pool" },
      body: [
        "Where a building's utility infrastructure supports it, residents can see their own utility usage and manage related payments through Oyi Experience.",
      ],
    },
    {
      key: "services-community",
      title: "Services & Community",
      image: { src: "/images/oyi/oyi-infrastructure-operators.webp", alt: "Team reviewing a building operations dashboard in a meeting room" },
      body: [
        "Building services and community updates from building management reach residents through the same interface as everything else — rather than a separate notice board or broadcast list.",
      ],
    },
    {
      key: "intelligence-assistance",
      title: "Intelligence & Assistance",
      image: { src: "/images/oyi/oyi-digital-twin-preview.webp", alt: "Live digital twin of a building with asset status and alert data panels" },
      body: [
        "Oyi Experience is designed to surface relevant information to residents proactively — such as a scheduled maintenance visit or a service update — rather than requiring them to go looking for it.",
      ],
    },
    {
      key: "connected-experience",
      title: "Connected Experience",
      tone: "black",
      body: [
        "Oyi Experience draws on the same underlying building data as Oyi Facility OS and Oyi Core, so what a resident sees reflects what is actually happening in their building.",
        "Which specific capabilities are available to residents depends on what has been configured for that building.",
      ],
    },
  ],
};

export default function ExperienceTourPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
          { name: "Oyi Experience", path: "/technology/experience" },
        ])}
      />
      <ProjectTour project={experience} backHref="/technology" />
    </>
  );
}
