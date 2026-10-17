import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_TAGLINE } from "./constants";

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image = "/images/og-image.jpg",
  noIndex = false
}: GenerateMetadataProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_TAGLINE}`;
  const baseUrl = SITE_URL || "https://example.com";
  const url = `${baseUrl}${path}`;

  return {
    title: fullTitle,
    description,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        {
          url: "/images/favicon.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: light)"
        },
        {
          url: "/images/favicon-dark.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: dark)"
        }
      ],
      apple: "/images/apple-touch-icon.png"
    },
    other: {
      "theme-color": "#1e3a5f" // TODO: Match your primary brand color
    },
    keywords: [], // TODO: Add relevant keywords
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image]
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large" as const,
            "max-snippet": -1
          }
        }
  };
}
