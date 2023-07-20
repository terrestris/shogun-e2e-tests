import { expect } from '@playwright/test';

export const drawLine = async (page: any, workerInfo: any) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();
  
  await page.getByRole('button', { name: 'Line' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-line-'
      + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.dblclick(500, 500, { delay: 500 });
  
  await expect(page).not.toHaveScreenshot('draw-line-'
    + workerInfo.project.name
    + '-linux.png');
};
