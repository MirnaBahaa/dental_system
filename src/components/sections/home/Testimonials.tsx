"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cornerMarks = [
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13a4 4 0 0 1 4-4h2l1-3h4l1 3h2a4 4 0 0 1 4 4v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3z"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>',
  '<svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="6"/><circle cx="17" cy="7" r="6"/></svg>',
  '<svg width="28" height="12" viewBox="0 0 28 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 6c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5zm12 0c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z"/></svg>',
  '<svg width="34" height="10" viewBox="0 0 34 10" fill="currentColor"><rect x="0" y="2" width="6" height="6" rx="1"/><circle cx="13" cy="5" r="3"/><circle cx="23" cy="5" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="29" y="2" width="5" height="6" rx="0.6"/></svg>',
];

const patientData = [
  {
    name: "Clara Jensen", role: "Family care",
    portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    quote: "\u201cI used to dread the dentist \u2014 every visit felt rushed and impersonal. With Verda, I gained a team that actually listens. The care plan they built for me is honest, paced for real life, and somehow makes the chair feel calm. I feel stronger about my smile, and capable of keeping it healthy.\u201d",
  },
  {
    name: "Marcus Lee", role: "Long-time patient",
    portrait: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80",
    quote: "\u201cI have been a patient for almost a decade. What I appreciate most is how unhurried every visit feels \u2014 they explain everything, never upsell, and remember the small details. That kind of consistency is rare these days, and it is the reason my whole family comes here.\u201d",
  },
  {
    name: "Sofia Patel", role: "First-visit patient",
    portrait: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    quote: "\u201cI had avoided dentists for years because of anxiety. From the front desk to the chair, every person here was patient and gentle. They walked me through every step before they did it, paused whenever I asked, and I left smiling. Already booked my follow-up.\u201d",
  },
];

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const portraitRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const citeRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % patientData.length);
    }, 8000);
  };

  const switchTo = (idx: number) => {
    setActive(idx);
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Animate quote transition
  useEffect(() => {
    const p = patientData[active];
    const portrait = portraitRef.current;
    const quote = quoteRef.current;
    const cite = citeRef.current;
    if (!portrait || !quote || !cite) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      portrait.src = p.portrait;
      quote.textContent = p.quote;
      cite.textContent = `${p.name} · ${p.role}`;
      return;
    }

    import("gsap").then(({ gsap }) => {
      gsap.to([portrait, quote, cite], {
        opacity: 0, duration: 0.25, ease: "power2.out",
        onComplete: () => {
          portrait.src = p.portrait;
          quote.textContent = p.quote;
          cite.textContent = `${p.name} · ${p.role}`;
          gsap.to([portrait, quote, cite], { opacity: 1, duration: 0.4, ease: "power2.out" });
        }
      });
    });
  }, [active]);

  return (
    <section className="section dark testimonials-section" id="testimonials" data-screen-label="07 Testimonials">
      <div className="container">
        <div className="testimonials-head">
          <span className="eyebrow-mark on-dark" data-reveal>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1l2.4 7.2L21 12l-6.6 1.4L12 23l-2.4-7.2L3 12l6.4-1.4z"/></svg>
            Patient Stories
          </span>
          <h2 className="h-display h2" data-split>Real people. Real reviews.</h2>
          <svg className="process-curve" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0 10 L 480 10 Q 540 10 555 35 Q 575 55 600 55 Q 625 55 645 35 Q 660 10 720 10 L 1200 10" fill="none" stroke="rgba(168,184,159,0.32)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="testimonials-grid">
          <div className="patient-list" data-reveal>
            {patientData.map((p, i) => (
              <button key={i} className={`patient-row${active === i ? " active" : ""}`} onClick={() => switchTo(i)} onMouseEnter={() => switchTo(i)}>
                <div className="avatar">
                  <Image src={p.avatar} alt="" width={38} height={38} style={{objectFit:"cover"}} onError={handleImgError} />
                </div>
                <div className="meta">
                  <div className="name">{p.name}</div>
                  <div className="role">{p.role}</div>
                </div>
                <span className="corner-mark" aria-hidden="true" dangerouslySetInnerHTML={{ __html: cornerMarks[i % cornerMarks.length] }} />
              </button>
            ))}
          </div>
          <div className="patient-portrait" data-reveal-clip>
            <Image
              ref={portraitRef}
              src={patientData[0].portrait}
              alt="Patient portrait"
              fill
              sizes="(max-width:960px) 50vw, 38vw"
              style={{objectFit:"cover"}}
              onError={handleImgError}
            />
          </div>
          <div className="patient-quote" data-reveal data-delay="0.1">
            <div className="quote-top">
              <svg className="quote-mark" width="40" height="36" viewBox="0 0 40 36" fill="currentColor" aria-hidden="true">
                <path d="M14 0H4C1.79 0 0 1.79 0 4v14c0 2.21 1.79 4 4 4h6v-8H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2h4V4c0-2.21-1.79-4-4-4zm22 0H26c-2.21 0-4 1.79-4 4v14c0 2.21 1.79 4 4 4h6v-8h-4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2h4V4c0-2.21-1.79-4-4-4z"/>
              </svg>
              <span className="rating-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 6.5 7 .9-5.1 4.7 1.3 7L12 17.8 5.8 21l1.3-7L2 9.4l7-.9z"/></svg>
                4.9 Review
              </span>
            </div>
            <blockquote ref={quoteRef}>{patientData[0].quote}</blockquote>
            <div className="quote-bottom">
              <svg className="brand-mark" width="48" height="42" viewBox="0 0 48 42" fill="currentColor" aria-hidden="true">
                <path d="M24 4c-7 0-11 4-11 11 0 9 5 13 5 21 0 3 1 5 3 5s2-3 3-6c1-3 2-3 3 0 1 3 1 6 3 6s3-2 3-5c0-8 5-12 5-21 0-7-4-11-14-11z"/>
              </svg>
              <cite ref={citeRef}>{patientData[0].name} · {patientData[0].role}</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
