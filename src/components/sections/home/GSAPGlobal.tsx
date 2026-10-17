"use client";
import { useEffect } from "react";

export default function GSAPGlobal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        /* =========================================
           1. FADE-UP REVEALS  [data-reveal]
           ========================================= */
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: parseFloat(el.dataset.delay || "0"),
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            }
          );
        });

        /* =========================================
           2. CLIP-PATH REVEALS  [data-reveal-clip]
           ========================================= */
        document.querySelectorAll<HTMLElement>("[data-reveal-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(12% 0 0 0)" },
            {
              clipPath: "inset(0 0 0 0)",
              duration: 1.0,
              ease: "power3.out",
              delay: parseFloat(el.dataset.delay || "0"),
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            }
          );
        });

        /* =========================================
           3. HERO TILES — wave reveal
           ========================================= */
        const heroTiles = document.querySelectorAll<HTMLElement>(".hero-grid .tile");
        if (heroTiles.length) {
          const sorted = Array.from(heroTiles)
            .map((t) => {
              const r = t.getBoundingClientRect();
              return { el: t, dist: r.left + r.top * 0.6 };
            })
            .sort((a, b) => a.dist - b.dist);

          // Set initial hidden state
          sorted.forEach(({ el }) => {
            gsap.set(el, { clipPath: "inset(100% 0 0 0)", opacity: 0 });
          });

          gsap.timeline({ delay: 0.3 }).to(
            sorted.map((t) => t.el),
            {
              clipPath: "inset(0 0 0 0)",
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.06,
            }
          );
        }

        /* =========================================
           4. HERO TEXT — sequential entrance
           ========================================= */
        const heroText = document.querySelector(".hero .trust-eyebrow");
        if (heroText) {
          gsap.fromTo(
            ".hero .trust-eyebrow",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.15 }
          );
          gsap.fromTo(
            ".hero .h-display.hero",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
          );
          gsap.fromTo(
            ".hero .sub",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.55 }
          );
          gsap.fromTo(
            ".hero-ctas",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.7 }
          );
          gsap.fromTo(
            ".icon-circles .icon-btn",
            { opacity: 0, scale: 0.7 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.4)",
              delay: 0.9,
              stagger: 0.08,
            }
          );
        }

        /* =========================================
           5. GALLERY TILES — wave reveal
           ========================================= */
        const galleryTiles =
          document.querySelectorAll<HTMLElement>(".gallery-grid .g-tile");
        if (galleryTiles.length) {
          const sorted = Array.from(galleryTiles)
            .map((t) => {
              const r = t.getBoundingClientRect();
              return { el: t, dist: r.left + r.top * 0.4 };
            })
            .sort((a, b) => a.dist - b.dist);

          gsap.set(galleryTiles, { clipPath: "inset(100% 0 0 0)", opacity: 0 });

          gsap.to(sorted.map((t) => t.el), {
            clipPath: "inset(0 0 0 0)",
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: ".gallery-section",
              start: "top 85%",
              once: true,
            },
          });
        }

        /* =========================================
           6. CARD GRIDS — staggered reveal
           ========================================= */
        const cardGroups = [
          { sel: ".services-grid .service-card", trigger: ".services-grid" },
          { sel: ".blog-grid .blog-card", trigger: ".blog-grid" },
          { sel: ".portfolio-grid .case-card", trigger: ".portfolio-grid" },
          { sel: ".team-grid .team-card", trigger: ".team-grid" },
          { sel: ".trust-cards .trust-card", trigger: ".trust-cards" },
          { sel: ".process-steps .step-card", trigger: ".process-steps" },
        ];

        cardGroups.forEach(({ sel, trigger }) => {
          const cards = gsap.utils.toArray<HTMLElement>(sel);
          if (!cards.length) return;
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: { trigger, start: "top 85%", once: true },
            }
          );
        });

        /* =========================================
           7. PARTNER LOGOS — fade in
           ========================================= */
        const logos = gsap.utils.toArray<HTMLElement>(".partners-row .logo-item");
        if (logos.length) {
          gsap.fromTo(
            logos,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.06,
              scrollTrigger: {
                trigger: ".partners",
                start: "top 92%",
                once: true,
              },
            }
          );
        }

        /* =========================================
           8. EYEBROW MARKS — slide in
           ========================================= */
        document
          .querySelectorAll<HTMLElement>(".eyebrow-mark, .eyebrow")
          .forEach((el) => {
            if (el.hasAttribute("data-reveal")) return;
            gsap.fromTo(
              el,
              { opacity: 0, x: -14 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
              }
            );
          });

        /* =========================================
           9. SECTION HEADLINES [data-split] — fade up
           ========================================= */
        document
          .querySelectorAll<HTMLElement>("[data-split]")
          .forEach((el) => {
            // Skip hero headline (handled above)
            if (el.closest(".hero")) return;
            gsap.fromTo(
              el,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }
            );
          });

        /* =========================================
           10. SVG CURVE DRAWS
           ========================================= */
        document
          .querySelectorAll<SVGPathElement>(
            ".process-curve path, .footer-curve path"
          )
          .forEach((path) => {
            const len = path.getTotalLength ? path.getTotalLength() : 1200;
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.4,
              ease: "power2.inOut",
              scrollTrigger: { trigger: path, start: "top 92%", once: true },
            });
          });

        /* =========================================
           11. BOOK SECTION — card lift
           ========================================= */
        const bookCard = document.querySelector<HTMLElement>(".book-card");
        if (bookCard) {
          gsap.fromTo(
            bookCard,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".book-section",
                start: "top 82%",
                once: true,
              },
            }
          );
          const curvePath = bookCard.querySelector<SVGPathElement>(
            ".book-curve-deco path"
          );
          if (curvePath && curvePath.getTotalLength) {
            const len = curvePath.getTotalLength();
            gsap.set(curvePath, {
              strokeDasharray: len,
              strokeDashoffset: len,
            });
            gsap.to(curvePath, {
              strokeDashoffset: 0,
              duration: 2.0,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: ".book-section",
                start: "top 75%",
                once: true,
              },
            });
          }
        }

        /* =========================================
           12. FOOTER — wordmark + columns
           ========================================= */
        const wordmark = document.querySelector<HTMLElement>(".footer-wordmark");
        if (wordmark) {
          gsap.fromTo(
            wordmark,
            { opacity: 0, y: 24, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".footer-wordmark-row",
                start: "top 90%",
                once: true,
              },
            }
          );
        }
        gsap.utils
          .toArray<HTMLElement>(".footer-col, .footer-center")
          .forEach((col, i) => {
            gsap.fromTo(
              col,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: ".footer-main",
                  start: "top 90%",
                  once: true,
                },
                delay: i * 0.08,
              }
            );
          });

        /* =========================================
           13. TESTIMONIAL GRID — entrance
           ========================================= */
        const testGrid = document.querySelector<HTMLElement>(".testimonials-grid");
        if (testGrid) {
          gsap.fromTo(
            testGrid,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: testGrid,
                start: "top 88%",
                once: true,
              },
            }
          );
        }

        /* =========================================
           14. MAGNETIC BUTTONS
           ========================================= */
        if (window.matchMedia("(pointer: fine)").matches) {
          document
            .querySelectorAll<HTMLElement>("[data-magnetic]")
            .forEach((btn) => {
              if (btn.dataset.magneticInit) return;
              btn.dataset.magneticInit = "1";
              btn.addEventListener("mousemove", (e: MouseEvent) => {
                const r = btn.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                if (Math.hypot(dx, dy) < 84) {
                  gsap.to(btn, {
                    x: dx * 0.15,
                    y: dy * 0.15,
                    duration: 0.35,
                    ease: "power2.out",
                  });
                }
              });
              btn.addEventListener("mouseleave", () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
              });
            });
        }

        /* =========================================
           15. REFRESH after images/fonts settle
           ========================================= */
        window.addEventListener("load", () => ScrollTrigger.refresh());
        setTimeout(() => ScrollTrigger.refresh(), 600);
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
