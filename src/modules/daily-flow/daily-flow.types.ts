import { z } from "zod";

export const dailyTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  sortOrder: z.number(),
  isCompleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const dailyFlowDaySchema = z.object({
  id: z.string().nullable(),
  localDate: z.string(),
  version: z.number(),
  tasks: z.array(dailyTaskSchema),
  outcomeText: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export type DailyTask = z.infer<typeof dailyTaskSchema>;
export type DailyFlowDay = z.infer<typeof dailyFlowDaySchema>;

export type SaveDailyTask = {
  id?: string;
  title: string;
  isCompleted: boolean;
};

export type SaveDailyPlan = {
  version: number;
  tasks: SaveDailyTask[];
};

export type SaveDailyOutcome = {
  version: number;
  text: string;
};

export type DailyTaskDraft = DailyTask & { isTemporary?: boolean };
