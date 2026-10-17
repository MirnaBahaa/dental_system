"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

const defaultData = {
  tagline: { text: "" },
  title: { text: "" },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "category-tabs",
      items: SERVICE_CATEGORIES.map((category) => ({
        title: { text: category.title },
        extraDetails: { slug: category.slug, count: String(category.treatments.length) }
      }))
    }
  ],
  extraDetails: {}
};

interface CategoryTabsProps {
  data?: Record<string, any> | null;
}

/**
 * Sticky underline tabs, rendered inside the services section rather than
 * attached to the hero. A single lime bar slides between tabs instead of each
 * tab drawing its own, so the movement reads as one continuous indicator.
 *
 * The host section must set `overflow: visible` — `.section` defaults to
 * hidden, which silently disables position:sticky on descendants.
 */
export default function CategoryTabs({ data: cmsData }: CategoryTabsProps) {
  const data = cmsData ?? defaultData;
  const tabs = data.lists?.[0]?.items ?? [];

  const [active, setActive] = useState<string>(tabs[0]?.extraDetails?.slug ?? "");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /** Park the lime bar under whichever tab is active. */
  const moveIndicator = useCallback(() => {
    const el = tabRefs.current[active];
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  // Scrollspy: the last heading to have crossed the sticky bar wins.
  useEffect(() => {
    const slugs: string[] = tabs.map((tab: any) => tab.extraDetails?.slug).filter(Boolean);
    if (!slugs.length) return;

    const onScroll = () => {
      let current = slugs[0];
      for (const slug of slugs) {
        const el = document.getElementById(slug);
        if (el && el.getBoundingClientRect().top <= 200) current = slug;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    moveIndicator();
    // Keep the active tab visible in the horizontally scrolling strip.
    const el = tabRefs.current[active];
    const strip = stripRef.current;
    if (el && strip) {
      const left = el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2;
      strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  }, [active, moveIndicator]);

  useEffect(() => {
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  if (!tabs.length) return null;

  return (
    <nav className="category-tabs" aria-label="Service categories">
      <div className="category-tabs-scroll" ref={stripRef}>
        {tabs.map((tab: any, index: number) => {
          const slug = tab.extraDetails?.slug;
          return (
            <a
              className={`category-tab${active === slug ? " active" : ""}`}
              href={`#${slug}`}
              key={slug ?? index}
              ref={(el) => {
                tabRefs.current[slug] = el;
              }}
              aria-current={active === slug ? "true" : undefined}
            >
              {tab.title?.text}
            </a>
          );
        })}
        <span
          className="tab-indicator"
          aria-hidden="true"
          style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
        />
      </div>
    </nav>
  );
}
