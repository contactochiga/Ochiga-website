export const POSTS_QUERY = `
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "author": author->name,
  "categories": categories[]->title
}
`;

export const SINGLE_POST_QUERY = `
*[_type == "post" && slug.current == $slug][0] {
  title,
  excerpt,
  body,
  publishedAt,
  "author": author->{
    name,
    role
  }
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
