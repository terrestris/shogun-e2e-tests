import { expect } from '@playwright/test';

  export const searchBar = async (page: any) => {
    const initialScaleLine = await page.getByLabel('scale-combo').innerText();
    await page.getByRole('combobox', { name: 'search' }).fill('Bonn');
    await page.getByText('Bonn, North Rhine-Westphalia, Germany').nth(1).click({ delay: 500 });
    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(1000);

    const changedScaleLine = await page.getByLabel('scale-combo').innerText();
    await expect(initialScaleLine).not.toEqual(changedScaleLine);
  };
