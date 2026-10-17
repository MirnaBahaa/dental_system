"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

const defaultData = {
  tagline: { text: "All treatments" },
  title: { text: "Browse every service." },
  description: {
    text: "The full menu of what we do. The treatment you are reading about is marked."
  },
  buttons: [{ text: "Services Overview", url: "/services" }],
  assets: [],
  lists: [],
  extraDetails: {}
};

interface ServiceMenuProps {
  data?: Record<string, any> | null;
  category?: string;
  currentSlug?: string;
}

/**
 * Full cross-navigation between all treatments, shown on every service page
 * so a patient can move sideways without going back to the hub. The current
 * treatment and its category are marked.
 */
export default function ServiceMenu({ data: cmsData, category, currentSlug }: ServiceMenuProps) {
  const data = cmsData ?? defaultData;

  return (
    <section className="section dark" id="all-services">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow on-dark" data-reveal>
              <span className="dot" aria-hidden="true" />
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
            <Link className="btn btn-primary btn-sm" href={data.buttons?.[0]?.url ?? "/services"}>
              {data.buttons?.[0]?.text ?? "Services Overview"}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="service-menu">
          {SERVICE_CATEGORIES.map((group, index) => (
            <div
              className={`sm-group${group.slug === category ? " current" : ""}`}
              key={group.slug}
              data-reveal
              data-delay={(index % 3) * 0.05}
            >
              <Link className="sm-group-title" href={`/services/${group.slug}`}>
                {group.title}
              </Link>
              <ul>
                {group.treatments.map((treatment) => {
                  const isCurrent = treatment.slug === currentSlug && group.slug === category;
                  return (
                    <li key={treatment.slug}>
                      {isCurrent ? (
                        <span className="sm-current" aria-current="page">
                          <Check size={13} aria-hidden="true" />
                          {treatment.title}
                        </span>
                      ) : (
                        <Link href={`/services/${group.slug}/${treatment.slug}`}>
                          {treatment.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
