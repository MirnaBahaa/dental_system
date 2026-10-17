"use client";
import Image from "next/image";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function Process() {
  return (
    <section className="section dark process-section" id="process" data-screen-label="05 Process">
      <div className="container">
        <div className="process-head">
          <span className="eyebrow-mark on-dark" data-reveal>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1l2.4 7.2L21 12l-6.6 1.4L12 23l-2.4-7.2L3 12l6.4-1.4z"/></svg>
            Our Process
          </span>
          <h2 className="h-display h2" data-split>Your visit, step by step.</h2>
          <svg className="process-curve" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0 10 L 480 10 Q 540 10 555 35 Q 575 55 600 55 Q 625 55 645 35 Q 660 10 720 10 L 1200 10" fill="none" stroke="rgba(168,184,159,0.32)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="process-grid">
          <div className="process-img" data-reveal-clip>
            <Image src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80" alt="Patient in unhurried consultation" fill sizes="(max-width:900px) 100vw, 45vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
          <div className="process-steps">
            {[
              { num: "/001", title: "Understanding your needs", desc: "We listen first. Tell us what's been worrying you, what you want for your smile, and we'll build from there.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80", delay: 0 },
              { num: "/002", title: "A personalized plan", desc: "We craft a treatment plan around your goals, budget, and timeline — with full transparency on every option.", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80", delay: 0.1 },
              { num: "/003", title: "Gentle, modern care", desc: "Every appointment is unhurried, technology-supported, and built around your comfort — for the long term.", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80", delay: 0.2 },
            ].map((s, i) => (
              <article className="step-card" key={i} data-reveal data-delay={s.delay}>
                <span className="step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="step-img">
                  <Image src={s.img} alt="" fill sizes="(max-width:900px) 100vw, 55vw" style={{objectFit:"cover"}} onError={handleImgError} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
