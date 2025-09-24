// tests/podcast-flow.mock.spec.ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Mock listado de podcasts
  await page.route('**/api.allorigins.win/get?url=**toppodcasts**', async (route) => {
    const fakeItunesResponse = {
      feed: {
        entry: [
          {
            id: { attributes: { 'im:id': '1234' } },
            'im:name': { label: 'Fake Podcast' },
            'im:artist': { label: 'Fake Author' },
            summary: { label: 'Un podcast de prueba' },
            'im:image': [
              {
                label:
                  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png',
              },
              {
                label:
                  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.png',
              },
              {
                label:
                  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png',
              },
            ],
          },
        ],
      },
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        contents: JSON.stringify(fakeItunesResponse),
        status: { url: 'itunes-url', content_type: 'application/json', http_code: 200 },
      }),
    });
  });

  // Mock detalle del podcast + episodios
  await page.route('**/api.allorigins.win/get?url=**lookup**', async (route) => {
    const fakeDetail = {
      results: [
        {
          collectionId: 1000727014725,
          collectionName: 'Fake Podcast',
          artistName: 'Fake Author',
          artworkUrl600: 'https://placehold.it/600x600',
          description: 'Descripción fake',
          feedUrl: 'https://feeds.libsyn.com/585905/rss',
          wrapperType: 'track',
          kind: 'podcast',
        },
        {
          trackId: 1000725733814,
          collectionId: 5733814,
          trackName: 'Episode 1',
          releaseDate: '2023-09-01',
          trackTimeMillis: 3600000,
          episodeUrl:
            'https://traffic.libsyn.com/secure/e6eadd90-8cb3-4fd6-bac6-5a28605b0005/JOE_ROMM_episode_11_v2_final_final_01-2.mp3?dest-id=5083855',
          description: 'Contenido del episodio 1',
          shortDescription: 'Contenido del episodio 1',
          feedUrl: 'https://feeds.libsyn.com/585905/rss',
        },
      ],
    };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        contents: JSON.stringify(fakeDetail),
        status: { url: 'itunes-url', content_type: 'application/json', http_code: 200 },
      }),
    });
  });
  await page.route('**/api.allorigins.win/get?url=**feeds.libsyn.com**', async (route) => {
    const fakeXml = `
    <rss>
      <channel>
        <title>Fake Podcast Feed</title>
        <description>Descripción del feed</description>
        <itunes:subtitle>Subtitulo</itunes:subtitle>
        <itunes:summary>Sumario</itunes:summary>
        <itunes:image href="https://placehold.it/600x600"/>
      </channel>
    </rss>
  `;

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        contents: fakeXml, // 👈 en este caso contents es XML string
        status: { url: 'feed-url', content_type: 'application/xml', http_code: 200 },
      }),
    });
  });
});

test('flujo completo con datos mockeados', async ({ page }) => {
  // 1. Home
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('podcast-item')).toContainText('Fake Podcast');
  // 2. Detalle del podcast
  await page.getByTestId('podcast-item').click();
  // 3. Tabla de episodios
  await expect(page.getByTestId('episode-row')).toHaveCount(1);
  // 4. Detalle de episodio
  await page.getByTestId('episode-link').click();
  await expect(page.getByTestId('episode-title')).toContainText('Episode 1');
  await expect(page.getByTestId('episode-audio')).toBeVisible();
  await expect(page.getByTestId('episode-description')).toContainText('Contenido del episodio 1');
});
