// Unified Insights content layer.
//
// Reads from Sanity when NEXT_PUBLIC_SANITY_ENABLE=true and a project
// has real published content; otherwise falls back to the bundled
// starter content (migrated from the previous lib/papers.ts /
// lib/insights.ts) so /insights is never empty and local dev never
// requires Sanity credentials. See DESIGN_SYSTEM.md / README for the
// migration path once the Sanity project has real editorial content.

import { sanityClient, sanityEnabled, urlFor } from "@/lib/sanity";
import { INSIGHTS_QUERY, SINGLE_INSIGHT_QUERY } from "@/lib/queries";
import { papers } from "@/lib/papers";
import { insights as legacyInsights } from "@/lib/insights";

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  body: string[];
  seoTitle?: string;
  seoDescription?: string;
  readingTime?: string;
  related: Array<{ href: string; label: string }>;
  source: "sanity" | "fallback";
  // Only ever set for Sanity-sourced insights with an uploaded cover
  // image — fallback content has no photography, so components should
  // fall back to their existing decorative treatment when this is
  // undefined rather than fabricating one.
  coverImage?: { src: string; alt: string };
};

// The long-term content pillars Ochiga Insights should cover. Used to
// seed Sanity categories and to label the fallback taxonomy consistently.
export const insightTopics = [
  "Real Estate Development",
  "Nigerian & African Real Estate",
  "African Urbanisation",
  "Architecture",
  "Building Technology",
  "Smart Buildings",
  "Oyi",
  "Building Operating Systems",
  "Infrastructure",
  "Property Investment",
  "Development Economics",
  "Market Intelligence",
  "Research & Commentary",
] as const;

function fromPapers(): Insight[] {
  return papers.map((paper) => ({
    slug: paper.slug,
    title: paper.title,
    summary: paper.summary,
    category: paper.category,
    tags: [paper.category],
    author: paper.author,
    publishedAt: paper.publishDate,
    featured: false,
    readingTime: paper.readingTime,
    body: paper.sections.flatMap((section) => [section.heading, ...section.body]),
    related: paper.relatedPapers.map((slug) => ({
      href: `/insights/${slug}`,
      label: papers.find((p) => p.slug === slug)?.title || slug,
    })),
    source: "fallback",
  }));
}

function fromLegacyInsights(): Insight[] {
  return legacyInsights.map((insight) => ({
    slug: insight.slug,
    title: insight.title,
    summary: insight.summary,
    category: insight.category,
    tags: [insight.category],
    author: "Ochiga",
    publishedAt: insight.date,
    featured: false,
    body: insight.body,
    related: insight.relatedLinks
      .filter((link) => link.href.startsWith("/insights") || link.href.startsWith("/papers"))
      .map((link) => ({ ...link, href: link.href.replace("/papers/", "/insights/") })),
    source: "fallback",
  }));
}

function fallbackInsights(): Insight[] {
  const combined = [...fromPapers(), ...fromLegacyInsights()];
  // De-duplicate by slug in case of overlap; first occurrence wins.
  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

// Flattens Sanity Portable Text into plain paragraphs. Adequate for the
// Phase 1 foundation; swap for @portabletext/react once real Sanity
// content is live and richer formatting (images, lists) is needed.
function flattenPortableText(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map((block: any) =>
      Array.isArray(block?.children)
        ? block.children.map((child: any) => child?.text || "").join("")
        : ""
    )
    .filter(Boolean);
}

function normalizeCoverImage(doc: any): Insight["coverImage"] {
  if (!doc.coverImage?.asset) return undefined;
  try {
    const src = urlFor(doc.coverImage).width(800).height(500).fit("crop").url();
    return { src, alt: doc.coverImage.alt || doc.title || "" };
  } catch {
    return undefined;
  }
}

function normalizeSanityDoc(doc: any): Insight {
  return {
    slug: doc.slug?.current || doc.slug,
    title: doc.title,
    summary: doc.excerpt || doc.seoDescription || "",
    category: doc.category || "Research & Commentary",
    tags: doc.tags || [],
    author: doc.author || "Ochiga",
    publishedAt: doc.publishedAt,
    updatedAt: doc.updatedAt,
    featured: Boolean(doc.featured),
    body: flattenPortableText(doc.body),
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    coverImage: normalizeCoverImage(doc),
    related: Array.isArray(doc.relatedPosts)
      ? doc.relatedPosts.map((post: any) => ({ href: `/insights/${post.slug?.current || post.slug}`, label: post.title }))
      : [],
    source: "sanity",
  };
}

export async function getAllInsights(): Promise<Insight[]> {
  if (sanityEnabled) {
    try {
      const docs = await sanityClient.fetch(INSIGHTS_QUERY);
      if (Array.isArray(docs) && docs.length > 0) {
        return docs.map(normalizeSanityDoc);
      }
    } catch {
      // Falls through to bundled content below.
    }
  }
  return fallbackInsights();
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  if (sanityEnabled) {
    try {
      const doc = await sanityClient.fetch(SINGLE_INSIGHT_QUERY, { slug });
      if (doc) return normalizeSanityDoc(doc);
    } catch {
      // Falls through to bundled content below.
    }
  }
  return fallbackInsights().find((item) => item.slug === slug) || null;
}

export async function getFeaturedInsight(): Promise<Insight | null> {
  const all = await getAllInsights();
  return all.find((item) => item.featured) || all[0] || null;
}

// Development-relevant subset of the editorial feed, for the
// Development page's "Ochiga Perspective" rail. Matches an insight's
// category/tags against insightTopics — the site's own already-defined
// content pillars — rather than any hardcoded article list. If that
// filter comes back too thin to justify its own rail (e.g. current
// bundled content predates the pillar taxonomy and doesn't consistently
// use it yet), falls back to the general feed so the section is never
// sparse or empty; the filter still takes effect the moment real
// content is tagged against these pillars.
export async function getDevelopmentInsights(minimumCount = 3): Promise<Insight[]> {
  const all = await getAllInsights();
  const pillars = insightTopics.map((topic) => topic.toLowerCase());
  const relevant = all.filter((insight) => {
    const haystack = [insight.category, ...insight.tags].join(" ").toLowerCase();
    return pillars.some((pillar) => haystack.includes(pillar) || pillar.includes(insight.category.toLowerCase()));
  });
  return relevant.length >= minimumCount ? relevant : all;
}

// Technology-relevant subset of the editorial feed, for the Technology
// page's "Ochiga Perspective" rail — a narrower lens than
// getDevelopmentInsights, matching category/tags against the subject
// areas the Technology page actually covers rather than the full
// Development pillar list. Same safe fallback: never sparse or empty.
const TECHNOLOGY_KEYWORDS = [
  "building operating system",
  "digital twin",
  "intelligent building",
  "intelligence",
  "infrastructure",
  "interoperability",
  "smart infrastructure",
  "smart estate",
  "smart building",
  "artificial intelligence",
  "building automation",
  "automation",
  "energy intelligence",
  "connected resident",
  "technology",
  "operations",
];

export async function getTechnologyInsights(minimumCount = 3): Promise<Insight[]> {
  const all = await getAllInsights();
  const relevant = all.filter((insight) => {
    const haystack = [insight.category, ...insight.tags].join(" ").toLowerCase();
    return TECHNOLOGY_KEYWORDS.some((keyword) => haystack.includes(keyword));
  });
  return relevant.length >= minimumCount ? relevant : all;
}

// Private-relevant subset of the editorial feed, for the Ochiga Private
// page's "Ochiga Perspective" rail — matches real-estate ownership,
// capital and market-intelligence subject areas rather than the
// Development or Technology pillar lists. Same safe fallback: never
// sparse or empty.
const PRIVATE_KEYWORDS = [
  "real estate investment",
  "property ownership",
  "development economics",
  "capital",
  "market intelligence",
  "property income",
  "appreciation",
  "development participation",
  "property value",
  "private market",
  "investment",
  "property",
];

export async function getPrivateInsights(minimumCount = 3): Promise<Insight[]> {
  const all = await getAllInsights();
  const relevant = all.filter((insight) => {
    const haystack = [insight.category, ...insight.tags].join(" ").toLowerCase();
    return PRIVATE_KEYWORDS.some((keyword) => haystack.includes(keyword));
  });
  return relevant.length >= minimumCount ? relevant : all;
}

export { urlFor };
