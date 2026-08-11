export const companyInfo = {
  legalName: "Ochiga",
  brandName: "Ochiga",
  tagline: "Technology Meets Architecture",
  positioning: "Ochiga develops and powers intelligent places.",
  supportingStatement:
    "We combine real estate development, building technology and strategic investment partnerships to create better places to live, work and operate.",
  productName: "Oyi",
  oyiWebsite: "https://getoyi.com",
  website: "https://ochiga.com.ng",
  contactEmail: "info@ochiga.com.ng",
  supportEmail: "info@ochiga.com.ng",
  deploymentsEmail: "info@ochiga.com.ng",
  phone: "+234 916 473 8454",
  whatsapp: "+234 916 473 8454",
  location: "Lagos, Nigeria",
  social: {
    instagram: "https://instagram.com/OchigaGlobal",
    facebook: "https://facebook.com/OchigaGlobal",
  },
  socialLabels: {
    instagram: "@OchigaGlobal",
    facebook: "Ochiga Global",
  },
};

// The three engines that make up the Ochiga ecosystem. Used across the
// homepage, nav, and any "Development x Oyi x Private" summary blocks.
export const engines = [
  {
    key: "development",
    name: "Ochiga Development",
    href: "/development",
    short: "We create the physical asset.",
    description:
      "The physical development engine — land, design, capital and delivery for residential and mixed-use environments.",
    image: { src: "/images/development/havana-tower-dusk.webp", alt: "Havana Residences tower at dusk on the Lagos waterfront" },
  },
  {
    key: "oyi",
    name: "Oyi",
    href: "/oyi",
    short: "We power how it operates.",
    description:
      "Ochiga's building operating technology — the intelligence layer that helps developments continue to evolve after handover.",
    image: { src: "/images/oyi/oyi-hero-operating-intelligence.webp", alt: "Oyi building-intelligence overlays for access control, energy, climate and security" },
  },
  {
    key: "private",
    name: "Ochiga Private",
    href: "/private",
    short: "We connect selected people and capital to opportunity.",
    description:
      "A curated private real-estate investment and opportunity network for selected investors, buyers and partners.",
    image: { src: "/images/private/ochiga-private-hero.webp", alt: "Ochiga Private client lounge with a global investment-opportunities dashboard and a city skyline view" },
  },
] as const;

export const corporateLinks = {
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  support: "/support",
  deployments: "/deployments",
};

export const primaryNavigation = [
  { href: "/", label: "Home" },
  {
    href: "/development",
    label: "Development",
    children: [
      { href: "/development", label: "Overview" },
      { href: "/development/residential", label: "Residential" },
      { href: "/development/mixed-use", label: "Mixed Use / Future Sectors" },
      { href: "/development/approach", label: "Development Approach" },
      { href: "/development/joint-ventures", label: "Joint Ventures" },
      { href: "/development/studies", label: "Development Studies" },
    ],
  },
  { href: "/technology", label: "Technology" },
  {
    href: "/private",
    label: "Ochiga Private",
    children: [
      { href: "/private", label: "Overview" },
      { href: "/private/investment-approaches", label: "Investment Approaches" },
      { href: "/private/advantage", label: "Private Advantage" },
      { href: "/private#membership", label: "Membership" },
    ],
  },
  {
    href: "/partnerships",
    label: "Partnerships",
    children: [
      { href: "/partnerships/landowners", label: "Landowners / Joint Ventures" },
      { href: "/partnerships/capital", label: "Capital Partners" },
      { href: "/partnerships/buyers", label: "Buyers / Offtake" },
      { href: "/partnerships/professional", label: "Professional / Strategic Partners" },
    ],
  },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Company" },
      { href: "/about#journey", label: "Our Journey" },
      { href: "/about#philosophy", label: "Philosophy" },
      { href: "/about#trust", label: "Trust & Governance" },
    ],
  },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNavigation = {
  development: [
    { href: "/development", label: "Overview" },
    { href: "/development/residential", label: "Residential" },
    { href: "/development/mixed-use", label: "Mixed Use" },
    { href: "/development/joint-ventures", label: "Joint Ventures" },
    { href: "/development/studies", label: "Development Studies" },
  ],
  ecosystem: [
    { href: "/technology", label: "Technology" },
    { href: "/private", label: "Ochiga Private" },
    { href: "/partnerships", label: "Partnerships" },
    { href: "/insights", label: "Insights" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/support", label: "Support" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

// Persistent + contextual CTAs referenced throughout the site (Section 4).
export const ctas = {
  primary: { label: "Partner With Ochiga", href: "/contact" },
  exploreDevelopment: { label: "Explore Development", href: "/development" },
  discoverOyi: { label: "Discover Oyi", href: "/oyi" },
  requestMembership: { label: "Request Membership", href: "/private#membership" },
  proposeDevelopment: { label: "Propose a Development", href: "/partnerships/landowners" },
  requestOyiDeployment: { label: "Request Deployment", href: "/technology#deployment" },
  workWithOchiga: { label: "Work With Ochiga", href: "/partnerships/professional" },
};
