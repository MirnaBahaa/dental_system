"use client";

import Image from "next/image";
import Link from "next/link";
import { handleImageError } from "@/lib/imageFallback";

const defaultData = {
  tagline: { text: "Verda Dental" },
  title: { text: "A calmer kind of dental care" },
  description: {
    text: "Modern, gentle dentistry that meets you where you are — through every stage of life."
  },
  buttons: [
    { text: "Book Appointment", url: "/appointment" },
    { text: "Call Us", url: "/contact" }
  ],
  assets: [],
  lists: [],
  extraDetails: {}
};

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  data?: Record<string, any> | null;
  /** Explicit props win over CMS data, which wins over defaultData. */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  breadcrumb?: Crumb[];
  ctaText?: string;
  ctaUrl?: string;
  secondaryText?: string;
  secondaryUrl?: string;
  image?: string;
  imageAlt?: string;
  /** Legal and utility pages opt out of the booking CTAs entirely. */
  showCta?: boolean;
}

export default function PageHero({
  data: cmsData,
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  ctaText,
  ctaUrl,
  secondaryText,
  secondaryUrl,
  image,
  imageAlt,
  showCta = true
}: PageHeroProps) {
  const data = cmsData ?? defaultData;

  const label = eyebrow ?? data.tagline?.text;
  const heading = title ?? data.title?.text;
  const sub = subtitle ?? data.description?.text;
  const primaryLabel = showCta ? (ctaText ?? data.buttons?.[0]?.text) : undefined;
  const primaryUrl = showCta ? (ctaUrl ?? data.buttons?.[0]?.url) : undefined;
  const altLabel = showCta ? (secondaryText ?? data.buttons?.[1]?.text) : undefined;
  const altUrl = showCta ? (secondaryUrl ?? data.buttons?.[1]?.url) : undefined;
  const media = image ?? data.assets?.[0]?.image?.url;
  const mediaAlt = imageAlt ?? data.assets?.[0]?.image?.alt ?? "";
  const crumbs = breadcrumb ?? [];

  return (
    <section className={`page-hero grain${media ? "" : " no-media"}`}>
      <span className="page-hero-glow" aria-hidden="true" />
      <span className="page-hero-glow two" aria-hidden="true" />

      <div className="container">
        <div className="page-hero-grid">
          <div className="page-hero-body">
            {crumbs.length > 0 && (
              <nav className="breadcrumb" aria-label="Breadcrumb">
                {crumbs.map((crumb, index) => (
                  <span key={`${crumb.label}-${index}`} className="breadcrumb-part">
                    {crumb.href ? (
                      <Link href={crumb.href}>{crumb.label}</Link>
                    ) : (
                      <span className="current">{crumb.label}</span>
                    )}
                    {index < crumbs.length - 1 && (
                      <span className="sep" aria-hidden="true">
                        {" / "}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {label && (
              <span className="eyebrow on-dark" data-reveal>
                <span className="dot" aria-hidden="true" />
                {label}
              </span>
            )}

            <h1 className="h-display h2" data-split style={{ marginTop: 18 }}>
              {heading}
            </h1>

            {sub && (
              <p className="sub" data-reveal data-delay="0.1">
                {sub}
              </p>
            )}

            {(primaryLabel || altLabel) && (
              <div className="page-hero-ctas" data-reveal data-delay="0.18">
                {primaryLabel && primaryUrl && (
                  <Link className="btn btn-primary" href={primaryUrl} data-magnetic>
                    {primaryLabel}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                )}
                {altLabel && altUrl && (
                  <Link className="btn btn-outline-cream" href={altUrl} data-magnetic>
                    {altLabel}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {media && (
            <div className="page-hero-media" data-reveal-clip>
              <Image
                src={media}
                alt={mediaAlt}
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                style={{ objectFit: "cover" }}
                onError={handleImageError}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
