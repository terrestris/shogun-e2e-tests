import { expect } from '@playwright/test';

export const drawCircle = async (page: any, workerInfo: any) => {
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
};
