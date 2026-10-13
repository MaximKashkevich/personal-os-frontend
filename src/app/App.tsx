import { useState } from "react";
import { AppPageLayout } from "@/app/AppPageLayout";
import { AppTitleBar } from "@/app/AppTitleBar";
import { Sidebar, type AppView } from "@/components/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { InboxPage } from "@/modules/inbox";

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
    <div className="grid h-screen min-h-0 grid-rows-[auto_1fr] bg-background text-foreground transition-[background-color] duration-300 ease-out">
      <AppTitleBar
        isSidebarVisible={isSidebarVisible}
        onToggleSidebar={() => setIsSidebarVisible((isVisible) => !isVisible)}
      />
      <div className="flex h-full min-h-0">
        <div
          className={`min-h-0 overflow-hidden border-r transition-[width,border-color] duration-[360ms] ease-out ${
            isSidebarVisible
              ? "w-52 border-border/80"
              : "w-0 border-transparent"
          }`}
        >
          <Sidebar activeView={activeView} onNavigate={setActiveView} />
        </div>
        <main className="min-w-0 flex-1 overflow-y-auto scroll-smooth bg-surface transition-[background-color] duration-300 ease-out [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <AppPageLayout
            actions={<ThemeToggle />}
            title={viewTitles[activeView]}
          >
            {activeView === "inbox" ? <InboxPage /> : null}
          </AppPageLayout>
        </main>
      </div>
    </div>
  );
}
