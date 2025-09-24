import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../utils/fetch';
import { useParams } from 'react-router-dom';
import { parseXMLResponse } from '../utils/parseRssResponse';
import type {
  Episode,
  PodcastAuthor,
  podcastAuthorSchemaIF,
  PodcastsDetailResponse,
  TrackSchemaIF,
} from '../types';
import { TIME_GETTER } from '../utils/date';
import { ItunesEpisodeSchema, RssAuthorSchema } from '../schemas/authorSchema';
import { adapterFunction } from '../utils/normalizeArray';

export function normalizeRssAuthor(raw: podcastAuthorSchemaIF): PodcastAuthor {
  return {
    description: raw.description,
    title: raw.title,
    image: raw.image,
    subtitle: raw.summary || '',
    author: raw.author,
  };
}

export function normalizeRssEpisode(raw: TrackSchemaIF): Episode {
  return {
    id: raw.trackId || 0,
    title: raw.trackName,
    description: raw.description || '',
    audioUrl: raw.previewUrl,
    releaseDate: raw.releaseDate,
    duration: raw.trackTimeMillis,
    collectionId: raw.collectionId,
  };
}

async function fetchPodcastsDetails(podcastId: string): Promise<PodcastsDetailResponse> {
  if (!podcastId) throw new Error('Podcast ID not found');
  const PODCASTS_DETAIL_KEY = `${import.meta.env.VITE_KEY_PODCAST_TRACK_STORAGE}${podcastId}`;
  const cached = localStorage.getItem(PODCASTS_DETAIL_KEY);
  let channel = null;
  if (cached) {
    const { timestamp, podcastInfo } = JSON.parse(cached);
    if (Date.now() - timestamp < TIME_GETTER) {
      return podcastInfo;
    }
  }

  try {
    const res = await fetchApi(
      `https://corsproxy.io/?${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`,
      { method: 'GET' },
    );
    const dataJson = await res.data.json();
    if (dataJson.results && dataJson.results.length > 0) {
      const authorElement = dataJson.results.shift();
      const feedUrl = authorElement.feedUrl;

      if (feedUrl) {
        try {
          const responseArtist = await fetchApi(
            `https://corsproxy.io/?${encodeURIComponent(feedUrl)}`,
            { method: 'GET' },
          );

          if (responseArtist) {
            const parsedXml = await parseXMLResponse(responseArtist.data);
            channel = parsedXml.rss?.channel;
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('An unknown error occurred');
          }
        }
      }
      const author = adapterFunction<podcastAuthorSchemaIF, PodcastAuthor>(
        channel,
        RssAuthorSchema,
        normalizeRssAuthor,
      );
      const episodes = adapterFunction<TrackSchemaIF, Episode>(
        dataJson.results,
        ItunesEpisodeSchema,
        normalizeRssEpisode,
      );
      const podcastInfo = {
        author: { ...author } as PodcastAuthor,
        episodes: episodes as Episode[],
      };

      localStorage.setItem(
        PODCASTS_DETAIL_KEY,
        JSON.stringify({ timestamp: Date.now(), podcastInfo }),
      );
      return podcastInfo;
    }
    throw new Error('No results found');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export function usePodcastsDetails() {
  const { podcastId } = useParams<{ podcastId: string }>();
  return useQuery<PodcastsDetailResponse>({
    queryKey: ['podcasts', podcastId],
    queryFn: () => fetchPodcastsDetails(podcastId!),
    enabled: !!podcastId,
    staleTime: TIME_GETTER,
  });
}
