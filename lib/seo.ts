import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";
import type { Paper } from "@/lib/papers";

export const seoConfig = {
  siteName: "Ochiga",
  companyName: companyInfo.legalName,
  defaultTitle: "Ochiga — Technology Meets Architecture",
  defaultDescription:
    "Ochiga creates digital infrastructure for intelligent buildings, intelligent estates, command centers, digital twins, and future smart communities.",
  get baseUrl() {
    return (process.env.NEXT_PUBLIC_SITE_URL || companyInfo.website).replace(/\/$/, "");
  },
  logoPath: "/brand/ochiga-logo.PNG",
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
    title: "Ochiga — Technology Meets Architecture",
    description:
      "Ochiga combines architecture, infrastructure, real estate technology, digital twins, intelligence, and operational systems for intelligent buildings and estates.",
  },
  oyi: {
    path: "/oyi",
    title: "Oyi Platform — Powered by Ochiga",
    description:
      "Oyi is the product ecosystem under Ochiga, connecting residents, facility teams, devices, utilities, access, edge infrastructure, intelligence, and digital twins.",
  },
  technology: {
    path: "/technology",
    title: "Technology — Ochiga Infrastructure Systems",
    description:
      "Explore Ochiga's technology model for intelligent buildings: realtime operations, intelligence, device integration, security, edge infrastructure, and digital twins.",
  },
  infrastructure: {
    path: "/infrastructure",
    title: "Infrastructure — Ochiga",
    description:
      "Ochiga helps estates and buildings operate as connected infrastructure across power, water, access, communications, payments, facilities, and maintenance.",
  },
  architecture: {
    path: "/architecture",
    title: "Architecture — Ochiga Built Environment Technology",
    description:
      "Understand the architecture behind Ochiga: interface layers, operational systems, digital twins, identity, access, and governance.",
  },
  governance: {
    path: "/governance",
    title: "Governance — Ochiga",
    description:
      "Ochiga places authority, identity, auditability, and lifecycle governance at the center of physical infrastructure operations.",
  },
  commandCenter: {
    path: "/command-center",
    title: "Command Center — Ochiga",
    description:
      "Ochiga Command Center is a large-screen operational environment for estate, facility, infrastructure, security, and incident coordination.",
  },
  solutions: {
    path: "/solutions",
    title: "Solutions and Services — Ochiga",
    description:
      "Ochiga designs, deploys, and operates digital infrastructure systems for estates, buildings, command centers, and urban environments.",
  },
  engage: {
    path: "/engage",
    title: "Engage — Ochiga",
    description:
      "Learn how Ochiga engages with operators, developers, and institutions responsible for serious infrastructure deployments.",
  },
  deployments: {
    path: "/deployments",
    title: "Request Deployment — Ochiga",
    description:
      "Submit a deployment request for Ochiga intelligent building systems, Oyi platform deployments, command centers, digital twins, or smart estate environments.",
  },
  contact: {
    path: "/contact",
    title: "Contact Ochiga",
    description:
      "Contact Ochiga for intelligent building deployments, Oyi platform deployments, digital twins, command centers, and smart estate enquiries.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy — Ochiga",
    description:
      "Ochiga privacy information for website visitors, deployment enquiries, and enterprise infrastructure conversations.",
  },
  terms: {
    path: "/terms",
    title: "Terms — Ochiga",
    description:
      "Ochiga website terms for public information, deployment enquiries, and infrastructure conversations.",
  },
  support: {
    path: "/support",
    title: "Support — Ochiga",
    description:
      "Support information for Ochiga website visitors, deployment prospects, operators, and partners.",
  },
  papers: {
    path: "/papers",
    title: "Knowledge Center — Ochiga Papers and Infrastructure Thinking",
    description:
      "Explore Ochiga papers on infrastructure operating systems, digital twins, smart estates, intelligence for built environments, identity, and infrastructure intelligence.",
  },
  insights: {
    path: "/insights",
    title: "Insights — Ochiga Infrastructure Notes",
    description:
      "Short-form Ochiga observations on deployment, source quality, edge infrastructure, command centers, and built environment operations.",
  },
  trust: {
    path: "/trust",
    title: "Trust — Ochiga Security, Privacy, and Data Ownership",
    description:
      "Ochiga trust principles covering security posture, privacy, data ownership, auditability, deployment standards, and infrastructure governance.",
  },
  identityPaper: {
    path: "/papers/digital-identity-for-physical-spaces",
    title: "Digital Identity for Physical Spaces — Ochiga Paper",
    description:
      "Why homes, residents, operators, visitors, and assets need durable authority relationships in physical infrastructure systems.",
  },
  digitalTwinPaper: {
    path: "/papers/digital-twins-operational",
    title: "Digital Twins as Operational Infrastructure — Ochiga Paper",
    description:
      "A foundational Ochiga paper reframing digital twins as operational infrastructure, not just visualization layers.",
  },
  infrastructureOperatingSystemsPaper: {
    path: "/papers/infrastructure-operating-systems",
    title: "Infrastructure Operating Systems — Ochiga Paper",
    description:
      "A framework for governing estates, facilities, and physical environments as living infrastructure systems.",
  },
  smartEstatesPaper: {
    path: "/papers/smart-estates-beyond-access-control",
    title: "Smart Estates Beyond Access Control — Ochiga Paper",
    description:
      "Why smart estates must connect residents, operators, devices, access, and services beyond gate control.",
  },
  aiBuiltEnvironmentsPaper: {
    path: "/papers/ai-for-built-environments",
    title: "Intelligence for Built Environments — Ochiga Paper",
    description:
      "How intelligence becomes useful when it is grounded in permissions, context, command paths, and operational state.",
  },
  infrastructureIntelligencePaper: {
    path: "/papers/infrastructure-intelligence",
    title: "Infrastructure Intelligence — Ochiga Paper",
    description:
      "From dashboards to systems that understand operational state, source quality, attention, and action.",
  },
  twin: {
    path: "/twin",
    title: "Digital Twin Concept Preview — Ochiga",
    description:
      "A read-only digital twin concept preview showing how infrastructure models can represent assets, systems, and events. Not live production telemetry.",
  },
  console: {
    path: "/console",
    title: "Infrastructure Console Preview — Ochiga",
    description:
      "A read-only infrastructure console preview for Ochiga's operational command and observability direction.",
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
          alt: "Ochiga Technology Meets Architecture",
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
    operatingSystem: "Web, iOS, Android, watchOS",
    description:
      "Oyi is Ochiga's platform ecosystem for estates, facilities, residents, devices, access, utilities, edge infrastructure, intelligence, and digital twins.",
    publisher: {
      "@type": "Organization",
      name: seoConfig.companyName,
      url: seoConfig.baseUrl,
    },
  };
}

export function articleJsonLd(page: PageSeo, datePublished = "2026-06-03", author = seoConfig.companyName) {
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


export function paperToSeo(paper: Paper): PageSeo {
  return {
    path: "/papers/" + paper.slug,
    title: paper.title + " — Ochiga Paper",
    description: paper.summary,
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
