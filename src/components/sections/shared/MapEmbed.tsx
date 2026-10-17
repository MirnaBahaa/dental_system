"use client";

import { MapPin, Navigation } from "lucide-react";
import { CONTACT_INFO, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, SITE_NAME } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Find us" },
  title: { text: "In the heart of the neighbourhood." },
  description: {
    text: "Free patient parking behind the building, a step-free entrance, and two bus routes stopping a two-minute walk away."
  },
  buttons: [{ text: "Get Directions", url: MAPS_DIRECTIONS_URL }],
  assets: [],
  lists: [],
  extraDetails: { maps_query: `${SITE_NAME}, ${CONTACT_INFO.address.full}` }
};

interface MapEmbedProps {
  data?: Record<string, any> | null;
  /** `tall` suits a dedicated location page, `wide` a contact page footer. */
  variant?: "wide" | "tall";
  showHeading?: boolean;
}

export default function MapEmbed({
  data: cmsData,
  variant = "wide",
  showHeading = true
}: MapEmbedProps) {
  const data = cmsData ?? defaultData;
  const directionsUrl = data.buttons?.[0]?.url ?? MAPS_DIRECTIONS_URL;

  return (
    <section className="section dark" id="map">
      <div className="container">
        {showHeading && (
          <div className="section-head">
            <div className="head-left">
              <span className="eyebrow-mark on-dark" data-reveal>
                <MapPin size={14} aria-hidden="true" />
                {data.tagline?.text}
              </span>
              <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
                {data.title?.text}
              </h2>
            </div>
            <div className="head-right" data-reveal data-delay="0.15">
              <a
                className="btn btn-primary btn-sm"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.buttons?.[0]?.text ?? "Get Directions"}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        )}

        <div className={`map-frame${variant === "tall" ? " tall" : ""}`} data-reveal-clip>
          <iframe
            src={MAPS_EMBED_URL}
            title={`Map showing ${SITE_NAME} at ${CONTACT_INFO.address.full}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {data.description?.text && (
          <p
            className="body-md on-dark"
            data-reveal
            data-delay="0.1"
            style={{ marginTop: 20, maxWidth: "62ch" }}
          >
            <Navigation
              size={15}
              aria-hidden="true"
              style={{ display: "inline", verticalAlign: "-2px", marginRight: 8 }}
            />
            {data.description.text}
          </p>
        )}
      </div>
    </section>
  );
}
