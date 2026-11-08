"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#tentang", label: "Tentang" },
  { href: "#belajar", label: "Alur belajar" },
  { href: "#kurikulum", label: "Kurikulum" },
  { href: "#faq", label: "FAQ" },
  { href: "#kelas", label: "Jelajahi kelas ↗" }
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="mobile-menu" ref={menuRef}>
      <button
        type="button"
        className="mobile-menu-trigger"
        aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-controls="mobile-navigation"
        aria-expanded={open}
        ref={buttonRef}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span />
      </button>
      <nav id="mobile-navigation" aria-label="Navigasi seluler" hidden={!open}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
      </nav>
    </div>
  );
}
