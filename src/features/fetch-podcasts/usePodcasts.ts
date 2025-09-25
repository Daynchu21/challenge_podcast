// src/hooks/usePodcasts.ts
import { useQuery } from '@tanstack/react-query';
import type { PodcastIF } from '../../entities';
import { fetchApi } from '../../shared/lib/fetch';
import { adapterFunction } from '../../shared/lib/normalizeArray';
import { TIME_GETTER } from '../../shared/lib/date';
import { normalizeItunesItem } from '../../entities/podcast/mappers';
import { type ItunesFeedRaw, ItunesFeedSchema } from '../../entities/episode/api.dtos';

export async function fetchPodcasts() {
  const PODCAST_KEY = import.meta.env.VITE_KEY_PODCAST_STORAGE || '';
  const cached = localStorage.getItem(PODCAST_KEY);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < TIME_GETTER) {
      return data;
    }
  }

  try {
    const res = await fetchApi(
      `https://corsproxy.io/?${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')}`,
      { method: 'GET' },
    );
    let json: any;
    if (res.data instanceof Response) {
      json = await res.data.json(); // parsea aquí
    } else {
      json = res.data;
    }
    if (json) {
      const data = adapterFunction<ItunesFeedRaw, PodcastIF>(
        json.feed.entry,
        ItunesFeedSchema,
        normalizeItunesItem,
      );
      localStorage.setItem(
        import.meta.env.VITE_KEY_PODCAST_STORAGE || '',
        JSON.stringify({ timestamp: Date.now(), data }),
      );
      return data;
    } else {
      return [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    return [];
  }
}

export function usePodcasts() {
  return useQuery<PodcastIF[]>({
    queryKey: ['podcasts_details'],
    queryFn: fetchPodcasts,
    staleTime: TIME_GETTER,
  });
}
