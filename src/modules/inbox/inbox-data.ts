import type { TransportId } from "@/constants/transports";

export type InboxCollection = "active" | "archive";
export type InboxPriority = "high" | "medium" | "low" | "none";
export type InboxSource = TransportId;
export type InboxStatus = "pending" | "completed";

export type InboxItem = {
  attachmentCount?: number;
  capturedAt: string;
  collection: InboxCollection;
  content: string;
  id: string;
  priority: InboxPriority;
  source: InboxSource;
  sourceLabel: string;
  status: InboxStatus;
};

export const mockInboxItems: readonly InboxItem[] = [
  {
    id: "website-idea",
    content: "Create a work examples page with a clear contact form.",
    status: "pending",
    priority: "high",
    source: "telegram",
    sourceLabel: "Telegram",
    attachmentCount: 2,
    capturedAt: "Today, 14:25",
    collection: "active",
  },
  {
    id: "doctor-appointment",
    content: "Check available dates and confirm insurance details.",
    status: "pending",
    priority: "medium",
    source: "shortcut",
    sourceLabel: "iPhone Shortcut",
    attachmentCount: 1,
    capturedAt: "Today, 11:03",
    collection: "active",
  },
  {
    id: "water-filter",
    content: "Compare models, prices, and replacement cartridges.",
    status: "pending",
    priority: "low",
    source: "desktop",
    sourceLabel: "Приложение на компьютере",
    capturedAt: "Yesterday, 18:40",
    collection: "active",
  },
  {
    id: "university-documents",
    content: "Prepare and send the required documents by Friday.",
    status: "pending",
    priority: "high",
    source: "telegram",
    sourceLabel: "Telegram",
    capturedAt: "September 12, 10:12",
    collection: "active",
  },
  {
    id: "resume-update",
    content: "Add recent projects and update listed skills.",
    status: "completed",
    priority: "medium",
    source: "desktop",
    sourceLabel: "Desktop app",
    capturedAt: "September 11, 16:03",
    collection: "active",
  },
  {
    id: "weekly-finance-review",
    content:
      "Review this week's card transactions, add a note to each unfamiliar payment, and reconcile the remaining balance before Sunday.",
    status: "pending",
    priority: "high",
    source: "telegram",
    sourceLabel: "Telegram",
    attachmentCount: 3,
    capturedAt: "September 10, 19:18",
    collection: "active",
  },
  {
    id: "call-mum",
    content: "Call mum.",
    status: "pending",
    priority: "medium",
    source: "shortcut",
    sourceLabel: "iPhone Shortcut",
    capturedAt: "September 10, 18:02",
    collection: "active",
  },
  {
    id: "voice-note-routine",
    content:
      "Voice note: move the morning walk before breakfast and keep the phone out of the bedroom overnight.",
    status: "pending",
    priority: "low",
    source: "shortcut",
    sourceLabel: "iPhone Shortcut",
    attachmentCount: 1,
    capturedAt: "September 9, 08:35",
    collection: "active",
  },
  {
    id: "book-train-tickets",
    content: "Book train tickets to Minsk for the weekend.",
    status: "completed",
    priority: "medium",
    source: "desktop",
    sourceLabel: "Desktop app",
    capturedAt: "September 8, 12:46",
    collection: "active",
  },
  {
    id: "read-article",
    content:
      "Read the article about local-first application architecture and save the useful notes for the Personal OS project.",
    status: "pending",
    priority: "none",
    source: "telegram",
    sourceLabel: "Telegram",
    attachmentCount: 1,
    capturedAt: "September 7, 21:10",
    collection: "active",
  },
  {
    id: "photo-backup",
    content: "Sort the latest photos and create an encrypted backup.",
    status: "completed",
    priority: "low",
    source: "desktop",
    sourceLabel: "Desktop app",
    attachmentCount: 24,
    capturedAt: "September 6, 15:24",
    collection: "active",
  },
  {
    id: "trip-notes",
    content: "Saved places, routes, and the weekend budget.",
    status: "completed",
    priority: "none",
    source: "telegram",
    sourceLabel: "Telegram",
    capturedAt: "September 3, 09:40",
    collection: "archive",
  },
  {
    id: "old-purchase",
    content: "Compare options for the desk setup.",
    status: "completed",
    priority: "low",
    source: "shortcut",
    sourceLabel: "iPhone Shortcut",
    capturedAt: "August 28, 20:15",
    collection: "archive",
  },
];
