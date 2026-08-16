// "developmentProject" — Office-managed status/progress/core-metadata
// for the public Development section (Havana, Green Gardens, Central
// One). Deliberately narrow: the hand-authored multi-chapter "guided
// tour" narrative (app/development/{slug}/page.tsx, ProjectTour.tsx)
// stays as crafted editorial content in code, not migrated here — this
// schema only covers the fields that actually change as construction
// progresses (status, milestone stage) and were previously duplicated
// across up to 4 hardcoded sync points per project.
export default {
  name: "developmentProject",
  title: "Development Project",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Must match the website route segment, e.g. \"havana\" for /development/havana.",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "typeLine",
      title: "Type / Classification",
      type: "string",
      description: "e.g. \"Premium Vertical Living\", \"Residential / Mixed-use\".",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "status",
      title: "Status Label",
      type: "string",
      description: "e.g. \"In Design Development\".",
    },
    {
      name: "oneLiner",
      title: "Positioning Statement",
      type: "text",
      rows: 2,
    },
    {
      name: "statusStages",
      title: "Milestone Stages",
      type: "array",
      of: [{ type: "string" }],
      description: "Ordered stage names, e.g. Concept / Design Development / Project Preview / Delivery.",
    },
    {
      name: "statusActiveIndex",
      title: "Active Milestone Index",
      type: "number",
      description: "0-based index into Milestone Stages for the current stage.",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first on the Development listing page.",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
        },
      ],
    },
    {
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    },
  ],
};
