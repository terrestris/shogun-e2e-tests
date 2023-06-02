import { test, expect } from '@playwright/test';

test('header has most important components', async ({ page }) => {

    await page.goto('https://localhost/client');

    await expect(page.getByLabel('logo')).toBeVisible();
    await expect(page.getByRole('combobox', {name:'search-bar'})).toBeVisible();
    await expect(page.getByLabel('user-menu')).toBeVisible();
    // ToDo: viewport is too small - expand window size
    // await expect(page.getByLabel('title')).toBeVisible();
});

test('search-bar', async ({ page }) => {

    await page.goto('https://localhost/client');

    const initialScaleLine = await page.getByLabel('scale-combo').innerText();
    await page.getByRole('combobox', {name:'search-bar'}).fill('Bonn');
    await page.getByText('Bonn, North Rhine-Westphalia, Germany').nth(1).click({delay:500});
    const changedScaleLine = await page.getByLabel('scale-combo').innerText();
    await expect(initialScaleLine).not.toEqual(changedScaleLine);
});

test('user-menu', async ({ page }) => {

    await page.goto('https://localhost/client');

    await page.getByLabel('user-menu').click();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.getByRole('menuitem').filter({hasText: 'About'}).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', {name: 'Close'}).click();
    await page.getByLabel('user-menu').click();
    await page.getByRole('menuitem').filter({hasText: 'Login'}).click();
    await expect(page).toHaveURL(/auth/);
});