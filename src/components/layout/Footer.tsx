import Link from "next/link";
import { CONTACT_INFO, FOOTER_NAV, PHONE_HREF, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

const CURVE_PATH =
  "M 0 10 L 480 10 Q 540 10 555 35 Q 575 55 600 55 Q 625 55 645 35 Q 660 10 720 10 L 1200 10";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12z" />
    </svg>
  ),
  Twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  ),
  Instagram: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  Linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
};

export default function Footer() {
  return (
    <footer className="footer" data-screen-label="13 Footer">
      <div className="container">
        <svg className="footer-curve top" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
          <path d={CURVE_PATH} fill="none" stroke="rgba(168,184,159,0.30)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        <div className="footer-wordmark-row" data-reveal>
          <span className="footer-mark" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
              <path d="M32 4c-9 0-15 5-15 15 0 12 8 16 8 26 0 4 1 7 4 7s3-3 4-7c1-4 2-4 3 0 1 4 1 7 4 7s4-3 4-7c0-10 8-14 8-26 0-10-7-15-20-15z" />
            </svg>
          </span>
          <span className="footer-wordmark">{SITE_NAME.split(" ")[0]}</span>
        </div>

        <svg className="footer-curve" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
          <path d={CURVE_PATH} fill="none" stroke="rgba(168,184,159,0.30)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        <div className="footer-main centered">
          <div className="footer-center" data-reveal>
            <p className="footer-tagline">
              &ldquo;Heal Your Smile, Change Your Day — Book Your Visit Today.&rdquo;
            </p>
            <div className="footer-cta-row">
              <Link className="btn btn-primary" href="/appointment" data-magnetic>
                Book Appointment <span className="arrow" aria-hidden="true">↗</span>
              </Link>
              <a className="btn btn-outline-cream" href={PHONE_HREF} data-magnetic>
                {CONTACT_INFO.phone} <span className="arrow light" aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="footer-socials">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  aria-label={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SOCIAL_ICONS[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-nav-grid" data-reveal data-delay="0.08">
          {FOOTER_NAV.map((column) => (
            <div className="footer-nav-col" key={column.heading}>
              <h5>{column.heading}</h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <svg className="footer-curve bottom" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
          <path d={CURVE_PATH} fill="none" stroke="rgba(168,184,159,0.30)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        {/* Privacy and Terms live in the Legal column above — not repeated here. */}
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} {SITE_NAME} — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
