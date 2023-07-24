import { expect } from '@playwright/test';

export const header = async (page: any) => {
    await expect(page.getByLabel('logo')).toBeVisible();
    await expect(page.getByLabel('search-field')).toBeVisible();
    await expect(page.getByLabel('user-menu')).toBeVisible();
};
