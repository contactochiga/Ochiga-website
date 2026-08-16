// Office-managed overrides for the Development section.
//
// Same safe-fallback contract as lib/content.ts: when Sanity is
// disabled or a fetch fails for any reason, this resolves to an empty
// map so every project page keeps rendering its existing hardcoded
// ProjectTourData/ProjectPreviewCard content untouched. A project must
// never disappear or break because Sanity is unavailable.
//
// The hand-authored multi-chapter tour narrative stays in code
// (app/development/{slug}/page.tsx) — only status/progress/order/cover
// image are Office-managed (see sanity/schemas/developmentProject.ts).

import { sanityClient, sanityEnabled, urlFor } from "@/lib/sanity";
import { DEVELOPMENT_PROJECTS_QUERY } from "@/lib/queries";
import type { ProjectTourData } from "@/app/components/ProjectTour";

export type DevelopmentProjectOverride = {
  slug: string;
  name?: string;
  typeLine?: string;
  location?: string;
  status?: string;
  oneLiner?: string;
  statusStages?: string[];
  statusActiveIndex?: number;
  order?: number;
  coverImage?: { src: string; alt: string };
  updatedAt?: string;
};

function normalizeCoverImage(doc: any): DevelopmentProjectOverride["coverImage"] {
  if (!doc.coverImage?.asset) return undefined;
  try {
    const src = urlFor(doc.coverImage).width(1600).height(1000).fit("crop").url();
    return { src, alt: doc.coverImage.alt || doc.name || "" };
  } catch {
    return undefined;
  }
}

function normalizeOverride(doc: any): DevelopmentProjectOverride {
  return {
    slug: doc.slug,
    name: doc.name || undefined,
    typeLine: doc.typeLine || undefined,
    location: doc.location || undefined,
    status: doc.status || undefined,
    oneLiner: doc.oneLiner || undefined,
    statusStages: Array.isArray(doc.statusStages) && doc.statusStages.length > 0 ? doc.statusStages : undefined,
    statusActiveIndex: typeof doc.statusActiveIndex === "number" ? doc.statusActiveIndex : undefined,
    order: typeof doc.order === "number" ? doc.order : undefined,
    coverImage: normalizeCoverImage(doc),
    updatedAt: doc.updatedAt || undefined,
  };
}

// Keyed by slug for O(1) lookup from each project page. Unpublished /
// draft documents are already excluded by lib/sanity.ts's
// perspective: "published", so nothing here needs its own visibility
// check.
export async function getDevelopmentProjectOverrides(): Promise<Record<string, DevelopmentProjectOverride>> {
  if (!sanityEnabled) return {};
  try {
    const docs = await sanityClient.fetch(DEVELOPMENT_PROJECTS_QUERY);
    if (!Array.isArray(docs)) return {};
    const map: Record<string, DevelopmentProjectOverride> = {};
    for (const doc of docs) {
      if (!doc?.slug) continue;
      map[doc.slug] = normalizeOverride(doc);
    }
    return map;
  } catch {
    return {};
  }
}

export async function getDevelopmentProjectOverride(
  slug: string
): Promise<DevelopmentProjectOverride | undefined> {
  const overrides = await getDevelopmentProjectOverrides();
  return overrides[slug];
}

// Applies an Office-managed override onto a hand-authored tour's
// hardcoded ProjectTourData without touching its narrative chapters —
// only top-line name/type/location/status/oneLiner, the
// "development-status" chapter's milestone stepper, and (when a cover
// image has been uploaded) the "introduction" chapter's stage image.
// A missing override, or a chapter the override doesn't apply to,
// passes the original hardcoded content straight through.
export function mergeProjectTourData(
  base: ProjectTourData,
  override: DevelopmentProjectOverride | undefined
): ProjectTourData {
  if (!override) return base;

  const chapters = base.chapters.map((chapter) => {
    if (chapter.key === "development-status" && (override.statusStages || override.statusActiveIndex !== undefined)) {
      return {
        ...chapter,
        statusStepper: {
          stages: override.statusStages || chapter.statusStepper?.stages || [],
          activeIndex: override.statusActiveIndex ?? chapter.statusStepper?.activeIndex ?? 0,
        },
      };
    }
    if (chapter.key === "introduction" && override.coverImage && chapter.image) {
      return {
        ...chapter,
        image: { ...chapter.image, src: override.coverImage.src, alt: override.coverImage.alt || chapter.image.alt },
      };
    }
    return chapter;
  });

  return {
    ...base,
    name: override.name || base.name,
    typeLine: override.typeLine || base.typeLine,
    location: override.location || base.location,
    status: override.status || base.status,
    oneLiner: override.oneLiner || base.oneLiner,
    chapters,
  };
}
