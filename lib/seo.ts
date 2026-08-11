import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";
import type { Insight } from "@/lib/content";

export const seoConfig = {
  siteName: "Ochiga",
  companyName: companyInfo.legalName,
  defaultTitle: "Ochiga — Development. Technology. Private Capital.",
  defaultDescription:
    "Ochiga develops and powers intelligent places. We combine real estate development, building technology and strategic investment partnerships across Ochiga Development, Oyi, and Ochiga Private.",
  get baseUrl() {
    return (process.env.NEXT_PUBLIC_SITE_URL || companyInfo.website).replace(/\/$/, "");
  },
  logoPath: "/brand/ochiga-logo.png",
  ogImagePath: "/opengraph-image",
  twitterCard: "summary_large_image" as const,
};

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  index?: boolean;
};

export const seoPages = {
  home: {
    path: "/",
    title: "Ochiga — Development. Technology. Private Capital.",
    description:
      "Ochiga develops and powers intelligent places, combining real estate development, building technology and strategic investment partnerships.",
  },

  // ---- Development -------------------------------------------------
  development: {
    path: "/development",
    title: "Development — Ochiga Real Estate Development",
    description:
      "Ochiga Development is the physical development engine behind Ochiga — real estate development company in Lagos, Nigeria creating residential and mixed-use environments built for what comes next.",
  },
  developmentResidential: {
    path: "/development/residential",
    title: "Residential Development — Ochiga",
    description:
      "Ochiga's residential development focus, from prime vertical living to contemporary residential communities.",
  },
  developmentMixedUse: {
    path: "/development/mixed-use",
    title: "Mixed Use & Future Sectors — Ochiga Development",
    description:
      "Ochiga's future development optionality across mixed-use and other built-environment sectors alongside its residential focus.",
  },
  developmentApproach: {
    path: "/development/approach",
    title: "Development Approach — Ochiga",
    description:
      "How Ochiga approaches development: architecture-led planning, disciplined delivery, and technology-enabled operation from day one.",
  },
  developmentJointVentures: {
    path: "/development/joint-ventures",
    title: "Joint Ventures — Ochiga Development",
    description:
      "How Ochiga structures joint venture development partnerships with landowners and strategic partners.",
  },
  developmentStudies: {
    path: "/development/studies",
    title: "Development Studies — Ochiga",
    description:
      "Current Ochiga development studies and concepts, including Prime Vertical Living and Contemporary Residential Community.",
  },
  developmentHavana: {
    path: "/development/havana",
    title: "Havana Residences — Ochiga Development",
    description:
      "Havana Residences: a premium vertical residential tower in design development in Lagos, Nigeria, from Ochiga Development.",
  },
  developmentGreenGardens: {
    path: "/development/green-gardens",
    title: "Green Gardens — Ochiga Development",
    description:
      "Green Gardens: a contemporary residential community in design development in Lagos, Nigeria, from Ochiga Development.",
  },
  developmentCentralOne: {
    path: "/development/central-one",
    title: "Central One — Ochiga Development",
    description:
      "Central One: a proposed mixed-use urban development in design/concept development in Central Area, Abuja, Nigeria, from Ochiga Development.",
  },

  // ---- Technology (corporate division; Oyi is its product line) -------
  technology: {
    path: "/technology",
    title: "Technology — Ochiga",
    description:
      "Ochiga's technology capability — building operating technology, resident experience and building intelligence that connect people, buildings, infrastructure and intelligence into environments that keep evolving.",
  },
  technologyFacilityOs: {
    path: "/technology/facility-os",
    title: "Oyi Facility OS — Ochiga Technology",
    description:
      "Oyi Facility OS: the operating environment for building and facility teams, connecting infrastructure, utilities, assets, maintenance, access and operational workflows.",
  },
  technologyExperience: {
    path: "/technology/experience",
    title: "Oyi Experience — Ochiga Technology",
    description:
      "Oyi Experience: a connected building experience for residents, tenants and guests, bringing visitors, devices, services, utilities and everyday interactions together.",
  },
  technologyCore: {
    path: "/technology/core",
    title: "Oyi Core — Ochiga Technology",
    description:
      "Oyi Core: the intelligence and orchestration layer beneath Oyi, interpreting building activity and coordinating secure execution across connected systems.",
  },

  // ---- Ochiga Private (private real-estate opportunity, capital and
  // relationship network; membership request lives inline at /private#membership) --
  private: {
    path: "/private",
    title: "Ochiga Private — A Private Real-Estate Opportunity & Relationship Network",
    description:
      "Ochiga Private connects qualified individuals, institutions, property owners and partners to selected real-estate opportunities, capital relationships and long-term participation across the Ochiga ecosystem.",
  },
  privateInvestmentApproaches: {
    path: "/private/investment-approaches",
    title: "Investment Approaches — Ochiga Private",
    description:
      "How Ochiga Private gives selected members access to opportunities across the real-estate value cycle, from discovery to hold or exit.",
  },
  privateAdvantage: {
    path: "/private/advantage",
    title: "The Ochiga Private Advantage",
    description:
      "Curated access, development-led origination, built-environment intelligence, and the Oyi technology advantage that shape Ochiga Private opportunities.",
  },

  // ---- Partnerships -----------------------------------------------------
  partnerships: {
    path: "/partnerships",
    title: "Partnerships — Ochiga",
    description:
      "Pathways to work with Ochiga as a landowner, capital partner, buyer, or professional and strategic partner.",
  },
  partnershipsLandowners: {
    path: "/partnerships/landowners",
    title: "Landowners & Joint Ventures — Unlock the Potential of Your Land",
    description:
      "Ochiga evaluates strategically located real estate for structured joint venture development partnerships with landowners across Lagos and beyond.",
  },
  partnershipsCapital: {
    path: "/partnerships/capital",
    title: "Capital Partners — Ochiga",
    description:
      "How Ochiga works with capital partners around structured real estate development opportunities.",
  },
  partnershipsBuyers: {
    path: "/partnerships/buyers",
    title: "Buyers & Offtake — Ochiga Development",
    description:
      "Priority access and offtake pathways for buyers interested in Ochiga development studies and future inventory.",
  },
  partnershipsProfessional: {
    path: "/partnerships/professional",
    title: "Professional & Strategic Partners — Work With Ochiga",
    description:
      "Ochiga works with architecture, engineering, construction, sales, finance, legal, valuation, facility management and technology partners.",
  },

  // ---- About --------------------------------------------------------
  about: {
    path: "/about",
    title: "About Ochiga — Company, Journey, Philosophy, Trust",
    description:
      "Ochiga's journey from built-environment and construction delivery to integrated real estate development and building technology.",
  },

  // ---- Insights -------------------------------------------------------
  insights: {
    path: "/insights",
    title: "Insights — Ochiga on Development, Real Estate & Building Technology",
    description:
      "Ochiga perspectives on real estate development, African urbanisation, architecture, building technology, Oyi, and property investment.",
  },

  // ---- Contact / legal --------------------------------------------------
  contact: {
    path: "/contact",
    title: "Partner With Ochiga",
    description:
      "Start a conversation with Ochiga about development, Oyi, Ochiga Private membership, or a professional partnership.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy — Ochiga",
    description: "Ochiga privacy information for website visitors and prospective partners.",
  },
  terms: {
    path: "/terms",
    title: "Terms — Ochiga",
    description: "Ochiga website terms for public information and enquiries.",
  },
  support: {
    path: "/support",
    title: "Support — Ochiga",
    description: "Support information for Ochiga website visitors, prospects and partners.",
  },

  // ---- Retained utility routes (not in primary nav) --------------------
  deployments: {
    path: "/deployments",
    title: "Request Deployment — Ochiga",
    description: "Submit a deployment request for Oyi-enabled Ochiga environments.",
    index: false,
  },
} satisfies Record<string, PageSeo>;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return `${seoConfig.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata(page: PageSeo): Metadata {
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(seoConfig.ogImagePath);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
    },
    robots: {
      index: page.index !== false,
      follow: page.index !== false,
    },
    openGraph: {
      type: "website",
      siteName: seoConfig.siteName,
      url: canonical,
      title: page.title,
      description: page.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Ochiga — Development. Technology. Private Capital.",
        },
      ],
    },
    twitter: {
      card: seoConfig.twitterCard,
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.companyName,
    alternateName: seoConfig.siteName,
    url: seoConfig.baseUrl,
    logo: absoluteUrl(seoConfig.logoPath),
    email: companyInfo.contactEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: companyInfo.location,
    },
    sameAs: Object.values(companyInfo.social).filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.baseUrl,
    description: seoConfig.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: seoConfig.companyName,
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: companyInfo.productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Oyi is Ochiga's building operating technology, connecting people, buildings, infrastructure, hardware and intelligence.",
    publisher: {
      "@type": "Organization",
      name: seoConfig.companyName,
      url: seoConfig.baseUrl,
    },
    sameAs: [companyInfo.oyiWebsite],
  };
}

export function articleJsonLd(page: PageSeo, datePublished: string, author = seoConfig.companyName) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: seoConfig.companyName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(seoConfig.logoPath),
      },
    },
    datePublished,
    mainEntityOfPage: absoluteUrl(page.path),
  };
}

export function insightToSeo(insight: Insight): PageSeo {
  return {
    path: "/insights/" + insight.slug,
    title: (insight.seoTitle || insight.title) + " — Ochiga Insights",
    description: insight.seoDescription || insight.summary,
  };
}

export function collectionPageJsonLd(page: PageSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    publisher: {
      "@type": "Organization",
      name: seoConfig.companyName,
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
