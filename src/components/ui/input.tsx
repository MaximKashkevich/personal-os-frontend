import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<
  ElementRef<"input">,
  ComponentPropsWithoutRef<"input">
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-11 w-full min-w-0 rounded-xl border border-border/80 bg-card/90 px-3 py-2 text-sm text-foreground shadow-[0_1px_2px_rgb(0_0_0_/_0.04),inset_0_1px_0_rgb(255_255_255_/_0.04)] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden",
      "hover:border-muted-foreground/45 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
