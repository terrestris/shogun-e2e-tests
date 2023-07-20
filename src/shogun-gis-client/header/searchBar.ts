import { expect } from '@playwright/test';

export const searchBar = async (page: any) => {
    const initialScaleLine = await page.getByLabel('scale-combo').innerText();
    await page.getByRole('combobox', { name: 'search-bar' }).fill('Bonn');
    await page.getByText('Bonn, North Rhine-Westphalia, Germany').nth(1).click({ delay: 500 });
    const changedScaleLine = await page.getByLabel('scale-combo').innerText();
    await expect(initialScaleLine).not.toEqual(changedScaleLine);
};
