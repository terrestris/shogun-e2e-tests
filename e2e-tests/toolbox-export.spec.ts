import { test, expect } from '@playwright/test';

test('export', async ({ page }) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Export' }).click();

  await expect(page.getByLabel('print-title', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-comment', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-layout', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-scale', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-dpi', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-format', { exact: true })).toBeVisible();
  await expect(page.getByLabel('create-print', { exact: true })).toBeVisible();

  await page.getByLabel('print-title-input').fill('My Test');
  await page.getByLabel('print-comment-input').fill('My comment using special characters: öäü!"§²%&[}=?*#');
  // ToDo: select different drop-down items. Problem: they dont appear as a normal <select>, but as a <Select> imported from antd which is not recognised by .selectOption()

  // test download
  const downloadPromise = page.waitForEvent('download');
  await page.getByLabel('create-print').click();
  const download = await downloadPromise;
  await download.saveAs('./additional-files/print-download-example.pdf');
});
