import type { Episode, PodcastAuthor, podcastAuthorSchemaIF, TrackSchemaIF } from './model';

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
