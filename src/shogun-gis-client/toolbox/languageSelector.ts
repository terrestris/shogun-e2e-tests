import { expect } from '@playwright/test';

export const languageSelector = async (page: any) => {
  await expect(page.getByLabel('language-selector')).toBeVisible();
  await page.getByLabel('language-selector').click();
  await page.getByText('DE', { exact: true }).click();
};
