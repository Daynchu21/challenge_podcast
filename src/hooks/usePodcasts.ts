// src/hooks/usePodcasts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../utils/fetch';

const PODCASTS_KEY = 'popular_podcasts';
const ONE_DAY = 1000 * 60 * 60 * 24;

type PodcastEntry = {
  id: { attributes: { 'im:id': string } };
  'im:name': { label: string };
  'im:artist': { label: string };
  summary: { label: string };
  'im:image': { label: string }[];
};

async function fetchPodcasts(): Promise<PodcastEntry[]> {
  const cached = localStorage.getItem(PODCASTS_KEY);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < ONE_DAY) {
      return data;
    }
  }

  try {
    const res = await fetchApi(
      `https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')}`,
      { method: 'GET' },
    );
    const response = res.data.contents ? JSON.parse(res.data.contents) : null;
    if (response) {
      const data = response.feed.entry;
      localStorage.setItem(PODCASTS_KEY, JSON.stringify({ timestamp: Date.now(), data }));
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
  return useQuery<PodcastEntry[]>({
    queryKey: ['podcasts_details'],
    queryFn: fetchPodcasts,
    staleTime: ONE_DAY, // evita refetch innecesario
  });
}
