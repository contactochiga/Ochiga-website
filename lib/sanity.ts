import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ap1ku6sf";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Explicit opt-in. Until the Insights CMS has real content published,
// the site reads from the bundled fallback content in
// lib/insights-fallback.ts (see lib/content.ts) so pages are never
// empty and local development never requires Sanity credentials.
export const sanityEnabled = process.env.NEXT_PUBLIC_SANITY_ENABLE === "true";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN || undefined,
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
