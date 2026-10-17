"use client";

import { Navigation } from "lucide-react";
import { DIRECTIONS } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Getting here" },
  title: { text: "Two buses, one turning, free parking." },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "directions",
      items: DIRECTIONS.map((item) => ({
        title: { text: item.title },
        description: { text: item.description }
      }))
    }
  ],
  extraDetails: {}
};

interface DirectionsSnippetProps {
  data?: Record<string, any> | null;
}

export default function DirectionsSnippet({ data: cmsData }: DirectionsSnippetProps) {
  const data = cmsData ?? defaultData;
  const directions = data.lists?.[0]?.items ?? [];

  return (
    <section className="section mid-dark" id="directions">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow-mark on-dark" data-reveal>
              <Navigation size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
              {data.title?.text}
            </h2>
          </div>
        </div>

        <div className="directions-list">
          {directions.map((item: any, index: number) => (
            <article
              className="direction-item"
              key={item.title?.text ?? index}
              data-reveal
              data-delay={index * 0.07}
            >
              <span className="step-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.title?.text}</h3>
                <p>{item.description?.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
