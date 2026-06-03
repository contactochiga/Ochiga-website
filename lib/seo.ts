import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";

export const seoConfig = {
  siteName: "Ochiga",
  companyName: companyInfo.legalName,
  defaultTitle: "Ochiga — Infrastructure Operating System",
  defaultDescription:
    "Ochiga builds infrastructure operating systems for estates, buildings, access, utilities, command centers, and digital twins.",
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
    title: "Ochiga — Infrastructure Operating System",
    description:
      "Ochiga builds Africa's infrastructure operating layer for estates, buildings, facility operations, digital twins, and connected environments.",
  },
  oyi: {
    path: "/oyi",
    title: "Oyi OS — Infrastructure Operating System by Ochiga",
    description:
      "Oyi OS is the digital control layer for real-world environments, connecting residents, facilities, devices, utilities, access, and infrastructure operations.",
  },
  technology: {
    path: "/technology",
    title: "Technology — Ochiga Infrastructure Systems",
    description:
      "Explore Ochiga's infrastructure-grade technology model for digital twins, operational control, access, utilities, assets, and long-term system governance.",
  },
  infrastructure: {
    path: "/infrastructure",
    title: "Infrastructure — Ochiga",
    description:
      "Ochiga operates infrastructure as connected systems across power, water, access, communications, payments, facilities, and maintenance.",
  },
  architecture: {
    path: "/architecture",
    title: "Architecture — Ochiga Infrastructure Operating System",
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
      "Submit a deployment request for Ochiga infrastructure systems, Oyi OS, command centers, digital twins, or estate operating environments.",
  },
  contact: {
    path: "/contact",
    title: "Contact Ochiga",
    description:
      "Contact Ochiga for infrastructure deployments, Oyi OS, digital twins, command centers, and estate operating system enquiries.",
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
    title: "Papers — Ochiga",
    description:
      "Read Ochiga positioning papers on infrastructure operating systems, identity, governance, digital twins, and long-term operations.",
  },
  identityPaper: {
    path: "/papers/identity-as-infrastructure",
    title: "Identity as Infrastructure — Ochiga Paper",
    description:
      "A foundational Ochiga paper on why authority, identity, and ownership must precede automation in physical environments.",
  },
  digitalTwinPaper: {
    path: "/papers/digital-twins-operational",
    title: "Digital Twins as Operational Infrastructure — Ochiga Paper",
    description:
      "A foundational Ochiga paper reframing digital twins as operational infrastructure, not just visualization layers.",
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
          alt: "Ochiga Infrastructure Operating System",
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
      "Oyi OS is Ochiga's operating system for estates, facilities, residents, devices, access, utilities, and infrastructure operations.",
    publisher: {
      "@type": "Organization",
      name: seoConfig.companyName,
      url: seoConfig.baseUrl,
    },
  };
}

export function articleJsonLd(page: PageSeo, datePublished = "2026-06-03") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    author: {
      "@type": "Organization",
      name: seoConfig.companyName,
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
