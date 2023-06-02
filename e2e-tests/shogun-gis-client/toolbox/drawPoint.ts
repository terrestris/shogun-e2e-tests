import { expect } from '@playwright/test';

export const drawPoint = async (page, workerInfo) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();
  
  await page.getByRole('button', { name: 'Point' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-point-'
      + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 2000 });
  
  await expect(page).not.toHaveScreenshot('draw-point-'
    + workerInfo.project.name
    + '-linux.png');
};
