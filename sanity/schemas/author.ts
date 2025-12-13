export default {
  name: "author",
  title: "Author",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: "role",
      title: "Role / Title",
      type: "string",
    },

    {
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    },

    {
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
    },
  ],
};
