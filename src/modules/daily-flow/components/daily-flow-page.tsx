import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DailyDateNavigation } from "./daily-date-navigation";
import { DailyOutcome } from "./daily-outcome";
import { DailyTaskList } from "./daily-task-list";
import { useDailyFlow } from "../use-daily-flow";

export function DailyFlowPage() {
  const {
    addTask,
    cancelDateChange,
    confirmDateChange,
    deleteTask,
    isError,
    isLoading,
    isReady,
    isSaving,
    isSavingOutcome,
    isSavingPlan,
    message,
    outcomeText,
    pendingDate,
    requestDateChange,
    saveOutcome,
    savePlan,
    selectedDate,
    setOutcomeText,
    tasks,
    today,
    toggleTask,
    updateTask,
  } = useDailyFlow();
  const isEditingDisabled = isSaving || !isReady;

  return (
    <div className="max-w-2xl space-y-9 pb-12 pt-5">
      <div className="space-y-2">
        <DailyDateNavigation
          disabled={isSaving}
          onChange={requestDateChange}
          selectedDate={selectedDate}
          today={today}
        />
        <p className="text-xs text-muted-foreground">
          Задачи сохраняются в Personal OS API после нажатия «Сохранить план».
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
          <LoaderCircle className="animate-spin" size={18} />
          Загружаем день…
        </div>
      ) : (
        <>
          <section aria-labelledby="daily-plan-heading" className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="daily-plan-heading"
                className="text-xl font-semibold tracking-tight"
              >
                План на день
              </h2>
              <button
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isEditingDisabled}
                onClick={() => void savePlan()}
                type="button"
              >
                {isSavingPlan ? "Сохраняем…" : "Сохранить план"}
              </button>
            </div>
            <DailyTaskList
              disabled={isEditingDisabled}
              onAdd={addTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onUpdate={updateTask}
              tasks={tasks}
            />
          </section>

          <section
            aria-labelledby="daily-outcome-heading"
            className="space-y-4"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="daily-outcome-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Как прошёл день
              </h2>
              <button
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isEditingDisabled}
                onClick={() => void saveOutcome()}
                type="button"
              >
                {isSavingOutcome ? "Сохраняем…" : "Сохранить итог"}
              </button>
            </div>
            <DailyOutcome
              disabled={isEditingDisabled}
              onChange={setOutcomeText}
              text={outcomeText}
            />
          </section>
        </>
      )}

      {message ? (
        <p
          className={`text-sm ${isError ? "text-danger" : "text-success"}`}
          role={isError ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}

      <Dialog
        open={pendingDate !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            cancelDateChange();
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Есть несохранённые изменения</DialogTitle>
            <DialogDescription>
              Перейти на другой день и отменить их?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium transition hover:bg-muted"
                type="button"
              >
                Остаться
              </button>
            </DialogClose>
            <button
              className="rounded-xl bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition hover:brightness-95"
              onClick={confirmDateChange}
              type="button"
            >
              Перейти без сохранения
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
