"use client";

import { Check, Sparkles } from "lucide-react";
import { findTreatment } from "@/lib/constants";

const FALLBACK_BENEFITS = [
  "Treatment explained fully before it begins",
  "Written costs with your insurance portion calculated",
  "Sedation available for anxious patients",
  "Follow-up contact after every procedure"
];

const defaultData = {
  tagline: { text: "Benefits" },
  title: { text: "Why patients choose this." },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "benefits",
      items: FALLBACK_BENEFITS.map((benefit) => ({ description: { text: benefit } }))
    }
  ],
  extraDetails: {}
};

interface ServiceBenefitsProps {
  data?: Record<string, any> | null;
  category?: string;
  slug?: string;
}

export default function ServiceBenefits({ data: cmsData, category, slug }: ServiceBenefitsProps) {
  const data = cmsData ?? defaultData;
  const match = category && slug ? findTreatment(category, slug) : null;

  const benefits =
    match?.treatment.benefits.map((benefit) => ({ description: { text: benefit } })) ??
    data.lists?.[0]?.items ??
    [];

  return (
    <section className="section dark" id="benefits">
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
          </div>
        </div>

        <div className="inner-grid cols-2">
          {benefits.map((benefit: any, index: number) => (
            <div
              className="benefit-row"
              key={benefit.description?.text ?? index}
              data-reveal
              data-delay={index * 0.06}
            >
              <Check size={18} aria-hidden="true" />
              <p>{benefit.description?.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
