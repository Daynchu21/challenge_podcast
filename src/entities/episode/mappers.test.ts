import { describe, expect, it } from 'vitest';
import { normalizeRssAuthor, normalizeRssEpisode } from './mappers';
import type { Episode, PodcastAuthor, podcastAuthorSchemaIF, TrackSchemaIF } from './model';

describe('normalizeRssAuthor', () => {
  it('normaliza correctamente un author RSS', () => {
    const raw: podcastAuthorSchemaIF = {
      title: 'Podcast Title',
      description: 'Podcast Description',
      image: 'image-url',
      author: 'Author Name',
      summary: 'Podcast Summary',
    };
    const expected: PodcastAuthor = {
      title: 'Podcast Title',
      description: 'Podcast Description',
      image: 'image-url',
      subtitle: 'Podcast Summary',
      author: 'Author Name',
    };
    expect(normalizeRssAuthor(raw)).toEqual(expected);
  });

  it('usa string vacío si no hay summary', () => {
    const raw: podcastAuthorSchemaIF = {
      title: 'Podcast Title',
      description: 'Podcast Description',
      image: 'image-url',
      author: 'Author Name',
    };
    const expected: PodcastAuthor = {
      title: 'Podcast Title',
      description: 'Podcast Description',
      image: 'image-url',
      subtitle: '',
      author: 'Author Name',
    };
    expect(normalizeRssAuthor(raw)).toEqual(expected);
  });
});

describe('normalizeRssEpisode', () => {
  it('normaliza correctamente un episodio RSS', () => {
    const raw: TrackSchemaIF = {
      trackId: 1,
      trackName: 'Episode Title',
      releaseDate: '2023-09-01',
      trackTimeMillis: 1234567,
      collectionId: 99,
      previewUrl: 'audio-url',
      description: 'Episode Description',
    };
    const expected: Episode = {
      id: 1,
      title: 'Episode Title',
      description: 'Episode Description',
      audioUrl: 'audio-url',
      releaseDate: '2023-09-01',
      duration: 1234567,
      collectionId: 99,
    };
    expect(normalizeRssEpisode(raw)).toEqual(expected);
  });

  it('usa string vacío si no hay description', () => {
    const raw: TrackSchemaIF = {
      trackId: 2,
      trackName: 'Episode Title',
      releaseDate: '2023-09-02',
      trackTimeMillis: 7654321,
      collectionId: 100,
      previewUrl: 'audio-url',
    };
    const expected: Episode = {
      id: 2,
      title: 'Episode Title',
      description: '',
      audioUrl: 'audio-url',
      releaseDate: '2023-09-02',
      duration: 7654321,
      collectionId: 100,
    };
    expect(normalizeRssEpisode(raw)).toEqual(expected);
  });
});
