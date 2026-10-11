import { Maximize2, Minus, X } from "lucide-react";

type WindowAction = "close" | "minimize" | "toggleMaximize";

const windowControls = [
  { action: "minimize", icon: Minus, label: "Свернуть окно" },
  { action: "toggleMaximize", icon: Maximize2, label: "Развернуть окно" },
  { action: "close", icon: X, label: "Закрыть окно" },
] satisfies ReadonlyArray<{
  action: WindowAction;
  icon: typeof Minus;
  label: string;
}>;

async function controlWindow(action: WindowAction) {
  const { getCurrentWindow } = await import("@tauri-apps/api/window");
  await getCurrentWindow()[action]();
}

async function startWindowDrag() {
  const { getCurrentWindow } = await import("@tauri-apps/api/window");
  await getCurrentWindow().startDragging();
}

export function AppTitleBar() {
  return (
    <header
      className="group flex h-8 shrink-0 items-center justify-between border-b border-border bg-surface px-3 text-foreground transition-[background-color,color,border-color] duration-300 ease-out"
      onMouseDown={(event) => {
        if (
          event.button !== 0 ||
          (event.target instanceof Element && event.target.closest("button"))
        ) {
          return;
        }

        void startWindowDrag();
      }}
    >
      <div aria-hidden="true" className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgb(0_0_0_/_0.14)]" />
        <span className="size-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgb(0_0_0_/_0.14)]" />
        <span className="size-2.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgb(0_0_0_/_0.14)]" />
      </div>
      <div
        aria-label="Управление окном"
        className="flex pointer-events-none opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
      >
        {windowControls.map(({ action, icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="grid h-8 w-11 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring last:hover:bg-danger last:hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              void controlWindow(action);
            }}
            type="button"
          >
            <Icon aria-hidden="true" className="size-3.5 stroke-[1.8]" />
          </button>
        ))}
      </div>
    </header>
  );
}
