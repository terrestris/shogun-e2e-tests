import { expect } from '@playwright/test';

export const drawDelete = async (page, workerInfo) => {
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: 'Draw' }).click();
  
  // add point to map
  await page.getByRole('button', { name: 'Point' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-delete-'
      + workerInfo.project.name + '-linux.png'
  });
  
  // delete point
  await page.getByRole('button', { name: 'Delete' }).click({ delay: 1000 });
  await page.mouse.click(500, 300, { delay: 500 });
  
  await expect(page).not.toHaveScreenshot('draw-delete-'
    + workerInfo.project.name
    + '-linux.png', { maxDiffPixels: 100 });
};
