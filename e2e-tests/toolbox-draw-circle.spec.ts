import { test, expect } from '@playwright/test';

test('draw-circle', async ({ page }, workerInfo) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Circle' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-circle-'
      + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(500, 500, { delay: 500 });

  await expect(page).not.toHaveScreenshot('draw-circle-'
    + workerInfo.project.name
    + '-linux.png');
});
