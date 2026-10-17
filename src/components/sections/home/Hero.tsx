"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" id="hero" data-screen-label="01 Hero">
      <span className="hero-grain"></span>
      <div className="hero-fade" aria-hidden="true"></div>

      <div className="hero-grid">
        <div className="side-col left">
          <div className="tile side-top">
            <Image src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=700&q=80" alt="" fill sizes="(max-width:1024px) 80px, 140px" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
          <div className="tile side-bot">
            <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80" alt="" fill sizes="(max-width:1024px) 80px, 140px" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
        </div>

        <div className="hero-text">
          <div className="trust-eyebrow">
            <span className="avatar-stack" aria-hidden="true">
              <span className="av"><Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="" width={30} height={30} style={{objectFit:"cover"}} onError={handleImgError} /></span>
              <span className="av"><Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="" width={30} height={30} style={{objectFit:"cover"}} onError={handleImgError} /></span>
              <span className="av"><Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" alt="" width={30} height={30} style={{objectFit:"cover"}} onError={handleImgError} /></span>
              <span className="av"><Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="" width={30} height={30} style={{objectFit:"cover"}} onError={handleImgError} /></span>
            </span>
            <span className="trust-label"><strong>3,000+</strong> Trusted Patients</span>
          </div>
          <h1 className="h-display hero" data-split>Empower your smile journey.</h1>
          <p className="sub">Modern, gentle dental care that meets you where you are. By nurturing strong habits, easing anxiety, and treating every visit as a relationship — we make dentistry feel calm, considered, and yours.</p>
        </div>

        <div className="hero-ctas">
          <a className="btn btn-primary" href="#book" data-magnetic>
            Book Appointment <span className="arrow" aria-hidden="true">↗</span>
          </a>
          <a className="btn btn-outline-cream" href="#team" data-magnetic>
            Meet Our Team <span className="arrow light" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="side-col right">
          <div className="tile side-top">
            <Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80" alt="" fill sizes="(max-width:1024px) 80px, 140px" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
          <div className="tile side-bot">
            <Image src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=600&q=80" alt="" fill sizes="(max-width:1024px) 80px, 140px" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
        </div>

        <div className="center-col c2">
          <div className="tile center-top">
            <Image src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80" alt="" fill sizes="33vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
          <div className="tile center-bot">
            <Image src="https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?auto=format&fit=crop&w=700&q=80" alt="" fill sizes="33vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
        </div>

        <div className="center-col c3">
          <div className="icon-circles" aria-hidden="true">
            <a href="mailto:hello@verda.dental" className="icon-btn" aria-label="Email us">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            </a>
            <a href="tel:5550142200" className="icon-btn" aria-label="Call us">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
          </div>
          <div className="tile center-mid">
            <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80" alt="" fill sizes="33vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
          <div className="tile center-clipped">
            <Image src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80" alt="" fill sizes="33vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
        </div>

        <div className="center-col c4">
          <div className="tile center-top">
            <Image src="https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=700&q=80" alt="" fill sizes="33vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
          <div className="tile center-bot">
            <Image src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=700&q=80" alt="" fill sizes="33vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
        </div>
      </div>
    </section>
  );
}

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  const palettes: [string, string][] = [
    ["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],
    ["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"],
  ];
  const c = palettes[Math.abs(img.src.length) % palettes.length];
  img.style.display = "none";
  const p = img.parentElement;
  if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}
