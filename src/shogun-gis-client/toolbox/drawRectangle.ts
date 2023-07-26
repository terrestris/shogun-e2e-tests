import { expect } from '@playwright/test';

export const drawRectangle = async (page: any, workerInfo: any) => {
  await page.getByRole('button', { name: 'Rectangle' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-rectangle-'
      + workerInfo.project.name + '-linux.png'
  });

  await page.mouse.move(500, 300);
  await page.mouse.click(500, 300);
  await page.mouse.move(400, 500);
  await page.mouse.click(400, 500);
  
  await expect(page).not.toHaveScreenshot('draw-rectangle-'
    + workerInfo.project.name
    + '-linux.png');
};
