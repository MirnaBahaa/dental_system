"use client";
import { useState } from "react";
import Image from "next/image";

const faqs = [
  { q: "What is dental wellness, and why does it matter?", a: "Dental wellness is the long-term care of your mouth as part of your overall health. Healthy gums and teeth reduce risks for cardiovascular and systemic conditions — and make every meal, photo, and conversation easier." },
  { q: "How can I improve my smile?", a: "It depends on your goals. We'll walk through whitening, alignment, bonding, or veneers in your consultation — and tell you honestly which (if any) will move the needle most." },
  { q: "Do you accept my insurance?", a: "We're in-network with Delta Dental, Aetna, MetLife, Cigna, and most major PPOs. We'll verify coverage before your first visit and explain any out-of-pocket cost in plain English." },
  { q: "How long is a typical first visit?", a: "Plan for about 75 minutes. That covers a full exam, X-rays if needed, and time to talk through anything you've been worried about — never rushed." },
  { q: "What if I haven't been to a dentist in years?", a: "You're in good company. We treat zero-judgment visits as the norm — most of our long-term patients started with a five-year gap. We'll get you caught up at a pace that feels right." },
  { q: "Do you treat children?", a: "Yes — Dr. Okafor specializes in pediatric care, starting from age one. Our practice is set up to make first visits genuinely fun, not scary." },
];

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? -1 : i);

  return (
    <section className="section dark faq-section" id="faq" data-screen-label="10 FAQ">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-side">
            <span className="eyebrow-mark on-dark" data-reveal>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1l2.4 7.2L21 12l-6.6 1.4L12 23l-2.4-7.2L3 12l6.4-1.4z"/></svg>
              FAQ&apos;s
            </span>
            <h2 className="h-display faq-headline" data-split>Frequently Asked Questions?</h2>
            <div className="faq-img" data-reveal-clip>
              <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80" alt="" fill sizes="(max-width:900px) 100vw, 45vw" style={{objectFit:"cover"}} onError={handleImgError} />
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openIdx === i ? " open" : ""}`} data-reveal data-delay={i * 0.05}>
                <button className="faq-q" onClick={() => toggle(i)}>
                  <span>{f.q}</span>
                  <span className="toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
