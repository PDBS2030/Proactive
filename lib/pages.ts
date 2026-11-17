/**
 * Content for About, Projects, Process and Contact.
 * Structure follows the pages of global builders (Skanska, Turner).
 * Copy marked DRAFT is written from what the site already says and needs the client's confirmation:
 * leadership, values, commitments and the sample portfolio entries.
 */

export const ABOUT = {
  title: "About PDBS",
  lead: "Proactive Design and Building Systems is a design-build firm based in Baltimore, Maryland. We design and construct projects of all types across Maryland, DC and Virginia, with a clear-cut focus: build for a better society.",
  image: "/assets/offerings-talent.jpg",
  imageAlt: "Construction workers wearing safety helmets and vests at an outdoor site.",
  facts: [
    { value: "80–90%", label: "Repeat business" },
    { value: "3", label: "Services under one roof: architecture, design-build and construction management" },
    { value: "15 steps", label: "In 3 phases on every project" },
    { value: "3", label: "Regions served: Maryland, DC and Virginia" },
  ],
  who: {
    heading: "Our Vision",
    statement: "We plan, design and build projects that move and inspire the communities around them.",
    body: [
      "PDBS brings architecture, engineering and construction together in one firm. The people who design your building are the people who price it and build it, so decisions are made once, with the whole picture in view.",
      "We are a Baltimore company, and our work is local. Our clients return to us for the next project, and that repeat business is the measure we trust most.",
    ],
  },
  values: {
    heading: "Our Values",
    /** DRAFT wording for the Our Values dialog */
    statement: "Four values guide every project, from the first sketch to the final handover.",
    closing: "Our clients return to us for the next project, and that repeat business is the measure we trust most.",
    items: [
      { title: "Integrity", text: "We say what we will do, price it honestly and stand behind it." },
      { title: "Accountability", text: "One team owns the outcome from first sketch to final handover." },
      { title: "Collaboration", text: "Owners, designers, trades and neighbors all have a voice in the work." },
      { title: "Craftsmanship", text: "We build each project as if we will be the ones using it." },
    ],
  },
  leadership: {
    heading: "Our Team",
    lead: "Our leadership team sets the direction of the firm and stays accountable for every project we deliver.",
    /** Names, titles and portraits as on the earlier PDBS site (about-us page); the biographies are DRAFT role descriptions. Replace with the real team when ready */
    people: [
      {
        name: "John Smith",
        title: "Principal Architect",
        image: "/assets/team/team-1.jpg",
        bio: [
          "John leads architecture at PDBS, shaping each project from the first sketch so that the design is buildable, priced and coordinated before construction starts.",
          "He works with owners, engineers and trades through every design phase, keeping decisions clear and the whole picture in view.",
          "John stays involved from the preliminary study to handover, so the team that designs your building is the team that delivers it.",
        ],
      },
      {
        name: "Dwayne Doe",
        title: "Senior Designer",
        image: "/assets/team/team-2.jpg",
        bio: [
          "Dwayne develops each design from schematic plans to coordinated drawings and a schedule of selections for materials, finishes and systems.",
          "He keeps the design tied to the budget, working with the estimating team so that every choice is made with its cost in front of you.",
          "Dwayne brings owners into each decision, so the finished building reflects their priorities as well as the team's craft.",
        ],
      },
      {
        name: "Jessica Larsson",
        title: "Technical Director",
        image: "/assets/team/team-3.jpg",
        bio: [
          "Jessica oversees the technical side of every project, from coordinating structure and building systems to issuing construction documents and permit applications.",
          "She reviews drawings and specifications before they reach the field, so questions are settled on paper and not on site.",
          "Jessica works closely with the design and construction teams to make sure what is drawn is what is built.",
        ],
      },
      {
        name: "Emily Bright",
        title: "Project Manager",
        image: "/assets/team/team-4.jpg",
        bio: [
          "Emily is the single point of contact for clients from the first meeting to handover, and reports regularly on cost, schedule and quality.",
          "She coordinates the design team, the trades and the site, and prices every change before it goes ahead so you decide with the facts in front of you.",
          "Emily leads the final inspection and handover, making sure you receive training, documentation and warranty support.",
        ],
      },
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
  /** A larger photograph for the project's own page, where the card photo is too small */
  hero?: string;
  year: number;
  size: string;
  scope: string;
};

/** Address-bar values for the service filter, shared by the Services and Projects pages. */
export const SERVICE_SLUGS: Record<string, ServiceType> = {
  architecture: "Architecture & design",
  "design-build": "Design-build",
  "construction-management": "Construction management",
};

/** SAMPLE portfolio entries (photos from the prototype gallery, sizes and years invented). Replace with real PDBS projects. */
export const PROJECTS: Project[] = [
  { id: "p1", title: "Harbor view residence", city: "Baltimore", region: "Maryland", sector: "Residential", service: "Design-build", image: "/assets/gallery/residential/1.jpg", year: 2024, size: "3,800 sq ft", scope: "New residence, designed and built" },
  { id: "p2", title: "Family home renovation", city: "Bethesda", region: "Maryland", sector: "Residential", service: "Architecture & design", image: "/assets/gallery/residential/2.jpg", year: 2023, size: "2,600 sq ft", scope: "Whole-house renovation and redesign" },
  { id: "p3", title: "Hillside residence", city: "Arlington", region: "Virginia", sector: "Residential", service: "Design-build", image: "/assets/gallery/residential/3.jpg", hero: "/assets/projects/hillside-residence.jpg", year: 2024, size: "4,100 sq ft", scope: "Hillside residence with new structure" },
  { id: "p4", title: "Warehouse loft conversion", city: "Baltimore", region: "Maryland", sector: "Loft & industrial conversions", service: "Design-build", image: "/assets/gallery/loft/1.jpg", year: 2023, size: "6,500 sq ft", scope: "Warehouse converted to loft residences" },
  { id: "p5", title: "Industrial studio", city: "Washington", region: "DC", sector: "Loft & industrial conversions", service: "Construction management", image: "/assets/gallery/loft/2.jpg", year: 2022, size: "5,200 sq ft", scope: "Studio fit-out managed for the owner" },
  { id: "p6", title: "Factory residences", city: "Alexandria", region: "Virginia", sector: "Loft & industrial conversions", service: "Design-build", image: "/assets/gallery/loft/3.jpg", year: 2024, size: "18,000 sq ft", scope: "Factory building converted to homes" },
  { id: "p7", title: "Historic rowhouse restoration", city: "Washington", region: "DC", sector: "Landmark & brownstone", service: "Architecture & design", image: "/assets/gallery/landmark/1.jpg", year: 2022, size: "3,400 sq ft", scope: "Historic rowhouse restoration and redesign" },
  { id: "p8", title: "Townhouse renovation", city: "Annapolis", region: "Maryland", sector: "Landmark & brownstone", service: "Design-build", image: "/assets/gallery/landmark/2.jpg", year: 2023, size: "2,900 sq ft", scope: "Townhouse renovation, interiors and systems" },
  { id: "p9", title: "Landmark facade and interiors", city: "Richmond", region: "Virginia", sector: "Landmark & brownstone", service: "Construction management", image: "/assets/gallery/landmark/3.jpg", year: 2021, size: "22,000 sq ft", scope: "Landmark facade and interiors, managed construction" },
  { id: "p10", title: "Office interior fit-out", city: "Baltimore", region: "Maryland", sector: "Commercial", service: "Design-build", image: "/assets/gallery/commercial/1.jpg", year: 2024, size: "8,800 sq ft", scope: "Office interior fit-out" },
  { id: "p11", title: "Academy and learning space", city: "Washington", region: "DC", sector: "Commercial", service: "Construction management", image: "/assets/gallery/commercial/2.jpg", year: 2023, size: "12,000 sq ft", scope: "Learning space built to the owner’s design" },
  { id: "p12", title: "Retail and showroom", city: "Tysons", region: "Virginia", sector: "Commercial", service: "Architecture & design", image: "/assets/gallery/commercial/3.jpg", year: 2022, size: "5,600 sq ft", scope: "Retail and showroom design" },
  { id: "p13", title: "Library and fireplace renovation", city: "Bethesda", region: "Maryland", sector: "Residential", service: "Architecture & design", image: "/assets/gallery/residential/4.jpg", year: 2023, size: "2,400 sq ft", scope: "Living room rebuilt around a fireplace wall and built-in library" },
  { id: "p14", title: "Children’s playroom", city: "Towson", region: "Maryland", sector: "Residential", service: "Design-build", image: "/assets/gallery/residential/5.jpg", year: 2022, size: "900 sq ft", scope: "Playroom with built-in cubby storage" },
  { id: "p15", title: "Homework and play room", city: "Silver Spring", region: "Maryland", sector: "Residential", service: "Design-build", image: "/assets/gallery/residential/6.jpg", year: 2023, size: "1,100 sq ft", scope: "Study desk, storage and play space in one room" },
  { id: "p16", title: "Lower-level fitness and play space", city: "Arlington", region: "Virginia", sector: "Residential", service: "Design-build", image: "/assets/gallery/residential/7.jpg", year: 2024, size: "2,800 sq ft", scope: "Finished lower level for family fitness and play" },
  { id: "p17", title: "Home office with garden view", city: "Fairfax", region: "Virginia", sector: "Residential", service: "Architecture & design", image: "/assets/gallery/residential/8.jpg", year: 2022, size: "320 sq ft", scope: "Built-in desk and shelving under a wide window" },
  { id: "p18", title: "Lower-level bar and lounge", city: "Annapolis", region: "Maryland", sector: "Residential", service: "Construction management", image: "/assets/gallery/residential/9.jpg", year: 2021, size: "1,500 sq ft", scope: "Entertaining space with a stone-topped bar" },
  { id: "p19", title: "Primary bath renovation", city: "Washington", region: "DC", sector: "Residential", service: "Design-build", image: "/assets/gallery/residential/10.jpg", year: 2023, size: "260 sq ft", scope: "Bath rebuilt in colored glass tile" },
  { id: "p20", title: "Loft living room and library", city: "Baltimore", region: "Maryland", sector: "Loft & industrial conversions", service: "Architecture & design", image: "/assets/gallery/loft/4.jpg", year: 2022, size: "1,800 sq ft", scope: "Living space with a built-in library and media wall" },
  { id: "p21", title: "Loft kitchen and fireplace corner", city: "Washington", region: "DC", sector: "Loft & industrial conversions", service: "Design-build", image: "/assets/gallery/loft/5.jpg", year: 2023, size: "1,400 sq ft", scope: "Kitchen and hearth corner in a converted loft" },
  { id: "p22", title: "Loft kitchen with marble island", city: "Alexandria", region: "Virginia", sector: "Loft & industrial conversions", service: "Design-build", image: "/assets/gallery/loft/6.jpg", year: 2024, size: "1,300 sq ft", scope: "Walnut kitchen with a marble island" },
  { id: "p23", title: "Loft cooking suite", city: "Baltimore", region: "Maryland", sector: "Loft & industrial conversions", service: "Construction management", image: "/assets/gallery/loft/7.jpg", year: 2022, size: "1,200 sq ft", scope: "Cooking area with a range hood and wine storage" },
  { id: "p24", title: "Loft kitchen and breakfast bar", city: "Richmond", region: "Virginia", sector: "Loft & industrial conversions", service: "Design-build", image: "/assets/gallery/loft/8.jpg", year: 2021, size: "1,500 sq ft", scope: "Kitchen opened to a breakfast bar and tall windows" },
  { id: "p25", title: "Loft dining room", city: "Washington", region: "DC", sector: "Loft & industrial conversions", service: "Architecture & design", image: "/assets/gallery/loft/9.jpg", year: 2023, size: "1,900 sq ft", scope: "Dining room set between original columns" },
  { id: "p26", title: "Open-plan loft", city: "Tysons", region: "Virginia", sector: "Loft & industrial conversions", service: "Design-build", image: "/assets/gallery/loft/10.jpg", year: 2024, size: "2,600 sq ft", scope: "Open plan with a curved wall and walnut storage doors" },
  { id: "p27", title: "Brownstone living room", city: "Washington", region: "DC", sector: "Landmark & brownstone", service: "Design-build", image: "/assets/gallery/landmark/4.jpg", year: 2023, size: "1,700 sq ft", scope: "Living room with the original brick left exposed" },
  { id: "p28", title: "Brownstone front parlor", city: "Washington", region: "DC", sector: "Landmark & brownstone", service: "Architecture & design", image: "/assets/gallery/landmark/5.jpg", year: 2022, size: "1,300 sq ft", scope: "Front parlor under bay windows with a new stair" },
  { id: "p29", title: "Brownstone primary suite", city: "Baltimore", region: "Maryland", sector: "Landmark & brownstone", service: "Design-build", image: "/assets/gallery/landmark/6.jpg", year: 2024, size: "950 sq ft", scope: "Primary suite with exposed brick and new windows" },
  { id: "p30", title: "Marble bath renovation", city: "Annapolis", region: "Maryland", sector: "Landmark & brownstone", service: "Design-build", image: "/assets/gallery/landmark/7.jpg", year: 2023, size: "180 sq ft", scope: "Bath in large-format marble tile" },
  { id: "p31", title: "Brownstone stair hall", city: "Alexandria", region: "Virginia", sector: "Landmark & brownstone", service: "Construction management", image: "/assets/gallery/landmark/8.jpg", year: 2021, size: "2,200 sq ft", scope: "Open stair and brick wall restored and lit" },
  { id: "p32", title: "Brownstone kitchen and dining", city: "Washington", region: "DC", sector: "Landmark & brownstone", service: "Design-build", image: "/assets/gallery/landmark/9.jpg", year: 2024, size: "1,600 sq ft", scope: "Kitchen and dining room opened to the garden" },
  { id: "p33", title: "Bay-window sitting room", city: "Richmond", region: "Virginia", sector: "Landmark & brownstone", service: "Architecture & design", image: "/assets/gallery/landmark/10.jpg", year: 2022, size: "700 sq ft", scope: "Sitting room in a restored bay with a curved screen" },
  { id: "p34", title: "Early learning classroom", city: "Baltimore", region: "Maryland", sector: "Commercial", service: "Design-build", image: "/assets/gallery/commercial/4.jpg", year: 2023, size: "2,100 sq ft", scope: "Classroom with play kitchen and built-in storage" },
  { id: "p35", title: "Classroom and craft kitchen", city: "Washington", region: "DC", sector: "Commercial", service: "Construction management", image: "/assets/gallery/commercial/5.jpg", year: 2022, size: "2,600 sq ft", scope: "Classroom with a craft kitchen in an older building" },
  { id: "p36", title: "Daylit activity room", city: "Silver Spring", region: "Maryland", sector: "Commercial", service: "Design-build", image: "/assets/gallery/commercial/6.jpg", year: 2024, size: "1,400 sq ft", scope: "Activity room with round ceiling lights" },
  { id: "p37", title: "Staff kitchen", city: "Fairfax", region: "Virginia", sector: "Commercial", service: "Architecture & design", image: "/assets/gallery/commercial/7.jpg", year: 2022, size: "420 sq ft", scope: "Kitchenette with built-in microwave storage" },
  { id: "p38", title: "Learning space and pantry", city: "Arlington", region: "Virginia", sector: "Commercial", service: "Construction management", image: "/assets/gallery/commercial/8.jpg", year: 2023, size: "3,000 sq ft", scope: "Learning space with a pantry wall" },
  { id: "p39", title: "Reading nook", city: "Towson", region: "Maryland", sector: "Commercial", service: "Design-build", image: "/assets/gallery/commercial/9.jpg", year: 2024, size: "600 sq ft", scope: "Raised reading nook under a canopy" },
  { id: "p40", title: "Light installation lobby", city: "Tysons", region: "Virginia", sector: "Commercial", service: "Architecture & design", image: "/assets/gallery/commercial/10.jpg", year: 2021, size: "900 sq ft", scope: "Lobby ceiling with a linear light installation" },
];

/** Address of a project's own page, from its title */
export const projectSlug = (p: Pick<Project, "title">) =>
  p.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** "Baltimore, Maryland", and plain "Washington, D.C." for the District */
export const projectPlace = (p: Pick<Project, "city" | "region">) => (p.region === "DC" ? "Washington, D.C." : `${p.city}, ${p.region}`);

/** Four more photographs from the same kind of work, taken in turn from the folder the project's own photo is in. SAMPLE: replace with the real photos of each project. */
export function projectGallery(p: Pick<Project, "image">): string[] {
  const m = p.image.match(/^(.*)\/(\d+)\.jpg$/);
  if (!m) return [];
  const n = Number(m[2]);
  return [1, 2, 3, 4].map((k) => `${m[1]}/${((n + k * 2 - 1) % 10) + 1}.jpg`);
}

/** A line about the kind of work, for the top of a project page */
export const SECTOR_BLURB: Record<Sector, string> = {
  Residential: "Homes planned around the way the people in them live, with the storage, light and finish that daily use asks for.",
  "Loft & industrial conversions": "Old warehouse and factory shells given new lives as homes and studios, with their columns, windows and scale kept.",
  "Landmark & brownstone": "Historic buildings renewed with care: original brick, stairs and bays kept, and the systems behind them brought up to date.",
  Commercial: "Interiors for working and learning, built to last under daily use and priced against a firm budget.",
};

/** How PDBS worked on a project, by service */
export const SERVICE_LINE: Record<ServiceType, string> = {
  "Design-build": "One PDBS team designed and built it under a single contract, so the price and the plan stayed in step.",
  "Architecture & design": "PDBS provided the architecture and design, checked for buildability and priced as it developed.",
  "Construction management": "PDBS managed the construction on the owner’s behalf, from preconstruction to closeout.",
};

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
