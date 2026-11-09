"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try { const saved = localStorage.getItem("rw-theme"); const next = saved === "dark" || (saved === null && window.matchMedia("(prefers-color-scheme: dark)").matches); setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; } catch { /* retain light theme */ }
  }, []);
  function toggle() { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; try { localStorage.setItem("rw-theme", next ? "dark" : "light"); } catch { /* session only */ } }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={dark ? "Aktifkan tema terang" : "Aktifkan tema gelap"} aria-pressed={dark} title={dark ? "Tema terang" : "Tema gelap"}>{dark ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z"/></svg>}<span>{dark ? "Terang" : "Gelap"}</span></button>;
}
