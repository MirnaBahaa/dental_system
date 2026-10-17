import type { MetadataRoute } from "next";
import { SITE_URL, ALL_TREATMENTS, SERVICE_CATEGORIES } from "@/lib/constants";

/**
 * XML Sitemap Generator
 *
 * UPDATE THIS when you add new pages:
 * 1. Add an entry to the staticPages array below
 * 2. Service category hubs and service detail pages are generated
 *    automatically from SERVICE_CATEGORIES in constants.ts — every category
 *    resolves via /services/[category] and every treatment via
 *    /services/[category]/[slug], so nothing listed here 404s.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Static pages — add new pages here as you create them
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/appointment", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/location", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/reviews", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/before-and-after", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/membership", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const }
  ];

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority
  }));

  // Service category hubs (auto-generated from SERVICE_CATEGORIES in constants.ts)
  const categoryEntries = SERVICE_CATEGORIES.map((category) => ({
    url: `${baseUrl}/services/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  // Service detail pages (auto-generated from SERVICE_CATEGORIES in constants.ts)
  const serviceEntries = ALL_TREATMENTS.map((treatment) => ({
    url: `${baseUrl}/services/${treatment.category}/${treatment.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticEntries, ...categoryEntries, ...serviceEntries];
}
