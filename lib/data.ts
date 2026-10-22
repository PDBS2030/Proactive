export const NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export const HERO = {
  title: "Building places that move and inspire",
  intro:
    "We construct projects of all types across Maryland, DC and Virginia, with a clear-cut focus: build for a better society.",
  alt: "Open oak stair with slender black balusters",
};

export const OFFERINGS = {
  heading: "Our core offerings",
  items: [
    {
      title: "Buildings",
      href: "/work/buildings",
      image: "/assets/offerings-buildings.jpg",
      alt: "Students walking near a modern university building with autumn trees and clear sky.",
    },
    {
      title: "Transportation & Infrastructure",
      href: "/work/transportation-infrastructure",
      image: "/assets/offerings-infrastructure.jpg",
      alt: "View of a busy suspension bridge with steel towers and traffic over a river in a city.",
    },
    {
      title: "Commercial development",
      href: "/work/commercial-development",
      image: "/assets/offerings-development.jpg",
      alt: "Modern glass office building at sunset with sunlight reflecting on windows.",
    },
    {
      title: "Careers",
      href: "/careers",
      image: "/assets/offerings-talent.jpg",
      alt: "Construction workers wearing safety helmets and vests at an outdoor site.",
    },
  ],
};

export type ProjectTab = { key: string; label: string; featured: string };

export const PROJECT_TABS: ProjectTab[] = [
  { key: "explore", label: "Explore Projects", featured: "450 W 17th Street – New York" },
  { key: "residential", label: "Residential", featured: "Faith Lane, Ardsley – New York" },
  { key: "loft", label: "Loft & Industrial Conversions", featured: "Hudson Street Loft – NY" },
  { key: "landmark", label: "Landmark & Brownstone", featured: "West 88th St Townhouse - NYC" },
  { key: "commercial", label: "Commercial", featured: "IKEN Academy - NYC" },
];

/** Slide layout of every gallery: a large photo, then pairs, as on the reference site. */
export const GALLERY_LAYOUT: Array<{ kind: "big" | "pair"; count: number }> = [
  { kind: "big", count: 1 },
  { kind: "pair", count: 2 },
  { kind: "pair", count: 2 },
  { kind: "big", count: 1 },
  { kind: "pair", count: 2 },
  { kind: "pair", count: 2 },
];

export const PROCESS = {
  title: "15 Steps | 3 Phases",
  lead: "Our seamless design-build process:",
  phases: [
    { title: "Phase 1", steps: "Steps 1-5", name: "Preliminary Study" },
    { title: "Phase 2", steps: "Steps 6-10", name: "Design Development" },
    { title: "Phase 3", steps: "Steps 11-15", name: "Construction" },
  ],
  cta: { label: "Learn More About Our Process", href: "/process" },
};

export const INSIGHTS = {
  eyebrow: "PDBS NEWS & EVENTS",
  heading: "What’s Happening at PDBS",
  items: [
    {
      image: "/assets/insights/ai-local-visibility-cover.webp",
      date: "October 14, 2026",
      iso: "2026-10-14",
      title: "ChatGPT recommended just 1.2% of local business locations. Is yours one of them?",
      href: "/insights/chatgpt-recommended-just-1-2-percent-of-local-business-locations",
    },
    {
      image: "/assets/insights/small-business-ai-cover.webp",
      date: "October 8, 2026",
      iso: "2026-10-08",
      title: "Where AI pays off for small businesses, and where it doesn't yet",
      href: "/insights/where-ai-pays-off-for-small-businesses",
    },
    {
      image: "/assets/insights/agent-gates-cover.webp",
      date: "October 8, 2026",
      iso: "2026-10-08",
      title: "From pilot to production: the evaluation and governance gates every AI agent needs",
      href: "/insights/from-pilot-to-production-the-gates-every-ai-agent-needs",
    },
  ],
};

export const FAQS = {
  eyebrow: "Frequently Asked Questions",
  title: "FAQs",
  cta: { label: "Contact Us", href: "/contact" },
  items: [
    {
      q: "What is the PDBS Advantage?",
      a: "PDBS’s advantage includes national buying power, value-engineered design, collaborative expertise, nontraditional buyout, and contract pricing based on integrated preliminary design at no cost.",
    },
    {
      q: "What is PDBS’s track record for repeat business?",
      a: "We take pride in our 80-90% repeat business rate – a testament to our commitment to forging lasting relationships and ensuring high client satisfaction.",
    },
  ],
};

export const FOOTER = {
  office: "6505 Liberty Road,\nBaltimore, MD 21207",
  email: "info@proactivedbs.com",
  phone: { label: "443.554.3311", href: "tel:+14435543311" },
  credit: { label: "Designed by MAYRIAN", href: "https://www.mayrian.com/" },
};
