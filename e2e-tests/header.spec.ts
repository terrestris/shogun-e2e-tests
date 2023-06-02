import { test, expect } from '@playwright/test';

test('header has most important components', async ({ page }) => {
    await expect(page.getByLabel('logo')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'search-bar' })).toBeVisible();
    await expect(page.getByLabel('user-menu')).toBeVisible();
});
