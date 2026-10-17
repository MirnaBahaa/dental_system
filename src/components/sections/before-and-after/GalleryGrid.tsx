"use client";

import Image from "next/image";
import { Clock, Images } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { BEFORE_AFTER_CASES } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Case Gallery" },
  title: { text: "Six cases, start to finish." },
  description: {
    text: "Each pair is the same patient, photographed under the same lighting. The treatment time sits beneath every case — good work is rarely instant."
  },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "cases",
      items: BEFORE_AFTER_CASES.map((item) => ({
        title: { text: item.title },
        description: { text: item.description },
        extraDetails: { treatment: item.treatment, duration: item.duration },
        assets: [
          { name: `${item.id}-before`, image: { url: item.beforeImage, alt: `${item.title} — before treatment` } },
          { name: `${item.id}-after`, image: { url: item.afterImage, alt: `${item.title} — after treatment` } }
        ]
      }))
    }
  ],
  extraDetails: {}
};

interface GalleryGridProps {
  data?: Record<string, any> | null;
}

export default function GalleryGrid({ data: cmsData }: GalleryGridProps) {
  const data = cmsData ?? defaultData;
  const cases = data.lists?.[0]?.items ?? [];

  return (
    <section className="section dark" id="gallery">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow-mark on-dark" data-reveal>
              <Images size={14} aria-hidden="true" />
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

        <div className="ba-grid">
          {cases.map((item: any, index: number) => {
            const before = item.assets?.[0]?.image;
            const after = item.assets?.[1]?.image;
            return (
              <article
                className="ba-card"
                key={item.title?.text ?? index}
                data-reveal
                data-delay={(index % 2) * 0.08}
              >
                <div className="ba-pair">
                  <div className="ba-half before">
                    <span className="ba-tag">Before</span>
                    <Image
                      src={before?.url}
                      alt={before?.alt ?? ""}
                      fill
                      sizes="(max-width: 820px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                      onError={handleImageError}
                    />
                  </div>
                  <div className="ba-half after">
                    <span className="ba-tag">After</span>
                    <Image
                      src={after?.url}
                      alt={after?.alt ?? ""}
                      fill
                      sizes="(max-width: 820px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                      onError={handleImageError}
                    />
                  </div>
                </div>

                <div className="ba-body">
                  <span className="pill-tag">{item.extraDetails?.treatment}</span>
                  <h3>{item.title?.text}</h3>
                  <p>{item.description?.text}</p>
                  <div className="ba-meta">
                    <Clock size={13} aria-hidden="true" />
                    Treatment time: {item.extraDetails?.duration}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
