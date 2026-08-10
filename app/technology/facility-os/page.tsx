import type { Metadata } from "next";
import ProjectTour, { type ProjectTourData } from "@/app/components/ProjectTour";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.technologyFacilityOs);

const ILLUSTRATIVE_UI_DISCLAIMER =
  "Illustrative interface concept, shown for illustration. Specific integrations and screens are configured per deployment.";

const facilityOs: ProjectTourData = {
  name: "Oyi Facility OS",
  typeLine: "Building & Facility Operations",
  oneLiner: "One operating environment for the teams who run a building.",
  chapters: [
    {
      key: "introduction",
      title: "Introduction",
      image: { src: "/images/oyi/oyi-hero-operating-intelligence.webp", alt: "Smart building lobby overlaid with access control, energy, climate and security interface elements" },
      body: [
        "Oyi Facility OS is the operating environment for building and facility teams — bringing infrastructure, assets, utilities, maintenance and access into one connected layer, instead of scattered across disconnected systems and spreadsheets.",
      ],
      disclaimer: ILLUSTRATIVE_UI_DISCLAIMER,
    },
    {
      key: "command-centre",
      title: "Command Centre",
      image: { src: "/images/oyi/oyi-command-center.webp", alt: "Building operations control room with a wall of monitors showing live building data" },
      body: [
        "A single command view gives facility teams live visibility across a building — status, alerts and activity in one place, rather than checking a separate system for each function.",
        "The command centre is a view onto the same underlying data every other Facility OS capability uses, not a separate product.",
      ],
      disclaimer: ILLUSTRATIVE_UI_DISCLAIMER,
    },
    {
      key: "infrastructure-utilities",
      title: "Infrastructure & Utilities",
      image: { src: "/images/oyi/oyi-infrastructure.webp", alt: "Underground utility infrastructure with a tablet showing a connected building model" },
      body: [
        "Facility OS is designed to connect a building's core infrastructure and utilities — power, water and energy monitoring — so usage and status can be tracked as part of daily operations rather than only discovered when something fails.",
      ],
    },
    {
      key: "access-security-visitors",
      title: "Access, Security & Visitors",
      image: { src: "/images/oyi/oyi-command-center-ui.webp", alt: "Building operations desk with monitors overlooking a residential skyline" },
      body: [
        "Access control, security events and visitor activity are designed to be coordinated in the same operating layer as the rest of the building — so facility teams have one record of who and what moved through a building, not several.",
      ],
    },
    {
      key: "maintenance-services",
      title: "Maintenance & Services",
      image: { src: "/images/oyi/oyi-infrastructure-deployment.webp", alt: "Construction site utility trench with a tablet showing a connected building model", position: "object-[50%_30%]" },
      body: [
        "Maintenance requests, work orders and service activity route to the right team through Facility OS, with a record of what was requested, actioned and resolved.",
      ],
    },
    {
      key: "devices-building-systems",
      title: "Devices & Building Systems",
      image: { src: "/images/oyi/oyi-platform-digital-twin.webp", alt: "Digital twin and energy data overlay on a building render", position: "object-[50%_40%]" },
      body: [
        "Lighting, HVAC, sensors and other connected building devices sit on the same platform as the rest of Facility OS, so device state becomes part of a building's overall operating picture rather than a separate silo.",
      ],
    },
    {
      key: "intelligence-recommendations",
      title: "Intelligence & Recommendations",
      image: { src: "/images/oyi/oyi-digital-twin-preview.webp", alt: "Live digital twin of a building with asset status and alert data panels" },
      body: [
        "Facility OS is designed to surface patterns in building activity — flagging issues such as unusual utility usage or maintenance patterns worth a team's attention — as a recommendation for a person to act on, not an autonomous decision.",
      ],
    },
    {
      key: "operations-reporting",
      title: "Operations & Reporting",
      image: { src: "/images/oyi/oyi-infrastructure-operators.webp", alt: "Team reviewing a building operations dashboard in a meeting room" },
      body: [
        "Operational activity is recorded over time, giving building owners and facility teams a clear, reviewable record of how a building has been run — useful for reporting to owners, investors or regulators.",
      ],
    },
    {
      key: "deployment",
      title: "Deployment",
      tone: "black",
      body: [
        "Facility OS is deployed around each building's own infrastructure and requirements — the specific systems and integrations connected are scoped and configured per building, not assumed in advance.",
        "Ochiga's technology team works with a building's owner or operator to determine which capabilities apply and how they are rolled out.",
      ],
    },
  ],
};

export default function FacilityOsTourPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
          { name: "Oyi Facility OS", path: "/technology/facility-os" },
        ])}
      />
      <ProjectTour project={facilityOs} backHref="/technology" />
    </>
  );
}
