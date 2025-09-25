export type FetchOptions<TBody = unknown> = {
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: TBody;
};

export type FetchError = {
  status: number;
  message: string | null;
};

export type FetchResult<TData> = {
  data: TData | null;
  error?: FetchError | null;
};

export async function fetchApi<TData = unknown, TBody = unknown>(
  url: string,
  options: FetchOptions<TBody> = {},
): Promise<FetchResult<TData>> {
  const { method = 'GET', headers = {}, body } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (method === 'POST' && body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      return {
        data: null,
        error: {
          status: res.status,
          message: res.statusText ?? null,
        },
      };
    }

    // devolvemos Response crudo, el caller decide si hace .json(), .text(), etc.
    return { data: res as unknown as TData, error: null };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
