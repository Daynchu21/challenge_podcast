import z from 'zod';
import type { ImageInput } from './model';

export const ItunesEpisodeSchema = z.object({
  trackId: z.number(),
  trackName: z.string(),
  releaseDate: z.string(),
  collectionId: z.number(),
  trackTimeMillis: z.number(),
  previewUrl: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
});

export const RssAuthorSchema = z.object({
  title: z.string(),
  description: z.string(),
  subtitle: z.string().optional(),
  summary: z.string().optional(),
  author: z.string(),
  image: z.preprocess((val) => {
    if (Array.isArray(val)) {
      const itunesImg = val.find(
        (img): img is { '@_href': string } => typeof img['@_href'] === 'string',
      );
      const rssImg = val.find((img): img is { url: string } => typeof img.url === 'string');

      return itunesImg?.['@_href'] ?? rssImg?.url;
    } else if (val && typeof val === 'object') {
      const obj = val as ImageInput;
      if (typeof obj['@_href'] === 'string') return obj['@_href'];
      if (typeof obj.url === 'string') return obj.url;
    }
    return undefined;
  }, z.string()),
});

export type RssAuthorRaw = z.infer<typeof RssAuthorSchema>;

export type ItunesEpisodeRaw = z.infer<typeof ItunesEpisodeSchema>;
