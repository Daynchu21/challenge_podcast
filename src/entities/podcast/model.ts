export interface PodcastIF {
  id: string;
  title: string;
  author: string;
  description: string;
  images: string;
  rights?: string;
}

export type ImageInput = { '@_href'?: string; url?: string } | Record<string, unknown>;
