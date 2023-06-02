import { test, expect } from '@playwright/test';

test('draw', async ({ page }) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();

  await expect(page.getByRole('button', { name: 'Point' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Line' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Polygon' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Circle' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Rectangle' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Annotation' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Modify color scheme' })).toBeVisible();
});
