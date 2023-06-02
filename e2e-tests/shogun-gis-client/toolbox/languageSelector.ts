import { expect } from '@playwright/test';

export const languageSelector = async (page) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Language selector' }).click();
  
  await expect(page.getByLabel('language-selector')).toBeVisible();
  await page.getByLabel('language-selector').click();
  await page.getByText('DE', { exact: true }).click();
};
