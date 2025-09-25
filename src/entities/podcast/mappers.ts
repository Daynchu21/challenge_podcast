import type { ItunesFeedRaw } from '../episode/api.dtos';
import type { PodcastIF } from './model';

export function normalizeItunesItem(raw: ItunesFeedRaw): PodcastIF {
  const biggestImage = raw['im:image'].reduce((prev, current) => {
    const prevHeight = parseInt(prev.attributes?.height ?? '0', 10);
    const currHeight = parseInt(current.attributes?.height ?? '0', 10);
    return currHeight > prevHeight ? current : prev;
  });

  return {
    id: raw.id.attributes['im:id'],
    title: raw['im:name'].label,
    author: raw['im:artist'].label,
    description: raw.summary.label,
    images: biggestImage.label,
  };
}
