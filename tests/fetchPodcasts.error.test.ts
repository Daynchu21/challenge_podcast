import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPodcasts } from '../src/features/fetch-podcasts/usePodcasts';
import { fetchApi } from '../src/shared/lib/fetch';

vi.mock('@/shared/lib/fetch', () => ({
  fetchApi: vi.fn(), // ya será mock
}));

describe('fetchPodcasts - error handling', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('debe loguear error y devolver [] si la API falla', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // 👇 convertir a función mockeada
    const mockedFetchApi = vi.mocked(fetchApi);

    mockedFetchApi.mockRejectedValue(new Error('Network error'));

    const result = await fetchPodcasts();

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('Network error');

    consoleSpy.mockRestore();
  });
});
