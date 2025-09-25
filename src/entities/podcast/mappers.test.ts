import { describe, it, expect } from 'vitest'; // o "jest"
import type { ItunesFeedRaw } from '../episode/api.dtos';
import { normalizeRssEpisode } from '../episode/mappers';
import { normalizeItunesItem } from './mappers';

describe('Podcast mappers', () => {
  it('mapPodcastDtoToModel transforma DTO en modelo limpio', () => {
    const dto: ItunesFeedRaw = {
      id: { attributes: { 'im:id': '123' }, label: 'http://example.com' },
      'im:artist': { label: 'Author' },
      'im:image': [
        {
          attributes: { height: '40' },
          label:
            'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png',
        },
        {
          attributes: { height: '50' },
          label:
            'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png',
        },
      ],
      'im:name': { label: 'My Podcast' },
      summary: { label: 'Cool show' },
      title: { label: 'ignored' },
      'im:releaseDate': { label: '2023-01-01' },
      rights: { label: 'All rights' },
    };

    const podcast = normalizeItunesItem(dto);

    expect(podcast).toEqual({
      id: '123',
      title: 'My Podcast',
      author: 'Author',
      description: 'Cool show',
      images:
        'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png',
    });
  });

  it('normalizeRssEpisode transforma episodio crudo en modelo', () => {
    const raw = {
      trackId: 1,
      trackName: 'Episode 1',
      releaseDate: '2023-01-01',
      trackTimeMillis: 120000,
      collectionId: 99,
      previewUrl: 'http://audio.mp3',
      description: 'Description',
    };

    const episode = normalizeRssEpisode(raw);

    expect(episode).toEqual({
      id: 1,
      title: 'Episode 1',
      description: 'Description',
      audioUrl: 'http://audio.mp3',
      releaseDate: '2023-01-01',
      duration: 120000,
      collectionId: 99,
    });
  });
});
