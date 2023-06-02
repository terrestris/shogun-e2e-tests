import { test, expect } from '@playwright/test';

test('measure', async ({ page }) => {
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Measure' }).click();

  await expect(page.getByRole('button', { name: 'Distance' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Area' })).toBeVisible();

  // testing distance-tool
  await page.getByRole('button', { name: 'Distance' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(500, 400, { delay: 500 });
  await page.mouse.dblclick(600, 200, { delay: 500 });
  await page.waitForSelector('.react-geo-measure-tooltip');
  await page.getByRole('button', { name: 'Distance' }).click();
  await page.waitForSelector('.react-geo-measure-tooltip', { state: 'hidden' });

  // testing area-tool
  await page.getByRole('button', { name: 'Area' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(500, 400, { delay: 500 });
  await page.mouse.dblclick(600, 200, { delay: 500 });
  await page.waitForSelector('.react-geo-measure-tooltip');
  await page.getByRole('button', { name: 'Area' }).click();
  await page.waitForSelector('.react-geo-measure-tooltip', { state: 'hidden' });
});
