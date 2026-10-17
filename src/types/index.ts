/**
 * CMS Section Data Schema
 *
 * This is the universal shape of data returned by the CMS API.
 * Every section component receives data in this format via its `data` prop.
 * When the CMS is not connected, components fall back to their local `defaultData`.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FIELD REFERENCE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * title / description / tagline — Text fields with optional formatting:
 *   {
 *     text: "Main visible text",
 *     bold: ["words to bold"],      // optional
 *     italic: ["words to italic"],  // optional
 *     underline: ["words to uline"] // optional
 *   }
 *
 * buttons — Array of CTA links:
 *   [{ text: "Book Now", url: "/contact" }]
 *   Phone buttons use tel: URLs: { text: "(555) 123-4567", url: "tel:5551234567" }
 *
 * assets — Section-level images:
 *   [{
 *     name: "hero-image",
 *     image: { url: "__hero-image__", alt: "Description" }
 *   }]
 *   Image variable pattern: upload with name "hero-image", reference as "__hero-image__"
 *   CMS resolves variables to CDN URLs in the read response.
 *
 * lists — Groups of repeating items (cards, FAQs, hours, categories, etc.):
 *   [{
 *     name: "feature-cards",
 *     items: [{
 *       title: { text: "Fast Delivery" },
 *       description: { text: "We ship within 24 hours." },
 *       extraDetails: { icon_path: "M4.318 6.318..." },
 *       buttons: [{ text: "Learn More", url: "/features/fast" }],
 *       assets: [{ name: "fast-icon", image: { url: "__fast-icon__", alt: "..." } }]
 *     }]
 *   }]
 *
 *   Multi-list pattern (e.g. service menu with categories):
 *   Each list = one category, first item can be the category header.
 *
 * extraDetails — Flat key-value object for arbitrary structured data:
 *   {
 *     show_phone: "true",
 *     stat_value: "500+",
 *     stat_label: "Clients Served",
 *     address_line1: "123 Main St",
 *     maps_query: "My Business, 123 Main St, City, ST 12345"
 *   }
 *
 * image — Simple image URL string (used by AEO blocks, resolves to CDN URL)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * NAMING CONVENTIONS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Section identifiers : kebab-case  → "page-hero", "service-categories"
 * List names          : kebab-case  → "feature-cards", "office-hours"
 * Image names         : kebab-case  → "hero-image", "team-photo"
 * Extra details keys  : snake_case  → "icon_path", "stat_value", "show_phone"
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * API WRITE PATTERN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * When pushing content to the CMS, `raw_content` MUST be a JSON string:
 *
 *   const content = { title: { text: "...", bold: [], italic: [], underline: [] } };
 *   const payload = JSON.stringify({
 *     raw_content: JSON.stringify(content),  // double-stringify!
 *     is_fallback: false
 *   });
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * USAGE IN COMPONENTS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Every section component follows this pattern:
 *
 *   const defaultData = { title: { text: "..." }, ... };
 *
 *   interface MyProps { data?: SectionData | null }
 *
 *   export default function MySection({ data: cmsData }: MyProps) {
 *     const data = cmsData ?? defaultData;
 *     return <h1>{data.title?.text}</h1>;
 *   }
 *
 * The `defaultData` object IS the initial content. When the website-upgrade
 * skill runs, it reads these objects and pushes them to the CMS API. After
 * migration, the same `data` prop receives live CMS data, and the `??`
 * fallback ensures the component works with or without CMS.
 */

export interface TextObject {
  text: string;
  bold?: string[];
  italic?: string[];
  underline?: string[];
}

export interface SectionButton {
  text: string;
  url: string;
}

export interface SectionAsset {
  name?: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
  };
}

export interface SectionListItem {
  title?: TextObject;
  description?: TextObject;
  extraDetails?: Record<string, string>;
  buttons?: SectionButton[];
  assets?: SectionAsset[];
}

export interface SectionList {
  name: string;
  items: SectionListItem[];
}

export interface SectionData {
  title?: TextObject;
  description?: TextObject;
  tagline?: TextObject;
  buttons?: SectionButton[];
  assets?: SectionAsset[];
  lists?: SectionList[];
  extraDetails?: Record<string, string>;
  image?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SITE DATA TYPES
// ─────────────────────────────────────────────────────────────────────────────
//
// Base types for constants.ts data. These define the starting shape —
// add extra fields per project as needed (all fields beyond the required
// ones are optional by design).
//
// Example — extending FAQ for a specific project:
//
//   interface ProjectFAQ extends FAQ {
//     serviceSlug: string
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

/** Navigation menu item */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** Business contact information */
export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  hours: BusinessHours[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

/** Business operating hours */
export interface BusinessHours {
  days: string;
  hours: string;
}

/** Social media link */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

/** Service card (homepage & services hub) */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  href: string;
}

/** Full service page detail */
export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  heroTitle: string;
  icon: string;
  overview: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
}

/** Team member */
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  image: string;
  credentials?: string[];
}

/** Client testimonial / review */
export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role?: string;
  rating: number;
}

/** Frequently asked question */
export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG TYPES
// ─────────────────────────────────────────────────────────────────────────────
//
// These types define the blog post shape returned by the CMS blog API.
// When building blog pages with hardcoded content, use these types so the
// data structure matches what the API returns. This makes the transition
// from hardcoded → CMS seamless when the website-upgrade skill runs.
//
// HARDCODED BLOG PATTERN:
//
//   import { BlogPost } from '@/types'
//
//   const posts: BlogPost[] = [
//     {
//       id: 1,
//       slug: 'my-first-post',
//       title: 'My First Post',
//       excerpt: 'A short summary...',
//       content: '<p>Full HTML content...</p>',
//       featured_image: '/images/blog/my-post.jpg',
//       featured_image_alt: 'Description of image',
//       author: {
//         name: 'John Doe',
//         job_title: 'Marketing Director',
//       },
//       published_at: '2025-01-15T00:00:00Z',
//       category: { name: 'Marketing', slug: 'marketing' },
//       tags: [{ name: 'SEO', slug: 'seo' }],
//       read_time: 5,
//     },
//   ]
//
// DYNAMIC BLOG PATTERN (after CMS connected):
//
//   import { getBlogPosts } from '@/lib/blog-api'
//   const { posts } = await getBlogPosts()
//
// ─────────────────────────────────────────────────────────────────────────────

/** Blog post author */
export interface BlogAuthor {
  id?: number | string;
  name: string;
  slug?: string;
  avatar?: string;
  bio?: string;
  short_bio?: string;
  credentials?: string;
  job_title?: string;
  organization?: string;
  linkedin_url?: string;
  twitter_url?: string;
}

/** Blog category */
export interface BlogCategory {
  id?: number | string;
  name: string;
  slug: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  color?: string;
  icon?: string;
  post_count?: number;
}

/** Blog tag */
export interface BlogTag {
  id?: number | string;
  name: string;
  slug: string;
}

/** Table of contents entry (auto-generated from headings or CMS-provided) */
export interface BlogTocEntry {
  id: string;
  title: string;
  level?: number;
}

/** Source/reference citation */
export interface BlogSource {
  title: string;
  url: string;
}

/**
 * Full blog post — the complete shape returned by the CMS blog API.
 *
 * When hardcoding posts, only the fields you use need values.
 * Optional fields default to undefined and components should
 * handle missing data with optional chaining.
 */
export interface BlogPost {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content

  // Media
  featured_image?: string;
  featured_image_alt?: string;

  // Author
  author?: BlogAuthor;

  // Categorization
  category?: BlogCategory;
  categories?: BlogCategory[];
  tags?: BlogTag[];

  // Dates
  published_at: string; // ISO 8601
  updated_at?: string; // ISO 8601

  // Reading metadata
  read_time?: number; // minutes
  word_count?: number;

  // Engagement (populated by CMS)
  view_count?: number;
  helpful_count?: number;
  not_helpful_count?: number;
  is_featured?: boolean;

  // AEO — Answer Engine Optimization
  quick_answer?: string; // Direct answer box for AI/LLM extraction
  key_takeaways?: string[]; // Bullet-point summary
  faq?: { question: string; answer: string }[];
  table_of_contents?: BlogTocEntry[];
  sources?: BlogSource[];

  // SEO
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  no_index?: boolean;

  // Related
  related_posts?: BlogPost[];
}

/** Paginated blog list response from the API */
export interface BlogListResponse {
  posts: BlogPost[];
  pagination: {
    page: number;
    per_page: number;
    total_pages: number;
    total_posts: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

/** Category list response from the API */
export interface BlogCategoryResponse {
  categories: BlogCategory[];
}
