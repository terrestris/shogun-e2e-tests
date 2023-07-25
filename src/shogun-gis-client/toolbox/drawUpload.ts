import { expect } from '@playwright/test';

export const drawUpload = async (page: any, workerInfo: any) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();
  
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-upload-'
      + workerInfo.project.name + '-linux.png'
  });
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('textbox').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('node_modules/@terrestris/shogun-e2e-tests/dist/additional-files/test-geometries.geojson');
  await expect(page).not.toHaveScreenshot('draw-upload-'
    + workerInfo.project.name
    + '-linux.png');
};
