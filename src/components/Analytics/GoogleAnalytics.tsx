"use client";

/**
 * Google Analytics 4 Component
 *
 * IMPORTANT: The GA4 gtag.js script is loaded statically in the root layout
 * (src/app/layout.tsx) with strategy="beforeInteractive". This is CRITICAL
 * for Google Search Console verification — GSC checks for the GA script in
 * server-rendered HTML, and "afterInteractive" would not be visible to the crawler.
 *
 * This component handles:
 * - Consent Mode v2 defaults
 * - Google Ads conversion tracking (when configured via CMS)
 */

import { useEffect } from "react";
import { isProduction } from "@/lib/production-config";
// Window.gtag and Window.dataLayer types are declared in @/lib/ga-events

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!isProduction()) return;
    if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return;

    // Set Consent Mode v2 defaults
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500
      });
    }
  }, []);

  return null;
}
