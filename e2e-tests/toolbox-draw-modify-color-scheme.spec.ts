import { test, expect } from '@playwright/test';

test('draw-modify-color-scheme', async ({ page }) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Modify color scheme' }).click();
  await expect(page.getByLabel('geostyler-drawer')).toBeVisible();
});
