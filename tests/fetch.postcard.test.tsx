/// <reference types="vite/client" />
// tests/fetchPodcasts.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fetchLib from '../src/shared/lib/fetch';
import { fetchPodcasts } from '../src/features/fetch-podcasts/usePodcasts';

describe('fetchPodcasts', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('devuelve podcasts normalizados y los guarda en localStorage', async () => {
    // 1. Mock de fetchApi
    vi.spyOn(fetchLib, 'fetchApi').mockResolvedValue({
      data: {
        feed: {
          entry: [
            {
              id: {
                attributes: { 'im:id': '1' },
                label: 'https://example.com/podcast/1',
              },
              'im:name': { label: 'Podcast Rock' },
              'im:artist': { label: 'Alice' },
              summary: { label: 'Un podcast de prueba' },
              title: { label: 'Podcast Rock' },
              'im:releaseDate': { label: '2023-01-01' },
              'im:image': [
                { attributes: { height: '40' }, label: 'https://example.com/img40.png' },
                { attributes: { height: '50' }, label: 'https://example.com/img50.png' },
                { attributes: { height: '170' }, label: 'https://example.com/img170.png' },
              ],
            },
          ],
        },
      },
    });

    // 2. Ejecutar la función
    const result = await fetchPodcasts();

    // 3. Verificar que devuelve datos transformados
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: '1',
      title: 'Podcast Rock',
      author: 'Alice',
      images: 'https://example.com/img170.png',
    });

    // 4. Verificar que se guarda en localStorage
    const cacheKey = import.meta.env.VITE_KEY_PODCAST_STORAGE || '';
    const cached = JSON.parse(localStorage.getItem(cacheKey) || '{}');
    expect(cached.data[0].title).toBe('Podcast Rock');
  });

  it('usa cache si existe y no ha caducado', async () => {
    const cacheKey = import.meta.env.VITE_KEY_PODCAST_STORAGE || '';
    const fakeData = [{ id: '99', title: 'From Cache' }];
    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: fakeData }));

    const result = await fetchPodcasts();
    expect(result[0].title).toBe('From Cache');
  });
});
