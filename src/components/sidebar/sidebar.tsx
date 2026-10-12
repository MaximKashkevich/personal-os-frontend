import type { AppView } from "./sidebar-data";
import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarProfileMenu } from "./sidebar-profile-menu";

type SidebarProps = {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
};

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full min-h-0 w-60 shrink-0 flex-col border-r border-border bg-surface py-4 transition-[background-color,border-color] duration-300 ease-out">
      <SidebarNavigation activeView={activeView} onNavigate={onNavigate} />
      <SidebarProfileMenu onNavigate={onNavigate} />
    </aside>
  );
}
