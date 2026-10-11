import { type ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "@/app/providers/ThemeContext";

const THEME_STORAGE_KEY = "personal-os.theme-mode";
const ACCENT_STORAGE_KEY = "personal-os.accent";

export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = Exclude<ThemeMode, "system">;
export type AccentTheme = "violet" | "blue" | "emerald";

function getStoredThemeMode(): ThemeMode {
  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  return value === "light" || value === "dark" || value === "system"
    ? value
    : "system";
}

function getStoredAccent(): AccentTheme {
  const value = window.localStorage.getItem(ACCENT_STORAGE_KEY);
  return value === "blue" || value === "emerald" || value === "violet"
    ? value
    : "violet";
}

function resolveTheme(mode: ThemeMode, prefersDark: boolean): ResolvedTheme {
  return mode === "system" ? (prefersDark ? "dark" : "light") : mode;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode);
  const [accent, setAccent] = useState<AccentTheme>(getStoredAccent);
  const [prefersDark, setPrefersDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const resolvedTheme = resolveTheme(themeMode, prefersDark);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) =>
      setPrefersDark(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.accent = accent;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [accent, resolvedTheme]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    window.localStorage.setItem(ACCENT_STORAGE_KEY, accent);
  }, [accent]);

  const value = useMemo(
    () => ({ accent, resolvedTheme, setAccent, setThemeMode, themeMode }),
    [accent, resolvedTheme, themeMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
