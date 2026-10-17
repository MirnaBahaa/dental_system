"use client";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="section about-section" id="about" data-screen-label="02 About">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap" data-reveal-clip>
            <Image src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80" alt="Doctor and patient sharing a warm conversation" fill sizes="(max-width:900px) 100vw, 45vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
          <div className="about-body">
            <span className="eyebrow-mark" data-reveal>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1l2.4 7.2L21 12l-6.6 1.4L12 23l-2.4-7.2L3 12l6.4-1.4z"/></svg>
              About Verda
            </span>
            <h2 className="h-display h2" data-split>Strong smiles, thriving families.</h2>
            <p className="body-md on-dark" data-reveal data-delay="0.1">Strong smiles aren&apos;t built overnight. They take time, intention, and a team that genuinely sees you. Verda has been Maple Ridge&apos;s neighborhood dental practice since 2010 — serving 3,000+ families with unhurried, modern care.</p>
            <Link className="btn btn-primary" href="/about" data-reveal data-delay="0.2">
              Know Us More <span className="arrow" aria-hidden="true">↗</span>
            </Link>

            <div className="trust-cards">
              <article className="trust-card" data-reveal data-delay="0.25">
                <div className="trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
                </div>
                <h4>Confidentiality</h4>
                <p>Your records and visits stay private — always.</p>
              </article>
              <article className="trust-card" data-reveal data-delay="0.32">
                <div className="trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <h4>Inclusivity</h4>
                <p>Care designed for every age, ability and background.</p>
              </article>
              <article className="trust-card" data-reveal data-delay="0.39">
                <div className="trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/><path d="M12 7v5l3 2"/></svg>
                </div>
                <h4>Affordability</h4>
                <p>Transparent pricing and flexible financing options.</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  const palettes: [string, string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length];
  img.style.display = "none";
  const p = img.parentElement;
  if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}
