import { AppTitleBar } from "@/app/AppTitleBar";
import { ThemeToggle } from "@/app/ThemeToggle";

export function App() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] bg-background text-foreground">
      <AppTitleBar />
      <main className="relative">
        <ThemeToggle />
      </main>
    </div>
  );
}
