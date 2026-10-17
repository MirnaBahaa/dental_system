"use client";

import { Star } from "lucide-react";
import { OVERALL_RATING } from "@/lib/constants";

const defaultData = {
  tagline: { text: "The numbers" },
  title: { text: "1,300+ five-star reviews, and we read every one." },
  description: {
    text: "We do not filter, gate or chase reviews. What is below is what people wrote, across every platform we are listed on."
  },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "sources",
      items: OVERALL_RATING.sources.map((source) => ({
        title: { text: source.name },
        description: { text: `${source.count} reviews` },
        extraDetails: { score: String(source.score) }
      }))
    }
  ],
  extraDetails: {
    overall_score: String(OVERALL_RATING.score),
    total_reviews: String(OVERALL_RATING.total)
  }
};

interface OverallRatingProps {
  data?: Record<string, any> | null;
}

export default function OverallRating({ data: cmsData }: OverallRatingProps) {
  const data = cmsData ?? defaultData;
  const sources = data.lists?.[0]?.items ?? [];

  return (
    <section className="section dark" id="rating">
      <div className="container">
        <div className="rating-panel" data-reveal>
          <div>
            <span className="stars" aria-label="Five out of five stars">
              {[0, 1, 2, 3, 4].map((index) => (
                <Star key={index} size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />
              ))}
            </span>
            <div className="rating-score">{data.extraDetails?.overall_score}</div>
            <p className="rating-meta">
              Average across {Number(data.extraDetails?.total_reviews).toLocaleString()} verified
              reviews
            </p>
          </div>

          <div>
            <h2
              className="h-display card"
              data-split
              style={{ color: "var(--cream-text)", marginBottom: 14 }}
            >
              {data.title?.text}
            </h2>
            <p className="body-md on-dark" style={{ marginBottom: 24 }}>
              {data.description?.text}
            </p>

            <div className="source-grid">
              {sources.map((source: any, index: number) => (
                <div
                  className="source-card"
                  key={source.title?.text ?? index}
                  data-reveal
                  data-delay={index * 0.07}
                >
                  <div className="source-name">{source.title?.text}</div>
                  <div className="source-score">{source.extraDetails?.score}</div>
                  <div className="source-count">{source.description?.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
