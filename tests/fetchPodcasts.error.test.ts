// tests/fetchPodcasts.error.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchApi } from '../src/shared/lib/fetch';
import { fetchPodcasts } from '../src/features/fetch-podcasts/usePodcasts';

vi.mock('@/shared/lib/fetch', () => ({
  fetchApi: vi.fn(),
}));

describe('fetchPodcasts - error handling', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('debe loguear error y devolver [] si la API falla', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    (fetchApi as any).mockRejectedValue(new Error('Network error'));

    const result = await fetchPodcasts();

    expect(result).toEqual([]); // ✅ retorna array vacío
    expect(consoleSpy).toHaveBeenCalledWith('Network error'); // ✅ loguea error

    consoleSpy.mockRestore();
  });
});
