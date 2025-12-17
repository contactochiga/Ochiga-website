import HomeClient from "./page.client";
import { sanityClient } from "../lib/sanity";
import { FEATURED_POSTS_QUERY } from "../lib/queries";

export const revalidate = 60;

async function getFeaturedPosts() {
  return sanityClient.fetch(FEATURED_POSTS_QUERY);
}

export default async function Page() {
  const featuredPosts = await getFeaturedPosts();
  return <HomeClient featuredPosts={featuredPosts} />;
}
