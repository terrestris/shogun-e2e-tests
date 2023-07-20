import { expect } from '@playwright/test';

export const userMenu = async (page: any) => {
    await page.getByLabel('user-menu').click();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.getByRole('menuitem').filter({ hasText: 'About' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByLabel('user-menu').click();
    await page.getByRole('menuitem').filter({ hasText: 'Login' }).click();
    await expect(page).toHaveURL(/auth/);
};
