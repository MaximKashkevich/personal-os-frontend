import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CalendarRange,
  ChartNoAxesCombined,
  GraduationCap,
  HardDriveDownload,
  HeartPulse,
  Images,
  Inbox,
  ListTodo,
  Settings2,
  ShieldCheck,
  WalletMinimal,
} from "lucide-react";

type SidebarItem = {
  icon: LucideIcon;
  label: string;
  view: string;
};

type SidebarNavigationGroup = {
  id: string;
  label: string;
  items: readonly SidebarItem[];
};

export const navigationGroups = [
  {
    id: "daily",
    label: "Daily",
    items: [
      { icon: CalendarDays, label: "Today", view: "today" },
      { icon: Inbox, label: "Inbox", view: "inbox" },
    ],
  },
  {
    id: "planning",
    label: "Planning",
    items: [
      { icon: CalendarRange, label: "Planner", view: "planner" },
      { icon: ListTodo, label: "Tasks & projects", view: "tasks" },
    ],
  },
  {
    id: "life",
    label: "Life",
    items: [
      { icon: Images, label: "Memories", view: "memories" },
      { icon: HeartPulse, label: "Health", view: "health" },
      { icon: GraduationCap, label: "Study", view: "study" },
      { icon: WalletMinimal, label: "Finance", view: "finance" },
    ],
  },
  {
    id: "review",
    label: "Review",
    items: [
      { icon: ChartNoAxesCombined, label: "Analytics", view: "insights" },
    ],
  },
] as const satisfies readonly SidebarNavigationGroup[];

export const settingsItems = [
  { icon: Settings2, label: "Appearance", view: "appearance" },
  { icon: ShieldCheck, label: "Security & lock", view: "security" },
  { icon: HardDriveDownload, label: "Data & backups", view: "data" },
] as const satisfies readonly SidebarItem[];

export type NavigationView =
  (typeof navigationGroups)[number]["items"][number]["view"];
export type SettingsView = (typeof settingsItems)[number]["view"];
export type AppView = NavigationView | SettingsView;
