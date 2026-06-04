export type InsightCategory = "Operations" | "Deployment" | "Technology" | "Infrastructure";

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  category: InsightCategory;
  date: string;
  body: string[];
  relatedLinks: Array<{ href: string; label: string }>;
};

export const insights: Insight[] = [
  {
    slug: "why-source-states-matter",
    title: "Why source states matter in infrastructure software",
    summary:
      "Operational systems should say when telemetry is live, pending, unavailable, or permission-restricted instead of hiding uncertainty behind empty dashboards.",
    category: "Operations",
    date: "2026-06-04",
    body: [
      "In infrastructure software, an empty number can be dangerous. Zero incidents and no live incident source are not the same state. Zero offline devices and no device registry are not the same condition.",
      "Ochiga uses explicit source states because operators need to know whether a system is healthy, awaiting telemetry, pending configuration, or unavailable. That honesty is part of the product, not a missing polish layer.",
    ],
    relatedLinks: [
      { href: "/papers/infrastructure-intelligence", label: "Read Infrastructure Intelligence" },
      { href: "/trust", label: "Review the trust posture" },
    ],
  },
  {
    slug: "invite-first-residential-systems",
    title: "Invite-first onboarding is an infrastructure decision",
    summary:
      "Managed residential systems should begin with facility-controlled identity, home assignment, and role context before resident activation.",
    category: "Deployment",
    date: "2026-06-04",
    body: [
      "Public signup is convenient for broad public software. It is weaker for managed estates where the facility must control who belongs to a home, what role they hold, and what context they can access.",
      "An invite-first flow lets the operator create the estate, home, resident record, and role before the resident activates. The resident starts with a clean home context, and the facility preserves governance.",
    ],
    relatedLinks: [
      { href: "/papers/digital-identity-for-physical-spaces", label: "Read Digital Identity for Physical Spaces" },
      { href: "/oyi", label: "Explore Oyi Platform" },
    ],
  },
  {
    slug: "edge-before-offline-automation",
    title: "Edge infrastructure comes before dependable local automation",
    summary:
      "Reliable local discovery and offline operation require an on-site edge layer, not only cloud provider sync.",
    category: "Technology",
    date: "2026-06-04",
    body: [
      "Cloud integrations are valuable, but they are not a substitute for local infrastructure. Estates that need deeper LAN discovery, camera awareness, offline continuity, or local execution need an edge layer.",
      "Oyi Edge exists for that reason: to make the physical site legible to the operating system without pretending every device can be found from the cloud alone.",
    ],
    relatedLinks: [
      { href: "/technology", label: "Review the technology model" },
      { href: "/papers/smart-estates-beyond-access-control", label: "Read Smart Estates Beyond Access Control" },
    ],
  },
  {
    slug: "command-centers-are-action-surfaces",
    title: "Command centers should be action surfaces, not wall art",
    summary:
      "Large screens are useful when they route attention and coordinate response, not when they decorate a room with passive charts.",
    category: "Infrastructure",
    date: "2026-06-04",
    body: [
      "A command center has a job: compress complexity into action. If it cannot explain what requires attention, who owns it, and where to act, it is not yet operational.",
      "Ochiga's command-center direction prioritizes estate health, incidents, visitors, cameras, utilities, devices, staff queues, and infrastructure posture over decorative analytics walls.",
    ],
    relatedLinks: [
      { href: "/command-center", label: "Explore Command Center" },
      { href: "/papers/infrastructure-operating-systems", label: "Read Infrastructure Operating Systems" },
    ],
  },
];

export const featuredInsight = insights[0];
export const insightCategories: InsightCategory[] = ["Operations", "Deployment", "Technology", "Infrastructure"];
