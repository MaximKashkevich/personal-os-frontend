export class ApiError extends Error {
  public readonly status: number | null;

  constructor(message: string, status: number | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getSafeApiErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "Проверьте заполненные данные";
    case 404:
      return "Маршрут Today не найден в API";
    case 409:
      return "Данные дня изменились. Загружена актуальная версия";
    case 500:
      return "Не удалось сохранить данные дня";
    default:
      return "Не удалось подключиться к Personal OS API";
  }
}
