import { createContext } from "react";
import type {
  AccentTheme,
  ResolvedTheme,
  ThemeMode,
} from "@/app/providers/ThemeProvider";

export type ThemeContextValue = {
  accent: AccentTheme;
  resolvedTheme: ResolvedTheme;
  setAccent: (accent: AccentTheme) => void;
  setThemeMode: (mode: ThemeMode) => void;
  themeMode: ThemeMode;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
