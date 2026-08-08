// "post" is the Insights document type (articles, papers, commentary).
// Field set implements the content model requested for the Ochiga
// Insights relaunch: SEO fields, tags/topics, related content, and
// featured status, alongside the original editorial fields.
export default {
  name: "post",
  title: "Insights / Publications",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "relations", title: "Related" },
  ],

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary shown in Insights listings.",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
    },
    {
      name: "category",
      title: "Primary Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      description:
        "Primary content pillar, e.g. Real Estate Development, African Urbanisation, Building Technology, Oyi, Property Investment.",
    },
    {
      name: "tags",
      title: "Tags / Topics",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "content",
      description: "Free-form secondary topics for filtering and internal linking.",
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      group: "content",
    },
    {
      name: "updatedAt",
      title: "Updated Date",
      type: "datetime",
      group: "content",
      description: "Set when the article is materially revised.",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      group: "content",
    },
    {
      name: "body",
      title: "Content",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      group: "content",
    },

    // ---- SEO -----------------------------------------------------
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Overrides the page <title>. Falls back to Title if empty.",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      group: "seo",
      description: "Overrides the meta description. Falls back to Excerpt if empty.",
    },
    {
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
      description: "Only needed if this content is republished from elsewhere.",
    },
    {
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      group: "seo",
      description: "Falls back to Cover Image if empty.",
    },

    // ---- Relations -------------------------------------------------
    {
      name: "relatedPosts",
      title: "Related Insights",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      group: "relations",
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "author.name",
      media: "coverImage",
    },
  },
};
