"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { findCategory, reviewsForCategory } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Patient stories" },
  title: { text: "What patients said about this." },
  description: { text: "" },
  buttons: [{ text: "All Reviews", url: "/reviews" }],
  assets: [],
  lists: [],
  extraDetails: {}
};

interface ServiceReviewsProps {
  data?: Record<string, any> | null;
  category?: string;
}

export default function ServiceReviews({ data: cmsData, category }: ServiceReviewsProps) {
  const data = cmsData ?? defaultData;
  const categoryData = category ? findCategory(category) : null;

  // CMS list wins; otherwise pull the reviews tagged to this category.
  const cmsItems = data.lists?.[0]?.items;
  const reviews =
    cmsItems?.length
      ? cmsItems.map((item: any) => ({
          id: item.title?.text,
          quote: item.description?.text,
          author: item.title?.text,
          context: item.extraDetails?.context ?? "",
          rating: Number(item.extraDetails?.rating ?? 5),
          source: item.extraDetails?.source ?? "Google",
          date: item.extraDetails?.date ?? ""
        }))
      : category
        ? reviewsForCategory(category, 3)
        : [];

  if (!reviews.length) return null;

  const heading = categoryData
    ? `What ${categoryData.title.toLowerCase()} patients said.`
    : data.title?.text;

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
              {heading}
            </h2>
          </div>
          <div className="head-right" data-reveal data-delay="0.18">
            <Link className="btn btn-outline-dark btn-sm" href={data.buttons?.[0]?.url ?? "/reviews"}>
              {data.buttons?.[0]?.text ?? "All Reviews"}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="inner-grid cols-3">
          {reviews.map((review: any, index: number) => (
            <article
              className="review-card"
              key={review.id ?? index}
              data-reveal
              data-delay={index * 0.08}
              style={{ marginBottom: 0 }}
            >
              <span className="stars ink" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={15}
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden="true"
                  />
                ))}
              </span>
              <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
              <div className="review-foot">
                <div>
                  <div className="who">{review.author}</div>
                  <div className="ctx">{review.context}</div>
                </div>
                <div className="src">
                  {review.source}
                  <br />
                  {review.date}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
