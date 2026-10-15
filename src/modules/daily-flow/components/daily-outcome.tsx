type DailyOutcomeProps = {
  disabled: boolean;
  onChange: (text: string) => void;
  text: string;
};

export function DailyOutcome({ disabled, onChange, text }: DailyOutcomeProps) {
  return (
    <div className="space-y-2">
      <textarea
        className="min-h-36 w-full resize-y rounded-xl border border-border/80 bg-card/90 px-3 py-2.5 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={disabled}
        maxLength={10000}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Несколько слов о том, как прошёл день"
        value={text}
      />
      <p className="text-right text-xs text-muted-foreground">
        {text.length} / 10 000
      </p>
    </div>
  );
}
