"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { SITE_NAME, findCategory } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Treatments" },
  title: { text: "What we do in this area." },
  description: {
    text: "Pick any treatment to read what it involves, what it costs to find out, and how many visits it really takes."
  },
  buttons: [{ text: "Book a Consultation", url: "/appointment" }],
  assets: [],
  lists: [{ name: "treatments", items: [] }],
  extraDetails: {}
};

interface TreatmentGridProps {
  data?: Record<string, any> | null;
  /** Route param — used to look the category's treatments up in constants. */
  category?: string;
}

/**
 * Treatment cards for one category. Reuses the same `.service-card` primitive
 * as the services hub and the related-services strip, so a card looks the same
 * wherever a patient meets it.
 */
export default function TreatmentGrid({ data: cmsData, category }: TreatmentGridProps) {
  const data = cmsData ?? defaultData;
  const categoryData = category ? findCategory(category) : null;

  const treatments =
    categoryData?.treatments.map((treatment) => ({
      title: { text: treatment.title },
      description: { text: treatment.summary },
      buttons: [
        { text: "Read More", url: `/services/${categoryData.slug}/${treatment.slug}` }
      ],
      assets: [
        {
          name: `${treatment.slug}-image`,
          image: { url: treatment.image, alt: `${treatment.title} at ${SITE_NAME}` }
        }
      ]
    })) ??
    data.lists?.[0]?.items ??
    [];

  if (treatments.length === 0) return null;

  return (
    <section className="section dark" id="treatments">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow-mark on-dark" data-reveal>
              <Sparkles size={14} aria-hidden="true" />
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
            <Link className="btn btn-primary btn-sm" href={data.buttons?.[0]?.url ?? "/appointment"}>
              {data.buttons?.[0]?.text ?? "Book a Consultation"}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="services-grid">
          {treatments.map((treatment: any, index: number) => {
            const image = treatment.assets?.[0]?.image;
            return (
              <Link
                className="service-card"
                href={treatment.buttons?.[0]?.url ?? "/services"}
                key={treatment.buttons?.[0]?.url ?? index}
                data-reveal
                data-delay={(index % 3) * 0.07}
              >
                <div className="thumb">
                  <Image
                    src={image?.url}
                    alt={image?.alt ?? ""}
                    fill
                    sizes="(max-width: 580px) 100vw, (max-width: 960px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    onError={handleImageError}
                  />
                </div>
                <h3>{treatment.title?.text}</h3>
                <p>{treatment.description?.text}</p>
                <span className="read-more">
                  {treatment.buttons?.[0]?.text ?? "Read More"} <span aria-hidden="true">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
