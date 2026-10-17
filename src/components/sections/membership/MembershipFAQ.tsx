"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { MEMBERSHIP_FAQS } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Membership questions" },
  title: { text: "What members ask before joining." },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "membership-faqs",
      items: MEMBERSHIP_FAQS.map((faq) => ({
        title: { text: faq.question },
        description: { text: faq.answer }
      }))
    }
  ],
  extraDetails: {}
};

interface MembershipFAQProps {
  data?: Record<string, any> | null;
}

export default function MembershipFAQ({ data: cmsData }: MembershipFAQProps) {
  const data = cmsData ?? defaultData;
  const faqs = data.lists?.[0]?.items ?? [];

  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? -1 : index);

  return (
    <section className="section cream" id="membership-faq">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow" data-reveal>
              <span className="dot" aria-hidden="true" />
              <HelpCircle size={13} aria-hidden="true" style={{ marginRight: 2 }} />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split>
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
