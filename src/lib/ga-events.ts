// Type declarations for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// ============================================
// Base GA4 Event Helper
// ============================================

function gtagEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

// ============================================
// Cookie Helpers
// ============================================

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

// ============================================
// Click ID / Attribution Capture
// ============================================

const COOKIE_PREFIX = "site_";
const CLICK_ID_EXPIRY_DAYS = 90;

/**
 * Capture gclid, fbclid, msclkid and UTM params from the current URL.
 * Call once on page load (e.g. in a layout useEffect).
 */
export function captureClickIds() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  const gclid = params.get("gclid");
  if (gclid) setCookie(`${COOKIE_PREFIX}gclid`, gclid, CLICK_ID_EXPIRY_DAYS);

  const fbclid = params.get("fbclid");
  if (fbclid) setCookie(`${COOKIE_PREFIX}fbclid`, fbclid, CLICK_ID_EXPIRY_DAYS);

  const msclkid = params.get("msclkid");
  if (msclkid) setCookie(`${COOKIE_PREFIX}msclkid`, msclkid, CLICK_ID_EXPIRY_DAYS);

  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) setCookie(`${COOKIE_PREFIX}${key}`, val, CLICK_ID_EXPIRY_DAYS);
  }
}

/**
 * Return all stored attribution data from cookies.
 */
export function getAttributionData(): Record<string, string> {
  const data: Record<string, string> = {};
  const keys = [
    "gclid",
    "fbclid",
    "msclkid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term"
  ];

  for (const key of keys) {
    const val = getCookie(`${COOKIE_PREFIX}${key}`);
    if (val) data[key] = val;
  }

  return data;
}

// ============================================
// GA4 Event Tracking Functions
// ============================================

/**
 * Track a page view.
 */
export function trackPageView(path: string) {
  gtagEvent("page_view", {
    page_path: path
  });
}

/**
 * Track when a user begins interacting with a form.
 */
export function trackFormStart(formType: string) {
  gtagEvent("form_start", {
    form_type: formType
  });
}

/**
 * Track a form submission with success/failure status.
 */
export function trackFormSubmission(formType: string, success: boolean) {
  gtagEvent("form_submit", {
    form_type: formType,
    success
  });
}

/**
 * Track a CTA button or link click.
 */
export function trackCTAClick(ctaLabel: string, ctaUrl: string) {
  gtagEvent("cta_click", {
    cta_label: ctaLabel,
    cta_url: ctaUrl
  });
}

/**
 * Track a phone number click.
 * Optionally fires a Google Ads conversion if gtag and a conversion ID are available.
 */
export function trackPhoneClick(phone: string, location: string) {
  gtagEvent("phone_click", {
    phone_number: phone,
    click_location: location
  });

  // Fire Google Ads conversion if configured
  if (typeof window !== "undefined" && window.gtag) {
    const gclid = getCookie(`${COOKIE_PREFIX}gclid`);
    if (gclid) {
      // Site-specific Google Ads conversion can be added here:
      // window.gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/YYYYYYY' })
    }
  }
}

/**
 * Track scroll depth milestones (e.g. 25, 50, 75, 100).
 */
export function trackScrollDepth(depth: number) {
  gtagEvent("scroll_depth", {
    percent_scrolled: depth
  });
}

/**
 * Track when a user views a service page.
 */
export function trackServiceView(serviceName: string, serviceSlug: string) {
  gtagEvent("service_view", {
    service_name: serviceName,
    service_slug: serviceSlug
  });
}

/**
 * Track when a user expands an FAQ accordion item.
 */
export function trackFAQExpand(question: string) {
  gtagEvent("faq_expand", {
    question_text: question.substring(0, 100)
  });
}

/**
 * Track social media link clicks.
 */
export function trackSocialClick(platform: string, url: string) {
  gtagEvent("social_click", {
    social_platform: platform,
    social_url: url
  });
}
