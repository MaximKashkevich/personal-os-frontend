import { useState } from "react";
import { AppTitleBar } from "@/app/AppTitleBar";
import { Sidebar, type AppView } from "@/components/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const viewTitles: Record<AppView, string> = {
  today: "Today",
  inbox: "Inbox",
  planner: "Planner",
  tasks: "Tasks & projects",
  memories: "Memories",
  health: "Health",
  study: "Study",
  finance: "Finance",
  insights: "Analytics",
  appearance: "Appearance",
  security: "Security & lock",
  data: "Data & backups",
};

export function App() {
  const [activeView, setActiveView] = useState<AppView>("today");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="grid h-screen min-h-0 grid-rows-[auto_1fr] bg-background text-foreground">
      <AppTitleBar
        isSidebarVisible={isSidebarVisible}
        onToggleSidebar={() => setIsSidebarVisible((isVisible) => !isVisible)}
      />
      <div className="flex h-full min-h-0">
        <div
          className={`min-h-0 overflow-hidden transition-[width] duration-300 ease-out ${
            isSidebarVisible ? "w-60" : "w-0"
          }`}
        >
          <Sidebar activeView={activeView} onNavigate={setActiveView} />
        </div>
        <main className="relative min-w-0 flex-1">
          <ThemeToggle />
          <section className="px-10 pt-10">
            <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground">
              PERSONAL OS
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {viewTitles[activeView]}
            </h1>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Navigation shell. The screen will appear with the first real
              module.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
