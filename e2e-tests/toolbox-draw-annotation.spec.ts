import { test, expect } from '@playwright/test';

test('draw-annotation', async ({ page }, workerInfo) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Annotation' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-annotation-'
      + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await expect(page.getByRole('dialog').filter({ hasText: 'Label' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Ok' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Cancel' })).toBeVisible();

  (await page.waitForSelector('.ant-input')).fill('test');

  await page.getByRole('button').filter({ hasText: 'Ok' }).click();
  await expect(page).not.toHaveScreenshot('draw-annotation-'
    + workerInfo.project.name
    + '-linux.png');

  // testing cancel button
  page.reload();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();
  await page.getByRole('button', { name: 'Annotation' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-annotation-'
      + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await expect(page.getByRole('dialog').filter({ hasText: 'Label' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Ok' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Cancel' })).toBeVisible();

  (await page.waitForSelector('.ant-input')).fill('test');

  await page.getByRole('button').filter({ hasText: 'Cancel' }).click();
  await expect(page).not.toHaveScreenshot('draw-annotation-'
    + workerInfo.project.name
    + '-linux.png');
});
