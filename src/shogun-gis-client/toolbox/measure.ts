import { expect } from '@playwright/test';

export const measure = async (page: any) => {
  await page.waitForLoadState('networkidle');
  
  await page.getByRole('button', { name: 'Measure' }).click();
  
  await expect(page.getByRole('button', { name: 'Distance' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Area' })).toBeVisible();
  
  // testing distance-tool
  await page.getByRole('button', { name: 'Distance' }).click();
  await page.mouse.move(500, 300);
  await page.mouse.click(500, 300);
  await page.mouse.move(500, 400);
  await page.mouse.click(500, 400);
  await page.mouse.move(600, 200);
  await page.mouse.dblclick(600, 200);
  await page.waitForSelector('.react-geo-measure-tooltip');
  await page.getByRole('button', { name: 'Distance' }).click();
  await page.waitForSelector('.react-geo-measure-tooltip', { state: 'hidden' });
  
  // testing area-tool
  await page.getByRole('button', { name: 'Area' }).click();
  await page.mouse.move(500, 300);
  await page.mouse.click(500, 300);
  await page.mouse.move(500, 400);
  await page.mouse.click(500, 400);
  await page.mouse.move(600, 200);
  await page.mouse.dblclick(600, 200);
  await page.waitForSelector('.react-geo-measure-tooltip');
  await page.getByRole('button', { name: 'Area' }).click();
  await page.waitForSelector('.react-geo-measure-tooltip', { state: 'hidden' });
};
