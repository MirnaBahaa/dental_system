"use client";

import Image from "next/image";
import Link from "next/link";
import { handleImageError } from "@/lib/imageFallback";
import { DOCTORS } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Our Doctors" },
  title: { text: "Clinicians who take the time." },
  description: {
    text: "Three dentists, each with their own focus — and a shared habit of talking you out of treatment you do not need."
  },
  buttons: [{ text: "Book a Consultation", url: "/appointment" }],
  assets: [],
  lists: [
    {
      name: "doctors",
      items: DOCTORS.map((doctor) => ({
        title: { text: doctor.name },
        description: { text: doctor.bio },
        extraDetails: { role: doctor.title },
        assets: [{ name: doctor.id, image: { url: doctor.image, alt: `Portrait of ${doctor.name}` } }]
      }))
    }
  ],
  extraDetails: {}
};

interface DoctorsSnippetProps {
  data?: Record<string, any> | null;
}

export default function DoctorsSnippet({ data: cmsData }: DoctorsSnippetProps) {
  const data = cmsData ?? defaultData;
  const doctors = data.lists?.[0]?.items ?? [];

  return (
    <section className="section cream" id="doctors">
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
            {data.description?.text && (
              <p className="body-md" data-reveal data-delay="0.1" style={{ marginTop: 16 }}>
                {data.description.text}
              </p>
            )}
          </div>
          <div className="head-right" data-reveal data-delay="0.2">
            <Link className="btn btn-outline-dark btn-sm" href={data.buttons?.[0]?.url ?? "/appointment"}>
              {data.buttons?.[0]?.text ?? "Book a Consultation"}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="team-grid">
          {doctors.map((doctor: any, index: number) => {
            const image = doctor.assets?.[0]?.image;
            return (
              <article
                className="team-card"
                key={doctor.title?.text ?? index}
                data-reveal-clip
                data-delay={index * 0.08}
              >
                <Image
                  src={image?.url}
                  alt={image?.alt ?? ""}
                  fill
                  sizes="(max-width: 520px) 100vw, (max-width: 880px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  onError={handleImageError}
                />
                <span className="name-pill">{doctor.title?.text}</span>
                <span className="plus" aria-hidden="true">
                  +
                </span>
                <div className="overlay">
                  <div className="role">{doctor.extraDetails?.role}</div>
                  <p className="bio">{doctor.description?.text}</p>
                  <Link className="bio-link" href="/appointment">
                    Book with them →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
