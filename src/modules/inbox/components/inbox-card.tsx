import { CheckCircle2, Circle, MoreHorizontal, Paperclip } from "lucide-react";
import { TransportIcon } from "@/components/transport-icon";
import { cn } from "@/lib/utils";
import type { InboxItem } from "../inbox-data";
import { inboxRowGridClass } from "../inbox-layout";
import { getInboxContentPreview } from "../inbox-text";

type InboxCardProps = {
  item: InboxItem;
  onOpen: (item: InboxItem) => void;
};

const priorityLabel = {
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "No priority",
} as const;

const priorityClass = {
  high: "bg-danger/10 text-danger",
  medium: "bg-warning/12 text-warning",
  low: "bg-success/10 text-success",
  none: "bg-muted text-muted-foreground",
} as const;

export function InboxCard({ item, onOpen }: InboxCardProps) {
  const isCompleted = item.status === "completed";

  return (
    <button
      aria-label={`Open “${item.content}”`}
      className="group w-full cursor-pointer border-b border-border/70 px-4 py-4 text-left transition-colors duration-200 hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      onClick={() => onOpen(item)}
      type="button"
    >
      <span className={inboxRowGridClass}>
        <TransportIcon transport={item.source} />
        <span
          className={cn(
            "block truncate text-sm text-foreground",
            isCompleted && "text-muted-foreground line-through",
          )}
        >
          {getInboxContentPreview(item.content)}
        </span>
        <span
          className={cn(
            "inline-flex w-fit justify-self-start items-center gap-1.5 text-sm",
            isCompleted
              ? "rounded-lg bg-success/10 px-2.5 py-1.5 text-success"
              : "text-muted-foreground",
          )}
        >
          {isCompleted ? (
            <CheckCircle2 aria-hidden="true" className="size-4" />
          ) : (
            <Circle aria-hidden="true" className="size-4" />
          )}
          {isCompleted ? "Completed" : "Pending"}
        </span>
        <span
          className={cn(
            "inline-flex w-fit justify-self-start items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm",
            priorityClass[item.priority],
          )}
        >
          <span className="size-2 shrink-0 rounded-full bg-current" />
          {priorityLabel[item.priority]}
        </span>
        <span className="text-sm whitespace-nowrap text-muted-foreground">
          {item.capturedAt}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          {item.attachmentCount ? (
            <>
              <Paperclip aria-hidden="true" className="size-4" />
              {item.attachmentCount}
            </>
          ) : (
            "—"
          )}
        </span>
        <MoreHorizontal
          aria-hidden="true"
          className="size-5 text-muted-foreground opacity-65 transition-opacity group-hover:opacity-100"
        />
      </span>
    </button>
  );
}
