"use client";

import { Car, Clock, MapPin } from "lucide-react";
import { CONTACT_INFO, MAPS_DIRECTIONS_URL, PARKING_NOTE, PHONE_HREF } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Hours & Address" },
  title: { text: "When and where to find us." },
  description: {
    text: "We hold urgent slots open every working day, and Saturday mornings are reserved for patients who cannot get away midweek."
  },
  buttons: [{ text: "Get Directions", url: MAPS_DIRECTIONS_URL }],
  assets: [],
  lists: [
    {
      name: "office-hours",
      items: CONTACT_INFO.hours.map((entry) => ({
        title: { text: entry.days },
        description: { text: entry.hours }
      }))
    }
  ],
  extraDetails: {
    address_full: CONTACT_INFO.address.full,
    phone: CONTACT_INFO.phone,
    parking_note: PARKING_NOTE
  }
};

interface HoursAddressProps {
  data?: Record<string, any> | null;
}

export default function HoursAddress({ data: cmsData }: HoursAddressProps) {
  const data = cmsData ?? defaultData;
  const hours = data.lists?.[0]?.items ?? [];

  return (
    <section className="section dark" id="hours">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow-mark on-dark" data-reveal>
              <Clock size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
              {data.title?.text}
            </h2>
            {data.description?.text && (
              <p className="body-md on-dark" data-reveal data-delay="0.1" style={{ marginTop: 16 }}>
                {data.description.text}
              </p>
            )}
          </div>
          <div className="head-right" data-reveal data-delay="0.2">
            <a
              className="btn btn-primary btn-sm"
              href={data.buttons?.[0]?.url ?? MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.buttons?.[0]?.text ?? "Get Directions"}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="split-grid">
          <div className="hours-card" data-reveal>
            <h3>Opening hours</h3>
            {hours.map((entry: any, index: number) => (
              <div
                className={`hours-row${
                  entry.description?.text?.toLowerCase() === "closed" ? " closed" : ""
                }`}
                key={entry.title?.text ?? index}
              >
                <span className="days">{entry.title?.text}</span>
                <span className="time">{entry.description?.text}</span>
              </div>
            ))}
          </div>

          <div className="info-list">
            <div className="info-row" data-reveal data-delay="0.1">
              <span className="card-icon lime" aria-hidden="true">
                <MapPin size={17} />
              </span>
              <div>
                <div className="info-label">Address</div>
                <div className="info-value">{data.extraDetails?.address_full}</div>
              </div>
            </div>

            <div className="info-row" data-reveal data-delay="0.16">
              <span className="card-icon lime" aria-hidden="true">
                <Car size={17} />
              </span>
              <div>
                <div className="info-label">Parking</div>
                <div className="info-value" style={{ fontSize: 16, lineHeight: 1.6 }}>
                  {data.extraDetails?.parking_note}
                </div>
              </div>
            </div>

            <div className="info-row" data-reveal data-delay="0.22">
              <span className="card-icon lime" aria-hidden="true">
                <Clock size={17} />
              </span>
              <div>
                <div className="info-label">Running late?</div>
                <div className="info-value" style={{ fontSize: 16, lineHeight: 1.6 }}>
                  Call us on <a href={PHONE_HREF}>{data.extraDetails?.phone}</a> — we can usually
                  shuffle things rather than rebook you.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
