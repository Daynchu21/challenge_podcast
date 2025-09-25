import { test, expect } from '@playwright/test';

test('navegación back/forward entre Home y detalle', async ({ page }) => {
  // Ir a Home
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  const podcastItems = page.getByTestId('podcast-item');
  await expect(podcastItems.first()).toBeVisible();

  await podcastItems.first().click();

  const podcastDetail = page.getByTestId('podcast-detail');
  await expect(podcastDetail).toBeVisible();

  await page.goBack();
  await expect(podcastItems.first()).toBeVisible();

  await page.goForward();
  await expect(podcastDetail).toBeVisible();
});
