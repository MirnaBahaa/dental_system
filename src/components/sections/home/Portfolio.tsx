"use client";
import Image from "next/image";
import Link from "next/link";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function Portfolio() {
  return (
    <section className="section dark" id="portfolio" data-screen-label="06 Portfolio">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow on-dark" data-reveal>Featured Cases</span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>Real smiles, real results.</h2>
          </div>
          <div className="head-right" data-reveal data-delay="0.2">
            <Link className="btn btn-primary btn-sm" href="/before-and-after">All Cases <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="portfolio-grid">
          <article className="case-card" data-reveal>
            <div className="case-img">
              <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80" alt="" fill sizes="(max-width:800px) 100vw, 50vw" style={{objectFit:"cover"}} onError={handleImgError} />
            </div>
            <h3>Smile makeover story.</h3>
            <p>A complete cosmetic restoration that took 8 weeks — and changed how she shows up in every photo. Veneers, whitening, and a custom alignment plan.</p>
            <Link className="btn btn-primary btn-sm" href="/before-and-after">Read More <span className="arrow" aria-hidden="true">→</span></Link>
          </article>
          <article className="case-card" data-reveal data-delay="0.1">
            <div className="case-img">
              <Image src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80" alt="" fill sizes="(max-width:800px) 100vw, 50vw" style={{objectFit:"cover"}} onError={handleImgError} />
            </div>
            <h3>Family treatment journey.</h3>
            <p>From toddler cleanings to teen Invisalign — three generations have called us their dental home for over a decade.</p>
            <Link className="btn btn-primary btn-sm" href="/before-and-after">Read More <span className="arrow" aria-hidden="true">→</span></Link>
          </article>
        </div>
      </div>
    </section>
  );
}
