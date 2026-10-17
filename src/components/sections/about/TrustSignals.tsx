"use client";

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { ShieldCheck } from "lucide-react";
import { ACCREDITATIONS, TRUST_STATS } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Why Verda" },
  title: { text: "Fifteen years, one neighbourhood." },
  description: {
    text: "We have grown by referral rather than advertising, which is the only metric we have ever really trusted."
  },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "stats",
      items: TRUST_STATS.map((stat) => ({
        title: { text: `${stat.value}${stat.suffix}` },
        description: { text: stat.label },
        extraDetails: { stat_value: String(stat.value), stat_suffix: stat.suffix }
      }))
    },
    {
      name: "accreditations",
      items: ACCREDITATIONS.map((name) => ({ title: { text: name } }))
    }
  ],
  extraDetails: {}
};

function StatCard({
  value,
  suffix,
  label,
  delay
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  // Whole numbers count up; decimals (e.g. a 4.9 rating) render directly.
  const isWhole = Number.isInteger(value);
  const { count, ref } = useAnimatedCounter({ end: isWhole ? value : 0, duration: 1800 });

  return (
    <article className="stat-card" ref={ref} data-reveal data-delay={delay}>
      <span className="stat-value">
        {isWhole ? count.toLocaleString() : value}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </article>
  );
}

interface TrustSignalsProps {
  data?: Record<string, any> | null;
}

export default function TrustSignals({ data: cmsData }: TrustSignalsProps) {
  const data = cmsData ?? defaultData;
  const stats = data.lists?.[0]?.items ?? [];
  const accreditations = data.lists?.[1]?.items ?? [];

  return (
    <section className="section mid-dark" id="trust">
      <div className="container">
        <div className="section-head center">
          <div className="head-left" style={{ textAlign: "center" }}>
            <span className="eyebrow-mark on-dark" data-reveal>
              <ShieldCheck size={14} aria-hidden="true" />
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
                style={{ marginTop: 16, marginLeft: "auto", marginRight: "auto", maxWidth: "58ch" }}
              >
                {data.description.text}
              </p>
            )}
          </div>
        </div>

        <div className="stat-grid">
          {stats.map((stat: any, index: number) => (
            <StatCard
              key={stat.description?.text ?? index}
              value={Number(stat.extraDetails?.stat_value ?? 0)}
              suffix={stat.extraDetails?.stat_suffix ?? ""}
              label={stat.description?.text ?? ""}
              delay={index * 0.08}
            />
          ))}
        </div>

        {accreditations.length > 0 && (
          <div className="accred-row" data-reveal data-delay="0.24">
            {accreditations.map((item: any, index: number) => (
              <span className="pill-tag" key={item.title?.text ?? index}>
                {item.title?.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
