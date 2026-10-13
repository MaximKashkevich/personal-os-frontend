import { Bot, Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { InboxItem } from "../inbox-data";

type InboxItemDialogProps = {
  item: InboxItem | null;
  onOpenChange: (isOpen: boolean) => void;
};

export function InboxItemDialog({ item, onOpenChange }: InboxItemDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={item !== null}>
      {item ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inbox item</DialogTitle>
            <DialogDescription>
              Captured {item.capturedAt} via {item.sourceLabel}
            </DialogDescription>
          </DialogHeader>

          <section className="rounded-xl border border-border/80 bg-muted/45 p-4">
            <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Original capture
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {item.content}
            </p>
          </section>

          <section className="rounded-xl border border-accent/25 bg-accent/7 p-4">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-accent/12 text-accent">
                <Bot aria-hidden="true" className="size-4" />
              </span>
              <div>
                <h2 className="text-sm font-semibold">AI formatting</h2>
                <p className="text-xs text-muted-foreground">
                  Creates a separate draft without changing the original
                  capture.
                </p>
              </div>
            </div>
            <button
              className="mt-4 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-accent px-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              type="button"
            >
              <Sparkles aria-hidden="true" className="size-4" />
              Create draft
            </button>
          </section>

          <DialogFooter>
            <button
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border/80 bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              <Check aria-hidden="true" className="size-4" />
              Done
            </button>
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
