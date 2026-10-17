"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyCTA({ href = "#book" }: { href?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      // The home page has `.hero`; inner pages have `.page-hero`.
      const hero = document.querySelector<HTMLElement>(".hero, .page-hero");
      if (!hero) return;
      setVisible(hero.getBoundingClientRect().bottom < 80);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const btn = document.querySelector<HTMLElement>(".sticky-cta");
      if (!btn || !window.matchMedia("(pointer: fine)").matches) return;
      btn.addEventListener("mousemove", (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < 84) { gsap.to(btn, { x: dx * 0.15, y: dy * 0.15, duration: 0.35, ease: "power2.out" }); }
      });
      btn.addEventListener("mouseleave", () => { gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "power2.out" }); });
    });
    return () => { cancelled = true; };
  }, []);

  const className = `sticky-cta${visible ? " visible" : ""}`;
  const content = (
    <>
      <span className="dot"></span>
      Book Appointment
    </>
  );

  // Hash targets stay plain anchors; real routes go through next/link.
  return href.startsWith("#") ? (
    <a className={className} href={href} data-magnetic>
      {content}
    </a>
  ) : (
    <Link className={className} href={href} data-magnetic>
      {content}
    </Link>
  );
}
