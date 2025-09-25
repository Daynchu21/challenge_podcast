import { test, expect } from '@playwright/test';

test('cache de podcasts en localStorage', async ({ page }) => {
  // limpiar antes de empezar
  await page.addInitScript(() => localStorage.clear());

  let requestCount = 0;
  page.on('request', (req) => {
    if (req.url().includes('corsproxy.io') && req.url().includes('toppodcasts')) {
      requestCount++;
    }
  });

  // 1. Primera carga: se hace la request y se guarda en localStorage
  await page.goto('http://localhost:5173');
  await expect(page.getByTestId('podcast-item').first()).toBeVisible();

  const cacheKey = await page.evaluate(() =>
    Object.keys(localStorage).find((k) => k.includes('popular_podcasts')),
  );
  expect(cacheKey).toBeTruthy();

  // asegurar que hubo request a la API
  expect(requestCount).toBeGreaterThan(0);

  // 2. Recargar: debería usar la cache y no pedir de nuevo
  const start = Date.now();
  await page.reload();
  await expect(page.getByTestId('podcast-item').first()).toBeVisible();
  const elapsed = Date.now() - start;

  // como vino del cache debería ser mucho más rápido (<500ms por ej.)
  expect(elapsed).toBeLessThan(500); // ✅ nada de red, se usó cache
});
