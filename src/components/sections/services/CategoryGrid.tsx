"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlignHorizontalDistributeCenter,
  Baby,
  Gem,
  HeartPulse,
  Scissors,
  Siren,
  Smile,
  Sparkles,
  Wrench
} from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { SERVICE_CATEGORIES } from "@/lib/constants";

/** One glyph per category slug — keeps the nine groups visually distinct. */
const CATEGORY_ICONS: Record<string, typeof Smile> = {
  "general-dentistry": Smile,
  "restorative-dentistry": Wrench,
  "cosmetic-dentistry": Gem,
  "dental-implants": HeartPulse,
  "oral-surgery": Scissors,
  "emergency-dentistry": Siren,
  orthodontics: AlignHorizontalDistributeCenter,
  "specialty-services": Sparkles,
  "childrens-dentistry": Baby
};

const defaultData = {
  tagline: { text: "What We Do" },
  title: { text: "Nine areas of care, one team." },
  description: {
    text: "Everything below happens under this roof — including the lab work most practices send out. Pick any treatment to read how it actually goes."
  },
  buttons: [{ text: "Book a Consultation", url: "/appointment" }],
  assets: [],
  // One list per category; each item is a treatment card.
  lists: SERVICE_CATEGORIES.map((category) => ({
    name: category.slug,
    items: category.treatments.map((treatment) => ({
      title: { text: treatment.title },
      description: { text: treatment.summary },
      extraDetails: {
        category_title: category.title,
        category_description: category.description
      },
      buttons: [{ text: "Read More", url: `/services/${category.slug}/${treatment.slug}` }],
      assets: [
        {
          name: `${treatment.slug}-image`,
          image: { url: treatment.image, alt: `${treatment.title} at Verda Dental` }
        }
      ]
    }))
  })),
  extraDetails: {}
};

interface CategoryGridProps {
  data?: Record<string, any> | null;
  /** Category tab strip, rendered inside this section below the heading. */
  tabs?: React.ReactNode;
}

export default function CategoryGrid({ data: cmsData, tabs }: CategoryGridProps) {
  const data = cmsData ?? defaultData;
  const categories = data.lists ?? [];

  return (
    <section className="section dark" id="categories">
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

        {tabs}

        {categories.map((category: any, categoryIndex: number) => {
          const treatments = category.items ?? [];
          if (!treatments.length) return null;
          const Icon = CATEGORY_ICONS[category.name] ?? Smile;
          const meta = treatments[0]?.extraDetails ?? {};

          return (
            <div className="category-block" id={category.name} key={category.name ?? categoryIndex}>
              <div className="category-heading" data-reveal>
                <span className="card-icon lime" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <div>
                  {/* The heading doubles as the link to the category's own hub
                      page — `a` inherits colour, so this reads as plain text. */}
                  <h3>
                    <Link href={`/services/${category.name}`}>{meta.category_title}</Link>
                  </h3>
                  <p>{meta.category_description}</p>
                </div>
              </div>

              {/* Same card primitive as the home page services grid. */}
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
                        {treatment.buttons?.[0]?.text ?? "Read More"}{" "}
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
