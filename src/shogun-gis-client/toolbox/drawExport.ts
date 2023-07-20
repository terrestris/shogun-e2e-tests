import { expect } from '@playwright/test';

export const drawExport = async (page: any, workerInfo: any) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();
  
  // ToDo instead of dublicating the code use import here (draw-rectangle)
  await page.getByRole('button', { name: 'Rectangle' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(400, 500, { delay: 500 });
  await page.getByRole('button', { name: 'Rectangle' }).click();
  // replace code until here
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-export-'
      + workerInfo.project.name + '-linux.png'
  });
  
  // Export file
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export', exact: true }).click();
  const download = await downloadPromise;
  // console.log(await download.path());
  await download.saveAs('./additional-files/download-example.geojson');
  
  // reload application and import the file again
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Draw' }).click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('textbox').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('./additional-files/download-example.geojson');
  await expect(page).toHaveScreenshot('draw-export-'
    + workerInfo.project.name
    + '-linux.png');
};
