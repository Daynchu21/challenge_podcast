// tests/podcast-flow.real.spec.ts
import { test, expect } from '@playwright/test';

test('flujo real con allorigins', async ({ page }) => {
  await page.goto('http://localhost:5173');
  // 1. Home: esperar a que carguen podcasts
  await expect(page.getByTestId('podcast-item').first()).toBeVisible();

  // Ir a detalle de un podcast cualquiera
  const firstPodcast = page.getByTestId('podcast-item').first();
  await firstPodcast.click();

  // 2. Detalle de podcast
  await expect(page.getByTestId('episode-row').first()).toBeVisible();

  // Ir al primer episodio
  const firstEpisode = page.getByTestId('episode-link').first();
  await firstEpisode.click();

  // 3. Detalle de episodio
  const episodeTitle = page.getByTestId('episode-title');
  await expect(episodeTitle).toBeVisible();
  await expect(episodeTitle).not.toBeEmpty();
  const episodeAudio = page.getByTestId('episode-audio');
  await expect(episodeAudio).toBeVisible();
  await expect(episodeAudio).not.toBeEmpty();
  await expect(page.getByTestId('episode-description')).toBeVisible();
});
