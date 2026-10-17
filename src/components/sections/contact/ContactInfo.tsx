"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_INFO, MAPS_DIRECTIONS_URL, PHONE_HREF } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Get in touch" },
  title: { text: "Reach us directly." },
  description: {
    text: "Lila answers the phone at the front desk during opening hours. Email gets a reply within one working day, and anything urgent is always better by phone."
  },
  buttons: [],
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
    phone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address_full: CONTACT_INFO.address.full
  }
};

interface ContactInfoProps {
  data?: Record<string, any> | null;
}

export default function ContactInfo({ data: cmsData }: ContactInfoProps) {
  const data = cmsData ?? defaultData;
  const hours = data.lists?.[0]?.items ?? [];

  return (
    <div>
      <span className="eyebrow-mark on-dark" data-reveal>
        <Phone size={14} aria-hidden="true" />
        {data.tagline?.text}
      </span>
      <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)", marginTop: 6 }}>
        {data.title?.text}
      </h2>
      <p className="body-md on-dark" data-reveal data-delay="0.1" style={{ margin: "18px 0 26px" }}>
        {data.description?.text}
      </p>

      <div className="info-list">
        <div className="info-row" data-reveal data-delay="0.14">
          <span className="card-icon lime" aria-hidden="true">
            <Phone size={17} />
          </span>
          <div>
            <div className="info-label">Phone</div>
            <div className="info-value">
              <a href={PHONE_HREF}>{data.extraDetails?.phone}</a>
            </div>
          </div>
        </div>

        <div className="info-row" data-reveal data-delay="0.2">
          <span className="card-icon lime" aria-hidden="true">
            <Mail size={17} />
          </span>
          <div>
            <div className="info-label">Email</div>
            <div className="info-value">
              <a href={`mailto:${data.extraDetails?.email}`}>{data.extraDetails?.email}</a>
            </div>
          </div>
        </div>

        <div className="info-row" data-reveal data-delay="0.26">
          <span className="card-icon lime" aria-hidden="true">
            <MapPin size={17} />
          </span>
          <div>
            <div className="info-label">Address</div>
            <div className="info-value">
              <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                {data.extraDetails?.address_full}
              </a>
            </div>
          </div>
        </div>

        <div className="info-row" data-reveal data-delay="0.32">
          <span className="card-icon lime" aria-hidden="true">
            <Clock size={17} />
          </span>
          <div style={{ flex: 1 }}>
            <div className="info-label">Opening hours</div>
            {hours.map((entry: any, index: number) => (
              <div
                className={`hours-row${
                  entry.description?.text?.toLowerCase() === "closed" ? " closed" : ""
                }`}
                key={entry.title?.text ?? index}
                style={index === 0 ? { paddingTop: 6 } : undefined}
              >
                <span className="days">{entry.title?.text}</span>
                <span className="time">{entry.description?.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
