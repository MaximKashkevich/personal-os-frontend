import { Check, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { DailyTaskDraft } from "../daily-flow.types";

type DailyTaskListProps = {
  disabled: boolean;
  onAdd: (title: string) => boolean;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  tasks: DailyTaskDraft[];
};

export function DailyTaskList({
  disabled,
  onAdd,
  onDelete,
  onToggle,
  onUpdate,
  tasks,
}: DailyTaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const isTooLong = newTaskTitle.length > 500;
  const isAtTaskLimit = tasks.length >= 100;

  function addTask() {
    if (onAdd(newTaskTitle)) {
      setNewTaskTitle("");
    }
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-1.5" aria-label="Задачи на день">
        {tasks.map((task) => (
          <li
            className="group flex items-center gap-2 rounded-xl border border-border/75 bg-card/80 px-2.5 py-2 transition-colors focus-within:border-ring/65"
            key={task.id}
          >
            <button
              aria-label={
                task.isCompleted
                  ? "Отметить невыполненной"
                  : "Отметить выполненной"
              }
              className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                task.isCompleted
                  ? "border-success bg-success text-white"
                  : "border-muted-foreground/45 hover:border-accent"
              }`}
              disabled={disabled}
              onClick={() => onToggle(task.id)}
              type="button"
            >
              {task.isCompleted ? <Check size={14} strokeWidth={2.5} /> : null}
            </button>
            <input
              aria-label="Название задачи"
              className={`min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground ${
                task.isCompleted
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
              disabled={disabled}
              maxLength={500}
              onChange={(event) => onUpdate(task.id, event.target.value)}
              value={task.title}
            />
            <button
              aria-label="Удалить задачу"
              className="rounded-md p-1 text-muted-foreground opacity-0 transition hover:bg-muted hover:text-danger focus:opacity-100 group-hover:opacity-100 disabled:pointer-events-none"
              disabled={disabled}
              onClick={() => onDelete(task.id)}
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          className="h-10 min-w-0 flex-1 rounded-xl border border-border/80 bg-card/90 px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25"
          disabled={disabled || isAtTaskLimit}
          maxLength={501}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTask();
            }
          }}
          placeholder="Добавить задачу"
          value={newTaskTitle}
        />
        <button
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-accent px-3 text-sm font-medium text-accent-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={
            disabled || isAtTaskLimit || !newTaskTitle.trim() || isTooLong
          }
          onClick={addTask}
          type="button"
        >
          <Plus size={16} />
          Добавить
        </button>
      </div>
      {isTooLong ? (
        <p className="text-xs text-danger">Не более 500 символов.</p>
      ) : null}
      {isAtTaskLimit ? (
        <p className="text-xs text-muted-foreground">
          Достигнут лимит: 100 задач на день.
        </p>
      ) : null}
    </div>
  );
}
