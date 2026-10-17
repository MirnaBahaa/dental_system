"use client";
import Image from "next/image";

const tiles = [
  { cls: "g1", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80" },
  { cls: "g2", src: "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?auto=format&fit=crop&w=700&q=80" },
  { cls: "g3", src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80" },
  { cls: "g4", src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=700&q=80" },
  { cls: "g5", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&q=80" },
  { cls: "g6", src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80" },
  { cls: "g7", src: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=700&q=80" },
  { cls: "g8", src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=700&q=80" },
];

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function Gallery() {
  return (
    <section className="section dark gallery-section" id="gallery" data-screen-label="12 Gallery">
      <div className="container">
        <div className="gallery-head">
          <span className="eyebrow-mark on-dark" data-reveal>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1l2.4 7.2L21 12l-6.6 1.4L12 23l-2.4-7.2L3 12l6.4-1.4z"/></svg>
            Gallery
          </span>
          <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>Moments from our practice.</h2>
        </div>
      </div>

      <div className="gallery-grid">
        {tiles.map((t, i) => (
          <div key={i} className={`g-tile ${t.cls}`}>
            <Image src={t.src} alt="" fill sizes="(max-width:600px) 50vw, (max-width:1024px) 33vw, 20vw" style={{objectFit:"cover"}} onError={handleImgError} />
          </div>
        ))}
      </div>
      <div className="gallery-fade" aria-hidden="true"></div>
    </section>
  );
}
