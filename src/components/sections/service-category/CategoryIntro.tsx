"use client";

import Image from "next/image";
import { Check, Stethoscope } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { IMAGES, findCategory } from "@/lib/constants";

const FALLBACK_INTRO = [
  "Every treatment in this group starts the same way — a conversation about what is bothering you, an honest look at the options, and a plan you understand before anything begins.",
  "If the right answer is to wait and watch, we will say so. Nobody here is sold treatment they do not need."
];

const FALLBACK_HIGHLIGHTS = [
  "Treatment explained fully before it begins",
  "Written costs with your insurance portion calculated",
  "Sedation available for anyone who wants it",
  "Follow-up contact after every procedure"
];

const defaultData = {
  tagline: { text: "The overview" },
  title: { text: "What this covers, and who it is for." },
  description: { text: FALLBACK_INTRO[0] },
  buttons: [],
  assets: [
    {
      name: "intro-image",
      image: { url: IMAGES.consult, alt: "A dentist and patient talking before treatment begins" }
    }
  ],
  lists: [
    {
      name: "highlights",
      items: FALLBACK_HIGHLIGHTS.map((highlight) => ({ description: { text: highlight } }))
    }
  ],
  extraDetails: { secondary_paragraph: FALLBACK_INTRO[1] }
};

interface CategoryIntroProps {
  data?: Record<string, any> | null;
  /** Route param — used to look the category up in constants. */
  category?: string;
}

export default function CategoryIntro({ data: cmsData, category }: CategoryIntroProps) {
  const data = cmsData ?? defaultData;
  const categoryData = category ? findCategory(category) : null;

  const heading = categoryData
    ? `What ${categoryData.title.toLowerCase()} covers here.`
    : data.title?.text;

  // Constants win when the category is known; CMS data covers everything else.
  const paragraphs = categoryData?.intro ?? [
    data.description?.text,
    data.extraDetails?.secondary_paragraph
  ].filter(Boolean);

  const highlights =
    categoryData?.highlights ??
    (data.lists?.[0]?.items ?? []).map((item: any) => item.description?.text).filter(Boolean);

  // The hero already carries the category photo, so this block uses a
  // different one rather than stacking the same image twice.
  const heroImage = categoryData?.image;
  const fallbackImage = data.assets?.[0]?.image?.url ?? IMAGES.consult;
  const image = heroImage && heroImage === fallbackImage ? IMAGES.chair : fallbackImage;

  return (
    <section className="section dark" id="overview">
      <div className="container">
        <div className="split-grid">
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

          <div>
            <span className="eyebrow-mark on-dark" data-reveal>
              <Stethoscope size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
              {heading}
            </h2>

            <div className="overview-prose" data-reveal data-delay="0.1" style={{ marginTop: 22 }}>
              {paragraphs.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {highlights.length > 0 && (
              <div className="inner-grid" style={{ marginTop: 26 }}>
                {highlights.map((highlight: string, index: number) => (
                  <div
                    className="benefit-row"
                    key={highlight}
                    data-reveal
                    data-delay={0.18 + index * 0.06}
                  >
                    <Check size={18} aria-hidden="true" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
