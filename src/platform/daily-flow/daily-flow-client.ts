import { apiClient } from "@/platform/api/api-client";
import {
  dailyFlowDaySchema,
  type DailyFlowDay,
  type SaveDailyOutcome,
  type SaveDailyPlan,
} from "@/modules/daily-flow/daily-flow.types";

function parseDay(value: unknown): DailyFlowDay {
  return dailyFlowDaySchema.parse(value);
}

export async function getDailyFlowDay(
  localDate: string,
  signal?: AbortSignal,
): Promise<DailyFlowDay> {
  return parseDay(
    await apiClient(`/daily-flow/days/${encodeURIComponent(localDate)}`, {
      signal,
    }),
  );
}

export async function saveDailyPlan(
  localDate: string,
  plan: SaveDailyPlan,
): Promise<DailyFlowDay> {
  return parseDay(
    await apiClient(`/daily-flow/days/${encodeURIComponent(localDate)}/plan`, {
      method: "PUT",
      body: plan,
    }),
  );
}

export async function saveDailyOutcome(
  localDate: string,
  outcome: SaveDailyOutcome,
): Promise<DailyFlowDay> {
  return parseDay(
    await apiClient(
      `/daily-flow/days/${encodeURIComponent(localDate)}/outcome`,
      {
        method: "PUT",
        body: outcome,
      },
    ),
  );
}
