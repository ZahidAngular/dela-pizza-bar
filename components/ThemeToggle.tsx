"use client";

import { Moon, Sun } from "lucide-react";

export type Theme = "dark" | "light";

/**
 * Runs before paint so the stored theme is applied without a flash.
 * Kept as a string so it can be inlined in <head> from the server.
 */
export const themeInitScript = `
(function(){
  try {
    var s = localStorage.getItem('dela-theme');
    var t = s === 'light' || s === 'dark'
      ? s
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

/**
 * The icon that shows is driven by `[data-theme]` in CSS rather than React
 * state, so there is nothing to hydrate and no wrong-icon flash on load.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next: Theme =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("dela-theme", next);
    } catch {
      /* storage unavailable — the toggle still works for this session */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Switch between light and dark mode"
      className={`flex h-10 w-10 items-center justify-center border border-cream/18 text-cream/75 transition-colors duration-400 hover:border-gold hover:text-gold ${className}`}
    >
      <Sun className="theme-icon-sun h-4 w-4" strokeWidth={1.5} />
      <Moon className="theme-icon-moon h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}
