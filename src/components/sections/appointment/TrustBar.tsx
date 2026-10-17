"use client";

import { Clock, ShieldCheck, Wallet, Zap } from "lucide-react";
import { BOOKING_TRUST_POINTS } from "@/lib/constants";

/** One distinct glyph per point — the four read as identical circles otherwise. */
const ICONS = [Zap, ShieldCheck, Wallet, Clock];

const defaultData = {
  tagline: { text: "" },
  title: { text: "" },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "trust-points",
      items: BOOKING_TRUST_POINTS.map((point) => ({
        title: { text: point.title },
        description: { text: point.description },
        extraDetails: { icon_path: point.iconPath }
      }))
    }
  ],
  extraDetails: {}
};

interface TrustBarProps {
  data?: Record<string, any> | null;
}

export default function TrustBar({ data: cmsData }: TrustBarProps) {
  const data = cmsData ?? defaultData;
  const points = data.lists?.[0]?.items ?? [];

  return (
    <section className="section dark" id="trust-bar" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div className="trust-bar">
          {points.map((point: any, index: number) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <article
                className="trust-bar-item"
                key={point.title?.text ?? index}
                data-reveal
                data-delay={index * 0.07}
              >
                <span className="card-icon on-dark" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <h3>{point.title?.text}</h3>
                <p>{point.description?.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
