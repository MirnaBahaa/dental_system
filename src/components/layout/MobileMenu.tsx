"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT_INFO, NAV_ITEMS, PHONE_HREF } from "@/lib/constants";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (href: string) => setExpanded(expanded === href ? null : href);

  return (
    <div className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
      <button className="close" aria-label="Close menu" onClick={onClose}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <nav>
        {NAV_ITEMS.map((item) =>
          item.children?.length ? (
            <div
              className={`mm-group${expanded === item.label ? " open" : ""}`}
              key={item.label}
            >
              {/* The label is its own link so the hub page stays reachable on
                  mobile; the +/- is a separate control. Hubless groups have no
                  page, so their label is plain text. */}
              <div className="mm-head">
                {item.hubless ? (
                  <span>{item.label}</span>
                ) : (
                  <Link href={item.href} onClick={onClose}>
                    {item.label}
                  </Link>
                )}
                <button
                  className="mm-toggle"
                  type="button"
                  onClick={() => toggle(item.label)}
                  aria-expanded={expanded === item.label}
                  aria-label={`${expanded === item.label ? "Collapse" : "Expand"} ${item.label} menu`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              <div className="mm-sub">
                {item.children.map((child) => (
                  <Link href={child.href} key={child.href} onClick={onClose}>
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link href={item.href} key={item.href} onClick={onClose}>
              {item.label}
            </Link>
          )
        )}
      </nav>

      <div className="footer-cta">
        <Link className="btn btn-primary" href="/appointment" onClick={onClose}>
          Book Appointment <span className="arrow">→</span>
        </Link>
        <a className="btn btn-outline-cream" href={PHONE_HREF}>
          Call {CONTACT_INFO.phone}
        </a>
      </div>
    </div>
  );
}
