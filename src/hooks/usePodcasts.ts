// src/hooks/usePodcasts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../utils/fetch';
import { ItunesFeedSchema, type ItunesFeedRaw } from '../schemas/itunesSchema';
import type { PodcastIF } from '../types';
import { adapterFunction } from '../utils/normalizeArray';
import { TIME_GETTER } from '../utils/date';

export function normalizeItunesItem(raw: ItunesFeedRaw): PodcastIF {
  const biggestImage = raw['im:image'].reduce((prev, current) => {
    const prevHeight = parseInt(prev.attributes?.height ?? '0', 10);
    const currHeight = parseInt(current.attributes?.height ?? '0', 10);
    return currHeight > prevHeight ? current : prev;
  });

  return {
    id: raw.id.attributes['im:id'],
    url: raw.id.label,
    title: raw['im:name'].label,
    author: raw['im:artist'].label,
    description: raw.summary.label,
    images: biggestImage.label,
    releaseDate: raw['im:releaseDate'].label,
    summary: raw.summary.label,
  };
}

async function fetchPodcasts() {
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
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export function usePodcasts() {
  return useQuery<PodcastIF[]>({
    queryKey: ['podcasts_details'],
    queryFn: fetchPodcasts,
    staleTime: TIME_GETTER,
  });
}
