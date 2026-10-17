"use client";
import Image from "next/image";
import Link from "next/link";

const team = [
  { img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80", name: "Dr. Sarah Chen", role: "Lead Dentist · DDS", bio: "Verda's founder. 15 years specializing in family and cosmetic care.", delay: 0 },
  { img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80", name: "Dr. James Park", role: "Associate · Cosmetic Dentistry", bio: "Specializes in veneers, bonding, and full smile design.", delay: 0.08 },
  { img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80", name: "Dr. Amara Okafor", role: "Pediatric Dentist", bio: "Makes first visits genuinely fun — kids ask for her by name.", delay: 0.16 },
  { img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=700&q=80", name: "Maya Rodriguez", role: "Lead Hygienist", bio: "Eight years with the practice. Our patients' favorite cleaning.", delay: 0.05 },
  { img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&q=80", name: "Ben Whitford", role: "Dental Assistant", bio: "Behind every smooth appointment. Calm under pressure.", delay: 0.13 },
  { img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80", name: "Lila Hansen", role: "Patient Coordinator", bio: "The voice you'll hear first. Knows every insurance plan inside out.", delay: 0.21 },
];

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function Team() {
  return (
    <section className="section dark" id="team" data-screen-label="08 Team">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow on-dark" data-reveal>The Team</span>
            <h2 className="h-display h2" data-split style={{ color: "var(--cream-text)" }}>The people behind your smile.</h2>
          </div>
          <div className="head-right" data-reveal data-delay="0.2">
            <Link className="btn btn-primary btn-sm" href="/about#team">All Team Members <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="team-grid">
          {team.map((m, i) => (
            <article className="team-card" key={i} data-reveal-clip data-delay={m.delay}>
              <Image src={m.img} alt="" fill sizes="(max-width:520px) 100vw, (max-width:880px) 50vw, 33vw" style={{objectFit:"cover"}} onError={handleImgError} />
              <span className="name-pill">{m.name}</span>
              <span className="plus" aria-hidden="true">+</span>
              <div className="overlay">
                <div className="role">{m.role}</div>
                <p className="bio">{m.bio}</p>
                <Link className="bio-link" href="/about#doctors">Read Bio →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
