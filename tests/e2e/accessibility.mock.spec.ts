import { test, expect } from '@playwright/test';

test('accesibilidad básica en Home', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Validar que todos los img tengan alt
  const images = await page.locator('img').all();
  for (const img of images) {
    const alt = await img.getAttribute('alt');
    expect(alt).toBeTruthy();
  }

  // Validar que los inputs tengan label asociada
  const inputs = await page.locator('input').all();
  for (const input of inputs) {
    const id = await input.getAttribute('id');
    if (id) {
      const label = page.locator(`label[for="${id}"]`).first();
      await expect(label).toHaveCount(1);
    } else {
      const parentLabel = await input.evaluate((el) => {
        let parent = el.parentElement;
        while (parent) {
          if (parent.tagName.toLowerCase() === 'label') return true;
          parent = parent.parentElement;
        }
        return false;
      });

      expect(parentLabel).toBe(true);
    }
  }
});
