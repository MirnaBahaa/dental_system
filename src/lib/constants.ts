/**
 * Site Constants — Single source of truth for all site data.
 *
 * HOW TO USE THIS FILE:
 * 1. Replace all placeholder values with the real business data
 * 2. Add/remove services, team members, FAQs as needed
 * 3. Schema.ts, sitemap.ts, and layout components import from here
 *
 * AFTER CMS MIGRATION:
 * This file becomes the fallback. Live data comes from the CMS API,
 * but schema.ts and sitemap.ts still use these constants.
 */

import type {
  NavItem,
  ContactInfo,
  SocialLink,
  Service,
  ServiceDetail,
  TeamMember,
  Testimonial,
  FAQ
} from "@/types";

// ============================================
// SITE INFO
// ============================================
export const SITE_NAME = "Verda Dental";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://verda.dental";
export const SITE_TAGLINE = "Empower your smile journey.";
export const SITE_DESCRIPTION =
  "Modern, gentle dental care that meets you where you are — through every stage of life.";
export const FOUNDED_YEAR = 2010;

// ============================================
// CONTACT INFO
// ============================================
export const CONTACT_INFO: ContactInfo = {
  phone: "(555) 014-2200",
  email: "hello@verda.dental",
  address: {
    street: "1420 Alder Court",
    suite: "Suite 200",
    city: "Maple Ridge",
    state: "OR",
    zip: "97401",
    full: "1420 Alder Court, Suite 200, Maple Ridge, OR 97401"
  },
  hours: [
    { days: "Monday – Thursday", hours: "8:00 AM – 6:00 PM" },
    { days: "Friday", hours: "8:00 AM – 4:00 PM" },
    { days: "Saturday", hours: "9:00 AM – 2:00 PM" },
    { days: "Sunday", hours: "Closed" }
  ],
  coordinates: {
    lat: 44.0521,
    lng: -123.0868
  }
};

/** Digits only — for tel: hrefs. */
export const PHONE_HREF = `tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`;

/** Google Maps query string — used by the map embed and directions links. */
export const MAPS_QUERY = `${SITE_NAME}, ${CONTACT_INFO.address.full}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  MAPS_QUERY
)}&output=embed`;
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAPS_QUERY
)}`;

// ============================================
// SOCIAL LINKS
// ============================================
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Facebook", url: "https://facebook.com/verdadental", icon: "Facebook" },
  { platform: "Instagram", url: "https://instagram.com/verdadental", icon: "Instagram" },
  { platform: "X", url: "https://x.com/verdadental", icon: "Twitter" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/verdadental", icon: "Linkedin" }
];

// ============================================
// IMAGE POOL
// Shared placeholder photography. Every entry is whitelisted in
// next.config.ts remotePatterns. Swap for real assets when available.
// ============================================
const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  consult: U("1606811841689-23dfddce3e95"),
  chair: U("1582750433449-648ed127bb54"),
  hygiene: U("1588776814546-1ffcf47267a5"),
  smile: U("1438761681033-6461ffad8d80"),
  aligners: U("1559757148-5c350d0d3c56"),
  sedation: U("1622253692010-333f2da6031d"),
  emergency: U("1606811971618-4486d14f3f99"),
  tools: U("1581456495146-65a71b2c8e52"),
  reception: U("1530497610245-94d3c16cda28"),
  patientA: U("1573496359142-b8d87734a5a2"),
  patientB: U("1531123897727-8f129e1688ce"),
  patientC: U("1517841905240-472988babdf9"),
  patientD: U("1507003211169-0a1dd7228f2d"),
  patientE: U("1494790108377-be9c29b29330"),
  child: U("1542596594-649edbc13630"),
  team: U("1559839734-2b71ea197ec2"),
  exterior: U("1502685104226-ee32379fefbe"),
  detail: U("1607990281513-2c110a25bd8c")
} as const;

// ============================================
// NAVIGATION — Main site menu structure
// The Nav and MobileMenu read from this.
// Children create dropdown/accordion submenus.
// ============================================
/**
 * A nav entry that may be a pure dropdown trigger.
 *
 * `hubless: true` means the group has no page of its own — "Patient Info" is
 * a heading over four separate pages, not a destination. Such entries render
 * as a disclosure button rather than a link, which is what stops a parent and
 * its first child both pointing at the same URL.
 */
export type SiteNavItem = NavItem & { hubless?: boolean };

export const NAV_ITEMS: SiteNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Mission & Values", href: "/about#mission" },
      { label: "Meet Our Doctors", href: "/about#doctors" },
      { label: "Meet Our Team", href: "/about#team" },
      { label: "Why Verda", href: "/about#trust" }
    ]
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "General Dentistry", href: "/services/general-dentistry" },
      { label: "Restorative Dentistry", href: "/services/restorative-dentistry" },
      { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
      { label: "Dental Implants", href: "/services/dental-implants" },
      { label: "Oral Surgery", href: "/services/oral-surgery" },
      { label: "Emergency Dentistry", href: "/services/emergency-dentistry" },
      { label: "Orthodontics", href: "/services/orthodontics" },
      { label: "Specialty Services", href: "/services/specialty-services" },
      { label: "Children's Dentistry", href: "/services/childrens-dentistry" }
    ]
  },
  {
    // No page of its own — a heading over four separate pages.
    label: "Patient Info",
    href: "",
    hubless: true,
    children: [
      { label: "FAQ", href: "/faq" },
      { label: "Membership Plan", href: "/membership" },
      { label: "Before & After", href: "/before-and-after" },
      { label: "Location & Hours", href: "/location" }
    ]
  },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" }
];

/** Footer link groups — 5-column layout. */
export const FOOTER_NAV: { heading: string; links: NavItem[] }[] = [
  {
    heading: "About",
    links: [
      { label: "Our Practice", href: "/about" },
      { label: "Mission & Values", href: "/about#mission" },
      { label: "Our Doctors", href: "/about#doctors" },
      { label: "Our Team", href: "/about#team" }
    ]
  },
  {
    heading: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "General Dentistry", href: "/services/general-dentistry" },
      { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
      { label: "Dental Implants", href: "/services/dental-implants" },
      { label: "Emergency Care", href: "/services/emergency-dentistry" }
    ]
  },
  {
    heading: "Patients",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Reviews", href: "/reviews" },
      { label: "Before & After", href: "/before-and-after" },
      { label: "Membership Plan", href: "/membership" }
    ]
  },
  {
    heading: "Visit Us",
    links: [
      { label: "Book Appointment", href: "/appointment" },
      { label: "Contact Us", href: "/contact" },
      { label: "Location & Hours", href: "/location" }
    ]
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" }
    ]
  }
];

// ============================================
// SERVICE CATEGORIES — the full treatment tree
// Drives /services, /services/[category]/[slug] and sitemap.ts
// ============================================

/** A single treatment page under a category. */
export interface Treatment {
  slug: string;
  title: string;
  /** One-line card summary. */
  summary: string;
  /** Opening paragraph on the detail page. */
  overview: string;
  benefits: string[];
  image: string;
  /** Optional photo set for the detail page; derived from the pool if absent. */
  gallery?: string[];
}

/** A service category — groups treatments and supplies shared steps/FAQs. */
export interface ServiceCategory {
  slug: string;
  title: string;
  description: string;
  /** SVG path `d` for the category icon (24x24 viewBox, stroke style). */
  iconPath: string;
  image: string;
  /** Long-form paragraphs for the category hub page intro. */
  intro: string[];
  /** Why-choose-us bullets specific to this category. */
  highlights: string[];
  steps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  treatments: Treatment[];
}

/** Shared visit flow — used when a category has nothing more specific. */
const DEFAULT_STEPS = [
  {
    title: "Understanding your needs",
    description:
      "We listen first. You tell us what has been bothering you and what you want for your smile — nothing is scheduled before that conversation."
  },
  {
    title: "Exam and honest options",
    description:
      "A full look with low-dose digital imaging, then a plain-English rundown of every route open to you, including doing nothing yet."
  },
  {
    title: "A plan paced for real life",
    description:
      "We sequence treatment around your budget and calendar, and confirm what your insurance covers before anything begins."
  },
  {
    title: "Care and follow-up",
    description:
      "Unhurried appointments, a check-in call afterwards, and a maintenance rhythm that keeps the result stable for years."
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    description:
      "The unhurried foundation — exams, cleanings and gum health for every age in the household.",
    iconPath: "M12 2c-3.5 0-5.5 2-5.5 5.5C6.5 12 9 14 9 18c0 2 .5 4 1.5 4s1-2 1.5-4c.5-2 1-2 1.5 0 .5 2 .5 4 1.5 4s1.5-2 1.5-4c0-4 2.5-6 2.5-10.5C17.5 4 15.5 2 12 2z",
    image: IMAGES.hygiene,
    intro: [
      "General dentistry is the part of this practice that keeps everything else from becoming necessary. Six-monthly exams, hygiene appointments booked longer than most practices allow, gum measurements written down so you can watch the numbers move, and guards for the grinding that quietly wears teeth flat.",
      "We see whole households here — a nine-year-old's first set of images and their grandmother's periodontal maintenance in the same afternoon. If it has been years since your last visit, that is a starting point rather than a problem. There is no lecture, just a plan you can realistically keep."
    ],
    highlights: [
      "Hygiene appointments long enough that nothing gets rushed",
      "Gum pocket depths recorded each visit so progress is visible",
      "Images taken only when there is a reason to look",
      "One practice for every age in the household, often in one visit"
    ],
    steps: DEFAULT_STEPS,
    faqs: [
      {
        question: "How often should I come in for a check-up?",
        answer:
          "Every six months suits most people. If you have gum disease, a dry mouth, or a history of frequent decay we may suggest three or four month intervals for a while, then step back down once things stabilise."
      },
      {
        question: "Will a cleaning hurt?",
        answer:
          "For healthy gums, no — it feels like polishing. If there is inflammation the first visit can be tender, so we offer topical numbing and split deeper work across two appointments rather than pushing through."
      },
      {
        question: "Do I really need X-rays every time?",
        answer:
          "No. We take bitewings roughly every 18–24 months for low-risk adults, and only when there is a reason to look. Our sensors use up to 90% less radiation than the film systems many people remember."
      },
      {
        question: "What if it has been years since my last visit?",
        answer:
          "You are in good company — plenty of our long-term patients started with a five-year gap. There is no lecture. We work out where you are today and build a catch-up plan at a pace that feels manageable."
      }
    ],
    treatments: [
      {
        slug: "comprehensive-exam",
        title: "Comprehensive Exam",
        summary: "A full baseline of your teeth, gums, bite and soft tissue — with time to talk it through.",
        overview:
          "A comprehensive exam is the map everything else is drawn from. We chart every tooth and existing restoration, measure gum pockets, screen for oral cancer, look at how your bite meets, and take only the images we actually need. Then we sit down — clothed, upright, no bright light in your eyes — and walk you through what we found in language that makes sense.",
        benefits: [
          "Catches decay and gum disease years before you would feel them",
          "Includes a full oral cancer screening",
          "Gives you a written baseline to compare against at future visits",
          "Ends with a conversation, not a quote sheet"
        ],
        image: IMAGES.consult
      },
      {
        slug: "teeth-cleaning",
        title: "Teeth Cleaning",
        summary: "Unhurried professional hygiene that removes what brushing at home cannot reach.",
        overview:
          "Plaque hardens into tartar within days, and once it does no amount of brushing will shift it. A professional cleaning removes that build-up from above and just below the gumline, polishes the surfaces so new plaque struggles to cling, and finishes with a fluoride application. Our hygienists book longer appointments than most practices — because rushing this is how things get missed.",
        benefits: [
          "Removes hardened tartar brushing cannot reach",
          "Reduces bleeding gums and persistent bad breath",
          "Longer appointment slots so nothing is rushed",
          "Personalised technique coaching for home care"
        ],
        image: IMAGES.hygiene
      },
      {
        slug: "periodontal-disease-treatment",
        title: "Periodontal Disease Treatment",
        summary: "Deep cleaning and ongoing maintenance to stop gum disease before it costs you teeth.",
        overview:
          "Gum disease is the leading cause of adult tooth loss, and it is nearly painless until it is advanced. Treatment starts with scaling and root planing — cleaning the root surfaces beneath the gumline, usually one half of the mouth at a time under local anaesthetic. From there we move to a three-month maintenance rhythm and re-measure your pockets each visit so you can see the numbers improving.",
        benefits: [
          "Halts bone loss before teeth become mobile",
          "Performed under local anaesthetic, quadrant by quadrant",
          "Pocket depths re-measured so progress is visible",
          "Linked to better cardiovascular and blood sugar outcomes"
        ],
        image: IMAGES.tools
      },
      {
        slug: "night-guards",
        title: "Night Guards",
        summary: "Custom-fitted protection for grinding and clenching — and the headaches that come with it.",
        overview:
          "If you wake with a tight jaw, worn-flat teeth or morning headaches, you are likely grinding at night. A custom night guard takes the load that would otherwise crack enamel and restorations. Unlike the boil-and-bite versions sold in pharmacies, ours is milled from an impression of your actual bite, so it stays put and does not push your jaw into a worse position.",
        benefits: [
          "Protects enamel, crowns and veneers from grinding damage",
          "Eases morning jaw tightness and tension headaches",
          "Custom-milled to your bite, not a generic tray",
          "Typically covered in part by dental insurance"
        ],
        image: IMAGES.detail
      },
      {
        slug: "sports-mouthguards",
        title: "Sports Mouthguards",
        summary: "Custom guards for athletes that actually stay in — so they actually get worn.",
        overview:
          "A knocked-out front tooth costs far more over a lifetime than the guard that would have prevented it. Stock guards are bulky, make breathing and talking awkward, and end up in a kit bag. A custom guard is thin where it can be and thick where impact lands, fits closely enough to speak through, and comes in team colours if that is what gets a teenager to wear it.",
        benefits: [
          "Absorbs impact that would otherwise fracture front teeth",
          "Thin enough to talk and breathe normally",
          "Custom fit means it stays in during play",
          "Team colours available for kids and teens"
        ],
        image: IMAGES.child
      }
    ]
  },
  {
    slug: "restorative-dentistry",
    title: "Restorative Dentistry",
    description:
      "Repairing damage with materials and craftsmanship that hold up — and disappear into your smile.",
    iconPath:
      "M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z",
    image: IMAGES.chair,
    intro: [
      "Restorative work is repair — a cracked molar, a filling that has finally given out, a tooth worn down far enough that it needs covering. The aim is the same every time: take the load off what is weakened, keep as much of your own tooth as possible, and make the result invisible beside its neighbours.",
      "Because the lab is in this building, most crowns are designed, milled and fitted in one appointment. No three weeks in a temporary, no second round of anaesthetic, and shade-matching done in natural light with the tooth still in front of us."
    ],
    highlights: [
      "Crowns milled in-house — most fitted in a single appointment",
      "Conservative preparation preserves healthy tooth structure",
      "Layered ceramics shade-matched in natural light",
      "Written estimate with your insurance portion before we begin"
    ],
    steps: DEFAULT_STEPS,
    faqs: [
      {
        question: "How long will a restoration last?",
        answer:
          "A well-cared-for crown or filling commonly lasts 10–15 years, and often far longer. Lifespan depends more on grinding, diet and hygiene than on the material itself, which is why we cover those things at every recall."
      },
      {
        question: "Will it match my other teeth?",
        answer:
          "Yes. We shade-match in natural light and use layered ceramics rather than a single flat colour. Silver amalgam is available on request but we default to tooth-coloured materials everywhere."
      },
      {
        question: "Is the procedure painful?",
        answer:
          "You should feel pressure but not pain. We numb thoroughly, wait until it has genuinely taken effect, and stop the moment you raise a hand. Sedation is available for anyone who wants it."
      },
      {
        question: "What does it cost, and will insurance help?",
        answer:
          "We give you a written estimate with your insurance portion calculated before you commit to anything. Most PPO plans cover 50–80% of restorative work; interest-free payment plans cover the rest."
      }
    ],
    treatments: [
      {
        slug: "dental-crown",
        title: "Dental Crown",
        summary: "A full-coverage cap that rebuilds a broken or heavily filled tooth.",
        overview:
          "When too much of a tooth is missing for a filling to hold, a crown wraps the whole thing and takes the chewing load off the weakened structure. We prepare conservatively — removing only what has to go — then fit a layered ceramic crown shaded to sit invisibly beside its neighbours.",
        benefits: [
          "Restores full chewing strength to a weakened tooth",
          "Layered ceramic that matches surrounding teeth",
          "Conservative preparation preserves healthy structure",
          "Protects a cracked tooth from splitting further"
        ],
        image: IMAGES.chair
      },
      {
        slug: "dental-bridge",
        title: "Dental Bridge",
        summary: "Fills a gap by anchoring a replacement tooth to the teeth on either side.",
        overview:
          "A bridge closes a single-tooth gap without surgery, using the neighbouring teeth as supports. It is often the right answer when those neighbours already need crowns, or when an implant is not an option. We plan the shape so it cleans easily underneath — the most common reason bridges fail early is that nobody explained how to floss beneath one.",
        benefits: [
          "Closes a gap without surgery or healing time",
          "Stops adjacent teeth drifting into the space",
          "Restores even bite pressure across the arch",
          "Designed and explained for easy cleaning underneath"
        ],
        image: IMAGES.tools
      },
      {
        slug: "inlays-onlays",
        title: "Inlays & Onlays",
        summary: "A middle ground between a filling and a crown — stronger, and far more conservative.",
        overview:
          "When damage is too broad for a filling but the tooth is otherwise sound, an inlay or onlay is milled to fit the cavity exactly and bonded in place. Because it is made outside the mouth and then fitted, the contact points and bite are far more precise than a large direct filling — and much more of your own tooth survives than with a crown.",
        benefits: [
          "Preserves far more natural tooth than a crown",
          "Stronger and longer-lasting than a large filling",
          "Precise contacts protect the gum between teeth",
          "Bonded ceramic reinforces the remaining structure"
        ],
        image: IMAGES.detail
      },
      {
        slug: "dental-filling",
        title: "Dental Filling",
        summary: "Tooth-coloured composite that repairs decay quietly, usually in one visit.",
        overview:
          "Most fillings take under an hour from numbing to polish. We remove only the decayed tissue, bond a composite matched to your enamel shade, then shape and cure it in layers so the bite feels like nothing changed. You will not see it, and neither will anyone else.",
        benefits: [
          "Single visit, usually under an hour",
          "Tooth-coloured composite bonded in layers",
          "Only decayed tissue removed — no over-drilling",
          "Bite checked and adjusted before you leave"
        ],
        image: IMAGES.hygiene
      },
      {
        slug: "dental-bonding",
        title: "Dental Bonding",
        summary: "Reshapes chips, closes small gaps and covers stains — no drilling, no anaesthetic.",
        overview:
          "Bonding is the least invasive cosmetic option we offer. Composite resin is sculpted directly onto the tooth, shaped by hand and cured. It is reversible, usually needs no anaesthetic, and is finished in one appointment — which makes it a sensible first step before committing to veneers.",
        benefits: [
          "No drilling and usually no anaesthetic",
          "Completed in a single appointment",
          "Reversible — nothing permanent is removed",
          "A low-commitment trial before considering veneers"
        ],
        image: IMAGES.smile
      },
      {
        slug: "root-canal",
        title: "Root Canal",
        summary: "Saves an infected tooth and, in most cases, ends the pain the same day.",
        overview:
          "Root canals have a reputation earned decades ago. With modern rotary instruments and proper anaesthetic, the procedure feels much like having a filling placed — and it relieves the toothache that brought you in. We clean and seal the canal, then cap the tooth with a crown so it can go back to normal service.",
        benefits: [
          "Saves a tooth that would otherwise need extraction",
          "Relieves severe toothache, usually the same day",
          "Modern technique feels much like a routine filling",
          "Sedation available for anxious patients"
        ],
        image: IMAGES.emergency
      },
      {
        slug: "full-mouth-reconstruction",
        title: "Full Mouth Reconstruction",
        summary: "A staged, whole-mouth plan when wear, decay or loss has affected most teeth.",
        overview:
          "Reconstruction is not one procedure but a sequenced plan — often combining crowns, implants, gum treatment and bite correction over several months. We start with records and a written roadmap so you can see the whole route, the order, and the cost of each stage before the first appointment. Nothing begins until you are comfortable with the plan.",
        benefits: [
          "One coordinated plan instead of scattered fixes",
          "Written roadmap with staged costs up front",
          "Bite corrected so the result is stable long-term",
          "Sequenced around your budget and calendar"
        ],
        image: IMAGES.consult
      }
    ]
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description:
      "Whitening, veneers and reshaping — natural-looking results that still read as your own smile.",
    iconPath: "M12 1l2.4 7.2L21 12l-6.6 1.4L12 23l-2.4-7.2L3 12l6.4-1.4z",
    image: IMAGES.smile,
    intro: [
      "Cosmetic dentistry here is deliberately restrained. The brief we work to is that nobody should be able to tell where the dentistry ends and your own teeth begin — no uniform white, no oversized veneers, no smile that belongs on someone else's face.",
      "Every case starts with photographs and a mock-up you can look at before a single tooth is touched. If whitening and a small amount of reshaping will get you most of the way there, we will tell you that rather than quoting for eight veneers."
    ],
    highlights: [
      "Digital mock-up approved before any tooth is prepared",
      "Shade chosen against your skin tone, not a guide alone",
      "The least invasive route recommended first",
      "Photographs at every stage so the change is honest"
    ],
    steps: [
      {
        title: "What you actually want to change",
        description:
          "We start with photos and a conversation. Often the thing bothering someone is not the thing they expect — and sometimes the honest answer is that very little needs doing."
      },
      {
        title: "A preview before you commit",
        description:
          "Digital design and, where useful, a temporary mock-up you can wear and live with. You approve the shape and shade before anything permanent happens."
      },
      {
        title: "Conservative treatment",
        description:
          "We choose the least invasive option that achieves the result — bonding before veneers, whitening before either, wherever that will do the job."
      },
      {
        title: "Refinement and upkeep",
        description:
          "A follow-up to fine-tune, plus a maintenance plan so the result stays looking right for years rather than months."
      }
    ],
    faqs: [
      {
        question: "Will it look obviously fake?",
        answer:
          "Not if it is done properly. Natural teeth are not uniform white or perfectly matched, and we build in the subtle variation and translucency that makes a smile read as real. We would rather you were asked whether you had been on holiday than whether you had work done."
      },
      {
        question: "How long does whitening last?",
        answer:
          "Typically 12–24 months, depending on coffee, tea, red wine and smoking. We supply custom trays so you can top up at home for a fraction of the cost of repeating the in-chair treatment."
      },
      {
        question: "Do veneers ruin the teeth underneath?",
        answer:
          "Traditional veneers do require removing a thin layer of enamel, which is irreversible — we are direct about that. Many cases suit minimal-prep veneers or bonding instead, and we will always tell you when the more conservative option would look just as good."
      },
      {
        question: "Is cosmetic work covered by insurance?",
        answer:
          "Usually not, since it is elective. Where a treatment also serves a functional purpose — a crown on a cracked tooth, for instance — part of it may be claimable. We check and tell you before you decide."
      }
    ],
    treatments: [
      {
        slug: "veneers",
        title: "Veneers",
        summary: "Thin ceramic facings that reshape colour, alignment and proportion at once.",
        overview:
          "Veneers are the answer when several things bother you at the same time — shade, small chips, uneven edges and slight crowding. Each one is a hand-layered ceramic shell bonded to the front of the tooth. We design the set as a whole, so the result is a smile rather than ten separate teeth, and you approve a wearable mock-up before we prepare anything.",
        benefits: [
          "Corrects shade, shape and minor alignment together",
          "Wearable mock-up approved before any preparation",
          "Highly stain-resistant ceramic",
          "Designed as a set for a balanced overall smile"
        ],
        image: IMAGES.smile
      },
      {
        slug: "teeth-whitening",
        title: "Teeth Whitening",
        summary: "Professional-strength whitening, in-chair or with custom take-home trays.",
        overview:
          "Over-the-counter strips work on the outer surface only and rarely lift more than a shade or two. Professional gel, held against the enamel by trays made from an impression of your teeth, reaches further and works evenly. We check for exposed roots and untreated decay first — whitening over either is how people end up with sensitivity they blame on the treatment.",
        benefits: [
          "Several shades lighter than over-the-counter strips",
          "Custom trays hold gel evenly, avoiding patchiness",
          "Screened first for sensitivity risk and decay",
          "Affordable top-up gel keeps the result going"
        ],
        image: IMAGES.patientE
      },
      {
        slug: "teeth-reshaping",
        title: "Teeth Reshaping",
        summary: "Subtle contouring of edges and points — often the smallest change with the biggest effect.",
        overview:
          "Sometimes a smile looks off because one canine sits a little long or an incisal edge is uneven after years of wear. Reshaping smooths and rebalances those edges in a single appointment, with no anaesthetic and no material added. It is inexpensive, immediate, and frequently all that a smile actually needs.",
        benefits: [
          "One visit, no anaesthetic, no recovery",
          "The least invasive cosmetic option available",
          "Evens out wear and uneven incisal edges",
          "Pairs well with whitening for a bigger change"
        ],
        image: IMAGES.detail
      },
      {
        slug: "smile-makeover",
        title: "Smile Makeover",
        summary: "A combined plan — whitening, alignment, bonding or veneers, sequenced as one design.",
        overview:
          "A makeover is a plan, not a product. We photograph, measure the proportions against your face and lip line, and design the outcome digitally before choosing which treatments get you there most conservatively. Often the answer includes aligners first, which reduces how much restorative work is needed at all.",
        benefits: [
          "Designed against your face, not a generic template",
          "Aligners considered first to minimise restorative work",
          "Digital preview approved before treatment begins",
          "Staged so cost can be spread across phases"
        ],
        image: IMAGES.patientA
      }
    ]
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    description:
      "Permanent replacements that restore full bite strength and keep the jawbone working.",
    iconPath: "M12 3v18M8 7h8M9 12h6M10 17h4",
    image: IMAGES.chair,
    intro: [
      "An implant replaces the root as well as the tooth, which is why it is the only option that keeps the jawbone loaded and working. Left unreplaced, the bone beneath a gap begins thinning within the first year — that is usually the clock we are working against.",
      "Planning is done from a 3D scan, so the position is settled on a screen before it is settled in your mouth. We place and restore implants under one roof, which means one team stays accountable for the result from the first scan through to the final crown."
    ],
    highlights: [
      "3D scan planning — position decided before surgery, not during",
      "Placed and restored in-house by one accountable team",
      "Keeps the jawbone loaded, preventing the collapse a gap causes",
      "Sedation options agreed in advance for anyone who wants them"
    ],
    steps: [
      {
        title: "Assessment and 3D imaging",
        description:
          "A cone-beam scan shows the bone volume and the position of nerves and sinuses, so placement is planned in three dimensions rather than estimated."
      },
      {
        title: "Placement",
        description:
          "The titanium post is placed under local anaesthetic, usually in under an hour. Most patients take nothing stronger than ibuprofen afterwards."
      },
      {
        title: "Healing and integration",
        description:
          "Three to six months while bone fuses to the implant. You leave with a temporary tooth in the gap — nobody has to see a space."
      },
      {
        title: "The final tooth",
        description:
          "A custom crown is fitted and the bite balanced. From there it is brushing, flossing and a check at each recall."
      }
    ],
    faqs: [
      {
        question: "Does placing an implant hurt?",
        answer:
          "Less than most people expect — usually less than an extraction. It is done under local anaesthetic, and the majority of our patients manage the next day on ibuprofen alone. Sedation is available if the idea of the procedure is the problem."
      },
      {
        question: "How long do implants last?",
        answer:
          "The titanium post routinely lasts decades and often for life. The crown on top is the wearing part and may need replacing after 10–15 years, much like any other crown."
      },
      {
        question: "What if I have been told I lack the bone?",
        answer:
          "That assessment is often based on a flat X-ray rather than a 3D scan. Bone grafting can rebuild the site, and angled or shorter implants work in places conventional placement cannot. It is worth a second look."
      },
      {
        question: "Am I too old for implants?",
        answer:
          "Age itself is not a barrier — we place implants for patients in their eighties. What matters is general health, healing capacity and whether the gums are stable, all of which we assess beforehand."
      }
    ],
    treatments: [
      {
        slug: "all-on-4",
        title: "All-on-4",
        summary: "A fixed full arch supported by four implants — often placed in a single day.",
        overview:
          "All-on-4 replaces a full arch of teeth with a fixed bridge anchored on four strategically angled implants. Because the rear implants are tilted, it frequently avoids the bone grafting a conventional full-arch approach would need. Most patients leave the placement appointment with a fixed temporary bridge already in place.",
        benefits: [
          "A full fixed arch on just four implants",
          "Angled placement often avoids bone grafting",
          "Fixed temporary bridge fitted the same day",
          "No plate over the palate, so taste is unaffected"
        ],
        image: IMAGES.consult
      },
      {
        slug: "single-tooth-implant",
        title: "Single Tooth Implant",
        summary: "Replaces one missing tooth without touching the healthy teeth beside it.",
        overview:
          "A single implant is the closest thing to getting the original tooth back. Unlike a bridge, it does not require cutting down the neighbouring teeth, and because it loads the bone the way a natural root does, it prevents the ridge collapse that follows tooth loss. It brushes and flosses like a normal tooth.",
        benefits: [
          "Neighbouring healthy teeth are left untouched",
          "Preserves jawbone that would otherwise shrink",
          "Cleaned like a natural tooth — no special routine",
          "Full chewing strength restored"
        ],
        image: IMAGES.tools
      },
      {
        slug: "immediate-implants",
        title: "Immediate Implants",
        summary: "Extraction and implant placement in one appointment, where the site allows.",
        overview:
          "When a tooth has to come out and the surrounding bone is healthy, the implant can often be placed in the same socket during the same visit. That means one surgical appointment instead of two, less total healing time, and better preservation of the gum contour — which matters most in the front of the mouth.",
        benefits: [
          "One surgical visit instead of two",
          "Shorter overall treatment time",
          "Preserves natural gum shape in the smile zone",
          "Less total post-operative recovery"
        ],
        image: IMAGES.chair
      },
      {
        slug: "implant-bridges",
        title: "Implant Bridges",
        summary: "Replaces several adjacent teeth using two implants rather than one per tooth.",
        overview:
          "Where three or four teeth in a row are missing, an implant bridge spans the gap on two supports. It costs considerably less than an implant for every tooth while delivering the same fixed, non-removable result and the same protection against bone loss along the ridge.",
        benefits: [
          "Fewer implants needed, so lower total cost",
          "Fixed in place — never removed for cleaning",
          "Maintains bone across the whole span",
          "Restores even chewing across the arch"
        ],
        image: IMAGES.detail
      },
      {
        slug: "implant-supported-dentures",
        title: "Implant-Supported Dentures",
        summary: "Clips a denture onto implants so it stops slipping — and you can eat properly again.",
        overview:
          "A conventional lower denture rests on a ridge that keeps shrinking, which is why it works loose. Two to four implants give it something to clip onto. The denture still comes out for cleaning, but it holds firm while you eat and talk, and most patients report their bite force multiplying several times over.",
        benefits: [
          "No more slipping while eating or speaking",
          "Dramatically stronger bite than a conventional denture",
          "Still removable for straightforward cleaning",
          "Slows the ridge shrinkage dentures accelerate"
        ],
        image: IMAGES.patientB
      }
    ]
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    description:
      "Extractions, wisdom teeth and grafting — handled in-house, with comfort planned in advance.",
    iconPath: "M12 2l3 5h5l-4 4 1.5 6L12 14l-5.5 3L8 11 4 7h5z",
    image: IMAGES.tools,
    intro: [
      "Most practices refer this work out. We keep it here, which spares you the wait for a specialist appointment and means the person who diagnosed the problem is the person who treats it.",
      "Surgery is where comfort planning matters most, so it happens before you are in the chair rather than being improvised once you are. We talk through anaesthetic and sedation, what recovery actually looks like day by day, and how to reach us afterwards — including outside office hours."
    ],
    highlights: [
      "Extractions and wisdom teeth handled here, with no referral wait",
      "Sedation and anaesthetic agreed before the appointment",
      "Written aftercare and a direct number for the days that follow",
      "Bone grafting done in the same visit where it saves you a procedure"
    ],
    steps: [
      {
        title: "Imaging and planning",
        description:
          "3D imaging where roots sit near nerves or sinuses, so there are no surprises on the day and we can tell you honestly how straightforward it will be."
      },
      {
        title: "Comfort options agreed first",
        description:
          "Local anaesthetic, nitrous oxide or oral sedation — decided together beforehand, never improvised while you are already in the chair."
      },
      {
        title: "The procedure",
        description:
          "Most extractions take 20–40 minutes. We talk you through each step as it happens, or stay quiet if you would rather not know."
      },
      {
        title: "Recovery support",
        description:
          "Written aftercare, a direct number for the first 48 hours, and a follow-up call the next morning to check how the night went."
      }
    ],
    faqs: [
      {
        question: "Will I be awake?",
        answer:
          "For most procedures, yes — numb but awake, which is safer and means a much faster recovery. Nitrous oxide takes the edge off anxiety, and oral sedation is available if you would rather remember very little of it."
      },
      {
        question: "How long is recovery?",
        answer:
          "Most people are back to normal within two to three days, with swelling peaking around day two. Wisdom teeth take a little longer. We will tell you honestly whether to book time off."
      },
      {
        question: "Can I drive myself home?",
        answer:
          "After local anaesthetic alone, yes. After nitrous oxide you will need to sit with us for a short while first. After oral sedation you must arrange a lift — we will not let you drive."
      },
      {
        question: "What about dry socket?",
        answer:
          "It affects a small minority, most often smokers. Our aftercare instructions are specific about what causes it, and if it happens we will see you the same day and dress the socket, which relieves the pain almost immediately."
      }
    ],
    treatments: [
      {
        slug: "tooth-extractions",
        title: "Tooth Extractions",
        summary: "Straightforward removal when a tooth cannot be saved — with the next step planned first.",
        overview:
          "Extraction is our last resort, not our first. When a tooth genuinely cannot be saved, we plan the replacement before we take it out, so you are not left with a gap and no route forward. Where it makes sense we preserve the socket with a graft at the same time, which keeps implant options open later.",
        benefits: [
          "Replacement planned before the tooth comes out",
          "Socket preservation keeps implant options open",
          "Sedation available for anxious patients",
          "Next-morning follow-up call as standard"
        ],
        image: IMAGES.chair
      },
      {
        slug: "wisdom-teeth",
        title: "Wisdom Teeth",
        summary: "Assessment and removal of third molars — including impacted ones.",
        overview:
          "Not every wisdom tooth needs to come out. If yours are fully erupted, cleanable and not causing crowding or infection, we will happily leave them and monitor. When they are impacted, repeatedly infected or damaging the tooth in front, we remove them — and we would rather do it in your twenties than your forties, when healing is slower.",
        benefits: [
          "Honest assessment — not every wisdom tooth needs removing",
          "3D imaging where roots sit close to the nerve",
          "All four can be done in one appointment if you prefer",
          "Clear aftercare and a direct number for 48 hours"
        ],
        image: IMAGES.tools
      },
      {
        slug: "bone-grafting",
        title: "Bone Grafting",
        summary: "Rebuilds jawbone volume so implants become possible where they were not.",
        overview:
          "Bone recedes once a tooth has been missing for a while, and a thin ridge cannot support an implant. Grafting adds volume back, either at the time of extraction to prevent the loss, or later to rebuild it. Healing takes a few months, after which sites that were written off as impossible frequently become straightforward.",
        benefits: [
          "Makes implants possible where bone was insufficient",
          "Can be done at extraction to prevent loss entirely",
          "Restores natural ridge contour under a denture or bridge",
          "3D imaging confirms the result before implant planning"
        ],
        image: IMAGES.detail
      },
      {
        slug: "frenectomy",
        title: "Frenectomy",
        summary: "A short procedure releasing a tight lip or tongue tie, for infants through adults.",
        overview:
          "A restrictive frenum can interfere with infant feeding, speech development, or cause gum recession between the front teeth in adults. Release takes only a few minutes, heals quickly, and in infants can be done with topical anaesthetic alone. We coordinate with lactation consultants and speech therapists where that is part of the picture.",
        benefits: [
          "Short procedure with rapid healing",
          "Helps infant latch and feeding difficulties",
          "Prevents recession and gaps between front teeth",
          "Coordinated with lactation or speech support"
        ],
        image: IMAGES.child
      }
    ]
  },
  {
    slug: "emergency-dentistry",
    title: "Emergency Dentistry",
    description:
      "Same-day appointments when it hurts. We keep slots open every single day for urgent needs.",
    iconPath: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 7v6M12 16.5v.5",
    image: IMAGES.emergency,
    intro: [
      "Dental pain does not wait for a free slot, so we hold emergency time open every working day instead of squeezing urgent cases into whatever is left. Call in the morning and you will usually be seen the same day.",
      "The first visit is about getting you out of pain and stabilising the tooth. Anything definitive can be planned once you are able to think straight again — nobody should be making decisions about crowns while their face is throbbing."
    ],
    highlights: [
      "Same-day slots held open every working day",
      "First priority is stopping the pain — decisions come after",
      "Guidance over the phone for what to do before you arrive",
      "A knocked-out tooth can often be saved if you call immediately"
    ],
    steps: [
      {
        title: "Call us — we answer",
        description:
          "Ring the practice and describe what is happening. We keep same-day slots free every day precisely so urgent cases are not turned away."
      },
      {
        title: "Get you out of pain",
        description:
          "The first priority is relief, not a treatment plan. We deal with the pain or the infection before discussing anything longer-term."
      },
      {
        title: "Stabilise",
        description:
          "A temporary restoration, dressing or splint holds things safely until the definitive repair can be scheduled properly."
      },
      {
        title: "Plan the permanent fix",
        description:
          "Once you are comfortable and thinking clearly, we agree the lasting solution — with costs written down before you commit."
      }
    ],
    faqs: [
      {
        question: "How quickly can I be seen?",
        answer:
          "We hold emergency slots open every working day and aim to see genuine emergencies the same day. Call as early as you can — mornings give us the most flexibility."
      },
      {
        question: "What counts as a dental emergency?",
        answer:
          "Severe or worsening pain, facial swelling, a knocked-out or badly broken tooth, uncontrolled bleeding, or a lost crown or filling causing sharp pain. Facial swelling that is spreading or affecting your breathing or swallowing is urgent — go to A&E."
      },
      {
        question: "I am not a registered patient. Will you still see me?",
        answer:
          "Yes. Emergency appointments are open to anyone, whether or not you have been here before. There is no obligation to transfer your care to us afterwards."
      },
      {
        question: "What can I do before I get there?",
        answer:
          "For pain, ibuprofen usually beats paracetamol for dental issues if you can take it. Use a cold compress on the outside of the cheek. For a knocked-out adult tooth, keep it in milk and get to us within the hour."
      }
    ],
    treatments: [
      {
        slug: "toothache",
        title: "Toothache",
        summary: "Same-day diagnosis and relief — because toothache does not wait politely.",
        overview:
          "Toothache has several possible causes, and treating the wrong one wastes time you do not have. We diagnose the source — decay reaching the nerve, a crack, an abscess or referred sinus pain — and treat it that day. Antibiotics alone rarely fix dental pain; they buy time at best, so we deal with the cause.",
        benefits: [
          "Same-day appointment and diagnosis",
          "Cause treated, not just masked with antibiotics",
          "Open to patients not registered with us",
          "Clear written costs before further treatment"
        ],
        image: IMAGES.emergency
      },
      {
        slug: "chipped-or-broken-tooth",
        title: "Chipped or Broken Tooth",
        summary: "Rebuilt or protected the same day, before a small break turns into a big one.",
        overview:
          "A chip may be purely cosmetic or may have exposed dentine, in which case it will get worse and more sensitive quickly. We assess how deep the fracture runs, smooth or rebuild small chips immediately with bonding, and protect larger breaks with a temporary crown until a permanent one can be made.",
        benefits: [
          "Small chips often repaired in a single visit",
          "Sharp edges smoothed to protect tongue and cheek",
          "Temporary crown protects larger fractures immediately",
          "Prevents a manageable break becoming an extraction"
        ],
        image: IMAGES.smile
      },
      {
        slug: "knocked-out-tooth",
        title: "Knocked-Out Tooth",
        summary: "Time-critical — an adult tooth can often be saved if you reach us within the hour.",
        overview:
          "Handle the tooth by the crown, never the root. Rinse it gently in milk if it is dirty, and either place it back in the socket or keep it submerged in milk. Do not let it dry out and do not scrub it. Call us on the way — reimplantation within an hour has by far the best chance of success.",
        benefits: [
          "Reimplantation possible within the critical first hour",
          "Splinting stabilises the tooth while it re-attaches",
          "Immediate replacement options if it cannot be saved",
          "Phone guidance while you are on your way in"
        ],
        image: IMAGES.emergency
      },
      {
        slug: "lost-filling-or-crown",
        title: "Lost Filling or Crown",
        summary: "Re-cemented or replaced quickly, before the exposed tooth is damaged further.",
        overview:
          "An exposed tooth is sensitive to hot, cold and pressure, and the surrounding structure weakens fast once unsupported. Bring the crown with you if you still have it — a sound crown can very often simply be re-cemented at a fraction of the cost of a new one.",
        benefits: [
          "Existing crown often re-cemented the same day",
          "Ends sharp sensitivity to hot and cold",
          "Prevents the unsupported tooth fracturing",
          "Far cheaper than remaking the restoration"
        ],
        image: IMAGES.tools
      },
      {
        slug: "dental-abscess",
        title: "Dental Abscess",
        summary: "An infection that needs treating urgently — not one to wait out.",
        overview:
          "An abscess is a pocket of infection that will not resolve on its own. We drain it, treat the source with a root canal or extraction, and prescribe antibiotics where they are genuinely indicated. If you have facial swelling that is spreading, or difficulty breathing or swallowing, treat it as a medical emergency and go to A&E.",
        benefits: [
          "Same-day drainage and rapid pain relief",
          "Source treated so the infection does not return",
          "Antibiotics only where clinically warranted",
          "Clear guidance on when to seek urgent medical care"
        ],
        image: IMAGES.consult
      }
    ]
  },
  {
    slug: "orthodontics",
    title: "Orthodontics",
    description:
      "Braces, retainers and clear aligners — discreet alignment for teenagers and adults alike.",
    iconPath: "M4 8h16M4 12h16M4 16h16M8 4v16M16 4v16",
    image: IMAGES.aligners,
    intro: [
      "Straightening teeth is about how they meet as much as how they look. A crowded bite traps plaque where no brush reaches and wears enamel unevenly, which makes alignment some of the cheapest long-term dentistry available.",
      "We treat teenagers and adults — clear aligners for most cases, fixed braces where the movement needs more control. You will see a projected outcome and a realistic timeline at the consultation, along with what happens if you stop wearing retainers, which is the part most people are never told."
    ],
    highlights: [
      "Clear aligners for most cases, fixed braces where control matters",
      "Projected outcome and an honest timeline at the consultation",
      "Retainer plan explained up front — relapse is the real risk",
      "Short monitoring visits scheduled around school or work"
    ],
    steps: [
      {
        title: "Records and simulation",
        description:
          "Scans, photos and X-rays feed a digital simulation showing where each tooth will move and roughly how long it will take."
      },
      {
        title: "Choosing the appliance",
        description:
          "Aligners, ceramic brackets or conventional braces — chosen by what your case actually needs, not by what is most fashionable."
      },
      {
        title: "Active treatment",
        description:
          "Aligner changes every one to two weeks, or adjustments every six to eight for braces. Most cases run six to eighteen months."
      },
      {
        title: "Retention for good",
        description:
          "Teeth drift back without retainers — that is biology, not failure. We fit a bonded wire, a night retainer, or both, and we mean it."
      }
    ],
    faqs: [
      {
        question: "Am I too old for orthodontics?",
        answer:
          "No. Teeth move at any age — around a third of our orthodontic patients are over thirty. Treatment can run slightly longer in adults, and healthy gums matter more than your birth year."
      },
      {
        question: "Aligners or braces?",
        answer:
          "Aligners handle most mild to moderate crowding and spacing, and are almost invisible. Complex rotations, significant bite corrections and some extraction cases still respond faster and more predictably to fixed braces. We will tell you plainly which yours is."
      },
      {
        question: "How long will it take?",
        answer:
          "Most cases run six to eighteen months. Minor front-tooth alignment can finish in as little as three. You get an estimate from the digital simulation before you commit."
      },
      {
        question: "Do I have to wear a retainer forever?",
        answer:
          "Effectively, yes — nightly at first, then a few nights a week indefinitely. Teeth have memory and will drift back without one. Anyone who tells you otherwise is selling relapse."
      }
    ],
    treatments: [
      {
        slug: "braces",
        title: "Braces",
        summary: "Fixed brackets — still the most predictable route for complex movements.",
        overview:
          "Modern braces are considerably smaller and more comfortable than the ones most adults remember, and ceramic brackets make them far less visible. For rotations, significant bite corrections and cases involving extractions, fixed appliances remain faster and more predictable than any removable alternative.",
        benefits: [
          "Handles complex cases aligners cannot",
          "Ceramic bracket option is far less visible",
          "No compliance required — they work while you sleep",
          "Often the fastest route for significant corrections"
        ],
        image: IMAGES.aligners
      },
      {
        slug: "retainers",
        title: "Retainers",
        summary: "The part that keeps the result — bonded wires and custom night retainers.",
        overview:
          "Retention is not optional. Once appliances come off, the fibres around each tooth pull it back toward where it started for years afterwards. We fit a bonded wire behind the front teeth, a removable night retainer, or both, and check them at every recall so a failure gets caught in weeks rather than after the teeth have moved.",
        benefits: [
          "Protects the investment you just made in treatment",
          "Bonded and removable options, or both together",
          "Checked at every recall so failures are caught early",
          "Replacements made from stored digital scans"
        ],
        image: IMAGES.detail
      },
      {
        slug: "clear-aligners-ortho",
        title: "Clear Aligners",
        summary: "Nearly invisible removable trays — for teenagers and adults who would rather not show it.",
        overview:
          "Clear aligners move teeth in small increments using a series of custom trays worn 20–22 hours a day. They come out to eat and brush, which makes hygiene far easier than with braces. The catch is compliance: they only work while they are in your mouth, and we will be honest about whether that suits you.",
        benefits: [
          "Virtually invisible in normal conversation",
          "Removed for eating and cleaning",
          "Digital simulation of the result before you start",
          "Fewer appointments than fixed braces"
        ],
        image: IMAGES.aligners
      }
    ]
  },
  {
    slug: "specialty-services",
    title: "Specialty Services",
    description:
      "Dentures, sleep appliances and TMJ care — the areas that need particular attention.",
    iconPath: "M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 4v5l3 2",
    image: IMAGES.reception,
    intro: [
      "Some problems sit outside routine dentistry — a jaw joint that clicks and aches, a partner reporting that you stop breathing at night, a denture that has never quite fitted since the day it was made. These need measurement and time rather than a quick appointment.",
      "Sleep appliances and TMJ splints are built from records of your own bite and adjusted across several visits, because getting them right is a process rather than a fitting. Where a medical diagnosis has to come first, we will say so and coordinate with your physician."
    ],
    highlights: [
      "Appliances built from records of your own bite, then adjusted over time",
      "TMJ assessment that measures the joint rather than guessing",
      "Coordination with your physician where sleep apnoea is suspected",
      "Denture relines and repairs handled by the in-house lab"
    ],
    steps: DEFAULT_STEPS,
    faqs: [
      {
        question: "How long does it take to get used to a denture?",
        answer:
          "Speech usually settles within a couple of weeks and eating within four to six. We schedule adjustment appointments in advance rather than waiting for a sore spot — most early denture problems are fixed in five minutes if you come in."
      },
      {
        question: "Can a dentist really treat sleep apnoea?",
        answer:
          "We treat mild to moderate obstructive sleep apnoea with oral appliances, which many people tolerate far better than CPAP. Diagnosis has to come from a sleep study ordered by a physician — we work alongside them rather than instead of them."
      },
      {
        question: "What causes TMJ pain?",
        answer:
          "Usually a combination — clenching, stress, an uneven bite, or joint disc displacement. Because the causes stack, treatment usually does too: a splint, some targeted exercises and occasionally bite adjustment."
      },
      {
        question: "Are these covered by insurance?",
        answer:
          "Dentures are typically covered by dental plans. Sleep appliances are often billed to medical rather than dental insurance, which surprises people. We will check both and tell you which route works out better."
      }
    ],
    treatments: [
      {
        slug: "dentures",
        title: "Dentures",
        summary: "Full and partial dentures shaped for a natural look and a workable bite.",
        overview:
          "A good denture is as much about facial support and speech as it is about teeth. We take our time over the try-in stage, when the set-up is still in wax and everything can still be changed — that is the appointment that decides whether the final result looks like you. Implant stabilisation is available if retention becomes a problem later.",
        benefits: [
          "Wax try-in so you approve the look before it is finished",
          "Shaped to support the lips and cheeks naturally",
          "Adjustment visits scheduled in from the start",
          "Can be stabilised with implants later"
        ],
        image: IMAGES.patientB
      },
      {
        slug: "sleep-support-appliances",
        title: "Sleep Support Appliances",
        summary: "Custom oral appliances for snoring and mild to moderate sleep apnoea.",
        overview:
          "An oral appliance holds the lower jaw slightly forward overnight, keeping the airway open. For mild to moderate obstructive sleep apnoea it is a genuine alternative to CPAP, and compliance rates are considerably higher because people actually wear it. Treatment follows a physician's diagnosis and we report back to them.",
        benefits: [
          "A workable alternative to CPAP for many patients",
          "Small, quiet, and easy to travel with",
          "Frequently reduces or eliminates snoring",
          "Often claimable under medical rather than dental cover"
        ],
        image: IMAGES.patientC
      },
      {
        slug: "tmj",
        title: "TMJ Treatment",
        summary: "Relief for jaw pain, clicking and the headaches that travel with them.",
        overview:
          "Jaw joint problems rarely have a single cause, so we assess the joint, the muscles and the bite together before treating anything. Most patients improve substantially with a custom splint and a short course of targeted exercises. We reserve any irreversible bite adjustment for cases where conservative measures have genuinely been tried.",
        benefits: [
          "Joint, muscles and bite assessed together",
          "Custom splint rather than a generic guard",
          "Conservative measures tried before anything irreversible",
          "Often resolves associated tension headaches"
        ],
        image: IMAGES.consult
      }
    ]
  },
  {
    slug: "childrens-dentistry",
    title: "Children's Dentistry",
    description:
      "First visits that are genuinely fun — building habits that outlast childhood.",
    iconPath: "M12 2a5 5 0 0 1 5 5c0 4-2 6-2 10 0 2-1 4-3 4s-3-2-3-4c0-4-2-6-2-10a5 5 0 0 1 5-5z",
    image: IMAGES.child,
    intro: [
      "A child's first few visits decide whether they grow into an adult who books check-ups or one who avoids them for a decade. So the early appointments here are deliberately low-stakes: a ride in the chair, a count of the teeth, a sticker, and nothing that was not explained first.",
      "When treatment is needed, it is paced for a child's patience rather than an adult's schedule. We tell, show, then do; parents are welcome to stay in the room; and we stop the moment a child asks us to — which is precisely what teaches them they are in control."
    ],
    highlights: [
      "Tell, show, then do — nothing happens unexplained",
      "Parents welcome in the room for every appointment",
      "Appointments paced for a child's patience, not the schedule",
      "Fluoride, sealants and habit coaching to prevent treatment later"
    ],
    steps: [
      {
        title: "A visit with nothing done",
        description:
          "The first appointment is often just a ride in the chair, a look at the instruments and a sticker. Familiarity first, treatment later."
      },
      {
        title: "Tell, show, do",
        description:
          "Every instrument is explained, then demonstrated on a finger or a model, then used. Nothing appears in a child's mouth unannounced."
      },
      {
        title: "Prevention as the default",
        description:
          "Sealants, fluoride and diet coaching, so that most children in our care simply never need a filling."
      },
      {
        title: "Growth monitoring",
        description:
          "We track jaw development and eruption so that if orthodontics is needed, it is timed well rather than started late."
      }
    ],
    faqs: [
      {
        question: "When should my child first see a dentist?",
        answer:
          "By their first birthday, or within six months of the first tooth appearing. That first visit is mostly about making the place feel ordinary — the earlier a child decides the dentist is boring rather than frightening, the easier every subsequent visit is."
      },
      {
        question: "Do baby teeth really matter if they fall out anyway?",
        answer:
          "Very much. They hold space for the adult teeth, and infection in a baby tooth can damage the permanent one forming above it. Early loss is one of the more common reasons children later need braces."
      },
      {
        question: "My child is terrified. What do you do differently?",
        answer:
          "We go at their pace and never restrain a frightened child. Dr. Okafor's first appointments frequently involve no treatment whatsoever. Nitrous oxide is available, and we would rather take three visits to build trust than force one."
      },
      {
        question: "Are dental X-rays safe for children?",
        answer:
          "We take them only when there is a clinical reason. Our digital sensors use up to 90% less radiation than older film, and children are shielded throughout — a set of bitewings is comparable to a few hours of ordinary background radiation."
      }
    ],
    treatments: [
      {
        slug: "preventive-dentistry",
        title: "Preventive Dentistry",
        summary: "Sealants, fluoride and habits — so that most children never need a filling.",
        overview:
          "Prevention in childhood pays out for the rest of a life. Sealants close the deep grooves in newly erupted molars where decay almost always starts, fluoride strengthens enamel while it is still maturing, and honest conversations about snacking and drinks do more than either. Most children in our care reach adulthood without a single filling.",
        benefits: [
          "Sealants close the grooves where decay begins",
          "Fluoride applied while enamel is still maturing",
          "Practical diet coaching without the lecture",
          "Habits that carry into adult life"
        ],
        image: IMAGES.child
      },
      {
        slug: "interceptive-dentistry",
        title: "Interceptive Dentistry",
        summary: "Early guidance of jaw growth — often shortening or avoiding braces later.",
        overview:
          "Between roughly seven and ten, the jaws are still growing and can be guided. Expanding a narrow arch or correcting a crossbite at that point creates room for adult teeth to arrive properly. It frequently shortens later orthodontic treatment, and sometimes removes the need for extractions altogether.",
        benefits: [
          "Guides jaw growth while it is still happening",
          "Creates space so adult teeth erupt properly",
          "Often shortens later orthodontic treatment",
          "Can avoid extractions further down the line"
        ],
        image: IMAGES.aligners
      },
      {
        slug: "restorative-dentistry",
        title: "Children's Restorative Care",
        summary: "Gentle repair of decay in baby and young adult teeth.",
        overview:
          "When a child does need a filling, how it is done shapes how they feel about dentistry for years. We use tooth-coloured materials, numb thoroughly and explain every step before it happens. Where decay is extensive, a stainless steel or white crown often outlasts a large filling and means fewer repeat visits for a child who would rather be elsewhere.",
        benefits: [
          "Tooth-coloured materials wherever possible",
          "Every step explained before it happens",
          "Crowns considered to avoid repeat treatment",
          "Nitrous oxide available for anxious children"
        ],
        image: IMAGES.chair
      },
      {
        slug: "endodontics",
        title: "Children's Endodontics",
        summary: "Pulp treatment that saves a baby tooth until it is ready to come out naturally.",
        overview:
          "When decay reaches the nerve of a baby tooth, removing the tooth early can cause the adult tooth behind it to erupt out of position. A pulpotomy treats the infected portion and preserves the tooth as a space maintainer until it is due to be lost. It is quick, done under local anaesthetic, and usually finished in one visit.",
        benefits: [
          "Keeps the space open for the adult tooth",
          "Avoids the crowding that early loss causes",
          "Usually completed in a single visit",
          "Relieves toothache quickly"
        ],
        image: IMAGES.emergency
      }
    ]
  }
];

/** Flat list of every treatment with its category attached. */
export const ALL_TREATMENTS = SERVICE_CATEGORIES.flatMap((category) =>
  category.treatments.map((treatment) => ({
    ...treatment,
    category: category.slug,
    categoryTitle: category.title
  }))
);

const IMAGE_POOL = Object.values(IMAGES);

/**
 * Photo set for a treatment detail page.
 *
 * Treatments may declare their own `gallery`. Until real clinical photography
 * is supplied, this derives a stable, non-repeating set from the shared pool
 * so each treatment shows a different spread rather than the same four shots.
 */
export function treatmentGallery(slug: string, count = 4): string[] {
  const explicit = ALL_TREATMENTS.find((t) => t.slug === slug)?.gallery;
  if (explicit?.length) return explicit.slice(0, count);

  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  // Stride 7 against an 18-entry pool never repeats within a set.
  return Array.from(
    { length: Math.min(count, IMAGE_POOL.length) },
    (_, i) => IMAGE_POOL[(hash + i * 7) % IMAGE_POOL.length]
  );
}

/** Look up a category by slug. */
export const findCategory = (slug: string) =>
  SERVICE_CATEGORIES.find((category) => category.slug === slug);

/** Look up a single treatment within a category. */
export const findTreatment = (categorySlug: string, treatmentSlug: string) => {
  const category = findCategory(categorySlug);
  if (!category) return null;
  const treatment = category.treatments.find((t) => t.slug === treatmentSlug);
  return treatment ? { treatment, category } : null;
};

// ============================================
// SERVICES — category cards for the services hub
// sitemap.ts also reads this for service URLs.
// ============================================
export const SERVICES: Service[] = SERVICE_CATEGORIES.map((category) => ({
  id: category.slug,
  title: category.title,
  description: category.description,
  icon: "stethoscope",
  href: `/services/${category.slug}`
}));

// ============================================
// SERVICE DETAILS — keyed by treatment slug
// Composed from SERVICE_CATEGORIES so there is one source of truth.
// ============================================
export const SERVICE_DETAILS: Record<string, ServiceDetail> = Object.fromEntries(
  SERVICE_CATEGORIES.flatMap((category) =>
    category.treatments.map((treatment) => [
      treatment.slug,
      {
        id: treatment.slug,
        slug: treatment.slug,
        title: treatment.title,
        heroTitle: treatment.title,
        icon: "stethoscope",
        overview: treatment.overview,
        benefits: treatment.benefits,
        process: category.steps.map((step, index) => ({
          step: index + 1,
          title: step.title,
          description: step.description
        })),
        faqs: category.faqs,
        relatedServices: category.treatments
          .filter((sibling) => sibling.slug !== treatment.slug)
          .slice(0, 3)
          .map((sibling) => sibling.slug)
      } satisfies ServiceDetail
    ])
  )
);

// ============================================
// TEAM MEMBERS
// ============================================
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sarah-chen",
    name: "Dr. Sarah Chen",
    title: "Lead Dentist · DDS",
    role: "Lead Dentist",
    bio: "Verda's founder. Fifteen years specialising in family and cosmetic care, and the reason the appointments here run long enough to actually talk.",
    image: IMAGES.team,
    credentials: ["DDS", "Founder"]
  },
  {
    id: "james-park",
    name: "Dr. James Park",
    title: "Associate · Cosmetic Dentistry",
    role: "Associate Dentist",
    bio: "Specialises in veneers, bonding and full smile design — and in talking patients out of work they do not need.",
    image: U("1612349317150-e413f6a5b16d"),
    credentials: ["DMD"]
  },
  {
    id: "amara-okafor",
    name: "Dr. Amara Okafor",
    title: "Pediatric Dentist",
    role: "Pediatric Dentist",
    bio: "Makes first visits genuinely fun — kids ask for her by name, which is not something most dentists can claim.",
    image: U("1594824476967-48c8b964273f"),
    credentials: ["DDS", "Pediatric Specialty"]
  },
  {
    id: "maya-rodriguez",
    name: "Maya Rodriguez",
    title: "Lead Hygienist",
    role: "Lead Hygienist",
    bio: "Eight years with the practice, and comfortably our patients' favourite cleaning appointment.",
    image: IMAGES.detail,
    credentials: ["RDH"]
  },
  {
    id: "ben-whitford",
    name: "Ben Whitford",
    title: "Dental Assistant",
    role: "Dental Assistant",
    bio: "Behind every appointment that runs smoothly. Unshakeably calm under pressure.",
    image: U("1537368910025-700350fe46c7"),
    credentials: ["CDA"]
  },
  {
    id: "lila-hansen",
    name: "Lila Hansen",
    title: "Patient Coordinator",
    role: "Patient Coordinator",
    bio: "The voice you hear first. Knows every insurance plan inside out, and will tell you what something costs before you ask twice.",
    image: U("1551836022-d5d88e9218df"),
    credentials: []
  }
];

/** The clinicians shown on the About page doctors block. */
export const DOCTORS = TEAM_MEMBERS.filter((member) =>
  member.name.startsWith("Dr.")
);

// ============================================
// MISSION & VALUES
// ============================================
export const MISSION_STATEMENT =
  "Strong smiles are not built overnight. They take time, intention, and a team that genuinely sees you — which is why we have built this practice around longer appointments, honest options and care that is paced for real life.";

export const VALUES: { title: string; description: string; iconPath: string }[] = [
  {
    title: "Confidentiality",
    description: "Your records and your visits stay private. Always, and without exception.",
    iconPath: "M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z"
  },
  {
    title: "Inclusivity",
    description: "Care designed to work for every age, ability, language and background.",
    iconPath:
      "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  },
  {
    title: "Affordability",
    description: "Transparent pricing, written estimates, and financing that does not trap you.",
    iconPath: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0zM12 7v5l3 2"
  },
  {
    title: "Honesty",
    description: "If you do not need treatment, we will say so. Watchful waiting is a valid plan.",
    iconPath: "M9 12l2 2 4-4M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
  }
];

// ============================================
// TRUST STATS — animated counters on /about
// ============================================
export const TRUST_STATS: { value: number; suffix: string; label: string }[] = [
  { value: 3000, suffix: "+", label: "Families in our care" },
  { value: 15, suffix: "", label: "Years serving Maple Ridge" },
  { value: 4.9, suffix: "★", label: "Average patient rating" },
  { value: 98, suffix: "%", label: "Patient check-in rate" }
];

export const ACCREDITATIONS = [
  "American Dental Association",
  "Academy of General Dentistry",
  "Invisalign Certified Provider",
  "CEREC Same-Day Crowns",
  "Delta Dental Premier Provider"
];

// ============================================
// TESTIMONIALS — used on the homepage
// ============================================
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "clara-jensen",
    content:
      "I used to dread the dentist — every visit felt rushed and impersonal. With Verda, I gained a team that actually listens. The care plan they built for me is honest, paced for real life, and somehow makes the chair feel calm.",
    author: "Clara Jensen",
    role: "Family care",
    rating: 5
  },
  {
    id: "marcus-lee",
    content:
      "I have been a patient for almost a decade. What I appreciate most is how unhurried every visit feels — they explain everything, never upsell, and remember the small details. That consistency is why my whole family comes here.",
    author: "Marcus Lee",
    role: "Long-time patient",
    rating: 5
  },
  {
    id: "sofia-patel",
    content:
      "I had avoided dentists for years because of anxiety. From the front desk to the chair, every person here was patient and gentle. They walked me through every step before they did it, and I left smiling.",
    author: "Sofia Patel",
    role: "First-visit patient",
    rating: 5
  }
];

// ============================================
// REVIEWS — /reviews page
// ============================================
export interface Review {
  id: string;
  quote: string;
  author: string;
  context: string;
  rating: number;
  source: "Google" | "Facebook" | "Healthgrades";
  date: string;
  /** Service category slug this review relates to, for the detail pages. */
  category?: string;
}

export const OVERALL_RATING = {
  score: 4.9,
  total: 1312,
  sources: [
    { name: "Google", score: 4.9, count: 842 },
    { name: "Facebook", score: 4.8, count: 312 },
    { name: "Healthgrades", score: 5.0, count: 158 }
  ]
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    quote:
      "I avoided the dentist for nine years. Dr. Chen walked through every option without an ounce of judgment, and the sedation made the long appointment painless. I am not afraid anymore.",
    author: "Priya R.",
    context: "New patient",
    rating: 5,
    source: "Google",
    date: "April 2026",
    category: "general-dentistry"
  },
  {
    id: "r2",
    quote:
      "My six-year-old asks to go to the dentist now. Genuinely. Dr. Okafor let her hold the mirror and count her own teeth, and somehow that was the whole trick.",
    author: "Sara M.",
    context: "Family of four",
    rating: 5,
    source: "Google",
    date: "March 2026",
    category: "childrens-dentistry"
  },
  {
    id: "r3",
    quote:
      "Cracked a molar on a Sunday. Same-day crown on Monday, and the temporary they made held perfectly overnight. I have never had dental care move that fast.",
    author: "Devon J.",
    context: "Emergency visit",
    rating: 5,
    source: "Google",
    date: "March 2026",
    category: "emergency-dentistry"
  },
  {
    id: "r4",
    quote:
      "They explain everything — insurance, X-rays, treatment plans. Zero surprises on the bill, which after my last practice felt almost suspicious. It is just how they work.",
    author: "Marcus T.",
    context: "Five-year patient",
    rating: 5,
    source: "Facebook",
    date: "February 2026",
    category: "general-dentistry"
  },
  {
    id: "r5",
    quote:
      "The hygienist spent forty minutes with me and actually taught me how to floss properly at forty-three years old. My gums stopped bleeding within a month.",
    author: "Helen O.",
    context: "Periodontal care",
    rating: 5,
    source: "Healthgrades",
    date: "February 2026",
    category: "general-dentistry"
  },
  {
    id: "r6",
    quote:
      "I went in expecting to be sold veneers and was told my teeth were fine and to come back in six months. That honesty earned them a patient for life.",
    author: "Tom B.",
    context: "Cosmetic consultation",
    rating: 5,
    source: "Google",
    date: "January 2026",
    category: "cosmetic-dentistry"
  },
  {
    id: "r7",
    quote:
      "Aligners done in eleven months, and the digital preview at the start was accurate to what I have now. Front desk handled the insurance paperwork entirely.",
    author: "Nadia K.",
    context: "Orthodontics",
    rating: 5,
    source: "Google",
    date: "January 2026",
    category: "orthodontics"
  },
  {
    id: "r8",
    quote:
      "Two implants placed last spring. Less discomfort than the extraction that preceded them, and the follow-up call the next morning was a genuinely nice touch.",
    author: "Raymond L.",
    context: "Implant patient",
    rating: 5,
    source: "Facebook",
    date: "December 2025",
    category: "dental-implants"
  },
  {
    id: "r9",
    quote:
      "Membership plan has saved us real money as a family without insurance. Two cleanings each, the exams included, and a discount on my son's filling.",
    author: "Jess and Amir",
    context: "Membership members",
    rating: 5,
    source: "Google",
    date: "December 2025"
  },
  {
    id: "r10",
    quote:
      "Root canal and crown on the same molar, and I genuinely felt nothing beyond pressure. The crown was milled while I waited — no three-week temporary this time.",
    author: "Ana G.",
    context: "Root canal & crown",
    rating: 5,
    source: "Google",
    date: "November 2025",
    category: "restorative-dentistry"
  },
  {
    id: "r11",
    quote:
      "All four wisdom teeth out in one appointment. They showed me the 3D scan first so I knew exactly where the nerve sat. Back at work on the third day.",
    author: "Callum W.",
    context: "Wisdom teeth removal",
    rating: 5,
    source: "Google",
    date: "November 2025",
    category: "oral-surgery"
  },
  {
    id: "r12",
    quote:
      "The sleep appliance did what two years of CPAP could not — I actually wear it. They billed it through my medical cover, which I had no idea was possible.",
    author: "Gordon H.",
    context: "Sleep appliance",
    rating: 5,
    source: "Healthgrades",
    date: "October 2025",
    category: "specialty-services"
  }
];

/**
 * Reviews to show on a service detail page. Falls back to the most recent
 * general reviews when a category has none of its own yet.
 */
export function reviewsForCategory(categorySlug: string, count = 3): Review[] {
  const matched = REVIEWS.filter((review) => review.category === categorySlug);
  if (matched.length >= count) return matched.slice(0, count);
  const filler = REVIEWS.filter((review) => !matched.includes(review));
  return [...matched, ...filler].slice(0, count);
}

// ============================================
// BEFORE & AFTER GALLERY
// ============================================
export interface BeforeAfterCase {
  id: string;
  title: string;
  treatment: string;
  description: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
}

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "ba1",
    title: "Smile makeover after years of wear",
    treatment: "Veneers & Whitening",
    description:
      "Eight upper veneers with prior whitening on the lower arch, designed around the patient's lip line rather than a template.",
    duration: "6 weeks",
    beforeImage: IMAGES.patientA,
    afterImage: IMAGES.smile
  },
  {
    id: "ba2",
    title: "Single front tooth replaced",
    treatment: "Dental Implant",
    description:
      "Immediate implant placed at extraction to preserve the gum contour, restored with a shade-matched ceramic crown.",
    duration: "4 months",
    beforeImage: IMAGES.patientB,
    afterImage: IMAGES.patientC
  },
  {
    id: "ba3",
    title: "Crowding corrected without extractions",
    treatment: "Clear Aligners",
    description:
      "Moderate lower crowding resolved in eleven months, finished with a bonded retainer behind the front teeth.",
    duration: "11 months",
    beforeImage: IMAGES.aligners,
    afterImage: IMAGES.patientE
  },
  {
    id: "ba4",
    title: "Full arch restored",
    treatment: "All-on-4 Implants",
    description:
      "A failing upper arch replaced with a fixed bridge on four implants, with a temporary fitted the same day.",
    duration: "5 months",
    beforeImage: IMAGES.consult,
    afterImage: IMAGES.patientD
  },
  {
    id: "ba5",
    title: "Chipped edges rebuilt",
    treatment: "Composite Bonding",
    description:
      "Worn and chipped incisal edges rebuilt in a single appointment. No drilling, no anaesthetic, fully reversible.",
    duration: "1 visit",
    beforeImage: IMAGES.detail,
    afterImage: IMAGES.smile
  },
  {
    id: "ba6",
    title: "Gum health restored",
    treatment: "Periodontal Therapy",
    description:
      "Scaling and root planing across four quadrants, followed by three-month maintenance. Pocket depths down from 6mm to 3mm.",
    duration: "9 months",
    beforeImage: IMAGES.tools,
    afterImage: IMAGES.hygiene
  }
];

export const GALLERY_DISCLAIMER =
  "All photographs show real patients treated at this practice, published with written consent. Results vary between individuals — bone quality, gum health, healing and home care all affect the outcome. These images are illustrative and are not a guarantee of the result in any particular case. Book a consultation for an assessment specific to you.";

// ============================================
// MEMBERSHIP PLANS
// ============================================
export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "individual",
    name: "Individual",
    price: "$29",
    cadence: "per month",
    description: "For one adult without dental insurance who wants preventive care covered.",
    features: [
      "Two cleanings per year",
      "Two comprehensive exams",
      "All routine X-rays included",
      "One emergency exam per year",
      "15% off all other treatment",
      "No deductibles, no annual maximum"
    ]
  },
  {
    id: "family",
    name: "Family",
    price: "$79",
    cadence: "per month",
    description: "Covers two adults and up to three children under eighteen, on one plan.",
    features: [
      "Everything in Individual, for each member",
      "Covers two adults and up to three children",
      "Fluoride treatment for children included",
      "Sealants for children included",
      "20% off all other treatment",
      "One free emergency visit per member per year"
    ],
    featured: true
  },
  {
    id: "perio",
    name: "Periodontal",
    price: "$45",
    cadence: "per month",
    description: "For patients on a three-month maintenance interval after gum treatment.",
    features: [
      "Four periodontal maintenance visits per year",
      "Two comprehensive exams",
      "All routine X-rays included",
      "Pocket charting at every visit",
      "15% off all other treatment",
      "Priority scheduling for recall appointments"
    ]
  }
];

export const MEMBERSHIP_FAQS: FAQ[] = [
  {
    question: "Is this dental insurance?",
    answer:
      "No, and that is the point. It is a membership run directly by this practice — no insurance company, no claim forms, no waiting periods, no annual maximum and no pre-authorisation. You pay us monthly and the benefits start immediately.",
    category: "Membership"
  },
  {
    question: "What if I already have insurance?",
    answer:
      "Then the plan is probably not for you. Membership is designed for people without cover, and the two cannot be combined. If your plan has a low annual maximum, come in and we will work out honestly which leaves you better off.",
    category: "Membership"
  },
  {
    question: "Are there waiting periods?",
    answer:
      "None. Book your first cleaning the day you join. Unlike insurance, there is no six-month wait for basic care or twelve months for anything major.",
    category: "Membership"
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes — with thirty days' notice, and no cancellation fee. If you have already used more in benefits than you have paid in during that plan year, we would ask you to settle the difference at the member rate.",
    category: "Membership"
  },
  {
    question: "Does the discount apply to everything?",
    answer:
      "It applies to all treatment carried out at this practice, including implants, orthodontics and cosmetic work. It does not apply to products you take home, such as whitening top-up gel or electric brushes.",
    category: "Membership"
  },
  {
    question: "How do I sign up?",
    answer:
      "Mention it at your next visit or call the front desk. It takes about five minutes, starts the same day, and Lila will confirm exactly what is included before you commit to anything.",
    category: "Membership"
  }
];

// ============================================
// FAQs — site-wide, used by /faq and schema.ts
// ============================================
export const FAQS: FAQ[] = [
  {
    question: "What is dental wellness, and why does it matter?",
    answer:
      "Dental wellness is the long-term care of your mouth as part of your overall health. Healthy gums and teeth reduce risks for cardiovascular and systemic conditions — and make every meal, photo and conversation easier.",
    category: "General"
  },
  {
    question: "How can I improve my smile?",
    answer:
      "It depends on your goals. We will walk through whitening, alignment, bonding and veneers in your consultation — and tell you honestly which, if any, will move the needle most.",
    category: "General"
  },
  {
    question: "Do you accept my insurance?",
    answer:
      "We are in-network with Delta Dental, Aetna, MetLife, Cigna and most major PPOs. We verify coverage before your first visit and explain any out-of-pocket cost in plain English.",
    category: "Insurance & Billing"
  },
  {
    question: "How long is a typical first visit?",
    answer:
      "Plan for about 75 minutes. That covers a full exam, X-rays if needed, and time to talk through anything you have been worried about — never rushed.",
    category: "New Patients"
  },
  {
    question: "What if I have not been to a dentist in years?",
    answer:
      "You are in good company. We treat zero-judgment visits as the norm — most of our long-term patients started with a five-year gap. We will get you caught up at a pace that feels right.",
    category: "New Patients"
  },
  {
    question: "Do you treat children?",
    answer:
      "Yes — Dr. Okafor specialises in pediatric care, starting from age one. Our practice is set up to make first visits genuinely fun rather than frightening.",
    category: "General"
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Photo ID, your insurance card if you have one, a list of any medications you take, and the name of your previous dentist so we can request records. Arrive ten minutes early for paperwork, or fill it in at home.",
    category: "New Patients"
  },
  {
    question: "Do you offer sedation for anxious patients?",
    answer:
      "We offer nitrous oxide and oral sedation, and we use them regularly without judgment. Tell us at booking so we can allow extra time and explain what to expect beforehand.",
    category: "Comfort & Anxiety"
  },
  {
    question: "How quickly can I be seen in an emergency?",
    answer:
      "We hold same-day slots open every working day. Call as early as you can — mornings give us the most flexibility. Emergency appointments are open to people who are not registered with us.",
    category: "Emergencies"
  },
  {
    question: "What payment options do you offer?",
    answer:
      "Cash, all major cards, HSA and FSA accounts, and interest-free payment plans through third-party financing for larger treatment. We also run an in-house membership plan for patients without insurance.",
    category: "Insurance & Billing"
  },
  {
    question: "Will you tell me the cost before you start?",
    answer:
      "Always, in writing, with your insurance portion calculated. Nothing gets carried out that you have not seen a figure for first — and if a plan changes mid-treatment we stop and re-quote.",
    category: "Insurance & Billing"
  },
  {
    question: "Do I need X-rays at every visit?",
    answer:
      "No. We take bitewings roughly every 18–24 months for low-risk adults, and only when there is a clinical reason. Our digital sensors use up to 90% less radiation than older film systems.",
    category: "General"
  },
  {
    question: "Can I request a specific dentist or hygienist?",
    answer:
      "Yes, and we encourage it — continuity genuinely improves care. Mention your preference when booking and we will schedule around their availability.",
    category: "Appointments"
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask for 48 hours' notice so we can offer the slot to someone waiting. Life happens and we do not charge for a first late cancellation, but repeated short-notice cancellations may incur a fee.",
    category: "Appointments"
  },
  {
    question: "Do you see patients with special needs?",
    answer:
      "Yes. The practice is step-free and wheelchair accessible, we can book quieter times of day, allow longer appointments, and arrange a familiarisation visit before any treatment is attempted.",
    category: "Comfort & Anxiety"
  }
];

/** Unique FAQ categories, in the order they first appear. */
export const FAQ_CATEGORIES = Array.from(
  new Set(FAQS.map((faq) => faq.category).filter(Boolean))
) as string[];

// ============================================
// APPOINTMENT FORM OPTIONS
// ============================================
export const APPOINTMENT_REASONS = [
  "New patient exam and cleaning",
  "Routine check-up and cleaning",
  "Emergency or dental pain",
  "Cosmetic consultation",
  "Implant consultation",
  "Orthodontic consultation",
  "Children's appointment",
  "Something else"
];

export const PREFERRED_TIMES = [
  "Morning (8am – 12pm)",
  "Midday (12pm – 2pm)",
  "Afternoon (2pm – 6pm)",
  "Saturday"
];

export const INSURANCE_ACCEPTED = [
  "Delta Dental",
  "Aetna",
  "MetLife",
  "Cigna",
  "Guardian",
  "United Concordia",
  "Most major PPO plans"
];

/** Reassurance strip shown above the booking form. */
export const BOOKING_TRUST_POINTS: { title: string; description: string; iconPath: string }[] = [
  {
    title: "Same-day emergencies",
    description: "Urgent slots held open every working day.",
    iconPath: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 7v6M12 16.5v.5"
  },
  {
    title: "Most insurance accepted",
    description: "In-network with all major PPO plans.",
    iconPath: "M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z"
  },
  {
    title: "Flexible financing",
    description: "Interest-free payment plans on larger treatment.",
    iconPath: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0zM12 7v5l3 2"
  },
  {
    title: "No wait-room limbo",
    description: "We run to time — 94% of visits start within ten minutes.",
    iconPath: "M12 6v6l4 2M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
  }
];

// ============================================
// NEW PATIENT OFFER
// Drives the default PageCTA banner. Kept distinct from the footer's
// "book your visit" message so the two never read as the same block.
// ============================================
export const NEW_PATIENT_OFFER = {
  eyebrow: "New Patient Offer",
  headline: "Your first visit, $99.",
  body: "A full exam, any X-rays you need and a proper cleaning — roughly half what it usually costs, for new patients without insurance. It buys you an honest opinion, not an obligation to book anything further.",
  cta: "Claim the Offer",
  url: "/appointment"
};

// ============================================
// LOCATION DETAILS
// ============================================
export const PARKING_NOTE =
  "Free patient parking is available in the lot behind the building, entered from Birch Lane. Two accessible bays sit directly beside the step-free entrance.";

export const DIRECTIONS: { title: string; description: string }[] = [
  {
    title: "By car",
    description:
      "From Route 126, take the Alder Court exit and continue north for half a mile. We are on the right, immediately after the public library. Turn onto Birch Lane for the patient lot."
  },
  {
    title: "By bus",
    description:
      "Routes 11 and 24 both stop at Alder & Third, a two-minute walk away. The stop is on the same side of the road as the practice."
  },
  {
    title: "Landmarks",
    description:
      "We share the building with Maple Ridge Family Medicine. Look for the green awning on the corner opposite the library — our entrance is the one on Alder Court."
  },
  {
    title: "Accessibility",
    description:
      "Step-free entrance, a lift to the second floor, wide treatment room doorways and an accessible restroom. Tell us at booking if you need extra time or a quieter slot."
  }
];
