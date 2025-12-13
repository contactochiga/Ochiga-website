export default {
  name: "post",
  title: "Publications / Articles",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    },

    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },

    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    },

    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    },

    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    },

    {
      name: "body",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
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
