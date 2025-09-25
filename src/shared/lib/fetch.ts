export type FetchOptions = {
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: any;
};

export type FetchResult = {
  data: any | null;
  error?: null | { status: number; message: string | null }; // Simplified error handl
};

export async function fetchApi(url: string, options: FetchOptions = {}): Promise<FetchResult> {
  const { method = 'GET', headers = {}, body } = options;
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (method === 'POST' && body) {
    fetchOptions.body = JSON.stringify(body);
  }
  try {
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      return {
        data: null,
        error: { status: res.status, message: typeof res === 'string' ? res : res.statusText },
      };
    }

    return { data: res };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
