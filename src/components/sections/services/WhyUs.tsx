"use client";

import { FlaskConical, HeartPulse, Microscope, Wallet } from "lucide-react";

const ICONS = [FlaskConical, HeartPulse, Microscope, Wallet];

const defaultData = {
  tagline: { text: "Why Verda" },
  title: { text: "Modern tools. Old-fashioned bedside manner." },
  description: {
    text: "The equipment matters less than what it lets us do: fewer visits, fewer surprises, and treatment that is easier to sit through."
  },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "differentiators",
      items: [
        {
          title: { text: "In-house lab" },
          description: {
            text: "Crowns designed, milled and fitted here — most in a single appointment. No temporary for three weeks, no second round of anaesthetic."
          }
        },
        {
          title: { text: "Comfort planned in advance" },
          description: {
            text: "Nitrous oxide and oral sedation offered without judgment, agreed before you are in the chair rather than improvised once you are."
          }
        },
        {
          title: { text: "Low-dose digital imaging" },
          description: {
            text: "Up to 90% less radiation than film, with images on a screen beside you so you can see what we are seeing."
          }
        },
        {
          title: { text: "Costs in writing, first" },
          description: {
            text: "Every plan comes with a written estimate and your insurance portion calculated. If the plan changes, we stop and re-quote."
          }
        }
      ]
    }
  ],
  extraDetails: {}
};

interface WhyUsProps {
  data?: Record<string, any> | null;
}

export default function WhyUs({ data: cmsData }: WhyUsProps) {
  const data = cmsData ?? defaultData;
  const items = data.lists?.[0]?.items ?? [];

  return (
    <section className="section cream" id="why-us">
      <div className="container">
        <div className="section-head center">
          <div className="head-left" style={{ textAlign: "center" }}>
            <span className="eyebrow" data-reveal>
              <span className="dot" aria-hidden="true" />
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
                style={{ marginTop: 16, marginLeft: "auto", marginRight: "auto", maxWidth: "58ch" }}
              >
                {data.description.text}
              </p>
            )}
          </div>
        </div>

        <div className="inner-grid cols-4">
          {items.map((item: any, index: number) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <article
                className="soft-card"
                key={item.title?.text ?? index}
                data-reveal
                data-delay={index * 0.08}
              >
                <span className="card-icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <h3>{item.title?.text}</h3>
                <p>{item.description?.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
