"use client";
import Image from "next/image";
import Link from "next/link";

const services = [
  { img: "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?auto=format&fit=crop&w=600&q=80", title: "Family Care", desc: "Calm, gentle visits — for every age in the household.", href: "/services/general-dentistry", delay: 0 },
  { img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80", title: "Cosmetic Care", desc: "Whitening, veneers, and bonding — natural-looking results.", href: "/services/cosmetic-dentistry", delay: 0.08 },
  { img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=80", title: "Emergency Care", desc: "Same-day visits when it hurts. We make room for urgent needs.", href: "/services/emergency-dentistry", delay: 0.16 },
  { img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80", title: "Invisalign", desc: "Modern, discreet smile correction — for teens and adults.", href: "/services/orthodontics/clear-aligners-ortho", delay: 0.05 },
  { img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80", title: "Sedation Options", desc: "Comfort-first care for anxious or sensitive patients.", href: "/services/oral-surgery", delay: 0.13 },
  { img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80", title: "Routine Hygiene", desc: "The foundation of every healthy smile — unhurried cleanings.", href: "/services/general-dentistry/teeth-cleaning", delay: 0.21 },
];

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function Services() {
  return (
    <section className="section dark" id="services" data-screen-label="04 Services">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow on-dark" data-reveal>Our Services</span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>Modern dental care, gently delivered.</h2>
          </div>
          <div className="head-right" data-reveal data-delay="0.2">
            <Link className="btn btn-primary btn-sm" href="/services">All Services <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <Link className="service-card" href={s.href} key={i} data-reveal data-delay={s.delay}>
              <div className="thumb">
                <Image src={s.img} alt="" fill sizes="(max-width:580px) 100vw, (max-width:960px) 50vw, 33vw" style={{objectFit:"cover"}} onError={handleImgError} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="read-more">Read More <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
