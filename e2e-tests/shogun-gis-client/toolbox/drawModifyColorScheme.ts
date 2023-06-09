import { expect } from '@playwright/test';

export const drawModifyColorScheme = async (page) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();
  
  await page.getByRole('button', { name: 'Modify color scheme' }).click();
  await expect(page.getByLabel('geostyler-drawer')).toBeVisible();
};
