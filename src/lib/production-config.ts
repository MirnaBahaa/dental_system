// ============================================
// Production Domain Configuration
// Update this array with your production domain(s)
// Used by GoogleAnalytics, MetaPixel, and tracking components
// ============================================

export const PRODUCTION_DOMAINS: string[] = [
  // 'example.com',
  // 'www.example.com',
];

/**
 * Check if the current environment should fire tracking events.
 * Returns true if:
 * 1. NEXT_PUBLIC_FORCE_TRACKING is set (for local testing)
 * 2. Current hostname matches a production domain
 * 3. Running on a Vercel preview deployment
 */
export const isProduction = (): boolean => {
  if (
    process.env.NEXT_PUBLIC_FORCE_TRACKING === "true" ||
    process.env.NEXT_PUBLIC_FORCE_GA4 === "true"
  ) {
    return true;
  }
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname;
  return PRODUCTION_DOMAINS.includes(hostname) || hostname.endsWith(".vercel.app");
};
