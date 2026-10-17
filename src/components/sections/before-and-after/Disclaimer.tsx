"use client";

import { Info } from "lucide-react";
import { GALLERY_DISCLAIMER } from "@/lib/constants";

const defaultData = {
  tagline: { text: "" },
  title: { text: "About these results" },
  description: { text: GALLERY_DISCLAIMER },
  buttons: [],
  assets: [],
  lists: [],
  extraDetails: {}
};

interface DisclaimerProps {
  data?: Record<string, any> | null;
}

export default function Disclaimer({ data: cmsData }: DisclaimerProps) {
  const data = cmsData ?? defaultData;

  return (
    <section className="section cream-warm" id="disclaimer">
      <div className="container">
        <div className="disclaimer-card" data-reveal>
          <Info size={20} aria-hidden="true" />
          <div>
            <h3>{data.title?.text}</h3>
            <p>{data.description?.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
