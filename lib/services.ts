/**
 * Services page content. Structure follows the benchmark pages (ARCO design-build, Skanska expertise):
 * photo hero, a statement beside labeled sections, a card grid, proof, markets, FAQ, contact.
 */
export const SERVICES_PAGE = {
  title: "Services",
  headline: "Design and build, with one accountable team",
  lead: "PROACTIVE brings architecture, design-build and construction management together, so the people who draw your building are the people who price and build it. We work across Maryland, DC and Virginia.",
  image: "/assets/hero.jpg",
  imageAlt: "Open oak stair with slender black balusters",
};

export const STATEMENT = {
  text: "Reduce risk and finish sooner with a single team responsible for design and construction.",
  cta: { label: "Start a project", href: "#inquiry" },
  sections: [
    {
      id: "architecture",
      label: "Architecture & Design",
      body: "Our architects and engineers work beside our builders from the first sketch, so every option you review has a real cost and schedule attached.",
      points: [
        "Programming, site studies and feasibility",
        "Concept through construction documents",
        "Value engineering during design, not after bidding",
      ],
    },
    {
      id: "design-build",
      label: "Design-Build",
      body: "One agreement and one team for design and construction. Designers and builders solve problems together, which shortens schedules and keeps responsibility in one place.",
      points: [
        "Integrated preliminary design before you commit",
        "Early trade input and constructability review",
        "Phased packages that let work start sooner",
      ],
    },
    {
      id: "construction-management",
      label: "Construction Management",
      body: "Already working with your own architect? We manage preconstruction, procurement, schedule, cost and quality so your design is built the way it was drawn.",
      points: [
        "Preconstruction estimating and budgeting",
        "Bidding, buyout and site supervision",
        "Closeout, commissioning and warranty support",
      ],
    },
  ],
};

export const PROOF = {
  label: "PDBS at a glance",
  items: [
    { value: "80–90%", text: "repeat business" },
    { value: "3 phases", text: "15 steps, every project" },
    { value: "MD · DC · VA", text: "from our Baltimore office" },
  ],
};

export const CAPABILITIES = {
  label: "How we deliver",
  heading: "What working with one team gives you",
  items: [
    { title: "Integrated design", text: "Architects, engineers and builders share one table, so drawings reflect how the building will actually be built." },
    { title: "Early, honest pricing", text: "Contract pricing based on integrated preliminary design at no cost, then refined as the drawings mature." },
    { title: "One contract", text: "A single agreement for design and construction, so there is no gap between designer and builder to fall into." },
    { title: "Dedicated project manager", text: "One person who knows your project, answers your calls and reports on cost and schedule at every step." },
    { title: "Quality on site", text: "A superintendent on your job and clear quality checks before each trade hands over to the next." },
    { title: "Closeout that counts", text: "Commissioning, training and warranty support, so the building performs after we leave." },
  ],
};

export const MARKETS = {
  label: "Markets",
  heading: "Where we build",
  lead: "Projects of all types across Maryland, DC and Virginia.",
  items: [
    {
      title: "Buildings",
      text: "Education, civic, office and community buildings delivered with cost and schedule you can rely on.",
      href: "/work/buildings",
      image: "/assets/offerings-buildings.jpg",
      alt: "Students walking near a modern university building with autumn trees and clear sky.",
    },
    {
      title: "Transportation & Infrastructure",
      text: "Bridges, roads and public works built to last, with careful coordination around live traffic.",
      href: "/work/transportation-infrastructure",
      image: "/assets/offerings-infrastructure.jpg",
      alt: "View of a busy suspension bridge with steel towers and traffic over a river in a city.",
    },
    {
      title: "Commercial development",
      text: "Offices and mixed-use projects designed and built around your return on investment.",
      href: "/work/commercial-development",
      image: "/assets/offerings-development.jpg",
      alt: "Modern glass office building at sunset with sunlight reflecting on windows.",
    },
  ],
};

export const LOCAL = {
  label: "Local team",
  heading: "Built by people you can meet",
  body: "We are a Baltimore firm. The team that wins your project is the team that builds it, and you will have a name and a phone number for every part of the job. Our process runs the same disciplined 15 steps in 3 phases on every project, from preliminary study through construction.",
  image: "/assets/process-bg.jpg",
  imageAlt: "Construction site at work",
  cta: { label: "See our process", href: "/process" },
};

export const SERVICES_FAQS = {
  eyebrow: "Frequently Asked Questions",
  title: "Services FAQs",
  cta: { label: "Contact Us", href: "#inquiry" },
  items: [
    {
      q: "What is design-build?",
      a: "Design-build is a delivery method in which one company is responsible for both the design and the construction of your project under a single contract. Designers and builders collaborate from the start, which improves cost control and shortens schedules.",
    },
    {
      q: "How is the price determined?",
      a: "We develop the price alongside the design, starting with an integrated preliminary design at no cost. As drawings mature, estimates are refined with trade input, so you see real numbers before construction begins.",
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

export const INQUIRY = {
  heading: "Start with a conversation",
  lead: "Tell us what you are planning. We reply within one business day to set up a call and suggest the right first step.",
};
