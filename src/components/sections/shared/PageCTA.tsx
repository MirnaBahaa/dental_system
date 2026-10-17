"use client";

import Link from "next/link";
import { CONTACT_INFO, NEW_PATIENT_OFFER, PHONE_HREF } from "@/lib/constants";

/**
 * The footer already carries the "book your visit today" message, so this
 * banner leads with the new-patient offer instead — otherwise the two stack
 * directly on top of each other saying the same thing.
 */
const defaultData = {
  tagline: { text: NEW_PATIENT_OFFER.eyebrow },
  title: { text: NEW_PATIENT_OFFER.headline },
  description: { text: NEW_PATIENT_OFFER.body },
  buttons: [{ text: NEW_PATIENT_OFFER.cta, url: NEW_PATIENT_OFFER.url }],
  assets: [],
  lists: [],
  extraDetails: {}
};

interface PageCTAProps {
  data?: Record<string, any> | null;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  primaryCta?: string;
  primaryUrl?: string;
  phone?: string;
}

export default function PageCTA({
  data: cmsData,
  eyebrow,
  heading,
  subtext,
  primaryCta,
  primaryUrl,
  phone
}: PageCTAProps) {
  const data = cmsData ?? defaultData;

  const label = eyebrow ?? data.tagline?.text;
  const title = heading ?? data.title?.text;
  const body = subtext ?? data.description?.text;
  const ctaLabel = primaryCta ?? data.buttons?.[0]?.text;
  const ctaHref = primaryUrl ?? data.buttons?.[0]?.url;
  const phoneNumber = phone ?? CONTACT_INFO.phone;

  return (
    <section className="page-cta-section">
      <div className="container">
        <div className="page-cta-card" data-reveal>
          <span className="page-cta-deco" aria-hidden="true">
            <span className="ring-a" />
            <span className="ring-b" />
            <span className="glow" />
          </span>

          {label && (
            <span className="eyebrow lime">
              <span className="dot" aria-hidden="true" />
              {label}
            </span>
          )}

          <h2>{title}</h2>
          {body && <p>{body}</p>}

          <div className="page-cta-row">
            {ctaLabel && ctaHref && (
              <Link className="btn btn-primary" href={ctaHref} data-magnetic>
                {ctaLabel}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            )}
            <a className="btn btn-outline-cream" href={PHONE_HREF} data-magnetic>
              {phoneNumber}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
