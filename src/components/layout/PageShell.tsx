"use client";
import { useState } from "react";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => { setMenuOpen(true); document.body.style.overflow = "hidden"; };
  const closeMenu = () => { setMenuOpen(false); document.body.style.overflow = ""; };

  return (
    <>
      <Nav onMenuOpen={openMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      {children}
    </>
  );
}
