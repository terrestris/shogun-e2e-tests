import { expect } from '@playwright/test';

export const drawModifyColorScheme = async (page: any) => { 
  await page.getByRole('button', { name: 'Modify color scheme' }).click();
  await expect(page.getByRole('dialog').filter({hasText: 'Style'})).toBeVisible();
};
