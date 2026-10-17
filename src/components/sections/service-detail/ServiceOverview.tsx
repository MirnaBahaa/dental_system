"use client";

import Image from "next/image";
import { Stethoscope } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { IMAGES, findTreatment } from "@/lib/constants";

const defaultData = {
  tagline: { text: "What it is" },
  title: { text: "What this treatment actually involves." },
  description: {
    text: "Every treatment here starts the same way — a conversation about what is bothering you, an honest look at the options, and a plan you understand before anything begins."
  },
  buttons: [],
  assets: [{ name: "overview-image", image: { url: IMAGES.chair, alt: "Treatment room at Verda Dental" } }],
  lists: [],
  extraDetails: {}
};

interface ServiceOverviewProps {
  data?: Record<string, any> | null;
  /** Route params — used to look the treatment up in constants. */
  category?: string;
  slug?: string;
}

export default function ServiceOverview({ data: cmsData, category, slug }: ServiceOverviewProps) {
  const data = cmsData ?? defaultData;
  const match = category && slug ? findTreatment(category, slug) : null;

  const heading = match ? `About ${match.treatment.title.toLowerCase()}` : data.title?.text;
  const body = match?.treatment.overview ?? data.description?.text;
  // The hero already shows the treatment photo — pick a different one here so
  // the two do not sit one above the other.
  const categoryImage = match?.category.image;
  const image =
    categoryImage && categoryImage !== match?.treatment.image
      ? categoryImage
      : (data.assets?.[0]?.image?.url ?? IMAGES.chair);
  const approach = match
    ? `We are a ${match.category.title.toLowerCase()} practice that would rather spend an extra ten minutes explaining than have you leave uncertain. If this is not the right treatment for you, we will say so.`
    : null;

  return (
    <section className="section dark" id="overview">
      <div className="container">
        <div className="split-grid reverse">
          <div>
            <span className="eyebrow-mark on-dark" data-reveal>
              <Stethoscope size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
              {heading}
            </h2>
            <div className="overview-prose" data-reveal data-delay="0.1" style={{ marginTop: 22 }}>
              <p>{body}</p>
              {approach && <p>{approach}</p>}
            </div>
          </div>

          <div className="media-frame portrait" data-reveal-clip>
            <Image
              src={image}
              alt={data.assets?.[0]?.image?.alt ?? ""}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
              onError={handleImageError}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
