import { expect } from '@playwright/test';

export const drawPolygon = async (page: any, workerInfo: any) => {
  await page.getByRole('button', { name: 'Polygon' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-polygon-'
      + workerInfo.project.name + '-linux.png'
  });
  
  await page.mouse.move(500, 300);
  await page.mouse.click(500, 300);
  await page.mouse.move(400, 300);
  await page.mouse.click(400, 300);
  await page.mouse.move(500, 500);
  await page.mouse.click(500, 500);


  await expect(page).not.toHaveScreenshot('draw-polygon-'
    + workerInfo.project.name
    + '-linux.png');
};
