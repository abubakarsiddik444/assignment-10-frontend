"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

const ThemeContext = createContext(null);
let currentTheme = "light";
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getTheme() {
  return currentTheme;
}

function updateTheme(theme) {
  if (currentTheme === theme) return;
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("recipehub-theme", theme);
  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("recipehub-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const resolvedTheme = storedTheme || preferredTheme;
    currentTheme = resolvedTheme;
    document.documentElement.dataset.theme = resolvedTheme;
    listeners.forEach((listener) => listener());
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => updateTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
