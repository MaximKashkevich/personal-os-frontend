import type { TransportId } from "@/constants/transports";
import { transports } from "@/constants/transports";
import { cn } from "@/lib/utils";

type TransportIconProps = {
  className?: string;
  transport: TransportId;
};

export function TransportIcon({ className, transport }: TransportIconProps) {
  const definition = transports[transport];

  if (definition.image) {
    return (
      <img
        alt=""
        aria-hidden="true"
        className={cn("size-10 rounded-xl object-cover", className)}
        src={definition.image}
      />
    );
  }

  const Icon = definition.icon;

  return Icon ? (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-10 place-items-center rounded-xl bg-muted text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  ) : null;
}
