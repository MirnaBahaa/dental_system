"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { FOUNDED_YEAR, IMAGES, MISSION_STATEMENT, VALUES } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Mission & Values" },
  title: { text: "Strong smiles, thriving families." },
  description: { text: MISSION_STATEMENT },
  buttons: [],
  assets: [{ name: "mission-image", image: { url: IMAGES.consult, alt: "A dentist and patient talking before treatment begins" } }],
  lists: [
    {
      name: "values",
      items: VALUES.map((value) => ({
        title: { text: value.title },
        description: { text: value.description },
        extraDetails: { icon_path: value.iconPath }
      }))
    }
  ],
  extraDetails: {
    founded_year: String(FOUNDED_YEAR),
    secondary_paragraph:
      "We opened in a two-room office with one chair and a waiting list of eleven people. What has not changed since is the rule we started with: nobody is sold treatment they do not need, and nobody leaves without understanding what happens next."
  }
};

interface MissionValuesProps {
  data?: Record<string, any> | null;
}

export default function MissionValues({ data: cmsData }: MissionValuesProps) {
  const data = cmsData ?? defaultData;
  const values = data.lists?.[0]?.items ?? [];
  const image = data.assets?.[0]?.image;

  return (
    <section className="section dark" id="mission">
      <div className="container">
        <div className="split-grid">
          <div className="media-frame portrait" data-reveal-clip>
            <Image
              src={image?.url ?? IMAGES.consult}
              alt={image?.alt ?? ""}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
              onError={handleImageError}
            />
          </div>

          <div>
            <span className="eyebrow-mark on-dark" data-reveal>
              <Sparkles size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
              {data.title?.text}
            </h2>
            <p className="body-md on-dark" data-reveal data-delay="0.1" style={{ marginTop: 20 }}>
              {data.description?.text}
            </p>
            {data.extraDetails?.secondary_paragraph && (
              <p className="body-md on-dark" data-reveal data-delay="0.16" style={{ marginTop: 16 }}>
                {data.extraDetails.secondary_paragraph}
              </p>
            )}

            <div className="trust-cards two-up">
              {values.map((value: any, index: number) => (
                <article
                  className="trust-card"
                  key={value.title?.text ?? index}
                  data-reveal
                  data-delay={0.2 + index * 0.07}
                >
                  <div className="trust-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={value.extraDetails?.icon_path} />
                    </svg>
                  </div>
                  <h4>{value.title?.text}</h4>
                  <p>{value.description?.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
