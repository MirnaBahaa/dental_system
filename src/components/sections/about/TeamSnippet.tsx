"use client";

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { TEAM_MEMBERS } from "@/lib/constants";

const SUPPORT_TEAM = TEAM_MEMBERS.filter((member) => !member.name.startsWith("Dr."));

const defaultData = {
  tagline: { text: "The Wider Team" },
  title: { text: "The same faces, every visit." },
  description: {
    text: "Low turnover is not an accident — it is the reason your hygienist remembers your kids' names and picks up exactly where you left off."
  },
  buttons: [{ text: "Meet Us In Person", url: "/contact" }],
  assets: [],
  lists: [
    {
      name: "team",
      items: SUPPORT_TEAM.map((member) => ({
        title: { text: member.name },
        description: { text: member.bio },
        extraDetails: { role: member.title },
        assets: [{ name: member.id, image: { url: member.image, alt: `Portrait of ${member.name}` } }]
      }))
    }
  ],
  extraDetails: {}
};

interface TeamSnippetProps {
  data?: Record<string, any> | null;
}

export default function TeamSnippet({ data: cmsData }: TeamSnippetProps) {
  const data = cmsData ?? defaultData;
  const members = data.lists?.[0]?.items ?? [];

  return (
    <section className="section dark" id="team">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow-mark on-dark" data-reveal>
              <Users size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>
              {data.title?.text}
            </h2>
            {data.description?.text && (
              <p className="body-md on-dark" data-reveal data-delay="0.1" style={{ marginTop: 16 }}>
                {data.description.text}
              </p>
            )}
          </div>
          <div className="head-right" data-reveal data-delay="0.2">
            <Link className="btn btn-primary btn-sm" href={data.buttons?.[0]?.url ?? "/contact"}>
              {data.buttons?.[0]?.text ?? "Meet Us In Person"}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="team-grid">
          {members.map((member: any, index: number) => {
            const image = member.assets?.[0]?.image;
            return (
              <article
                className="team-card"
                key={member.title?.text ?? index}
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
                <span className="name-pill">{member.title?.text}</span>
                <span className="plus" aria-hidden="true">
                  +
                </span>
                <div className="overlay">
                  <div className="role">{member.extraDetails?.role}</div>
                  <p className="bio">{member.description?.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
