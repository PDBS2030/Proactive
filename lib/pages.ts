/**
 * Content for About, Projects, Process and Contact.
 * Structure follows the pages of global builders (Skanska, Turner).
 * Copy marked DRAFT is written from what the site already says and needs the client's confirmation:
 * leadership, values, commitments and the sample portfolio entries.
 */

export const ABOUT = {
  title: "About PROACTIVE",
  lead: "PROACTIVE Design and Building Systems, Inc. is a design-build firm based in Baltimore, Maryland. We design and construct projects of all types across Maryland, DC and Virginia, with a clear-cut focus: build for a better society.",
  image: "/assets/offerings-talent.jpg",
  imageAlt: "Construction workers wearing safety helmets and vests at an outdoor site.",
  facts: [
    { value: "80–90%", label: "Repeat business" },
    { value: "3", label: "Services under one roof: architecture, design-build and construction management" },
    { value: "15 steps", label: "In 3 phases on every project" },
    { value: "3", label: "Regions served: Maryland, DC and Virginia" },
  ],
  who: {
    heading: "Who we are",
    statement: "We plan, design and build projects that move and inspire the communities around them.",
    body: [
      "PROACTIVE brings architecture, engineering and construction together in one firm. The people who design your building are the people who price it and build it, so decisions are made once, with the whole picture in view.",
      "We are a Baltimore company, and our work is local. Our clients return to us for the next project, and that repeat business is the measure we trust most.",
    ],
  },
  values: {
    heading: "Our values",
    items: [
      { title: "Integrity", text: "We say what we will do, price it honestly and stand behind it." },
      { title: "Accountability", text: "One team owns the outcome from first sketch to final handover." },
      { title: "Collaboration", text: "Owners, designers, trades and neighbors all have a voice in the work." },
      { title: "Craftsmanship", text: "We build each project as if we will be the ones using it." },
    ],
  },
  leadership: {
    heading: "Leadership",
    lead: "Our leadership team sets the direction of the firm and stays accountable for every project we deliver.",
    roles: [
      { title: "Executive leadership", text: "Sets strategy, standards and the culture of the firm, and is the final point of accountability to our clients." },
      { title: "Design", text: "Leads architecture and engineering, so every design is buildable, priced and coordinated before construction starts." },
      { title: "Construction", text: "Leads field operations, safety, schedule and quality on every site." },
      { title: "Preconstruction and estimating", text: "Develops budgets and contract pricing alongside the design, so cost is known early." },
    ],
  },
  commitments: {
    heading: "Our commitments",
    lead: "How we build matters as much as what we build.",
    items: [
      { title: "Safety and wellness", text: "Every job is planned around safe work, and everyone on site has the authority to stop it when something is wrong." },
      { title: "Ethics and compliance", text: "We follow the law, deal fairly with clients, trades and suppliers, and keep clear records." },
      { title: "Quality", text: "Clear standards, inspection before each trade hands over to the next, and a thorough closeout." },
      { title: "Sustainability", text: "We design and build for long-term performance, with attention to energy use, materials and waste." },
      { title: "Community", text: "We build in neighborhoods we know, and we work to leave them better than we found them." },
      { title: "Inclusion", text: "We open our projects to local, small and diverse firms, and we value different perspectives on our teams." },
    ],
  },
  locations: {
    heading: "Where we work",
    lead: "We are based in Baltimore and serve clients across Maryland, DC and Virginia.",
  },
  cta: { heading: "Let’s talk about your project", button: { label: "Contact us", href: "/contact" } },
};

export type Sector = "Residential" | "Loft & industrial conversions" | "Landmark & brownstone" | "Commercial";
export type Region = "Maryland" | "DC" | "Virginia";
export type ServiceType = "Architecture & design" | "Design-build" | "Construction management";

export type Project = {
  id: string;
  title: string;
  city: string;
  region: Region;
  sector: Sector;
  service: ServiceType;
  image: string;
};

/** SAMPLE portfolio entries (photos from the prototype gallery). Replace with real PDBS projects. */
export const PROJECTS: Project[] = [
  { id: "p1", title: "Harbor-view residence", city: "Baltimore", region: "Maryland", sector: "Residential", service: "Design-build", image: "/assets/gallery/residential/1.jpg" },
  { id: "p2", title: "Family home renovation", city: "Bethesda", region: "Maryland", sector: "Residential", service: "Architecture & design", image: "/assets/gallery/residential/2.jpg" },
  { id: "p3", title: "Hillside residence", city: "Arlington", region: "Virginia", sector: "Residential", service: "Design-build", image: "/assets/gallery/residential/3.jpg" },
  { id: "p4", title: "Warehouse loft conversion", city: "Baltimore", region: "Maryland", sector: "Loft & industrial conversions", service: "Design-build", image: "/assets/gallery/loft/1.jpg" },
  { id: "p5", title: "Industrial studio", city: "Washington", region: "DC", sector: "Loft & industrial conversions", service: "Construction management", image: "/assets/gallery/loft/2.jpg" },
  { id: "p6", title: "Factory residences", city: "Alexandria", region: "Virginia", sector: "Loft & industrial conversions", service: "Design-build", image: "/assets/gallery/loft/3.jpg" },
  { id: "p7", title: "Historic rowhouse restoration", city: "Washington", region: "DC", sector: "Landmark & brownstone", service: "Architecture & design", image: "/assets/gallery/landmark/1.jpg" },
  { id: "p8", title: "Townhouse renovation", city: "Annapolis", region: "Maryland", sector: "Landmark & brownstone", service: "Design-build", image: "/assets/gallery/landmark/2.jpg" },
  { id: "p9", title: "Landmark facade and interiors", city: "Richmond", region: "Virginia", sector: "Landmark & brownstone", service: "Construction management", image: "/assets/gallery/landmark/3.jpg" },
  { id: "p10", title: "Office interior fit-out", city: "Baltimore", region: "Maryland", sector: "Commercial", service: "Design-build", image: "/assets/gallery/commercial/1.jpg" },
  { id: "p11", title: "Academy and learning space", city: "Washington", region: "DC", sector: "Commercial", service: "Construction management", image: "/assets/gallery/commercial/2.jpg" },
  { id: "p12", title: "Retail and showroom", city: "Tysons", region: "Virginia", sector: "Commercial", service: "Architecture & design", image: "/assets/gallery/commercial/3.jpg" },
];

export const PROJECTS_PAGE = {
  title: "Our portfolio",
  lead: "A selection of projects across Maryland, DC and Virginia. Filter by sector, region or service to see work like yours.",
  image: "/assets/offerings-development.jpg",
  imageAlt: "Modern glass office building at sunset with sunlight reflecting on windows.",
};

export const PROCESS_PAGE = {
  title: "Our process",
  lead: "Fifteen steps in three phases, the same disciplined path on every project. You always know where you are, what comes next and what it costs.",
  image: "/assets/process-bg.jpg",
  imageAlt: "Construction in progress",
  phases: [
    {
      key: "p1",
      title: "Preliminary Study",
      range: "Steps 1–5",
      summary: "Understand your goals, site and budget, and see a first design direction with an estimate before you commit.",
      steps: [
        { title: "Initial consultation", text: "We listen to your goals, timeline and constraints, and explain how we work." },
        { title: "Site visit and goals", text: "We walk the site, review conditions and agree on what success looks like." },
        { title: "Program and budget", text: "We define the spaces, performance and budget range the project must meet." },
        { title: "Feasibility review", text: "We check zoning, permitting, utilities and risks that could affect cost or schedule." },
        { title: "Preliminary design and estimate", text: "You receive an integrated preliminary design with an early cost estimate to decide on." },
      ],
    },
    {
      key: "p2",
      title: "Design Development",
      range: "Steps 6–10",
      summary: "Develop the drawings, selections and contract price together, with your input at every decision.",
      steps: [
        { title: "Design agreement", text: "We confirm scope, fees and the schedule for design and pricing." },
        { title: "Schematic design", text: "Plans, elevations and massing are refined with your feedback." },
        { title: "Design development and selections", text: "Systems, materials and finishes are chosen and coordinated." },
        { title: "Value engineering and pricing", text: "Builders and trades price the design, and we balance cost against your priorities." },
        { title: "Construction documents and permits", text: "Final drawings are issued and permit applications are filed." },
      ],
    },
    {
      key: "p3",
      title: "Construction",
      range: "Steps 11–15",
      summary: "Build to the plan, with one point of contact, regular reporting and a thorough handover.",
      steps: [
        { title: "Contract and buyout", text: "We finalize the contract and award trade packages." },
        { title: "Mobilization and schedule", text: "The site team, safety plan and detailed schedule are put in place." },
        { title: "Construction and quality control", text: "We build, inspect each stage and report on cost and schedule." },
        { title: "Punch list and commissioning", text: "We complete final items and test building systems to confirm they perform." },
        { title: "Handover and warranty", text: "You receive training, documentation and warranty support." },
      ],
    },
  ],
  pillars: {
    heading: "Built on discipline",
    lead: "Four commitments that apply to every phase and every project.",
    items: [
      { title: "Safety first", text: "A site safety plan before mobilization, daily oversight, and authority for anyone to stop unsafe work." },
      { title: "Clear communication", text: "One project manager, a regular reporting rhythm and no surprises on cost or schedule." },
      { title: "Quality control", text: "Defined standards and inspection before each trade hands over to the next." },
      { title: "Local partnerships", text: "We work with trusted local trades and suppliers and open opportunities to new firms." },
    ],
  },
  delivery: {
    heading: "Delivery methods",
    lead: "Most clients choose design-build, and we also manage projects you have already designed.",
    items: [
      { title: "Design-build", text: "One contract and one team for design and construction. The route to the fastest schedule and the clearest accountability.", href: "/services#design-build" },
      { title: "Construction management", text: "Builder-side oversight for projects with their own architect, from preconstruction to closeout.", href: "/services#construction-management" },
      { title: "Architecture and design", text: "Design services that are priced and checked for buildability as they develop.", href: "/services#architecture" },
    ],
  },
  cta: { heading: "Ready to start the first step?", button: { label: "Start a conversation", href: "/contact" } },
};

export const CONTACT = {
  title: "Contact us",
  lead: "Whether you are looking to start a project, ask a question or work with us, we want to hear from you. Send a message and we will reply within one business day.",
  topics: [
    "Start a project",
    "General question",
    "Subcontractor or supplier",
    "Careers",
    "Media",
  ],
  subcontractors: {
    heading: "Subcontractors and suppliers",
    text: "We build with trusted local trades and welcome new partners. Tell us about your firm, trade and the areas you serve, and we will follow up about prequalification.",
    button: "Introduce your firm",
  },
  careers: {
    heading: "Careers",
    text: "We are always interested in skilled people who care about building well. Send your résumé and the role you are interested in.",
    button: "Ask about careers",
  },
};
