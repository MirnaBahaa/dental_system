"use client";

import { Route } from "lucide-react";
import { findCategory } from "@/lib/constants";

const FALLBACK_STEPS = [
  {
    title: "Understanding your needs",
    description:
      "We listen first. Tell us what has been worrying you and what you want for your smile — nothing gets scheduled before that conversation."
  },
  {
    title: "Exam and honest options",
    description:
      "A full look with low-dose digital imaging, then a plain-English rundown of every route open to you, including waiting."
  },
  {
    title: "A plan paced for real life",
    description:
      "We sequence treatment around your budget and calendar, and confirm your insurance coverage before anything starts."
  },
  {
    title: "Care and follow-up",
    description:
      "Unhurried appointments, a check-in afterwards, and a maintenance rhythm that keeps the result stable for years."
  }
];

const defaultData = {
  tagline: { text: "What to expect" },
  title: { text: "Your visit, step by step." },
  description: {
    text: "No stage of this happens without you knowing it is coming. Here is the whole route, start to finish."
  },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "steps",
      items: FALLBACK_STEPS.map((step) => ({
        title: { text: step.title },
        description: { text: step.description }
      }))
    }
  ],
  extraDetails: {}
};

interface ProcedureStepsProps {
  data?: Record<string, any> | null;
  category?: string;
}

export default function ProcedureSteps({ data: cmsData, category }: ProcedureStepsProps) {
  const data = cmsData ?? defaultData;
  const categoryData = category ? findCategory(category) : null;

  const steps =
    categoryData?.steps.map((step) => ({
      title: { text: step.title },
      description: { text: step.description }
    })) ??
    data.lists?.[0]?.items ??
    [];

  return (
    <section className="section cream" id="what-to-expect">
      <div className="container">
        <div className="section-head center">
          <div className="head-left" style={{ textAlign: "center" }}>
            <span className="eyebrow" data-reveal>
              <span className="dot" aria-hidden="true" />
              <Route size={13} aria-hidden="true" style={{ marginRight: 2 }} />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split>
              {data.title?.text}
            </h2>
            {data.description?.text && (
              <p
                className="body-md"
                data-reveal
                data-delay="0.1"
                style={{ marginTop: 16, marginLeft: "auto", marginRight: "auto", maxWidth: "56ch" }}
              >
                {data.description.text}
              </p>
            )}
          </div>
        </div>

        <div className="inner-grid cols-2">
          {steps.map((step: any, index: number) => (
            <article
              className="soft-card"
              key={step.title?.text ?? index}
              data-reveal
              data-delay={index * 0.08}
              style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
            >
              <span className="step-index-badge" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{step.title?.text}</h3>
                <p>{step.description?.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
