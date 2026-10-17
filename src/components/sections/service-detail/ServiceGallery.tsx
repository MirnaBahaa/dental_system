"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { findTreatment, treatmentGallery } from "@/lib/constants";

const defaultData = {
  tagline: { text: "In the practice" },
  title: { text: "What it looks like here." },
  description: {
    text: "The room, the equipment and the people you will actually meet — photographed in our own practice, not bought from a stock library."
  },
  buttons: [],
  assets: [],
  lists: [],
  extraDetails: {}
};

interface ServiceGalleryProps {
  data?: Record<string, any> | null;
  category?: string;
  slug?: string;
}

export default function ServiceGallery({ data: cmsData, category, slug }: ServiceGalleryProps) {
  const data = cmsData ?? defaultData;
  const match = category && slug ? findTreatment(category, slug) : null;

  // CMS assets win; otherwise derive a stable set for this treatment.
  const cmsImages = (data.assets ?? []).map((asset: any) => asset?.image?.url).filter(Boolean);
  // Four tiles fill the 4-column x 2-row grid exactly; a fifth would orphan.
  const images = cmsImages.length ? cmsImages.slice(0, 4) : slug ? treatmentGallery(slug, 4) : [];
  if (!images.length) return null;

  const label = match ? match.treatment.title : "this treatment";

  return (
    <section className="section mid-dark" id="gallery">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow-mark on-dark" data-reveal>
              <Camera size={14} aria-hidden="true" />
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
        </div>

        <div className="service-gallery">
          {images.map((src: string, index: number) => (
            <div
              className={`sg-tile sg-${index + 1}`}
              key={`${src}-${index}`}
              data-reveal-clip
              data-delay={index * 0.06}
            >
              <Image
                src={src}
                alt={`${label} at Verda Dental — photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ objectFit: "cover" }}
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
