export interface ServiceProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceReview {
  author: string;
  rating: number;
  date: string;
  location: string;
  comment: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  category: 'interior' | 'exterior' | 'winter' | 'systems';
  shortDesc: string;
  fullDesc: string;
  startingPrice: number;
  priceUnit: string;
  avgDuration: string;
  iconName: string;
  badge?: string;
  includedFeatures: string[];
  equipmentSafety: string[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  reviews: ServiceReview[];
  beforeImage: string;
  afterImage: string;
  caseStudyCost: number;
  caseStudyTitle: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'All 10 Services' },
  { id: 'interior', name: 'Interior Care' },
  { id: 'exterior', name: 'Exterior & Yard' },
  { id: 'winter', name: 'Winter & Storm' },
  { id: 'systems', name: 'Systems & Safety' },
] as const;

export const SERVICES: ServiceData[] = [
  {
    id: 'house-deep-cleaning',
    slug: 'house-deep-cleaning',
    title: 'House & Deep Cleaning',
    category: 'interior',
    shortDesc: 'Hospital-grade residential sanitization, detailed deep scrub, and recurring housekeeping.',
    fullDesc: 'House Hero’s professional house cleaning crews follow a rigorous 64-point touchpoint protocol. From baseboards and chandelier detailing to sanitizing high-touch surfaces, we use non-toxic, Green Seal-certified formulas safe for children and pets.',
    startingPrice: 120,
    priceUnit: 'per home',
    avgDuration: '2.5 – 5.0 hrs',
    iconName: 'Home',
    badge: 'Most Popular Interior',
    includedFeatures: [
      '64-Point High-Touch Disinfection Protocol',
      'Hand-scrubbed baseboards, doors & trim',
      'Kitchen degreasing, exterior appliances & stovetop',
      'Bathroom descaling, grout treatment & mirror polish',
      'HEPA multi-filtration vacuuming on all flooring',
      'Zero-VOC, pet-safe and eco-certified detergents'
    ],
    equipmentSafety: [
      'Commercial-grade ProTeam HEPA backpack vacuums',
      'Color-coded microfiber cross-contamination prevention system',
      'OSHA-compliant, hospital-grade botanical disinfectants',
      'Technicians fully bonded, background-checked and insured'
    ],
    processSteps: [
      { step: 1, title: 'Walkthrough & Staging', desc: 'Crew conducts initial zone inspection to note delicate surfaces and special requests.' },
      { step: 2, title: 'High-to-Low Dusting', desc: 'Ceiling fans, crown moldings, vents, and lighting fixtures are dusted top-down.' },
      { step: 3, title: 'Deep Scrub & Degrease', desc: 'Bathrooms and kitchens receive antibacterial sanitization and limescale extraction.' },
      { step: 4, title: 'Final Floor Seal & Inspection', desc: 'Hardwoods and tile are steam-mopped and verified with our 100% guarantee checklist.' }
    ],
    faqs: [
      { question: 'What is the difference between Standard and Deep Clean?', answer: 'A Standard clean maintains cleanliness (countertops, vacuuming, mopping, bathroom sanitizing). A Deep Clean includes hand-scrubbing baseboards, door frames, vent covers, heavy grease removal, and detailed tile grout scrub.' },
      { question: 'Do I need to be home during the cleaning?', answer: 'No. Over 65% of our clients provide a digital lockbox code or garage PIN. Our bonded team arrives in uniform with GPS check-in.' },
      { question: 'Do you bring your own supplies and equipment?', answer: 'Yes, our House Hero mobile vans arrive fully equipped with all commercial HEPA vacuums, microfiber materials, and Green Seal products.' }
    ],
    reviews: [
      { author: 'Sarah M.', rating: 5, date: '2 days ago', location: 'Denver, CO', comment: 'House Hero did our move-out cleaning and our landlord refunded 100% of our deposit within 24 hours. The oven and tile grout looked brand new!' },
      { author: 'David K.', rating: 5, date: '1 week ago', location: 'Minneapolis, MN', comment: 'We have recurring bi-weekly cleaning now. Reliable crew, prompt 8 AM arrival, and always leaves the house smelling fresh without harsh bleach fumes.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 282,
    caseStudyTitle: '3-Bedroom Deep Clean + Oven & Refrigerator Sanitization'
  },
  {
    id: 'carpet-cleaning',
    slug: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    category: 'interior',
    shortDesc: 'Truck-mounted 220°F hot water extraction, pet odor enzyme neutralization, and Scotchgard guard.',
    fullDesc: 'Revitalize your carpets with high-pressure thermal extraction that flushes out allergens, dust mites, and stubborn grease trapped deep within carpet fibers. Guaranteed fast 2-4 hour dry time with zero soapy residue.',
    startingPrice: 129,
    priceUnit: '3-room base',
    avgDuration: '1.5 – 3.0 hrs',
    iconName: 'Layers',
    badge: 'Deep Fiber Extraction',
    includedFeatures: [
      '220°F Truck-mounted high-temp steam rinse',
      'Pre-conditioning traffic-lane spray & agitation',
      'Pet urine UV blacklight detection & enzyme soak',
      'High-velocity industrial air movers for rapid dry',
      'Zero-residue organic fiber neutralizing rinse',
      'Complimentary corner guards to protect trim & drywall'
    ],
    equipmentSafety: [
      'Butler System 220°F Truckmount with dual vacuum blowers',
      'Rotovac 360i rotary extraction heads for multi-directional agitation',
      'WoolSafe approved non-acidic fiber conditioners',
      'Non-scratch hose protectors and commercial stair guards'
    ],
    processSteps: [
      { step: 1, title: 'Fiber & Moisture Analysis', desc: 'Technician identifies fiber composition (nylon, polyester, wool) and tests stain pH.' },
      { step: 2, title: 'Pre-Spray & Fiber Agitation', desc: 'Enzymatic emulsion breaks down body oils, ground-in mud, and pet stains.' },
      { step: 3, title: '220°F Deep Thermal Extraction', desc: 'High-temp soft water extracts soil under 450 PSI without soaking subflooring.' },
      { step: 4, title: 'Grooming & Rapid Air Drying', desc: 'Carpet fibers are groomed upright with carpet rakes and dried with vortex fans.' }
    ],
    faqs: [
      { question: 'How long until carpets are completely dry?', answer: 'Thanks to our dual-stage vacuum extraction and complimentary air movers, carpets are dry to the touch in 2 to 4 hours.' },
      { question: 'Will pet urine stains and odors come back?', answer: 'Our targeted sub-surface enzyme formula digests the uric acid crystals at the molecular level, preventing odors from resurfacing when humidity rises.' },
      { question: 'Is Scotchgard carpet protector worth it?', answer: 'Yes! It creates an invisible fluorochemical shield around each fiber, preventing liquids and spills from penetrating before you can wipe them up.' }
    ],
    reviews: [
      { author: 'Marcus T.', rating: 5, date: '3 days ago', location: 'Chicago, IL', comment: 'Two golden retrievers had destroyed our living room rug. House Hero extracted stains I thought were permanent. No chemical smell at all.' },
      { author: 'Elena R.', rating: 5, date: '2 weeks ago', location: 'Cleveland, OH', comment: 'Fair USD pricing, no bait-and-switch when they arrived. Exactly the $169 quoted online for our 3 rooms and hallway.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 204,
    caseStudyTitle: '4-Room Carpet Restoration + Pet Urine Enzyme Neutralizer'
  },
  {
    id: 'gutter-cleaning',
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    category: 'exterior',
    shortDesc: 'Hand removal of debris, high-pressure downspout flushing, and roof-line seal inspections.',
    fullDesc: 'Protect your foundation, roof eaves, and basement from costly water damage. Our gutter specialists hand-clear all organic sediment, flush downspouts to ground level, and test drainage slope with video verification.',
    startingPrice: 135,
    priceUnit: 'up to 150 ft',
    avgDuration: '1.0 – 2.5 hrs',
    iconName: 'Droplet',
    badge: 'Storm Guard Shield',
    includedFeatures: [
      'Complete manual removal of leaves, pine needles & sludge',
      'High-pressure downspout flush to ground/catch basin',
      'Structural pitch & loose gutter hanger fastener check',
      'Seal inspection at miters, endcaps, and drop outlets',
      'Bagged debris removal — zero yard mess left behind',
      'Full digital Before & After photo audit sent to your phone'
    ],
    equipmentSafety: [
      'Levelok ladder standoff stabilizers that rest on roof tiles without crushing gutters',
      'Full body fall-arrest harnesses & OSHA-compliant tie-offs',
      'High-torque inspection cameras with telescoping carbon-fiber poles',
      'Biodegradable debris bagging and organic disposal'
    ],
    processSteps: [
      { step: 1, title: 'Ground & Pitch Inspection', desc: 'We verify gutter anchors, check downspout elbows, and evaluate slope.' },
      { step: 2, title: 'Hand Extraction of Debris', desc: 'Heavy debris is hand-scooped into heavy-duty collection pails.' },
      { step: 3, title: 'Pressurized Downspout Flush', desc: 'Water is forced through downspouts to clear subterranean root clogs and bends.' },
      { step: 4, title: 'Photo Audit & Clean Up', desc: 'Sidewalks and patio below are washed down and audit photos are sent to your portal.' }
    ],
    faqs: [
      { question: 'How often should gutters be cleaned?', answer: 'We recommend twice per year in spring and late autumn. Homes surrounded by oak or pine trees benefit from quarterly checkups.' },
      { question: 'Do you clean out underground downspout drains?', answer: 'Yes, our Downspout Flush service includes snaking and high-pressure jetting through below-grade adapter connections.' },
      { question: 'Will ladder contact scratch my painted aluminum gutters?', answer: 'Never. We strictly use rubber-padded ladder standoff mounts that bridge directly onto roof decking, completely avoiding contact with gutter lips.' }
    ],
    reviews: [
      { author: 'Bradley C.', rating: 5, date: '5 days ago', location: 'Seattle, WA', comment: 'Our two-story gutters were overflowing during heavy rain. House Hero cleared out massive oak clogs and re-sealed a leaking corner seam in 90 minutes.' },
      { author: 'Jennifer W.', rating: 5, date: '1 month ago', location: 'Boston, MA', comment: 'The digital photo report sent right to my phone showed every clean downspout before and after. Outstanding service!' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 220,
    caseStudyTitle: '2-Story 200ft Gutter Cleanout + 4 Downspout Jetting'
  },
  {
    id: 'snow-removal',
    slug: 'snow-removal',
    title: 'Snow Removal',
    category: 'winter',
    shortDesc: 'Automated 2-inch storm dispatch, zero-damage rubber plowing, and walkway hand-clearing.',
    fullDesc: 'Never shovel in sub-zero morning freezes again. Our commercial-grade fleet clears driveways, front stairs, and city sidewalks before your 7:00 AM commute. Real-time GPS storm tracking keeps you informed.',
    startingPrice: 65,
    priceUnit: 'per push',
    avgDuration: '30 – 60 mins',
    iconName: 'Snowflake',
    badge: '24/7 Winter Dispatch',
    includedFeatures: [
      'Rubber-edged poly plow blades that protect pavers and stamped concrete',
      'Hand-clearing of front entry steps, porches, and mailbox access',
      'Automated crew dispatch triggered at 2" accumulation',
      'Pre-storm fiberglass driveway boundary staking included',
      'Sub-zero GPS fleet dispatch tracking with arrival alerts',
      'Optional priority seasonal unlimited pass starting at $499'
    ],
    equipmentSafety: [
      'Boss and Western V-Plows fitted with non-marking polyurethane cutting edges',
      'Toro 2-stage commercial snow throwers with LED storm headlights',
      'Insured operators trained in concrete protection and municipal snow ordinance codes',
      'Real-time Doppler radar integration for continuous storm monitoring'
    ],
    processSteps: [
      { step: 1, title: 'Storm Inbound Alert', desc: 'Clients receive an automated SMS notification when radar forecasts over 2 inches.' },
      { step: 2, title: 'Driveway Perimeter Clearing', desc: 'Snow is pushed toward pre-staked yard edges away from garage doors and municipal drains.' },
      { step: 3, title: 'Pedestrian Walkway Clearing', desc: 'Front walks, porch steps, and city sidewalk corridors are hand-cleared.' },
      { step: 4, title: 'Departure Timestamp & Photo', desc: 'Driver logs departure verification photo to your portal dashboard.' }
    ],
    faqs: [
      { question: 'What is the snow depth trigger for dispatch?', answer: 'Our standard dispatch trigger is 2.0 inches of accumulation. For continuous blizzards exceeding 8 inches, our crews make multiple clearing passes.' },
      { question: 'Will plows scratch my decorative stamped driveway?', answer: 'No. We equip all truck plows with polyurethane rubber cutting edges specifically engineered to glide over stamped concrete, pavers, and asphalt without chipping.' },
      { question: 'How does the Unlimited Seasonal Pass work?', answer: 'The Seasonal Pass covers unlimited visits from November 15 through April 15, regardless of how many winter storms hit your ZIP code.' }
    ],
    reviews: [
      { author: 'Robert G.', rating: 5, date: '1 day ago', location: 'Milwaukee, WI', comment: 'Woke up at 6:30 AM after a 9-inch blizzard and my entire 4-car driveway was already plowed and salted. Worth every single dollar.' },
      { author: 'Karen B.', rating: 5, date: '2 weeks ago', location: 'Buffalo, NY', comment: 'Having the Unlimited Pass gave our family total peace of mind all winter. They never missed a single snowfall.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 90,
    caseStudyTitle: 'Large 4-Car Driveway Clearing during 8-inch Winter Storm'
  },
  {
    id: 'pressure-washing',
    slug: 'pressure-washing',
    title: 'Pressure Washing & Soft-Wash',
    category: 'exterior',
    shortDesc: 'Low-pressure soft-wash for siding/stucco, 4000 PSI concrete surface scrubbing, and deck renewal.',
    fullDesc: 'Eliminate black mold streaks, green algae, tire marks, and oil stains with our dual-method pressure and soft-washing systems. We adjust water pressure and temperature precisely to protect delicate siding while pulverizing grime on masonry.',
    startingPrice: 140,
    priceUnit: 'base surface',
    avgDuration: '2.0 – 4.5 hrs',
    iconName: 'Wrench',
    badge: 'Instant Curb Appeal',
    includedFeatures: [
      'Surface-specific PSI calibration (300 PSI soft-wash to 4000 PSI concrete blast)',
      'Rotary surface cleaners that eliminate zebra striping on flat concrete',
      'Biodegradable surfactant pretreatment that dissolves algae spores',
      'Landscape hydration & tarping to protect flowers and shrubbery',
      'House wash covers siding, soffits, fascia, and window trims',
      'Efflorescence, mineral deposit, and mildew eradication'
    ],
    equipmentSafety: [
      'Landa 8 GPM hot-water commercial pressure units',
      'Whisper Wash 24-inch ground surface rotary washers',
      'Downstream chemical injectors preventing pumps from corrosive contact',
      'Plant-wash neutralizing rinse for garden beds and turf borders'
    ],
    processSteps: [
      { step: 1, title: 'Plant & Electrical Masking', desc: 'All exterior outlets, ring cameras, and delicate flower beds are tarped and soaked with water.' },
      { step: 2, title: 'Algaecide Detergent Soak', desc: 'Mild detergent sits for 12 minutes to kill organic root structures down to the substrate.' },
      { step: 3, title: 'Dual-Rotary Controlled Clean', desc: 'Even circular high-flow water passes lift ground-in dirt without surface pitting.' },
      { step: 4, title: 'Pure Water Rinse & Audit', desc: 'Complete structural rinse leaves glass streak-free and concrete sparkling.' }
    ],
    faqs: [
      { question: 'Will high pressure damage my vinyl siding or stucco?', answer: 'Never. Siding and stucco are cleaned exclusively with our Soft-Wash method (under 350 PSI), using safe chemical solutions rather than destructive high pressure.' },
      { question: 'Can you remove old engine oil stains from driveways?', answer: 'Yes. We treat oil and grease spots with commercial enzymatic degreasers combined with 200°F hot-water pressure washing to break down hydrocarbon bonds.' },
      { question: 'Do you need to connect to my outside water spigot?', answer: 'Yes, we connect to your standard garden hose spigot to feed our onboard buffer tanks.' }
    ],
    reviews: [
      { author: 'Anthony D.', rating: 5, date: '4 days ago', location: 'Charlotte, NC', comment: 'Our 2,800 sq ft home had 5 years of green moss on the north side. In 3 hours the siding looked like the day it was built. Incredible transformation.' },
      { author: 'Rachel H.', rating: 5, date: '3 weeks ago', location: 'Austin, TX', comment: 'Cleaned our 2-car driveway, sidewalk, and back patio. Neighbors literally stopped to ask who did the work.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 310,
    caseStudyTitle: 'Vinyl Siding Soft-Wash + 800 sq ft Concrete Driveway'
  },
  {
    id: 'junk-removal',
    slug: 'junk-removal',
    title: 'Junk Removal & Hauling',
    category: 'interior',
    shortDesc: 'Full-service loading, furniture donation, heavy appliance recycling, and estate cleanouts.',
    fullDesc: 'Clear out garages, basements, and commercial properties without lifting a finger. Our strong, uniformed 2-person crews do all the heavy hauling, sort items for local charity donations, and recycle over 70% of collected materials.',
    startingPrice: 89,
    priceUnit: 'curbside item',
    avgDuration: '45 mins – 3.0 hrs',
    iconName: 'Truck',
    badge: 'Eco-Friendly Hauling',
    includedFeatures: [
      'Two-person uniformed crew handles all lifting, stairs, and carrying',
      'Volumetric pricing — you only pay for the truck bed space you utilize',
      'Over 70% diverted from landfills via charity donations & scrap recycling',
      'Appliance, mattress, electronics, and construction debris certified disposal',
      'Complimentary area broom sweep-down upon truck completion',
      'Donation tax receipt provided for reusable goods dropped off'
    ],
    equipmentSafety: [
      '16-yard custom dump trucks with hydraulic lift gates',
      'Heavy-duty appliance dollies, forearm forklifts, and furniture blankets',
      'Certified e-waste and Freon-refrigerant reclaim partnerships',
      'Workers compensation and liability coverage on all haulers'
    ],
    processSteps: [
      { step: 1, title: 'On-Site Volume Confirmation', desc: 'Technicians inspect your pile and confirm the exact guaranteed USD truck tier.' },
      { step: 2, title: 'Safe Removal & Staging', desc: 'We carefully carry bulky items through doorways without bumping walls or doorframes.' },
      { step: 3, title: 'Charity & Recycling Sorting', desc: 'Items are separated in the truck bed: donations, recyclables, and disposal.' },
      { step: 4, title: 'Broom Sweep Finish', desc: 'Crew sweeps the entire staging area and provides a digital signature invoice.' }
    ],
    faqs: [
      { question: 'What items can you NOT take?', answer: 'We cannot take biohazards, wet paint, motor oils, asbestos, or hazardous industrial chemicals. We handle virtually all household goods, appliances, furniture, and renovation debris.' },
      { question: 'Do I need to carry heavy furniture out to the curb?', answer: 'No! Full-service junk removal includes clearing items directly from your attic, basement, second floor, or backyard.' },
      { question: 'How do you calculate truck volume?', answer: 'Our standard trucks hold 16 cubic yards (equivalent to roughly 8 pickup truck beds). You only pay for the fractional volume you fill (e.g., 1/4, 1/2, or Full).' }
    ],
    reviews: [
      { author: 'Kenneth S.', rating: 5, date: '1 week ago', location: 'Columbus, OH', comment: 'Emptied out 20 years of clutter from my parents basement in less than two hours. The crew was polite, efficient, and swept up afterward.' },
      { author: 'Meghan P.', rating: 5, date: '2 weeks ago', location: 'Indianapolis, IN', comment: 'Loved that they donated our old dining set to Habitat for Humanity and emailed us the donation receipt. Transparent USD pricing.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 379,
    caseStudyTitle: '1/2 Truck Load Garage Cleanout + Refrigerator Haul'
  },
  {
    id: 'dryer-vent-cleaning',
    slug: 'dryer-vent-cleaning',
    title: 'Dryer Vent Cleaning',
    category: 'systems',
    shortDesc: 'Rotary brush lint descaling, airflow velocity testing, and fire hazard elimination.',
    fullDesc: 'Lint buildup in dryer ducts causes over 15,000 house fires in the US annually. Our certified vent technicians clear lint from the dryer back to the exterior hood using high-torque rotary whips and HEPA negative-air extractors.',
    startingPrice: 119,
    priceUnit: 'ground exit',
    avgDuration: '45 – 90 mins',
    iconName: 'Flame',
    badge: 'Fire Safety Certified',
    includedFeatures: [
      'Continuous rotary brush scrubbing across entire duct length',
      'Negative pressure HEPA extraction prevents dust from entering your laundry room',
      'Digital anemometer pre- and post-cleaning airflow velocity test',
      'Exterior exhaust damper and bird guard inspection',
      'Thermal camera check behind dryer for hidden crimped lines',
      'Reduced clothes drying time by up to 50%, slashing electric bills'
    ],
    equipmentSafety: [
      'Rotobrush & Cobra rotary mechanical whip systems',
      'Nikro HEPA air duct vacuum with 2,200 CFM static draw',
      'TSI digital velocity anemometers for certified air CFM readout',
      'NFPA-211 chimney and vent code compliance check'
    ],
    processSteps: [
      { step: 1, title: 'Airflow Baseline Test', desc: 'We measure current exhaust velocity in CFM to gauge blockage percentage.' },
      { step: 2, title: 'Disconnect & Vacuum Hookup', desc: 'Duct is connected to commercial negative pressure collector in laundry area.' },
      { step: 3, title: 'Rotary Whip Agitation', desc: 'Rotating nylon bristles scour hardened lint blankets and bird nests out through the duct.' },
      { step: 4, title: 'Post-Clean Velocity Verification', desc: 'Airflow is re-tested to confirm 100% unrestricted exhaust performance.' }
    ],
    faqs: [
      { question: 'How do I know my dryer vent needs cleaning?', answer: 'Warning signs include: clothes taking more than one cycle to dry, dryer exterior feeling burning hot, a burning smell, or the outside damper flap not opening.' },
      { question: 'Will this process make a mess in my laundry room?', answer: 'No. We lock a sealed HEPA collector onto the interior duct mouth, capturing 100% of lint particles inside the vacuum containment unit.' },
      { question: 'What is a bird guard cage and do I need one?', answer: 'Birds and squirrels frequently nest in warm exterior dryer exhaust hoods. A steel bird guard allows air and lint to exit freely while barring pests.' }
    ],
    reviews: [
      { author: 'Jason L.', rating: 5, date: '3 days ago', location: 'Salt Lake City, UT', comment: 'Our dryer went from taking 70 minutes per towel load down to 28 minutes flat. The technician showed us a basketball-sized ball of lint removed from the pipe!' },
      { author: 'Patricia C.', rating: 5, date: '3 weeks ago', location: 'Omaha, NE', comment: 'Second story roof vent. Fast, clean, professional. Gave me total peace of mind for fire safety.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 154,
    caseStudyTitle: 'Second-Story Wall Exit Vent Scour + Bird Guard Cage'
  },
  {
    id: 'lawn-garden-cleanup',
    slug: 'lawn-garden-cleanup',
    title: 'Lawn & Garden Cleanup',
    category: 'exterior',
    shortDesc: 'Seasonal leaf removal, perennial bed edging, hedge pruning, and mulch application.',
    fullDesc: 'Get your property manicured to perfection. From raking fallen leaves and deadheading perennials to laser-straight bed edging and dense hardwood mulch installation, House Hero makes your grounds look pristine year-round.',
    startingPrice: 130,
    priceUnit: 'small lot',
    avgDuration: '2.5 – 6.0 hrs',
    iconName: 'Leaf',
    badge: 'Seasonal Restoration',
    includedFeatures: [
      'Comprehensive leaf raking, blowing & organic vacuum bagging',
      'Shrub, bush, and ornamental hedge precision trimming',
      'Perennial cutbacks and dead branch pruning up to 10 feet',
      'Trench bed spade edging for crisp soil-to-turf definition',
      'Weed pulling and pre-emergent weed barrier application',
      'Haul-away and composting of all collected organic yard waste'
    ],
    equipmentSafety: [
      'Stihl professional commercial blowers and articulated hedge trimmers',
      'Billy Goat debris vacuum systems with onboard shredding impellers',
      'Eco-friendly organic bark mulch sourced from local forestry reserves',
      'Trained horticultural groundskeepers for safe plant care'
    ],
    processSteps: [
      { step: 1, title: 'Grounds Walk & Plant Identification', desc: 'We verify trimming boundaries, specific shrubs to shape, and mulch delivery locations.' },
      { step: 2, title: 'Pruning & Bed Weeding', desc: 'Dead stems, overgrown hedges, and invasive weeds are cleared out.' },
      { step: 3, title: 'Deep Edging & Soil Prep', desc: 'Spade edging creates a distinct 3-inch barrier between turf and flower beds.' },
      { step: 4, title: 'Blowing & Bagged Haul-Away', desc: 'Patios, driveways, and decks are blown clean and debris loaded onto trucks.' }
    ],
    faqs: [
      { question: 'What does Spring or Fall Cleanup include?', answer: 'It covers complete fallen leaf removal, lawn stick pickup, cutting back dead perennials, shaping shrubs, and clearing flower beds of winter debris.' },
      { question: 'Do you bring mulch or do I supply it?', answer: 'We bring triple-shredded dark brown, black, or natural hardwood mulch directly on our trucks and spread it at a consistent 2-to-3-inch protective depth.' },
      { question: 'What do you do with the bags of leaves and branches?', answer: 'All yard waste is hauled away in our trailers and brought to licensed municipal compost facilities where it is recycled into organic compost.' }
    ],
    reviews: [
      { author: 'Brandon P.', rating: 5, date: '1 week ago', location: 'Portland, OR', comment: 'Our half-acre yard was drowning in maple leaves and overgrown boxwoods. House Hero spent 4 hours and left it looking like an English garden. Superb.' },
      { author: 'Emily N.', rating: 5, date: '1 month ago', location: 'Boise, ID', comment: 'Honest upfront estimate, showed up on time with a crew of three, and even blew off our back deck and front walkway.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 280,
    caseStudyTitle: 'Quarter-Acre Fall Leaf Cleanup + Shrub Shaping & Mulch'
  },
  {
    id: 'hvac-maintenance',
    slug: 'hvac-maintenance',
    title: 'HVAC Maintenance & Tune-Up',
    category: 'systems',
    shortDesc: '21-point furnace & AC diagnostic, capacitor testing, coil rinse, and safety combustion checks.',
    fullDesc: 'Prevent unexpected mid-winter heating breakdowns and scorching summer AC failures. Our licensed HVAC mechanics inspect electrical components, clean condenser coils, check heat exchangers for deadly carbon monoxide leaks, and optimize efficiency.',
    startingPrice: 115,
    priceUnit: 'single zone',
    avgDuration: '1.0 – 2.0 hrs',
    iconName: 'Wrench',
    badge: '21-Point Inspection',
    includedFeatures: [
      '21-Point comprehensive safety & mechanical diagnostics',
      'Capacitor, contactor, and blower motor amp draw testing',
      'Refrigerant level verification and leak detection check',
      'Furnace heat exchanger carbon monoxide integrity inspection',
      'Outdoor condenser coil rinse and debris wash-out',
      'Air filter check & smart thermostat calibration test'
    ],
    equipmentSafety: [
      'Fieldpiece digital wireless refrigerant manifold gauges',
      'Bacharach digital carbon monoxide & combustion gas analyzers',
      'Fluke true-RMS multimeters for precision electrical diagnosis',
      'EPA 608 Universal Certified HVAC technicians'
    ],
    processSteps: [
      { step: 1, title: 'Electrical & Amp Draw Test', desc: 'We test starting capacitors, fan motors, and electrical disconnect relays.' },
      { step: 2, title: 'Combustion Safety & Coils', desc: 'Gas pressure, burner ignition, and heat exchanger are analyzed for carbon monoxide cracks.' },
      { step: 3, title: 'Airflow & Static Pressure Check', desc: 'We inspect blower wheels, check duct static pressure, and install new filters.' },
      { step: 4, title: 'Performance Certificate', desc: 'You receive an itemized diagnostic report with temperature split (Delta T) readings.' }
    ],
    faqs: [
      { question: 'Why is an annual HVAC tune-up necessary?', answer: 'Regular tune-ups prevent 95% of unexpected breakdowns, lower utility bills by up to 20%, and maintain manufacturer warranty validity on major brands.' },
      { question: 'What is the Annual Comfort Shield Plan?', answer: 'The Comfort Shield Plan ($229/yr) includes two seasonal checkups (Spring AC and Fall Furnace), priority emergency dispatch during freezes/heatwaves, and 15% off any needed repairs.' },
      { question: 'Do you work on heat pumps, furnaces, and central AC?', answer: 'Yes, our technicians are certified on all major heating and cooling configurations including forced air gas furnaces, electric heat pumps, mini-splits, and central condensers.' }
    ],
    reviews: [
      { author: 'Thomas B.', rating: 5, date: '2 days ago', location: 'Kansas City, MO', comment: 'During their tune-up, the tech found a bulging run capacitor about to blow right before a 100-degree heatwave. Replaced it on the spot. Saved us hundreds.' },
      { author: 'Christine V.', rating: 5, date: '2 weeks ago', location: 'St. Louis, MO', comment: 'Signed up for the Comfort Shield plan. Knowing our furnace is tested for carbon monoxide safety gives our family complete security.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 229,
    caseStudyTitle: 'Annual Comfort Shield Dual Heating & Cooling Overhaul'
  },
  {
    id: 'driveway-walkway-de-icing',
    slug: 'driveway-walkway-de-icing',
    title: 'Driveway & Walkway De-Icing',
    category: 'winter',
    shortDesc: 'Pet-safe magnesium chloride, black ice prevention, and automatic freeze dispatch.',
    fullDesc: 'Eliminate slip-and-fall hazards on your property. We apply treated, non-tracking de-icing formulas that melt ice down to -15°F without cracking decorative concrete, killing turf borders, or irritating pet paws.',
    startingPrice: 55,
    priceUnit: 'per visit',
    avgDuration: '20 – 40 mins',
    iconName: 'ShieldCheck',
    badge: 'Slip & Fall Defense',
    includedFeatures: [
      'Pet-Safe & Concrete-Safe Magnesium Chloride options available',
      'Rapid melting action active down to -15°F (-26°C)',
      'Pre-storm anti-icing brine liquid application stops bond formation',
      'Targeted broadcast spreaders ensure zero salt burning on turf',
      'Post-storm black ice tracking and morning touchups',
      'Automatic sub-32°F freeze monitoring trigger option'
    ],
    equipmentSafety: [
      'Spyker commercial broadcast spreaders with calibrated deflector shields',
      'Liquid anti-icing brine tank spray rigs for asphalt pre-treatment',
      'Pure Magnesium Chloride hexahydrate crystals that will not pit concrete',
      'Zero-residue formulas that will not ruin interior hardwood finishes'
    ],
    processSteps: [
      { step: 1, title: 'Surface Temperature Assessment', desc: 'Infrared thermometer scans verify substrate freeze conditions and ice thickness.' },
      { step: 2, title: 'Deflector-Guided Spreading', desc: 'Even granule distribution without tossing salt into adjacent landscaping beds.' },
      { step: 3, title: 'High-Risk Zone Focus', desc: 'Extra coverage on steep driveways, entry stairs, handrail paths, and downspout runoff paths.' },
      { step: 4, title: 'Brine Verification', desc: 'We verify ice liquefaction and establish a lingering barrier against flash re-freezing.' }
    ],
    faqs: [
      { question: 'Will this de-icer pit or crack my concrete driveway?', answer: 'Standard rock salt (sodium chloride) causes freeze-thaw spalling. We offer premium Magnesium Chloride, which operates at higher melting points and is chemically safe for cured concrete.' },
      { question: 'Is the de-icer safe for dogs and cats?', answer: 'Yes, our pet-safe magnesium chloride option will not burn animal paws, irritate pads, or cause gastrointestinal issues if licked off paws.' },
      { question: 'Can I set up automatic dispatch when ice freezes?', answer: 'Yes! Select the Auto-Dispatch Trigger in the booking wizard, and our crews will automatically service your driveway and walkways whenever temperatures dip below 32°F with precipitation.' }
    ],
    reviews: [
      { author: 'Nathaniel F.', rating: 5, date: '4 days ago', location: 'Pittsburgh, PA', comment: 'Our steep driveway is a sheet of ice every January. House Hero came out before the ice storm and our driveway stayed completely bare all weekend.' },
      { author: 'Melissa E.', rating: 5, date: '3 weeks ago', location: 'Detroit, MI', comment: 'We have two senior dogs. Their pet-safe de-icer didn’t irritate their paws at all, and it cleared our sidewalk completely.' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    caseStudyCost: 75,
    caseStudyTitle: 'Pre-Storm Brine Spray + Magnesium Chloride Pet-Safe Salt'
  }
];

export const SEASONAL_BUNDLES = [
  {
    id: 'winter-fortress',
    title: 'Winter Fortress Bundle',
    tag: 'Winter Storm Defense',
    description: 'Complete cold-weather protection: Unlimited snow clearing, driveway de-icing, gutter freeze-out prevention, and certified furnace heating checkup.',
    originalPrice: 799,
    bundlePrice: 629,
    savings: 170,
    servicesIncluded: ['Snow Removal', 'Driveway De-Icing', 'Gutter Cleaning', 'HVAC Heating Tune-Up'],
    popular: true,
    features: [
      'Automatic snow dispatch whenever snowfall exceeds 2"',
      'Pet-safe magnesium chloride salt applications',
      'Downspout flush to stop roof ice dams from forming',
      '21-point furnace carbon monoxide & combustion safety test',
      'Priority emergency dispatch during severe winter storm alerts'
    ]
  },
  {
    id: 'spring-curb-appeal',
    title: 'Spring Curb Appeal Bundle',
    tag: 'Exterior Revival',
    description: 'Transform your home exterior for sunny weather: High-pressure driveway wash, siding soft-wash, comprehensive flowerbed edging, and gutter cleaning.',
    originalPrice: 470,
    bundlePrice: 389,
    savings: 81,
    servicesIncluded: ['Pressure Washing', 'Lawn & Garden Cleanup', 'Gutter Cleaning'],
    popular: false,
    features: [
      'Complete vinyl/stucco siding soft-wash eliminating algae',
      '4,000 PSI driveway & front sidewalk rotary scrub',
      'Flower bed spade edging and fallen debris removal',
      'Gutter hand-scoop and downspout clear-out',
      'Zero-mess yard guarantee with bagged haul-away'
    ]
  },
  {
    id: 'total-interior-wellness',
    title: 'Total Interior Wellness Bundle',
    tag: 'Whole-Home Refresh',
    description: 'Deep sanitary reset for healthier indoor air: 64-point deep house scrub, 220°F truck-mounted carpet steam extraction, and dryer vent lint purge.',
    originalPrice: 444,
    bundlePrice: 369,
    savings: 75,
    servicesIncluded: ['House Deep Cleaning', 'Carpet Cleaning', 'Dryer Vent Cleaning'],
    popular: true,
    features: [
      'Deep clean of kitchen, bathrooms, baseboards & hard floors',
      '3-room deep hot-water carpet extraction and enzyme rinse',
      'Rotary brush dryer vent lint extraction & airflow test',
      'Hospital-grade HEPA filtration on all vacuum equipment',
      'Fast 2-4 hour carpet dry time guarantee'
    ]
  },
  {
    id: 'all-season-vip',
    title: 'All-Season Homeowner VIP Pass',
    tag: '365-Day Worry-Free',
    description: 'The ultimate white-glove property care subscription: Scheduled seasonal maintenance across all 10 services throughout the entire calendar year.',
    originalPrice: 1980,
    bundlePrice: 1499,
    savings: 481,
    servicesIncluded: ['All 10 House Hero Property Care Services'],
    popular: false,
    features: [
      '2 Seasonal HVAC tune-ups (Spring AC + Fall Furnace)',
      '2 Biannual gutter cleanouts (Spring and Autumn)',
      '1 Full house deep clean + 2 seasonal pressure wash visits',
      'Unlimited winter snow plow & de-icing dispatch reserve',
      'Dedicated account supervisor & direct priority hotline'
    ]
  }
];

export const SERVICE_AREAS = [
  {
    hub: 'Denver Metro & Front Range',
    state: 'CO',
    zips: ['80201', '80202', '80203', '80204', '80205', '80206', '80209', '80210', '80211', '80212', '80218', '80220', '80230', '80014', '80111'],
    dispatchTime: 'Under 45 mins',
    fleetCount: '14 Active Vans & Plows',
    address: '1700 Lincoln St, Denver, CO 80203'
  },
  {
    hub: 'Twin Cities & Hennepin',
    state: 'MN',
    zips: ['55401', '55402', '55403', '55404', '55405', '55406', '55407', '55408', '55409', '55410', '55101', '55102', '55104', '55416', '55424'],
    dispatchTime: 'Under 35 mins',
    fleetCount: '18 Active Vans & Plows',
    address: '800 Washington Ave N, Minneapolis, MN 55401'
  },
  {
    hub: 'Greater Chicago & Suburbs',
    state: 'IL',
    zips: ['60601', '60602', '60603', '60604', '60605', '60611', '60614', '60622', '60647', '60657', '60201', '60302', '60025', '60091', '60521'],
    dispatchTime: 'Under 45 mins',
    fleetCount: '22 Active Vans & Plows',
    address: '333 N Michigan Ave, Chicago, IL 60601'
  },
  {
    hub: 'Milwaukee & Southeast Wisconsin',
    state: 'WI',
    zips: ['53202', '53203', '53204', '53207', '53211', '53212', '53217', '53005', '53045', '53051'],
    dispatchTime: 'Under 40 mins',
    fleetCount: '12 Active Vans & Plows',
    address: '250 E Wisconsin Ave, Milwaukee, WI 53202'
  },
  {
    hub: 'Midwest Metro Hub (St. Louis & KC)',
    state: 'MO / KS',
    zips: ['63101', '63102', '63103', '63104', '63105', '63108', '64105', '64106', '64108', '64111', '64112', '66202', '66204', '66207'],
    dispatchTime: 'Under 50 mins',
    fleetCount: '16 Active Vans & Plows',
    address: '1010 Walnut St, Kansas City, MO 64106'
  },
  {
    hub: 'National Dispatch Support',
    state: 'USA',
    zips: ['*'],
    dispatchTime: 'Standard scheduled bookings nationwide',
    fleetCount: '110+ Partner Mobile Units',
    address: 'House Hero Operations HQ, Wilmington, DE'
  }
];
