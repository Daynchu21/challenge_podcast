import { test, expect } from '@playwright/test';

test('filtra podcasts en Home', async ({ page }) => {
  await page.goto('/');

  // Esperar lista inicial
  const podcastItems = page.getByTestId('podcast-item');
  await expect(podcastItems.first()).toBeVisible();
  const total = await podcastItems.count();
  expect(total).toBeGreaterThan(0);

  // Filtrar por "Fake"
  const input = page.getByPlaceholder(/filter podcasts/i);
  await input.fill('Fake');

  // Validar que todos contengan "Fake"
  const filteredCount = await podcastItems.count();
  expect(filteredCount).toBeLessThanOrEqual(total);
  for (let i = 0; i < filteredCount; i++) {
    await expect(podcastItems.nth(i)).toContainText(/Fake/i);
  }

  // Resetear filtro
  await input.fill('');
  await expect(podcastItems).toHaveCount(total);
});
