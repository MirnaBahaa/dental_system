"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsScrolled } from "@/hooks/useAnimatedCounter";
import { CONTACT_INFO, NAV_ITEMS, PHONE_HREF, SITE_NAME } from "@/lib/constants";

export default function Nav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const scrolled = useIsScrolled(60);
  const pathname = usePathname();

  // A link is active for its own route and for anything nested beneath it.
  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <Link className="logo" href="/">
          <span className="logo-mark" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2c-3.5 0-5.5 2-5.5 5.5C6.5 12 9 14 9 18c0 2 .5 4 1.5 4s1-2 1.5-4c.5-2 1-2 1.5 0 .5 2 .5 4 1.5 4s1.5-2 1.5-4c0-4 2.5-6 2.5-10.5C17.5 4 15.5 2 12 2z" />
            </svg>
          </span>
          {SITE_NAME.split(" ")[0]}
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) =>
            item.children?.length ? (
              <span className="nav-item" key={item.label}>
                {/* A hubless group has no page — render a disclosure button so
                    the parent never duplicates its own first child's link. */}
                {item.hubless ? (
                  <button className="nav-trigger has-caret" type="button" aria-haspopup="true">
                    {item.label}
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`has-caret${isActive(item.href) ? " active" : ""}`}
                  >
                    {item.label}
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </Link>
                )}
                <span className="nav-dropdown">
                  <span className="nav-dropdown-inner">
                    {item.children.map((child) => (
                      <Link href={child.href} key={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </span>
                </span>
              </span>
            ) : (
              <Link
                href={item.href}
                key={item.href}
                className={isActive(item.href) ? "active" : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="nav-right">
          <a className="call" href={PHONE_HREF}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {CONTACT_INFO.phone}
          </a>
          <Link className="btn btn-primary btn-sm nav-cta" href="/appointment">
            Book a Visit
          </Link>
          <button className="nav-hamb" aria-label="Open menu" onClick={onMenuOpen}>
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
