import { expect } from '@playwright/test';

export const userMenu = async (page: any) => {
    await page.getByLabel('user-menu').click();
    await expect(page.getByRole('menu')).toBeVisible();
    // toDo not working yet
    await expect(page.getByRole('menuitem').filter({has: page.getByLabel('user-name')})).toBeVisible();
    await page.getByLabel('info-opener').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByLabel('user-menu').click();
    await page.getByLabel('login').click();
    await expect(page).toHaveURL(/auth/);
};
