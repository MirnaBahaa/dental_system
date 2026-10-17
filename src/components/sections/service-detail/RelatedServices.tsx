"use client";

import Image from "next/image";
import Link from "next/link";
import { handleImageError } from "@/lib/imageFallback";
import { findCategory } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Related Care" },
  title: { text: "You might also be looking at" },
  description: { text: "" },
  buttons: [{ text: "All Services", url: "/services" }],
  assets: [],
  lists: [{ name: "related", items: [] }],
  extraDetails: {}
};

interface RelatedServicesProps {
  data?: Record<string, any> | null;
  category?: string;
  currentSlug?: string;
}

export default function RelatedServices({
  data: cmsData,
  category,
  currentSlug
}: RelatedServicesProps) {
  const data = cmsData ?? defaultData;
  const categoryData = category ? findCategory(category) : null;

  const siblings = (categoryData?.treatments ?? [])
    .filter((treatment) => treatment.slug !== currentSlug)
    .slice(0, 3);

  if (siblings.length === 0) return null;

  return (
    <section className="section dark" id="related">
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
          </div>
          <div className="head-right" data-reveal data-delay="0.18">
            <Link className="btn btn-primary btn-sm" href={data.buttons?.[0]?.url ?? "/services"}>
              {data.buttons?.[0]?.text ?? "All Services"}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="services-grid">
          {siblings.map((treatment, index) => (
            <Link
              className="service-card"
              key={treatment.slug}
              href={`/services/${category}/${treatment.slug}`}
              data-reveal
              data-delay={index * 0.08}
            >
              <div className="thumb">
                <Image
                  src={treatment.image}
                  alt=""
                  fill
                  sizes="(max-width: 580px) 100vw, (max-width: 960px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  onError={handleImageError}
                />
              </div>
              <h3>{treatment.title}</h3>
              <p>{treatment.summary}</p>
              <span className="read-more">
                Read More <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
