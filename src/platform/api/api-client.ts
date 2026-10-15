import { ApiError, getSafeApiErrorMessage } from "./api-error";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
};

export async function apiClient<T>(
  path: string,
  { body, ...options }: ApiRequestOptions = {},
): Promise<T> {
  if (!apiBaseUrl) {
    throw new ApiError("Не удалось подключиться к Personal OS API");
  }

  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new ApiError("Не удалось подключиться к Personal OS API");
  }

  if (!response.ok) {
    throw new ApiError(
      getSafeApiErrorMessage(response.status),
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(
      "Не удалось обработать ответ Personal OS API",
      response.status,
    );
  }
}
