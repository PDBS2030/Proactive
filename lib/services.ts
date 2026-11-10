export const SERVICES_PAGE = {
  eyebrow: "Services",
  title: "One team, from first sketch to final handover",
  lead: "Architecture, design-build and construction management under one roof, so design decisions and construction realities are made together, with one accountable partner from the first meeting to the keys.",
  regions: "Maryland · DC · Virginia",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "See our process", href: "/process" },
  image: "/assets/hero.jpg",
  imageAlt: "Open oak stair with slender black balusters",
};

export type Service = {
  id: string;
  num: string;
  name: string;
  short: string;
  headline: string;
  body: string;
  includes: string[];
  bestFor: string;
  outcome: string;
  image: string;
  alt: string;
};

export const SERVICE_LIST: Service[] = [
  {
    id: "architecture",
    num: "01",
    name: "Architecture & Design",
    short: "Concept to construction documents",
    headline: "Design that is priced and buildable from day one",
    body: "Our architects and engineers work beside our builders from the first sketch. Every option you review carries a real cost and schedule, so the design you approve is one we know we can deliver.",
    includes: [
      "Programming, site and feasibility studies",
      "Concept, schematic and design development",
      "Construction documents and permit drawings",
      "Value engineering during design, not after bidding",
      "Interior planning and material selection",
    ],
    bestFor: "Owners who want a design they can trust to hold its budget.",
    outcome: "A fully coordinated design package, with cost confidence built in.",
    image: "/assets/offerings-buildings.jpg",
    alt: "Students walking near a modern university building with autumn trees and clear sky.",
  },
  {
    id: "design-build",
    num: "02",
    name: "Design-Build",
    short: "One contract, one accountable team",
    headline: "A single point of responsibility for design and construction",
    body: "With design-build, you sign one agreement and work with one team. Designers and builders solve problems together, which shortens the schedule, reduces change orders and keeps accountability in one place.",
    includes: [
      "Integrated preliminary study before you commit",
      "Single contract covering design and construction",
      "Early trade input and constructability review",
      "Phased packages to start work sooner",
      "Transparent cost reporting through every phase",
    ],
    bestFor: "Owners who value speed, cost certainty and a simple chain of command.",
    outcome: "A completed building delivered by one team, on a plan you approved.",
    image: "/assets/offerings-development.jpg",
    alt: "Modern glass office building at sunset with sunlight reflecting on windows.",
  },
  {
    id: "construction-management",
    num: "03",
    name: "Construction Management",
    short: "Expert oversight, on your side",
    headline: "Skilled oversight for projects you have already designed",
    body: "Already working with your own architect? We manage preconstruction, procurement, schedule, cost and quality on your behalf, so your design is built the way it was drawn.",
    includes: [
      "Preconstruction estimating and budgeting",
      "Schedule planning and long-lead procurement",
      "Trade bidding, leveling and award",
      "Site supervision, safety and quality control",
      "Closeout, commissioning and warranty support",
    ],
    bestFor: "Owners with a design team in place who want a builder-side advocate.",
    outcome: "A project that finishes on schedule and on budget, with no surprises.",
    image: "/assets/offerings-infrastructure.jpg",
    alt: "View of a busy suspension bridge with steel towers and traffic over a river in a city.",
  },
];

export const COMPARISON = {
  heading: "Why design-build",
  lead: "The traditional design-bid-build model splits design and construction into separate contracts. Design-build brings them together.",
  columns: ["Design-bid-build", "PDBS design-build"],
  rows: [
    { label: "Contracts", a: "Separate for designer and builder", b: "One agreement, one team" },
    { label: "Cost certainty", a: "Known only after bidding", b: "Priced as the design develops" },
    { label: "Schedule", a: "Design finishes before building starts", b: "Phases overlap so work starts sooner" },
    { label: "Problem solving", a: "Disputes between designer and builder", b: "Solved together, early" },
    { label: "Accountability", a: "Split between parties", b: "One accountable partner" },
  ],
};

export const MARKETS = {
  heading: "Markets we serve",
  lead: "Projects of all types across Maryland, DC and Virginia.",
  items: [
    { title: "Buildings", href: "/work/buildings", image: "/assets/offerings-buildings.jpg", alt: "Modern university building" },
    {
      title: "Transportation & Infrastructure",
      href: "/work/transportation-infrastructure",
      image: "/assets/offerings-infrastructure.jpg",
      alt: "Suspension bridge over a river",
    },
    {
      title: "Commercial development",
      href: "/work/commercial-development",
      image: "/assets/offerings-development.jpg",
      alt: "Glass office building at sunset",
    },
  ],
};

export const PHASES = {
  heading: "How a project runs",
  lead: "Fifteen steps in three phases, the same disciplined path on every job.",
  items: [
    { n: "01", title: "Preliminary Study", steps: "Steps 1–5", text: "Goals, site, budget and a first design direction, so you know what it will take before you commit." },
    { n: "02", title: "Design Development", steps: "Steps 6–10", text: "Drawings, selections and a firm price developed together, with your input at every decision." },
    { n: "03", title: "Construction", steps: "Steps 11–15", text: "Mobilization through handover, with regular reporting and a single point of contact." },
  ],
  cta: { label: "Learn more about our process", href: "/process" },
};

export const SERVICES_FAQS = {
  eyebrow: "Frequently Asked Questions",
  title: "Services FAQs",
  cta: { label: "Contact Us", href: "/contact" },
  items: [
    {
      q: "What is design-build?",
      a: "Design-build is a delivery method in which one company is responsible for both the design and the construction of your project under a single contract. Designers and builders collaborate from the start, which improves cost control and shortens schedules.",
    },
    {
      q: "How is the price determined?",
      a: "We develop the price alongside the design, starting with a preliminary study. As drawings mature, estimates are refined with trade input, so you see real numbers before construction begins.",
    },
    {
      q: "Can you build a project that someone else designed?",
      a: "Yes. Our construction management service is built for this. We review your documents, advise on cost and constructability, and manage the build to the design intent.",
    },
    {
      q: "Where do you work?",
      a: "We construct projects of all types across Maryland, DC and Virginia, from our office in Baltimore.",
    },
    {
      q: "How do we get started?",
      a: "Contact us with a short description of your project, site and timeline. We will schedule a call to understand your goals and outline the right first step.",
    },
  ],
};

export const SERVICES_CTA = {
  title: "Tell us about your project",
  text: "A short conversation is all it takes to find the right starting point.",
  button: { label: "Start a project", href: "/contact" },
};

export const DIFFERENCE = {
  heading: "Why one team finishes sooner",
  lead: "In the usual model a building waits while the design is finished, priced and bid. With design-build the builder is already at the table, so each step starts earlier.",
  points: [
    { title: "Cost is known early", text: "Estimates follow the drawings from the first sketch, so surprises show up in meetings instead of on site." },
    { title: "One owner of the outcome", text: "When something does not fit, there is no designer and builder to point at each other. We fix it." },
    { title: "Fewer changes later", text: "Builders review the design as it develops, so problems are solved on paper where they cost the least." },
  ],
};

export const INQUIRY = {
  heading: "Start with a conversation",
  lead: "Tell us what you are planning. We reply within one business day to set up a call and suggest the right first step.",
};
