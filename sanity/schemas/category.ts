// Insights content pillars — e.g. Real Estate Development, Nigerian &
// African Real Estate, African Urbanisation, Architecture, Building
// Technology, Smart Buildings, Oyi, Building Operating Systems,
// Infrastructure, Property Investment, Development Economics, Market
// Intelligence, Research & Commentary. Created as documents (not a
// fixed list) so editors can add pillars without a code change.
export default {
  name: "category",
  title: "Category",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    },
  ],
};
