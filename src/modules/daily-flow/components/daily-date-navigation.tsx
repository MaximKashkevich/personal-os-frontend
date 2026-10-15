import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
});

function parseLocalDate(localDate: string): Date | null {
  const [year, month, day] = localDate.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }
  return new Date(year, month - 1, day);
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftLocalDate(localDate: string, days: number): string {
  const date = parseLocalDate(localDate);
  if (!date) {
    return localDate;
  }
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
}

function getHumanDate(localDate: string): string {
  const date = parseLocalDate(localDate);
  return date ? dateFormatter.format(date) : localDate;
}

type DailyDateNavigationProps = {
  disabled: boolean;
  onChange: (localDate: string) => void;
  selectedDate: string;
  today: string;
};

export function DailyDateNavigation({
  disabled,
  onChange,
  selectedDate,
  today,
}: DailyDateNavigationProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        aria-label="Предыдущий день"
        className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
        onClick={() => onChange(shiftLocalDate(selectedDate, -1))}
        type="button"
      >
        <ChevronLeft size={18} />
      </button>

      <label className="relative inline-flex h-9 min-w-64 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-medium capitalize transition hover:bg-muted focus-within:ring-2 focus-within:ring-ring/25 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
        <CalendarDays
          aria-hidden="true"
          className="text-muted-foreground"
          size={16}
        />
        <span>{getHumanDate(selectedDate)}</span>
        <input
          aria-label="Выбрать дату"
          className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          type="date"
          value={selectedDate}
        />
      </label>

      <button
        aria-label="Следующий день"
        className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
        onClick={() => onChange(shiftLocalDate(selectedDate, 1))}
        type="button"
      >
        <ChevronRight size={18} />
      </button>

      {selectedDate !== today ? (
        <button
          className="h-9 rounded-xl px-3 text-sm font-medium text-accent transition hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
          onClick={() => onChange(today)}
          type="button"
        >
          Сегодня
        </button>
      ) : null}
    </div>
  );
}
