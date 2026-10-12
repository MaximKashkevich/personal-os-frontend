import { ChevronDown } from "lucide-react";
import { settingsItems, type AppView } from "./sidebar-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SidebarProfileMenuProps = {
  onNavigate: (view: AppView) => void;
};

const profileName = "Maxim";
const profileInitial = profileName.slice(0, 1).toUpperCase();

export function SidebarProfileMenu({ onNavigate }: SidebarProfileMenuProps) {
  return (
    <div className="mt-5 border-t border-border pt-3">
      <div className="px-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="group flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-2 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              type="button"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-semibold text-accent-foreground">
                {profileInitial}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-foreground">
                  {profileName}
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className="size-[17px] shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[var(--radix-dropdown-menu-trigger-width)]"
            side="top"
          >
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            {settingsItems.map(({ icon: Icon, label, view }) => (
              <DropdownMenuItem
                key={view}
                onSelect={() => {
                  onNavigate(view);
                }}
              >
                <Icon
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
