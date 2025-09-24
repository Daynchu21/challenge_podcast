import z from 'zod';

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
  // 'itunes:subtitle': z.string().optional(),
  // 'itunes:summary': z.string().optional(),
  image: z.preprocess((val) => {
    if (Array.isArray(val)) {
      // si es array, tomar @_href o url del primero válido
      const itunesImg = val.find((img: any) => img['@_href']);
      const rssImg = val.find((img: any) => img.url);
      return itunesImg?.['@_href'] || rssImg?.url;
    } else if (val && typeof val === 'object') {
      // si es objeto simple
      return (val as any)['@_href'] || (val as any).url;
    }
    return undefined;
  }, z.string()),
});

export type RssAuthorRaw = z.infer<typeof RssAuthorSchema>;

export type ItunesEpisodeRaw = z.infer<typeof ItunesEpisodeSchema>;
