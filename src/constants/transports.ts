import { Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import shortcutIcon from "@/assets/transports/shortcut.png";
import telegramIcon from "@/assets/transports/telegram.png";

export type TransportId = "telegram" | "desktop" | "shortcut";

type TransportDefinition = {
  icon?: LucideIcon;
  image?: string;
  label: string;
};

export const transports: Record<TransportId, TransportDefinition> = {
  telegram: { image: telegramIcon, label: "Telegram" },
  desktop: { icon: Monitor, label: "Desktop app" },
  shortcut: { image: shortcutIcon, label: "iPhone Shortcut" },
};
