import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../utils/fetch';

const ONE_DAY = 1000 * 60 * 60 * 24;

export type PodcastEntry = {
  collectionId: number;
  trackId: number;
  artworkUrl600?: string;
  collectionName?: string;
  artistName?: string;
  descritption?: string;
  trackName?: string;
  releaseDate?: string;
  trackTimeMillis?: number;
  episodeUrl?: string;
  wrapperType?: string;
  kind?: string;
  feedUrl?: string;
};

type authorDetails = {
  title: string;
  subtitle: string;
  image?: string;
  description?: string;
};

type PodcastsDetailResponse = {
  author: authorDetails;
  tracks: Array<PodcastEntry>;
};

async function fetchPodcastsDetails() {
  const urlId = window.location.pathname.split('/').pop();
  if (!urlId) throw new Error('Podcast ID not found');
  const PODCASTS_KEY = `popular_podcasts_details_${urlId}`;

  const cached = localStorage.getItem(PODCASTS_KEY);
  let author = null;
  if (cached) {
    const { timestamp, podcastInfo } = JSON.parse(cached);
    if (Date.now() - timestamp < ONE_DAY) {
      return podcastInfo;
    }
  }

  try {
    const res = await fetchApi(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${urlId}&media=podcast&entity=podcastEpisode&limit=20`)}`,
      { method: 'GET' },
    );
    const dataJson = await res.data.json();
    const dataParse = dataJson.contents ? JSON.parse(dataJson.contents) : null;

    const feedUrl = dataParse.results.find(
      (item: PodcastEntry) => item.wrapperType === 'track' || item.kind === 'podcast',
    )?.feedUrl;

    if (feedUrl) {
      try {
        const responseArtist = await fetchApi(
          `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`,
          { method: 'GET' },
        );
        if (responseArtist) {
          const xmlText = responseArtist.data?.contents;
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
          const descriptionNode = xmlDoc.querySelector(
            'itunes\\:summary, itunes\\:subtitle, description',
          );
          const description = descriptionNode?.textContent?.trim() ?? null;
          const titleNode = xmlDoc.getElementsByTagName('title')[0];
          const title = titleNode?.textContent?.trim() ?? null;

          const imageNode = xmlDoc.getElementsByTagName('itunes:image')[0];
          const imageUrl = imageNode?.getAttribute('href') ?? null;

          const subtitleNode = xmlDoc.getElementsByTagName('itunes:subtitle')[0];
          const subtitle = subtitleNode?.textContent?.trim() ?? null;

          author = {
            description: description,
            title: title,
            image: imageUrl,
            subtitle: subtitle,
          };
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    }

    const tracks = dataParse.results.filter(
      (item: PodcastEntry) => item.wrapperType !== 'track' && item.kind !== 'podcast',
    );
    const podcastInfo = { author, tracks };

    localStorage.setItem(PODCASTS_KEY, JSON.stringify({ timestamp: Date.now(), podcastInfo }));
    return podcastInfo;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export function usePodcastsDetails() {
  const urlId = window.location.pathname.split('/').pop();
  return useQuery<PodcastsDetailResponse>({
    queryKey: ['podcasts', urlId],
    queryFn: fetchPodcastsDetails,
    staleTime: ONE_DAY,
  });
}
