export type FetchOptions = {
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: any;
};

export type FetchResult<T = any> = {
  data: T | null;
  error: { status: number; message: string } | null;
};

export async function fetchApi<T = any>(
  url: string,
  options: FetchOptions = {},
): Promise<FetchResult<T>> {
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
    const contentType = res.headers.get('content-type');
    let data: T | string | null = null;
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    if (!res.ok) {
      return {
        data: null,
        error: { status: res.status, message: typeof data === 'string' ? data : res.statusText },
      };
    }
    return { data: data as T, error: null };
  } catch (error: any) {
    return { data: null, error: { status: 0, message: error?.message || 'Network error' } };
  }
}

// Ejemplo de uso:
// const data = await fetchApi('/api/podcasts');
// const post = await fetchApi('/api/podcasts', { method: 'POST', body: { name: 'test' } });
