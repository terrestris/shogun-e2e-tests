import { expect } from '@playwright/test';

export const header = async (page) => {
    await expect(page.getByLabel('logo')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'search-bar' })).toBeVisible();
    await expect(page.getByLabel('user-menu')).toBeVisible();
};
