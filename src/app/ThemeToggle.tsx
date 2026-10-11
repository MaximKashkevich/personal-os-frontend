import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/useTheme";

export function ThemeToggle() {
  const { resolvedTheme, setThemeMode } = useTheme();
  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    setThemeMode(isDark ? "light" : "dark");
  }

  return (
    <div className="absolute top-4 right-5 flex items-center gap-2.5">
      <Sun
        aria-hidden="true"
        className={`size-5 transition-all duration-300 ease-out ${
          isDark
            ? "scale-75 -rotate-45 text-muted-foreground/60"
            : "scale-100 rotate-0 text-foreground"
        }`}
      />
      <button
        aria-checked={isDark}
        aria-label={
          isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"
        }
        className="relative h-8 w-14 shrink-0 cursor-pointer rounded-full bg-muted p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.14)] transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={toggleTheme}
        role="switch"
        type="button"
      >
        <span
          aria-hidden="true"
          className={`block size-6 rounded-full bg-background shadow-[0_1px_4px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-out ${
            isDark ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <Moon
        aria-hidden="true"
        className={`size-5 transition-all duration-300 ease-out ${
          isDark
            ? "scale-100 rotate-0 text-foreground"
            : "scale-75 rotate-45 text-muted-foreground/60"
        }`}
      />
    </div>
  );
}
