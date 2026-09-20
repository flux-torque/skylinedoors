/**
 * Single source of truth for every piece of business content on the site.
 * Details sourced from the existing skylinedoors.in website.
 */

export const company = {
  name: 'Skyline Doors',
  legalName: 'Skyline Doors Manufacturing Pvt. Ltd.',
  tagline: 'Spaces for a brighter tomorrow.',
  strapline: 'Strong Doors. Faster Delivery. Reliable Partnership.',
  positioning: "Mumbai's Leading Door Manufacturer",
  since: 2010,
  address: {
    line1: '306, Parvati Industrial Estate',
    line2: 'Sun Mill Compound, Lower Parel',
    city: 'Mumbai',
    pin: '400013',
    state: 'Maharashtra, India',
  },
  phones: ['+91 86578 16052', '+91 98206 55468'],
  email: 'theskylinedoors@gmail.com',
  hours: [
    { days: 'Monday — Friday', time: '9:00 AM – 7:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 5:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  serviceAreas: ['Mumbai', 'Navi Mumbai', 'Thane', 'Pune', 'Pan-India despatch'],
}

export const mapsQuery = encodeURIComponent(
  '306 Parvati Industrial Estate, Sun Mill Compound, Lower Parel, Mumbai 400013'
)

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const stats = [
  { value: 15, suffix: '+', label: 'Years of manufacturing' },
  { value: 50, suffix: 'K sq.ft.', label: 'Production facility' },
  { value: 500, suffix: '+', label: 'Doors per bulk order' },
  { value: 120, suffix: '+', label: 'Projects delivered' },
]

export const products = [
  {
    slug: 'fire-retardant-doors',
    name: 'Fire Retardant Doors',
    short: 'Fire Rated Doors',
    image: 'product-fire-rated',
    tag: 'Life Safety',
    blurb:
      'Tested fire-resistant cores with intumescent seals, engineered to hold the line when it matters most.',
    description:
      'Our fire retardant doors are built around a mineral-bonded core and tested in our in-house fire lab. Intumescent seals expand under heat to choke the gap between shutter and frame, containing smoke and flame for the full rated duration while remaining fully operable for evacuation.',
    specs: [
      ['Fire rating', '30 / 60 / 90 / 120 minutes'],
      ['Core', 'Mineral bonded, fire-resistant infill'],
      ['Sealing', 'Intumescent + smoke seal to all four edges'],
      ['Hardware', 'Fire-rated hinges, closers, panic bars'],
      ['Finish', 'Laminate, veneer or primed for paint'],
    ],
    uses: ['Stairwell lobbies', 'Refuge areas', 'Service shafts', 'Hospital corridors'],
  },
  {
    slug: 'metal-fire-rated-doors',
    name: 'Metal Fire Rated Doors',
    short: 'Metal Fire Doors',
    image: 'door-dark-glow',
    tag: 'Certified',
    blurb:
      'Galvanised steel shutters and frames for high-traffic, high-risk openings that must never fail.',
    description:
      'Fully welded galvanised steel construction with honeycomb or rockwool infill. Powder-coated to a fine architectural finish and supplied complete with pressed-steel frames, so the opening is certified as a single tested assembly rather than a set of parts.',
    specs: [
      ['Fire rating', '60 / 90 / 120 minutes'],
      ['Shutter', '1.2 mm / 1.6 mm galvanised steel'],
      ['Infill', 'Rockwool or honeycomb'],
      ['Frame', 'Pressed steel, factory welded'],
      ['Finish', 'Powder coat, any RAL shade'],
    ],
    uses: ['Electrical rooms', 'Basement parking', 'Plant rooms', 'Industrial units'],
  },
  {
    slug: 'designer-laminated-doors',
    name: 'Designer Laminated Doors',
    short: 'Designer Laminated',
    image: 'product-laminated',
    tag: 'Signature',
    blurb:
      'Precision-routed grooves, matched grain and a finish that reads as furniture, not joinery.',
    description:
      'CNC-routed door skins pressed with premium decorative laminates. Groove patterns, inlays and edge banding are set out digitally so every shutter in a 500-door order lands within the same tolerance — the first flat and the five-hundredth look identical.',
    specs: [
      ['Core', 'Solid block board / engineered hardwood'],
      ['Surface', '1 mm premium decorative laminate'],
      ['Routing', 'CNC groove, inlay and V-groove patterns'],
      ['Thickness', '30 mm / 35 mm / 40 mm'],
      ['Edge', 'Hardwood lipping, all four sides'],
    ],
    uses: ['Apartment main doors', 'Hotel rooms', 'Corporate cabins', 'Villa interiors'],
  },
  {
    slug: 'flush-doors',
    name: 'Flush Doors',
    short: 'Flush Doors',
    image: 'product-fire-rated',
    tag: 'Workhorse',
    blurb:
      'Hot-pressed, boiling-water-proof flush shutters built for bulk supply and long service life.',
    description:
      'The dependable core of any project. Hot-pressed under controlled temperature with a seasoned hardwood frame and a uniform filler that resists warping in coastal humidity. Available BWP and BWR grade, in solid or hollow core.',
    specs: [
      ['Grade', 'BWP (marine) / BWR'],
      ['Core', 'Solid or hollow, seasoned hardwood battens'],
      ['Press', 'Hot-pressed, climate-controlled curing'],
      ['Thickness', '25 mm / 30 mm / 35 mm'],
      ['Finish', 'Plain, veneered or laminated'],
    ],
    uses: ['Bedrooms', 'Toilets', 'Offices', 'Institutional blocks'],
  },
  {
    slug: 'wooden-door-frames',
    name: 'Wooden Door Frames',
    short: 'Wooden Frames',
    image: 'product-frame',
    tag: 'Craft',
    blurb:
      'Seasoned hardwood frames machined to a tolerance you can feel the moment the door shuts.',
    description:
      'Kiln-seasoned hardwood sections, four-side planed and rebated on CNC profilers. Supplied with factory-fitted hinge mortices and a moisture content held between 8 and 12 percent, so the frame stays true through a Mumbai monsoon.',
    specs: [
      ['Timber', 'Kiln-seasoned hardwood'],
      ['Moisture', 'Controlled at 8–12%'],
      ['Sections', '45×100, 60×100, 75×125 mm & custom'],
      ['Machining', 'CNC rebate + pre-cut hinge mortices'],
      ['Treatment', 'Anti-termite, anti-borer'],
    ],
    uses: ['Residential towers', 'Bungalows', 'Retail fit-outs', 'Heritage restoration'],
  },
  {
    slug: 'lvl-door-frames',
    name: 'LVL Door Frames',
    short: 'LVL Frames',
    image: 'about-entrance',
    tag: 'Engineered',
    blurb:
      'Laminated veneer lumber — straighter than timber, steadier than steel, ready for volume.',
    description:
      'Engineered from cross-bonded veneer laminations, LVL frames carry none of the knots, splits or twist of natural timber. Dimensionally stable, screw-holding and consistent across thousands of running feet — the frame of choice when a tower needs 900 identical openings.',
    specs: [
      ['Build', 'Cross-bonded laminated veneer lumber'],
      ['Stability', 'Virtually zero warp or twist'],
      ['Sections', 'Cut to project schedule'],
      ['Finish', 'Primed, laminated or veneered'],
      ['Compatibility', 'Fire-rated shutter assemblies'],
    ],
    uses: ['High-rise residential', 'Hospitality', 'Healthcare', 'Large fit-outs'],
  },
]

export const projects = [
  {
    name: 'Fortune Florence',
    location: 'Mumbai',
    sector: 'Residential',
    image: 'project-fortune-florence',
    year: '2023',
    scope: 'Flush doors, wooden frames & fire-rated lobby doors',
    units: '740 openings',
    note: 'A four-tower residential development delivered on a rolling floor-by-floor schedule so installation never waited on supply.',
  },
  {
    name: 'CityCare Hospital',
    location: 'Pune',
    sector: 'Healthcare',
    image: 'project-citycare',
    year: '2023',
    scope: '90-minute fire rated doors, hermetic ward doors',
    units: '410 openings',
    note: 'Every corridor and stairwell opening supplied as a certified assembly, with fire-rated hardware fitted in-factory.',
  },
  {
    name: 'Astha Hospitals',
    location: 'Mumbai',
    sector: 'Healthcare',
    image: 'project-citycare',
    year: '2022',
    scope: 'Fire retardant doors & metal fire rated shutters',
    units: '260 openings',
    note: 'A live-site replacement programme completed ward by ward, without closing a single floor to patients.',
  },
  {
    name: 'Samrat Alfred Splendor',
    location: 'Mumbai',
    sector: 'Residential',
    image: 'project-fortune-florence',
    year: '2022',
    scope: 'Designer laminated main doors & LVL frames',
    units: '320 openings',
    note: 'Grain-matched laminated main doors, sequenced so each floor received a single consistent batch.',
  },
  {
    name: 'Analiza Anandam',
    location: 'Mumbai',
    sector: 'Residential',
    image: 'project-fortune-florence',
    year: '2021',
    scope: 'Flush doors, frames & hardware package',
    units: '280 openings',
    note: 'Complete door package from a single supplier — frames, shutters and hardware arriving as matched sets.',
  },
  {
    name: 'Skyline Commercial Park',
    location: 'Navi Mumbai',
    sector: 'Commercial',
    image: 'project-citycare',
    year: '2021',
    scope: 'Metal fire rated doors & office flush doors',
    units: '520 openings',
    note: 'Basement, plant room and service core openings delivered against a fourteen-week commissioning deadline.',
  },
]

export const values = [
  {
    title: 'Quality First',
    body: 'Uncompromising standards on materials and precision. Every shutter is checked against the same specification sheet, whether it is the first of the order or the last.',
  },
  {
    title: 'Client Centric',
    body: 'Your project timeline is our metric of success. We plan production around your site schedule, not the other way round.',
  },
  {
    title: 'Integrity',
    body: 'Transparent pricing, honest timelines, ethical practice. If a date is going to move, you hear it from us first.',
  },
]

export const capabilities = [
  {
    title: 'Bulk Supply',
    body: 'Production lines configured for 500+ unit orders without a drop in consistency.',
  },
  {
    title: 'On-Time Delivery',
    body: 'Floor-by-floor despatch schedules that match the rhythm of an active site.',
  },
  {
    title: 'Fire Testing',
    body: 'An in-house fire-testing lab, so rated assemblies are proven before they leave.',
  },
  {
    title: 'Installation Support',
    body: 'Supervisors on site for setting out, fixing and handover of every opening.',
  },
]

export const process = [
  {
    step: '01',
    title: 'Consultation',
    body: 'We read the door schedule with you — ratings, sizes, finishes, hardware — and flag anything that will cause trouble on site later.',
  },
  {
    step: '02',
    title: 'Engineering',
    body: 'Shop drawings and CNC programmes are prepared for every opening type, then signed off before a single sheet is cut.',
  },
  {
    step: '03',
    title: 'Manufacturing',
    body: 'Cores are pressed, skins routed and edges lipped across our 50,000 sq. ft. Lower Parel facility under climate control.',
  },
  {
    step: '04',
    title: 'Quality & Fire Testing',
    body: 'Sample assemblies go to the fire lab; production units go through dimensional and finish inspection.',
  },
  {
    step: '05',
    title: 'Delivery & Installation',
    body: 'Batched to your floor plan, delivered to schedule, and set out on site by our own supervisors.',
  },
]

export const timeline = [
  { year: '2010', title: 'The first workshop', body: 'Skyline Doors opens in Lower Parel with a single press and a handful of local contracts.' },
  { year: '2014', title: 'Into fire safety', body: 'Fire retardant door production begins, opening the door to hospital and high-rise work.' },
  { year: '2018', title: 'The CNC shift', body: 'CNC routing and automated finishing lines replace hand-set joinery, unlocking true bulk consistency.' },
  { year: '2021', title: 'In-house fire lab', body: 'Our own fire-testing chamber is commissioned — assemblies are proven before despatch, not after.' },
  { year: '2024', title: '50,000 sq. ft.', body: 'The facility reaches full scale, with climate-controlled curing and capacity for 500+ unit orders.' },
]

export const leadership = [
  {
    name: 'Ashish',
    role: 'Founder & Managing Director',
    initials: 'A',
    bio: 'Ashish founded Skyline Doors in 2010 with a single press in Lower Parel and a conviction that builders deserved a door supplier who kept their word. Fifteen years on, he still reviews the production schedule himself every week.',
    featured: true,
  },
  {
    name: 'Board Member',
    role: 'Director — Operations',
    initials: 'SD',
    bio: 'Profile to be added.',
    placeholder: true,
  },
  {
    name: 'Board Member',
    role: 'Director — Quality & Compliance',
    initials: 'SD',
    bio: 'Profile to be added.',
    placeholder: true,
  },
  {
    name: 'Board Member',
    role: 'Head of Projects',
    initials: 'SD',
    bio: 'Profile to be added.',
    placeholder: true,
  },
]

export const faqs = [
  {
    q: 'What is the minimum order quantity?',
    a: 'There is no hard minimum, but our pricing and scheduling are built around project-scale supply. Most orders we take on run from 50 openings upwards, and our lines are configured for 500+ unit batches.',
  },
  {
    q: 'How long does a typical order take?',
    a: 'A standard flush or laminated door order despatches in three to four weeks from drawing approval. Fire-rated assemblies take four to six weeks, since sample testing sits inside that window.',
  },
  {
    q: 'Do you deliver outside Mumbai?',
    a: 'Yes. Mumbai, Navi Mumbai, Thane and Pune are served directly by our own transport, and we despatch pan-India for larger contracts.',
  },
  {
    q: 'Are your fire doors certified?',
    a: 'Fire retardant and metal fire rated assemblies are tested to their stated rating — 30, 60, 90 or 120 minutes — and supplied as a complete certified assembly of shutter, frame and hardware.',
  },
  {
    q: 'Can you match a specific laminate or veneer?',
    a: 'Almost always. Send us the shade code or a physical sample and we will match it, or produce a sample shutter for approval before the main run begins.',
  },
  {
    q: 'Do you handle installation?',
    a: 'We provide installation support on every project — our supervisors set out the openings, oversee fixing and walk the handover with your site team.',
  },
]

export const enquiryTypes = [
  'Bulk supply enquiry',
  'Fire rated doors',
  'Designer / laminated doors',
  'Door frames',
  'Site visit request',
  'Something else',
]
