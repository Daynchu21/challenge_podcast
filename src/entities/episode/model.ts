export interface podcastAuthorSchemaIF {
  title: string;
  description: string;
  image: string;
  author: string;
  subtitle?: string;
  summary?: string;
}

export interface TrackSchemaIF {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  collectionId: number;
  previewUrl: string;
  description?: string;
  shortDescription?: string;
}

export interface PodcastAuthor {
  description: string;
  title: string;
  image: string;
  subtitle: string;
  author: string;
}

export interface Episode {
  id: number;
  title: string;
  audioUrl: string;
  releaseDate: string;
  collectionId: number;
  description?: string;
  duration?: number;
}

export interface PodcastsDetailResponse {
  author: PodcastAuthor;
  episodes: Episode[];
}

export interface PodcastEntryIF {
  wrapperType: string;
  kind: string;
}
