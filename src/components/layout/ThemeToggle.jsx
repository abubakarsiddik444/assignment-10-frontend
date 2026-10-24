"use client";

import { Moon, Sun } from "@gravity-ui/icons";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className="inline-flex size-[42px] items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-800 transition hover:-translate-y-px hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
