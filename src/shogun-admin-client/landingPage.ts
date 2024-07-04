import { expect } from '@playwright/test';

export const landingPage = async (page: any) => {
  await page.waitForTimeout(3000);
  const logo = await page.locator('.header-logo-a');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('href', '/admin/portal');
  await expect(page.locator('.language-select')).toBeVisible();
  await expect(page.locator('.user-menu')).toBeVisible();

  await expect(page.locator('.portal')).toBeVisible();

  const menu = await page.locator('.menu');
  await expect(menu).toBeVisible();
  await page.locator('.menu-toggle-button').click();
  await expect(page.locator('.ant-menu-submenu-title').first()).toHaveAttribute('aria-expanded', 'false');
  await page.locator('[aria-label="menu-unfold"]').click();
  await expect(menu).toContainText('Application');
  await expect(menu).toContainText('Layers');
  await expect(menu).toContainText('User');
  await expect(menu).toContainText('Groups');
  await expect(menu).toContainText('Images');
  await expect(menu).toContainText('Status');
  await expect(menu).toContainText('Configuration');

  await expect(page.locator('.ant-menu-submenu-title').first()).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.content')).toBeVisible();


  await expect(page.locator('div').filter({ hasText: /^Applications$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Layers$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^User$/ })).toBeVisible();
};
  