export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export const roles: Role[] = [
  {
    company: "LEDL Motors",
    title: "General Manager, Marketing & Growth (Domestic & Export)",
    period: "Oct 2022 – Present",
    location: "Chennai, India",
    summary:
      "Leading marketing, growth and brand for industrial electric motors across India and international markets.",
    highlights: [
      "Building and scaling dealer and distributor networks across India, with structured market entry into the UAE, Russia, Iran, Bangladesh, Italy and markets across Africa.",
      "Launched an exclusive B2B e-commerce portal for India-based stockists, supporting digital lead generation, order flow and dealer engagement.",
      "Rolled out the SSS framework (Sense, Serve, Strengthen): sensing opportunities and market demand, serving customers with the right solutions, and strengthening relationships through support and feedback.",
      "Owns product positioning across IE2 to IE5 efficiency categories, SEO-led demand creation, and CRM adoption across sales teams.",
      "Built the LEDL brand nearly end to end, including a work culture brand that unites R&D, service and quality assurance behind a single promise to the customer.",
    ],
  },
  {
    company: "TAAS Agencies Limited",
    title: "Head of Commercial",
    period: "Aug 2021 – Sep 2022",
    location: "Colombo, Sri Lanka",
    summary:
      "Ran commercial operations for imports from India and Japan, secondary sales in Sri Lanka and cross trades into Africa.",
    highlights: [
      "Implemented strategic pricing to grow revenue and market share.",
      "Streamlined logistics, cutting lead times by 15% and saving costs.",
    ],
  },
  {
    company: "UNIMO Exports (UCAL Group)",
    title: "General Manager",
    period: "Mar 2013 – Jun 2021",
    location: "Chennai, India",
    summary:
      "Eight years building export lines in shock absorbers and engine parts for one of India's established auto component groups, promoted to General Manager.",
    highlights: [
      "Developed a 500-part Euparts range of shock absorbers and engine parts for Tenneco India, expanding reach to the EU, Belarus, Sri Lanka, the UK and Italy.",
      "Led market entry for Rane Madras in Sri Lanka.",
      "Launched new product lines: gas springs, flex pipes and antiviral textiles with HeiQ Viroblock, across B2B and B2C channels.",
    ],
  },
  {
    company: "Independent Practice",
    title: "Automotive Sales Consultant",
    period: "Jul 2009 – Feb 2013",
    location: "Chennai, India",
    summary:
      "Independent consulting on demand creation and inventory management for auto component retailers, built on Theory of Constraints.",
    highlights: [
      "Advised retailers dealing Bosch engine oils, AMCO batteries, UIIC automobile insurance and UCAL carburetors.",
    ],
  },
  {
    company: "Rane Group (Rane Brake Lining)",
    title: "Head Exports, OEM & Aftermarket",
    period: "Aug 2006 – Jul 2009",
    location: "Chennai, India",
    summary: "Took Indian brake linings into new international markets.",
    highlights: [
      "Led entry into Turkey and Tunisia, introduced a new product line in the UK.",
      "Introduced CVDP as a product line in Europe's commercial vehicle market, for trucks, trailers and fleets.",
      "Acquired the first OEM customer at TMD Germany.",
    ],
  },
  {
    company: "MRF",
    title: "Head Exports, APAC",
    period: "Oct 2005 – Aug 2006",
    location: "Chennai, India",
    summary: "Ran APAC exports for India's largest tire maker.",
    highlights: [
      "Developed a new product for Singapore's container transportation segment.",
      "Entered the Indonesian market and secured SNI plant approval.",
    ],
  },
  {
    company: "Tata Hitachi Construction Machinery",
    title: "Branch Head (Senior Officer TM-1 to TM-2)",
    period: "Aug 2001 – Oct 2005",
    location: "Tamil Nadu, India",
    summary:
      "From officer to branch head, selling construction machinery across Tamil Nadu.",
    highlights: [
      "Secured the first institutional Back Hoe Loader sale to Tirunelveli Corporation, beating JCB over a six-month pursuit.",
      "Set up the Madurai area office and held 80% market share in excavators against a 50% target.",
    ],
  },
  {
    company: "Concorde Motors & VST Motors (Tata Motors dealers)",
    title: "Sales Executive, Cars",
    period: "Dec 1998 – Jul 2001",
    location: "Chennai, India",
    summary:
      "Sold Tata cars, month after month, and pushed penetration into upcountry Tamil Nadu.",
    highlights: [],
  },
  {
    company: "Agil Freight Logistics",
    title: "Junior Sales Executive",
    period: "Nov 1997 – Nov 1998",
    location: "Chennai, India",
    summary:
      "The first sales job: monthly targets, a bag, and a city to cover. Everything since started here.",
    highlights: [],
  },
];

export const education = [
  {
    school: "Bharathiar University",
    degree: "BE, Mechanical Engineering",
    years: "1993 – 1997",
  },
  {
    school: "XLRI Jamshedpur",
    degree: "PG Certification, Business Administration",
    years: "2002 – 2004",
  },
  {
    school: "Tamil Nadu Physical Education & Sports University",
    degree: "Master of Science",
    years: "2020 – 2022",
  },
  {
    school: "BITS Pilani (WILP)",
    degree: "PG Diploma, Business Analytics",
    years: "2022 – 2023",
  },
];

export const markets = [
  "India",
  "Sri Lanka",
  "UAE",
  "Russia",
  "Iran",
  "Bangladesh",
  "South Africa",
  "Senegal",
  "Conakry",
  "Ethiopia",
  "Kenya",
  "Tanzania",
  "UK",
  "Italy",
  "Germany",
  "Turkey",
  "Tunisia",
  "Belarus",
  "Singapore",
  "Indonesia",
  "EU",
];

export const stats = [
  { value: 28, suffix: "+", label: "years in sales & growth" },
  { value: 20, suffix: "+", label: "markets entered worldwide" },
  { value: 80, suffix: "%", label: "peak regional market share, vs a 50% target" },
  { value: 500, suffix: "+", label: "part export range built for Tenneco India" },
];

// Condensed milestones for the home page journey.
// `shape` is a single-ring SVG silhouette (viewBox 0 0 200 200) of the product
// he was selling in that era — the journey section morphs between them on scroll.
export const milestones = [
  {
    year: 1997,
    product: "Freight",
    title: "The first territory",
    text: "Junior sales executive at a freight company in Chennai. Monthly targets, door to door. The fundamentals never left.",
    shape:
      "M15,75 H108 V98 H138 L168,120 V140 H154 A15,15 0 0 0 124,140 H78 A15,15 0 0 0 48,140 H15 Z",
  },
  {
    year: 2001,
    product: "Construction machinery",
    title: "Branch head at Tata Hitachi",
    text: "Beat JCB to a first-ever institutional sale and held 80% excavator market share against a 50% target.",
    shape:
      "M35,168 A14,14 0 0 1 35,140 H48 V104 H96 V88 L134,50 L148,60 L118,96 L150,88 L172,96 L168,110 L120,112 L110,120 V140 H165 A14,14 0 0 1 165,168 Z",
  },
  {
    year: 2005,
    product: "Tires",
    title: "Into export markets",
    text: "Head of exports for APAC at MRF, India's largest tire maker. A new product for Singapore's container segment, and entry into Indonesia.",
    shape: "M100,42 A58,58 0 1 1 99.9,42 Z",
  },
  {
    year: 2006,
    product: "Brake pads",
    title: "Into Europe with Rane",
    text: "Head of exports at Rane Brake Lining. Opened Turkey and Tunisia, introduced CVDP for Europe's trucks and trailers, and signed the first OEM customer at TMD Germany.",
    shape: "M20,121 A85,85 0 0 1 180,121 L145,134 A48,48 0 0 0 55,134 Z",
  },
  {
    year: 2013,
    product: "Shock absorbers & engine parts",
    title: "General Manager, UNIMO (UCAL Group)",
    text: "Eight years building export lines: a 500-part range for Tenneco India reaching the EU, UK, Italy and beyond.",
    shape:
      "M92,38 H108 L112,52 A50,50 0 0 1 128,59 L140,50 L151,61 L142,73 A50,50 0 0 1 149,89 L163,93 V109 L149,113 A50,50 0 0 1 142,129 L151,141 L140,152 L128,143 A50,50 0 0 1 112,150 L108,164 H92 L88,150 A50,50 0 0 1 72,143 L60,152 L49,141 L58,129 A50,50 0 0 1 51,113 L37,109 V93 L51,89 A50,50 0 0 1 58,73 L49,61 L60,50 L72,59 L88,52 Z",
  },
  {
    year: 2022,
    product: "Electric motors",
    title: "Marketing & growth leadership",
    text: "GM of Marketing & Growth at LEDL Motors. Dealer networks across India, market entry from the UAE and Russia to Africa, and a brand built nearly end to end.",
    shape:
      "M38,142 V96 H46 V84 H58 V96 H68 V84 H80 V96 H90 V84 H102 V96 H112 V84 H124 V96 H132 V104 H166 V122 H132 V142 Z",
  },
];
