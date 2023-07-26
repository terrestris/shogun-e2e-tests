import { expect } from '@playwright/test';

export const drawEdit = async (page: any, workerInfo: any) => {
  function timeout(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  
  // add point to map
  await page.getByRole('button', { name: 'Point' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-edit-'
      + workerInfo.project.name + '-linux.png'
  });
  
  // modify point
  await page.getByRole('button', { name: 'Edit' }).click({ delay: 1000 });
  await page.mouse.click(500, 300, { delay: 500 });
  
  await timeout(500);
  await page.mouse.move(500, 300);
  await page.mouse.down();
  await page.mouse.move(500, 400, { steps: 5 });
  await page.mouse.up();
  await page.mouse.click(500, 300, { delay: 500 });
  
  await expect(page).not.toHaveScreenshot('draw-edit-'
    + workerInfo.project.name
    + '-linux.png', { maxDiffPixels: 100 });
};
