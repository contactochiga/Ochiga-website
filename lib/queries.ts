// GROQ queries for the Insights content model (sanity/schemas/post.ts).
// Field set matches lib/content.ts's `Insight` type so results can be
// normalized without extra mapping.

export const INSIGHTS_QUERY = `
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  updatedAt,
  featured,
  "author": author->name,
  "category": category->title,
  tags,
  coverImage,
  seoTitle,
  seoDescription,
  canonicalUrl
}
`;

export const FEATURED_INSIGHTS_QUERY = `
*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
  _id, title, slug, excerpt, publishedAt, "category": category->title
}
`;

export const SINGLE_INSIGHT_QUERY = `
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  updatedAt,
  coverImage,
  seoTitle,
  seoDescription,
  canonicalUrl,
  ogImage,
  tags,
  "author": author->{ name, role, bio, image },
  "category": category->title,
  "relatedPosts": relatedPosts[]->{ title, slug, excerpt }
}
`;

export const TRAINING_QUERY = `
*[_type == "training"] | order(level asc) {
  title,
  slug,
  level,
  audience,
  duration,
  description
}
`;

// Office-managed status/progress overrides for the Development section
// (see sanity/schemas/developmentProject.ts). No "published" filter is
// needed here — perspective: "published" in lib/sanity.ts already
// excludes any drafts.* document, matching the Insights queries above.
export const DEVELOPMENT_PROJECTS_QUERY = `
*[_type == "developmentProject"] | order(order asc) {
  name,
  "slug": slug.current,
  typeLine,
  location,
  status,
  oneLiner,
  statusStages,
  statusActiveIndex,
  order,
  coverImage,
  updatedAt
}
`;
