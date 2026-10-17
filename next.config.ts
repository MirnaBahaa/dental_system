import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash for placeholder images
      { protocol: "https", hostname: "images.unsplash.com" }
      // CMS CDN — uncomment and update when CMS is connected
      // { protocol: 'https', hostname: 'cdn-dwcdf9abetc8g6bs.z03.azurefd.net' },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ];
  },
  // Add site-specific redirects here (e.g., old URLs → new URLs)
  async redirects() {
    return [];
  }
};

export default nextConfig;
