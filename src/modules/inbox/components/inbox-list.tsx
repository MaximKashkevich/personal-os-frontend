import type { InboxItem } from "../inbox-data";
import { inboxRowGridClass } from "../inbox-layout";
import { cn } from "@/lib/utils";
import { InboxCard } from "./inbox-card";

type InboxListProps = {
  isVisible: boolean;
  items: readonly InboxItem[];
  onOpenItem: (item: InboxItem) => void;
};

export function InboxList({ isVisible, items, onOpenItem }: InboxListProps) {
  if (items.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        There are no items in this collection yet.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mt-5 max-w-[76.375rem] overflow-x-auto rounded-2xl bg-card/55 ring-1 ring-border/45 shadow-[0_12px_32px_oklch(0.18_0.02_255_/_0.04)] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-0.5 opacity-0",
      )}
    >
      <div className="min-w-[47rem] overflow-hidden rounded-2xl">
        <div className="border-b border-border/70 bg-muted/25 px-4 py-4 text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          <div className={inboxRowGridClass}>
            <span aria-hidden="true" />
            <span>Capture</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Received</span>
            <span>Attachments</span>
            <span aria-hidden="true" />
          </div>
        </div>
        <div className="grid">
          {items.map((item) => (
            <InboxCard item={item} key={item.id} onOpen={onOpenItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
