export const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// <-------------------------   API error handling   ------------------------->
type ApiErrorDetailItem = {
  loc?: (string | number)[];
  msg?: unknown;
  type?: unknown;
};

type ApiErrorPayload = {
  detail?: ApiErrorDetailItem[];
  message?: unknown;
  code?: unknown;
  details?: unknown;
};

function stringifyApiErrorPart(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function formatApiErrorDetail(detail?: ApiErrorDetailItem[]) {
  if (!Array.isArray(detail) || detail.length === 0) {
    return undefined;
  }

  const formatted = detail
    .map((item) => {
      const location = Array.isArray(item.loc) ? item.loc.join('.') : '';
      const message = stringifyApiErrorPart(item.msg);

      if (!message) {
        return undefined;
      }

      return location ? `${location}: ${message}` : message;
    })
    .filter((entry): entry is string => Boolean(entry));

  return formatted.length > 0 ? formatted.join('; ') : undefined;
}

function removeApiAddresses(message: string) {
  return message.replace(/https?:\/\/[^\s"'<>]+/gi, 'the requested resource');
}

function getApiErrorMessage(payload?: ApiErrorPayload) {
  const message =
    formatApiErrorDetail(payload?.detail) ??
    stringifyApiErrorPart(payload?.message) ??
    stringifyApiErrorPart(payload?.code) ??
    'API request failed';

  return removeApiAddresses(message);
}

export class ApiRequestError extends Error {
  code?: string;
  status?: number;
  details?: unknown;

  constructor(message: string, options?: { code?: string; status?: number; details?: unknown }) {
    super(message);
    this.name = 'ApiRequestError';
    this.code = options?.code;
    this.status = options?.status;
    this.details = options?.details;
  }
}

// <-------------------------   API request helper   ------------------------->
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let response: Response;

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        ...(options.body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
      ...options,
    });
  } catch (error) {
    throw new ApiRequestError('Could not connect to server. Please try again.', {
      code: 'NETWORK_ERROR',
      details: error,
    });
  }

  if (!response.ok) {
    let payload: ApiErrorPayload | undefined;

    try {
      payload = (await response.json()) as ApiErrorPayload;
    } catch {
      payload = undefined;
    }

    throw new ApiRequestError(getApiErrorMessage(payload), {
      code: stringifyApiErrorPart(payload?.code),
      status: response.status,
      details: payload,
    });
  }

  return response.json() as Promise<T>;
}