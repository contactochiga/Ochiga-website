import Home from "./page";
import { sanityClient } from "../lib/sanity";
import { FEATURED_POSTS_QUERY } from "../lib/queries";

export const revalidate = 60;

async function getFeaturedPosts() {
  return sanityClient.fetch(FEATURED_POSTS_QUERY);
}

export default async function HomeServer() {
  const featuredPosts = await getFeaturedPosts();
  return <Home featuredPosts={featuredPosts} />;
}
