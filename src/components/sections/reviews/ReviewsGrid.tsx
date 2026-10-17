"use client";

import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/constants";

const defaultData = {
  tagline: { text: "In their words" },
  title: { text: "Real people. Real reviews." },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "reviews",
      items: REVIEWS.map((review) => ({
        title: { text: review.author },
        description: { text: review.quote },
        extraDetails: {
          context: review.context,
          source: review.source,
          date: review.date,
          rating: String(review.rating)
        }
      }))
    }
  ],
  extraDetails: {}
};

interface ReviewsGridProps {
  data?: Record<string, any> | null;
}

export default function ReviewsGrid({ data: cmsData }: ReviewsGridProps) {
  const data = cmsData ?? defaultData;
  const reviews = data.lists?.[0]?.items ?? [];

  return (
    <section className="section cream" id="reviews">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow" data-reveal>
              <span className="dot" aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split>
              {data.title?.text}
            </h2>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review: any, index: number) => {
            const rating = Number(review.extraDetails?.rating ?? 5);
            return (
              <article className="review-card" key={review.title?.text ?? index} data-reveal>
                <span className="stars ink" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={15}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                </span>
                <blockquote>&ldquo;{review.description?.text}&rdquo;</blockquote>
                <div className="review-foot">
                  <div>
                    <div className="who">{review.title?.text}</div>
                    <div className="ctx">{review.extraDetails?.context}</div>
                  </div>
                  <div className="src">
                    {review.extraDetails?.source}
                    <br />
                    {review.extraDetails?.date}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
