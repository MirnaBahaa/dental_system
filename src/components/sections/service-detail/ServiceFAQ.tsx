"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { findCategory } from "@/lib/constants";

const FALLBACK_FAQS = [
  {
    question: "How much will it cost?",
    answer:
      "We give you a written estimate with your insurance portion calculated before you commit to anything. If the plan changes mid-treatment we stop and re-quote rather than adding to the bill."
  },
  {
    question: "Will it hurt?",
    answer:
      "You should feel pressure but not pain. We numb thoroughly, wait until it has genuinely taken effect, and stop the moment you raise a hand. Nitrous oxide and oral sedation are available."
  },
  {
    question: "How many visits will I need?",
    answer:
      "It depends on the treatment, and we will tell you the honest number at the consultation rather than discovering it as we go. Many procedures here are completed in a single appointment."
  },
  {
    question: "What if I am nervous about it?",
    answer:
      "Say so when you book. We allow extra time, explain each step before it happens, and are entirely used to patients who have avoided dentists for years. There is no lecture."
  }
];

const defaultData = {
  tagline: { text: "Questions" },
  title: { text: "Frequently asked questions." },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "faqs",
      items: FALLBACK_FAQS.map((faq) => ({
        title: { text: faq.question },
        description: { text: faq.answer }
      }))
    }
  ],
  extraDetails: {}
};

interface ServiceFAQProps {
  data?: Record<string, any> | null;
  category?: string;
}

export default function ServiceFAQ({ data: cmsData, category }: ServiceFAQProps) {
  const data = cmsData ?? defaultData;
  const categoryData = category ? findCategory(category) : null;

  const faqs =
    categoryData?.faqs.map((faq) => ({
      title: { text: faq.question },
      description: { text: faq.answer }
    })) ??
    data.lists?.[0]?.items ??
    [];

  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? -1 : index);

  return (
    <section className="section mid-dark faq-section" id="faq">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow-mark on-dark" data-reveal>
              <HelpCircle size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
              {data.title?.text}
            </h2>
          </div>
        </div>

        <div className="faq-list page-faq">
          {faqs.map((faq: any, index: number) => (
            <div
              className={`faq-item${openIndex === index ? " open" : ""}`}
              key={faq.title?.text ?? index}
              data-reveal
              data-delay={index * 0.05}
            >
              <button
                className="faq-q"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.title?.text}</span>
                <span className="toggle" aria-hidden="true" />
              </button>
              <div className="faq-a">{faq.description?.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
