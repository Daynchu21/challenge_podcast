// tests/podcast-flow.real.spec.ts
import { test, expect } from '@playwright/test';

test('flujo real con allorigins', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 1. Home: esperar a que carguen podcasts
  await page.pause();
  await expect(page.getByTestId('podcast-item').first()).toBeVisible();

  // Ir a detalle de un podcast cualquiera
  const firstPodcast = page.getByTestId('podcast-item').first();
  await firstPodcast.click();

  // 2. Detalle de podcast
  await expect(page.getByTestId('episode-row')).toBeVisible();

  // Ir al primer episodio
  const firstEpisode = page.getByTestId('episode-link').first();
  await firstEpisode.click();

  // 3. Detalle de episodio
  await expect(page.getByTestId('episode-title')).toContainText('Episode 1');
  await expect(page.getByTestId('episode-audio')).toBeVisible();
  await expect(page.getByTestId('episode-description')).toContainText('Contenido del episodio 1');
});
