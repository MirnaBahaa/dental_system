"use client";

import Link from "next/link";
import { BadgeCheck, Check } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Membership Plan" },
  title: { text: "Care without insurance, priced honestly." },
  description: {
    text: "No claim forms, no waiting periods, no annual maximum. Join and use it the same day."
  },
  buttons: [{ text: "Join the Plan", url: "/contact" }],
  assets: [],
  lists: [
    {
      name: "plans",
      items: MEMBERSHIP_PLANS.map((plan) => ({
        title: { text: plan.name },
        description: { text: plan.description },
        extraDetails: {
          price: plan.price,
          cadence: plan.cadence,
          featured: plan.featured ? "true" : "false",
          features: plan.features.join("|")
        },
        buttons: [{ text: "Join This Plan", url: "/contact" }]
      }))
    }
  ],
  extraDetails: {}
};

interface MembershipPlansProps {
  data?: Record<string, any> | null;
}

export default function MembershipPlans({ data: cmsData }: MembershipPlansProps) {
  const data = cmsData ?? defaultData;
  const plans = data.lists?.[0]?.items ?? [];

  return (
    <section className="section dark" id="plans">
      <div className="container">
        <div className="section-head center">
          <div className="head-left" style={{ textAlign: "center" }}>
            <span className="eyebrow-mark on-dark" data-reveal>
              <BadgeCheck size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
              {data.title?.text}
            </h2>
            {data.description?.text && (
              <p
                className="body-md on-dark"
                data-reveal
                data-delay="0.1"
                style={{ marginTop: 16, marginLeft: "auto", marginRight: "auto", maxWidth: "56ch" }}
              >
                {data.description.text}
              </p>
            )}
          </div>
        </div>

        <div className="plan-grid">
          {plans.map((plan: any, index: number) => {
            const featured = plan.extraDetails?.featured === "true";
            const features = (plan.extraDetails?.features ?? "").split("|").filter(Boolean);

            return (
              <article
                className={`plan-card${featured ? " featured" : ""}`}
                key={plan.title?.text ?? index}
                data-reveal
                data-delay={index * 0.08}
              >
                {featured && <span className="pill-tag plan-flag">Most popular</span>}
                <h3>{plan.title?.text}</h3>
                <div className="plan-price">
                  <span className="amount">{plan.extraDetails?.price}</span>
                  <span className="cadence">{plan.extraDetails?.cadence}</span>
                </div>
                <p>{plan.description?.text}</p>

                <ul className="plan-features">
                  {features.map((feature: string) => (
                    <li key={feature}>
                      <Check size={15} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  className={`btn ${featured ? "btn-primary" : "btn-outline-cream"}`}
                  href={plan.buttons?.[0]?.url ?? "/contact"}
                  data-magnetic
                >
                  {plan.buttons?.[0]?.text ?? "Join This Plan"}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
