"use client";

import { useState } from "react";
import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { FAQS, FAQ_CATEGORIES, IMAGES } from "@/lib/constants";

const defaultData = {
  tagline: { text: "FAQs" },
  title: { text: "Frequently Asked Questions?" },
  description: {
    text: "The things people ask us most, answered properly. If yours is not here, the front desk will happily talk it through."
  },
  buttons: [],
  assets: [
    { name: "faq-image", image: { url: IMAGES.patientA, alt: "A patient at ease in the treatment chair" } }
  ],
  lists: FAQ_CATEGORIES.map((category) => ({
    name: category,
    items: FAQS.filter((faq) => faq.category === category).map((faq) => ({
      title: { text: faq.question },
      description: { text: faq.answer }
    }))
  })),
  extraDetails: {}
};

interface FAQAccordionProps {
  data?: Record<string, any> | null;
}

export default function FAQAccordion({ data: cmsData }: FAQAccordionProps) {
  const data = cmsData ?? defaultData;
  const groups = data.lists ?? [];
  const image = data.assets?.[0]?.image;

  // A single open key across all groups keeps only one answer expanded at a time.
  const [openKey, setOpenKey] = useState("0-0");
  const toggle = (key: string) => setOpenKey(openKey === key ? "" : key);

  return (
    <section className="section dark faq-section" id="faq">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-side">
            <span className="eyebrow-mark on-dark" data-reveal>
              <HelpCircle size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display faq-headline" data-split>
              {data.title?.text}
            </h2>
            {data.description?.text && (
              <p className="body-md on-dark" data-reveal data-delay="0.1">
                {data.description.text}
              </p>
            )}
            {image?.url && (
              <div className="faq-img" data-reveal-clip>
                <Image
                  src={image.url}
                  alt={image.alt ?? ""}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                  onError={handleImageError}
                />
              </div>
            )}
          </div>

          <div>
            {groups.map((group: any, groupIndex: number) => (
              <div className="faq-group" key={group.name ?? groupIndex}>
                <p className="faq-group-title" data-reveal>
                  {group.name}
                </p>
                <div className="faq-list page-faq">
                  {(group.items ?? []).map((faq: any, itemIndex: number) => {
                    const key = `${groupIndex}-${itemIndex}`;
                    return (
                      <div
                        className={`faq-item${openKey === key ? " open" : ""}`}
                        key={faq.title?.text ?? key}
                        data-reveal
                        data-delay={itemIndex * 0.04}
                      >
                        <button
                          className="faq-q"
                          onClick={() => toggle(key)}
                          aria-expanded={openKey === key}
                        >
                          <span>{faq.title?.text}</span>
                          <span className="toggle" aria-hidden="true" />
                        </button>
                        <div className="faq-a">{faq.description?.text}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
