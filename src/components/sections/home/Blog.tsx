"use client";
import Image from "next/image";

const posts = [
  { cat: "Family Care", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80", title: "5 tips to make brushing easier for kids.", meta: "May 14 · 4 min read" },
  { cat: "Tips", img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=600&q=80", title: "Healing through routine: why consistency matters.", meta: "May 2 · 6 min read" },
  { cat: "News", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80", title: "Breaking the stigma around dental anxiety.", meta: "Apr 21 · 5 min read" },
];

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function Blog() {
  return (
    <section className="section dark blog-section" id="blog" data-screen-label="09 Blog">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow-mark on-dark" data-reveal>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1l2.4 7.2L21 12l-6.6 1.4L12 23l-2.4-7.2L3 12l6.4-1.4z"/></svg>
              Blog &amp; Resources
            </span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>Tips and stories from our team.</h2>
          </div>
          <div className="head-right" data-reveal data-delay="0.2">
            <a className="btn btn-primary btn-sm" href="#">All Blog <span className="arrow" aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="blog-grid">
          {posts.map((p, i) => (
            <article className="blog-card" key={i} data-reveal>
              <div className="blog-deco" aria-hidden="true">
                <span className="blob b1"></span><span className="blob b2"></span><span className="ring r1"></span><span className="dot d1"></span>
              </div>
              <span className="cat-pill">{p.cat}</span>
              <div className="blog-cutout">
                <Image src={p.img} alt="" fill sizes="130px" style={{objectFit:"cover"}} onError={handleImgError} />
              </div>
              <div className="blog-body">
                <h3>{p.title}</h3>
                <div className="meta-row">
                  <span>{p.meta}</span>
                  <a className="read-link" href="#" aria-label="Read more">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 19L19 5M9 5h10v10"/></svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
