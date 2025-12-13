export default {
  name: "training",
  title: "Training & Certification",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Training Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },

    {
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Introductory", value: "intro" },
          { title: "Professional", value: "professional" },
          { title: "Advanced", value: "advanced" },
          { title: "Certification", value: "certification" },
        ],
      },
    },

    {
      name: "audience",
      title: "Target Audience",
      type: "string",
      options: {
        list: [
          { title: "Estate Managers", value: "estate-managers" },
          { title: "Facility Teams", value: "facility-teams" },
          { title: "Integrators", value: "integrators" },
          { title: "Developers", value: "developers" },
        ],
      },
    },

    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },

    {
      name: "duration",
      title: "Duration",
      type: "string",
    },

    {
      name: "content",
      title: "Training Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
