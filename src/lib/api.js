/**
 * CMS Content Fetching Functions
 *
 * PLACEHOLDER: This file will be populated by the website-upgrade skill
 * when the site is connected to the CMS. Until then, all functions return
 * null, causing section components to fall back to their defaultData.
 *
 * After CMS connection, these functions will fetch live content from:
 *   - fetchSectionContentSSR() → /api/v1/webview/{site}/{page}/{section}/
 *   - fetchSectionContent()    → /website-jobs/{site}/content/{page}/{section}/
 *   - fetchNavigation()        → common/navigation
 *   - fetchFooter()            → common/footer
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_KEY = process.env.X_Api_Key;
const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG;

/**
 * Server-side fetch for section content (used in page.tsx files).
 * Returns null until CMS is connected — components use defaultData fallback.
 *
 * @param {string} pageSlug - The page identifier (e.g., 'home', 'about')
 * @param {string} sectionId - The section identifier (e.g., 'hero', 'features')
 * @returns {Promise<object|null>} CMS content or null
 */
export const fetchSectionContentSSR = async (pageSlug, sectionId) => {
  if (!API_BASE || !API_KEY || !SITE_SLUG) return null;

  try {
    const url = `${API_BASE.replace("/api/v1/sites/" + SITE_SLUG, "")}/api/v1/webview/${SITE_SLUG}/${pageSlug}/sections/${sectionId}/`;
    const res = await fetch(url, {
      headers: { "X-Api-Key": API_KEY },
      next: { revalidate: 60, tags: [`section-${sectionId}`, "sections"] }
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.content || data;
  } catch {
    return null;
  }
};

/**
 * Client-side fetch for section content (with experiment support).
 * Returns null until CMS is connected.
 */
export const fetchSectionContent = async (pageSlug, sectionId, options = {}) => {
  if (!API_BASE || !SITE_SLUG) return null;
  // Placeholder — will be populated by the website-upgrade skill
  return null;
};

/**
 * Fetch navigation data from CMS.
 * Returns null until CMS is connected — Navbar uses constants fallback.
 */
export const fetchNavigation = async () => {
  return fetchSectionContentSSR("common", "navigation");
};

/**
 * Fetch footer data from CMS.
 * Returns null until CMS is connected — Footer uses constants fallback.
 */
export const fetchFooter = async () => {
  return fetchSectionContentSSR("common", "footer");
};

/**
 * Fetch site settings from CMS.
 * Returns null until CMS is connected.
 */
export const fetchSiteSettings = async () => {
  return fetchSectionContentSSR("common", "site-settings");
};
