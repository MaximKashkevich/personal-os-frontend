import { navigationGroups, type AppView } from "./sidebar-data";
import { cn } from "@/lib/utils";

type SidebarNavigationProps = {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
};

const navItemClassName =
  "group flex h-10 w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 text-left text-[15px] font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export function SidebarNavigation({
  activeView,
  onNavigate,
}: SidebarNavigationProps) {
  return (
    <nav
      aria-label="Primary navigation"
      className="min-h-0 flex-1 space-y-7 px-4"
    >
      {navigationGroups.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-label`}>
          <h2
            id={`${group.id}-label`}
            className="mb-2 px-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground"
          >
            {group.label}
          </h2>
          <div className="space-y-0.5">
            {group.items.map(({ icon: Icon, label, view }) => {
              const isActive = activeView === view;

              return (
                <button
                  key={view}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "sidebar-nav-item",
                    navItemClassName,
                    isActive
                      ? "bg-accent/12 text-accent shadow-[inset_0_1px_0_rgb(255_255_255_/_0.14)]"
                      : "text-muted-foreground hover:bg-muted/75 hover:text-foreground",
                  )}
                  data-motion={view}
                  onClick={() => onNavigate(view)}
                  type="button"
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "sidebar-nav-icon size-5 shrink-0 stroke-[1.8] transition-colors duration-200 ease-out",
                      isActive ? "text-accent" : "text-muted-foreground",
                    )}
                  />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </nav>
  );
}
