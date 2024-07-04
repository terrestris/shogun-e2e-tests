import { expect } from '@playwright/test';

export const userMenu = async (page: any) => {
    await expect(page.locator('.username')).toBeVisible();
  
    const image = page.locator('.userimage').locator('img');
    await expect(image).toBeVisible();
    const width = await image.evaluate((img: { naturalWidth: any; }) => img.naturalWidth);
    const height = await image.evaluate((img: { naturalHeight: any; }) => img.naturalHeight);
    const aspectRatio = width / height;
    const expectedAspectRatio = 1 / 1;
    const tolerance = 0.01;
    await expect(aspectRatio).toBeCloseTo(expectedAspectRatio, tolerance);
  
    await page.locator('.user-menu').click();
    const displayedUsername = await page.locator('.user-name');
    await expect(displayedUsername).toBeVisible();
    await expect(page.getByRole('menuitem').first()).toBeVisible();
  
    await page.getByText('Info', { exact: true }).click();
    const display = await page.locator('.application-info-modal').evaluate((el: Element) => getComputedStyle(el).display);
    await expect(display).not.toBe('none');
    await page.getByLabel('Close', { exact: true }).click();
  
    await page.locator('.user-menu').click();
    await page.getByText('Profile settings').click();
    await expect(page).toHaveURL(/auth/);
    await expect(page.getByText('Manage your basic information')).toBeVisible();
    await page.getByText('Back to shogun-admin').click();
    await page.waitForTimeout(3000);
  
    await page.locator('.user-menu').click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL(/auth/);
  };  
