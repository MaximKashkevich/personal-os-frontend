import type { AppView } from "./sidebar-data";
import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarProfileMenu } from "./sidebar-profile-menu";

type SidebarProps = {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
};

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full min-h-0 w-52 shrink-0 flex-col bg-surface py-5 transition-[background-color] duration-300 ease-out">
      <SidebarNavigation activeView={activeView} onNavigate={onNavigate} />
      <SidebarProfileMenu onNavigate={onNavigate} />
    </aside>
  );
}
