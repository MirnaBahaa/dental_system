"use client";

import { useEffect } from "react";
import { captureClickIds } from "@/lib/ga-events";

/**
 * Captures GCLID, FBCLID, MSCLKID, and UTM parameters from the URL
 * on first page load and stores them in cookies for attribution tracking.
 */
export default function ClickIdCapture() {
  useEffect(() => {
    captureClickIds();
  }, []);

  return null;
}
