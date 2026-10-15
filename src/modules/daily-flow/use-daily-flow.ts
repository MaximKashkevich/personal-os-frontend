import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiError } from "@/platform/api/api-error";
import {
  getDailyFlowDay,
  saveDailyOutcome,
  saveDailyPlan,
} from "@/platform/daily-flow/daily-flow-client";
import type { DailyFlowDay, DailyTaskDraft } from "./daily-flow.types";

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayLocalDate(): string {
  return formatLocalDate(new Date());
}

function createTemporaryTask(title: string, sortOrder: number): DailyTaskDraft {
  const now = new Date().toISOString();
  return {
    id: `temporary-${crypto.randomUUID()}`,
    title,
    sortOrder,
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
    isTemporary: true,
  };
}

function getLoadErrorMessage(error: unknown): string {
  return error instanceof ApiError
    ? error.message
    : "Не удалось подключиться к Personal OS API";
}

export function useDailyFlow() {
  const today = useMemo(getTodayLocalDate, []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [pendingDate, setPendingDate] = useState<string | null>(null);
  const [day, setDay] = useState<DailyFlowDay | null>(null);
  const [tasks, setTasks] = useState<DailyTaskDraft[]>([]);
  const [outcomeText, setOutcomeTextState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingPlan, setIsSavingPlan] = useState(false);
  const [isSavingOutcome, setIsSavingOutcome] = useState(false);
  const [planIsDirty, setPlanIsDirty] = useState(false);
  const [outcomeIsDirty, setOutcomeIsDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const isSaving = isSavingPlan || isSavingOutcome;
  const hasUnsavedChanges = planIsDirty || outcomeIsDirty;

  const applyLoadedDay = useCallback((loadedDay: DailyFlowDay) => {
    setDay(loadedDay);
    setTasks(loadedDay.tasks);
    setOutcomeTextState(loadedDay.outcomeText);
    setPlanIsDirty(false);
    setOutcomeIsDirty(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDay() {
      try {
        const loadedDay = await getDailyFlowDay(
          selectedDate,
          controller.signal,
        );
        if (
          !controller.signal.aborted &&
          loadedDay.localDate === selectedDate
        ) {
          applyLoadedDay(loadedDay);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setMessage(getLoadErrorMessage(error));
          setIsError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadDay();
    return () => controller.abort();
  }, [applyLoadedDay, selectedDate]);

  const beginDateChange = useCallback((nextDate: string) => {
    setDay(null);
    setTasks([]);
    setOutcomeTextState("");
    setPlanIsDirty(false);
    setOutcomeIsDirty(false);
    setMessage(null);
    setIsError(false);
    setIsLoading(true);
    setSelectedDate(nextDate);
  }, []);

  const requestDateChange = useCallback(
    (nextDate: string) => {
      if (!nextDate || nextDate === selectedDate || isSaving) {
        return;
      }

      if (hasUnsavedChanges) {
        setPendingDate(nextDate);
        return;
      }

      beginDateChange(nextDate);
    },
    [beginDateChange, hasUnsavedChanges, isSaving, selectedDate],
  );

  const cancelDateChange = useCallback(() => setPendingDate(null), []);

  const confirmDateChange = useCallback(() => {
    if (!pendingDate || isSaving) {
      return;
    }

    const nextDate = pendingDate;
    setPendingDate(null);
    beginDateChange(nextDate);
  }, [beginDateChange, isSaving, pendingDate]);

  const reloadSelectedDay = useCallback(
    async (conflict = false) => {
      try {
        const loadedDay = await getDailyFlowDay(selectedDate);
        if (loadedDay.localDate !== selectedDate) {
          return;
        }
        applyLoadedDay(loadedDay);
        setMessage(
          conflict
            ? "Данные этого дня изменились. Загружена актуальная версия"
            : null,
        );
        setIsError(false);
      } catch (error) {
        setMessage(getLoadErrorMessage(error));
        setIsError(true);
      }
    },
    [applyLoadedDay, selectedDate],
  );

  const addTask = useCallback(
    (title: string) => {
      const trimmedTitle = title.trim();
      if (!trimmedTitle || trimmedTitle.length > 500 || tasks.length >= 100) {
        return false;
      }

      setTasks((currentTasks) => [
        ...currentTasks,
        createTemporaryTask(trimmedTitle, currentTasks.length),
      ]);
      setPlanIsDirty(true);
      setMessage(null);
      return true;
    },
    [tasks.length],
  );

  const updateTask = useCallback((id: string, title: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, title } : task)),
    );
    setPlanIsDirty(true);
    setMessage(null);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
    setPlanIsDirty(true);
    setMessage(null);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    setPlanIsDirty(true);
    setMessage(null);
  }, []);

  const setOutcomeText = useCallback((text: string) => {
    setOutcomeTextState(text);
    setOutcomeIsDirty(true);
    setMessage(null);
  }, []);

  const handleSaveError = useCallback(
    async (error: unknown) => {
      if (error instanceof ApiError && error.status === 409) {
        await reloadSelectedDay(true);
        return;
      }

      setMessage(
        error instanceof ApiError
          ? error.message
          : "Не удалось сохранить данные дня",
      );
      setIsError(true);
    },
    [reloadSelectedDay],
  );

  const savePlan = useCallback(async () => {
    if (!day || isSaving) {
      return;
    }

    if (
      tasks.length > 100 ||
      tasks.some((task) => {
        const title = task.title.trim();
        return title.length === 0 || title.length > 500;
      })
    ) {
      setMessage("Проверьте заполненные данные");
      setIsError(true);
      return;
    }

    setIsSavingPlan(true);
    setMessage(null);
    try {
      const savedDay = await saveDailyPlan(selectedDate, {
        version: day.version,
        tasks: tasks.map((task) => ({
          ...(task.isTemporary ? {} : { id: task.id }),
          title: task.title.trim(),
          isCompleted: task.isCompleted,
        })),
      });
      if (savedDay.localDate !== selectedDate) {
        return;
      }
      setDay(savedDay);
      setTasks(savedDay.tasks);
      setPlanIsDirty(false);
      if (!outcomeIsDirty) {
        setOutcomeTextState(savedDay.outcomeText);
      }
      setMessage("План сохранён");
      setIsError(false);
    } catch (error) {
      await handleSaveError(error);
    } finally {
      setIsSavingPlan(false);
    }
  }, [day, handleSaveError, isSaving, outcomeIsDirty, selectedDate, tasks]);

  const saveOutcome = useCallback(async () => {
    if (!day || isSaving) {
      return;
    }

    setIsSavingOutcome(true);
    setMessage(null);
    try {
      const savedDay = await saveDailyOutcome(selectedDate, {
        version: day.version,
        text: outcomeText,
      });
      if (savedDay.localDate !== selectedDate) {
        return;
      }
      setDay(savedDay);
      setOutcomeTextState(savedDay.outcomeText);
      setOutcomeIsDirty(false);
      if (!planIsDirty) {
        setTasks(savedDay.tasks);
      }
      setMessage("Итог сохранён");
      setIsError(false);
    } catch (error) {
      await handleSaveError(error);
    } finally {
      setIsSavingOutcome(false);
    }
  }, [day, handleSaveError, isSaving, outcomeText, planIsDirty, selectedDate]);

  return {
    addTask,
    cancelDateChange,
    confirmDateChange,
    day,
    deleteTask,
    hasUnsavedChanges,
    isError,
    isLoading,
    isReady: day !== null,
    isSaving,
    isSavingOutcome,
    isSavingPlan,
    message,
    outcomeIsDirty,
    outcomeText,
    pendingDate,
    planIsDirty,
    requestDateChange,
    saveOutcome,
    savePlan,
    selectedDate,
    setOutcomeText,
    tasks,
    today,
    toggleTask,
    updateTask,
  };
}
