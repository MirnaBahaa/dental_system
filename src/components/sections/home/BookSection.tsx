"use client";
import Image from "next/image";
import Link from "next/link";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget; const palettes: [string,string][] = [["#3a5d4a","#1f2d26"],["#7c8a55","#3a5d4a"],["#c9b78f","#8b7e5a"],["#a8b89f","#5c6b5c"],["#d4af8a","#7a5c45"],["#5c6b5c","#2f3e36"]];
  const c = palettes[Math.abs(img.src.length) % palettes.length]; img.style.display = "none";
  const p = img.parentElement; if (p) p.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export default function BookSection() {
  return (
    <section className="section book-section" id="book" data-screen-label="11 Book">
      <div className="container">
        <div className="book-card">
          <div className="book-left">
            <h2 className="book-headline" data-split-words>
              Book Your{" "}
              <span className="inline-pill-img">
                <Image src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=320&q=80" alt="" fill sizes="130px" style={{objectFit:"cover"}} onError={handleImgError} />
              </span>
              {" "}Smile Visit Today!
            </h2>

            <div className="book-subcard" data-reveal>
              <div className="book-subcard-img">
                <Image src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80" alt="Dentist and patient in calm consultation" fill sizes="380px" style={{objectFit:"cover"}} onError={handleImgError} />
              </div>
              <p className="book-subcard-stat">98% Patient Check-In Rate!</p>
              <Link className="btn btn-primary book-cta" href="/appointment" data-magnetic>
                Appointment! <span className="arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="book-right" data-reveal-clip>
            <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80" alt="Calm, smiling patient" fill sizes="(max-width:900px) 100vw, 60vw" style={{objectFit:"cover"}} onError={handleImgError} />
            <svg className="book-curve-deco" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 50 0 Q 200 200 350 50 Q 400 200 250 400 Q 100 600 0 500" fill="none" stroke="rgba(244,241,232,0.06)" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
