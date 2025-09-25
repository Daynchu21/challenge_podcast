// tests/podcast-flow.mock.spec.ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Mock listado de podcasts
  await page.route('**/corsproxy.io/?**toppodcasts**', async (route) => {
    const fakeItunesResponse = {
      feed: {
        entry: [
          {
            id: {
              attributes: { 'im:id': '1234' },
              label: 'https://example.com/podcast/1234',
            },
            'im:name': { label: 'Fake Podcast' },
            'im:artist': { label: 'Fake Podcast' },
            summary: { label: 'Un podcast de prueba' },
            title: { label: 'Fake Podcast' },
            'im:releaseDate': { label: '2023-01-01' },
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
              {
                attributes: { height: '170' },
                label:
                  'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png',
              },
            ],
          },
        ],
      },
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeItunesResponse),
    });
  });

  // Mock detalle del podcast + episodios
  await page.route('**/corsproxy.io/?**lookup**', async (route) => {
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
          previewUrl: 'https://traffic.libsyn.com/secure/fake_episode.mp3', // 👈 renombrado
          description: 'Contenido del episodio 1',
          shortDescription: 'Contenido del episodio 1',
        },
      ],
    };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeDetail),
    });
  });
  await page.route('**/corsproxy.io/?**feeds.libsyn.com**', async (route) => {
    const fakeXml = `
    <rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Fake Podcast Feed</title>
    <description>Descripción del feed</description>
    <itunes:subtitle>Subtitulo</itunes:subtitle>
    <itunes:summary>Sumario</itunes:summary>
    <itunes:author>Fake Author</itunes:author>
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
  await page.goto('/', { waitUntil: 'networkidle' });
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
