import { useEffect, useRef, useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { InboxCollection } from "../inbox-data";

type InboxHeaderProps = {
  collection: InboxCollection;
  onCollectionChange: (collection: InboxCollection) => void;
};

export function InboxHeader({
  collection,
  onCollectionChange,
}: InboxHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <div className="mt-7 flex w-full max-w-[76.375rem] items-center gap-2.5">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search Inbox</span>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-muted-foreground"
        />
        <Input
          aria-label="Search Inbox"
          className="pr-16 pl-10"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search captures"
          ref={searchInputRef}
          type="search"
          value={searchQuery}
        />
        <kbd className="pointer-events-none absolute top-1/2 right-2.5 inline-flex h-6 -translate-y-1/2 items-center whitespace-nowrap rounded-md border border-border/80 bg-muted/70 px-1.5 font-sans text-[11px] font-medium text-muted-foreground shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)]">
          Ctrl + K
        </kbd>
      </label>
      <button
        className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-border/80 bg-card/90 px-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgb(0_0_0_/_0.04),inset_0_1px_0_rgb(255_255_255_/_0.04)] transition-[background-color,border-color,box-shadow] duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        type="button"
      >
        <Plus aria-hidden="true" className="size-4" />
        Add
      </button>
      <div
        aria-label="Inbox collection"
        className="relative grid h-11 shrink-0 grid-cols-2 rounded-xl border border-border/80 bg-muted/55 p-1"
        role="group"
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-background/70 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04),0_1px_3px_rgb(0_0_0_/_0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            collection === "archive" && "translate-x-full",
          )}
        />
        {(
          [
            ["active", "Active"],
            ["archive", "Archive"],
          ] as const
        ).map(([value, label]) => (
          <button
            aria-pressed={collection === value}
            className={cn(
              "relative z-10 cursor-pointer rounded-lg px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              collection === value
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            key={value}
            onClick={() => onCollectionChange(value)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <button
        className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-border/80 bg-card/90 px-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgb(0_0_0_/_0.04),inset_0_1px_0_rgb(255_255_255_/_0.04)] transition-[background-color,border-color,box-shadow] duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        type="button"
      >
        <SlidersHorizontal
          aria-hidden="true"
          className="size-4 text-muted-foreground"
        />
        Filters
      </button>
    </div>
  );
}
