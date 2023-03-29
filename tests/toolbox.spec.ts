import { test, expect, FileChooser, request } from '@playwright/test';
import { getComparator } from 'playwright-core/lib/utils';


test('measure', async ({ page }) => {

  await page.goto('https://localhost/client/');

  await page.getByRole('button', { name: 'Measure' }).click();

  await expect(page.getByRole('button', { name: 'Distance' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Area' })).toBeVisible();

  // testing distance-tool
  await page.getByRole('button', { name: 'Distance' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(500, 400, { delay: 500 });
  await page.mouse.dblclick(600, 200, { delay: 500 });
  await page.waitForSelector('.react-geo-measure-tooltip');
  await page.getByRole('button', { name: 'Distance' }).click();
  await page.waitForSelector('.react-geo-measure-tooltip', { state: 'hidden' });

  // testing area-tool
  await page.getByRole('button', { name: 'Area' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(500, 400, { delay: 500 });
  await page.mouse.dblclick(600, 200, { delay: 500 });
  await page.waitForSelector('.react-geo-measure-tooltip');
  await page.getByRole('button', { name: 'Area' }).click();
  await page.waitForSelector('.react-geo-measure-tooltip', { state: 'hidden' });
});

test('draw', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await expect(page.getByRole('button', { name: 'Point' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Line' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Polygon' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Circle' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Rectangle' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Annotation' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Modify color scheme' })).toBeVisible();
});

test('draw-point', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Point' }).click();
  const beforePoint = await page.screenshot({
    path: './screenshots/beforeDraw.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  const afterPoint = await page.screenshot({
    path: './screenshots/afterDraw.png'
  });

  const comparatorPoint = getComparator('image/png');
  expect(comparatorPoint(beforePoint, afterPoint)).not.toBeNull();
});

test('draw-line', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Line' }).click();
  const beforeLine = await page.screenshot({
    path: './screenshots/beforeLine.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.dblclick(500, 500, { delay: 500 });
  const afterLine = await page.screenshot({
    path: './screenshots/afterLine.png'
  });

  const comparatorLine = getComparator('image/png');
  expect(comparatorLine(beforeLine, afterLine)).not.toBeNull();
});

test('draw-polygon', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Polygon' }).click();
  const beforePolygon = await page.screenshot({
    path: './screenshots/beforePolygon.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(400, 300, { delay: 500 });
  await page.mouse.dblclick(500, 500, { delay: 500 });
  const afterPolygon = await page.screenshot({
    path: './screenshots/afterPolygon.png'
  });

  const comparatorPolygon = getComparator('image/png');
  expect(comparatorPolygon(beforePolygon, afterPolygon)).not.toBeNull();
});

test('draw-circle', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Circle' }).click();
  const beforeCircle = await page.screenshot({
    path: './screenshots/beforeCircle.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(500, 500, { delay: 500 });
  const afterCircle = await page.screenshot({
    path: './screenshots/afterCircle.png'
  });

  const comparatorCircle = getComparator('image/png');
  expect(comparatorCircle(beforeCircle, afterCircle)).not.toBeNull();
});

test('draw-rectangle', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Rectangle' }).click();
  const beforeRectangle = await page.screenshot({
    path: './screenshots/beforeRectangle.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(400, 500, { delay: 500 });
  const afterRectangle = await page.screenshot({
    path: './screenshots/afterRectangle.png'
  });

  const comparatorRectangle = getComparator('image/png');
  expect(comparatorRectangle(beforeRectangle, afterRectangle)).not.toBeNull();
});

test('draw-annotation', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Annotation' }).click();
  const beforeAnnotation = await page.screenshot({
    path: './screenshots/beforeAnnotation.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await expect(page.getByRole('dialog').filter({ hasText: 'Label' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Ok' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Cancel' })).toBeVisible();

  (await page.waitForSelector('.ant-input')).fill('test');

  await page.getByRole('button').filter({ hasText: 'Ok' }).click();
  const afterAnnotation = await page.screenshot({
    path: './screenshots/afterAnnotation.png'
  });

  const comparatorAnnotation = getComparator('image/png');
  expect(comparatorAnnotation(beforeAnnotation, afterAnnotation)).not.toBeNull();

  // testing cancel button
  page.reload();
  await page.getByRole('button', { name: 'Draw' }).click();
  await page.getByRole('button', { name: 'Annotation' }).click();
  const beforeAnnotationCancel = await page.screenshot({
    path: './screenshots/beforeAnnotationCancel.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await expect(page.getByRole('dialog').filter({ hasText: 'Label' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Ok' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Cancel' })).toBeVisible();

  (await page.waitForSelector('.ant-input')).fill('test');

  await page.getByRole('button').filter({ hasText: 'Cancel' }).click();
  const afterAnnotationCancel = await page.screenshot({
    path: './screenshots/afterAnnotationCancel.png'
  });

  const comparatorAnnotationCancel = getComparator('image/png');
  expect(comparatorAnnotationCancel(beforeAnnotationCancel, afterAnnotationCancel)).not.toBeNull();
});

test('draw-edit', async ({ page }) => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await timeout(1000);
  // add point to map
  await page.getByRole('button', { name: 'Point' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  const pointSet = await page.screenshot({
    path: './screenshots/beforeDraw.png'
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

  const pointMoved = await page.screenshot({
    path: './screenshots/afterDraw.png'
  });

  const comparator = getComparator('image/png');
  expect(comparator(pointSet, pointMoved)).not.toBeNull();
});

test('draw-upload', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  const beforeUpload = await page.screenshot({
    path: './screenshots/beforeUpload.png'
  });
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('textbox').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('./additional-files/test-geometries.geojson');
  const afterUpload = await page.screenshot({
    path: './screenshots/afterUpload.png'
  });

  const comparator = getComparator('image/png');
  expect(comparator(beforeUpload, afterUpload)).not.toBeNull();
});

test('draw-export', async ({ page }) => {
  // ToDo: comparator needs to be less strict + wait for all http request to be finished

  // function timeout(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // await page.goto('https://localhost/client/');
  // await page.getByRole('button', { name: 'Draw' }).click();

  // // ToDo instead of dublicating the code use import here (draw-rectangle)
  // await page.getByRole('button', { name: 'Rectangle' }).click();
  // await timeout(500);
  // await page.mouse.click(500, 300, { delay: 500 });
  // await timeout(500);
  // await page.mouse.click(400, 500, { delay: 500 });
  // await timeout(500);
  // await page.getByRole('button', { name: 'Rectangle' }).click();
  // // replace code until here

  // await timeout(6000);
  // const beforeExport = await page.screenshot({
  //   path: './screenshots/beforeExport.png'
  // });

  // // Export file
  // const downloadPromise = page.waitForEvent('download');
  // await page.getByRole('button', {name: 'Export', exact: true}).click();
  // const download = await downloadPromise;
  // // console.log(await download.path());
  // await download.saveAs('./additional-files/download-example.geojson');

  // // reload application and import the file again
  // await page.reload()
  // await page.waitForResponse(res => res.status() === 200)
  // await page.getByRole('button', { name: 'Draw' }).click();
  // const fileChooserPromise = page.waitForEvent('filechooser');
  // await page.getByRole('textbox').click();
  // const fileChooser = await fileChooserPromise;
  // await fileChooser.setFiles('./additional-files/download-example.geojson');
  // await timeout(6000);
  // const afterExport = await page.screenshot({
  //   path: './screenshots/afterExport.png'
  // });

  // const comparator = getComparator('image/png');
  // console.log(comparator(beforeExport, afterExport))
  // expect(comparator(beforeExport, afterExport)).toBeLessThanOrEqual(0.02);
});

test('draw-delete', async ({ page }) => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();
  timeout(1000);

  // add point to map
  await page.getByRole('button', { name: 'Point' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  timeout(500);
  const pointSet = await page.screenshot({
    path: './screenshots/pointSet.png'
  });

  // delete point
  await page.getByRole('button', { name: 'Delete' }).click({ delay: 1000 });
  await page.mouse.click(500, 300, { delay: 500 });

  const pointDeleted = await page.screenshot({
    path: './screenshots/pointDeleted.png'
  });

  const comparator = getComparator('image/png');
  expect(comparator(pointSet, pointDeleted)).not.toBeNull();
});

test('draw-modify-color-scheme', async ({ page }) => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();
  timeout(1000);

  // add point to map
  await page.getByRole('button', { name: 'Point' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  timeout(500);
  const pointSet = await page.screenshot({
    path: './screenshots/pointSet.png'
  });

  // modify color scheme point
  await page.getByRole('button', { name: 'Modify color scheme' }).click({ delay: 1000 });
  await page.mouse.click(500, 300, { delay: 500 });
});















test('Download', async ({ page }) => {

  await page.goto('./');

  // close welcome drawer
  await page.getByRole('button', { name: 'Schließen' }).click();

  // unfold Download
  await expect(page.getByLabel('Datenmodell')).toBeHidden();
  await expect(page.getByRole('button', { name: 'download Herunterladen' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'undo Zurücksetzen' })).toBeHidden();
  await page.getByText('Download').click();
  await expect(page.getByRole('button', { name: 'download Herunterladen' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'undo Zurücksetzen' })).toBeVisible();
});

test('Teilen', async ({ page, context }) => {

  await page.goto('./');

  // close welcome drawer
  await page.getByRole('button', { name: 'Schließen' }).click();

  // unfold Share
  await expect(page.getByRole('button', { name: 'twitter' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'whats-app' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'mail' })).toBeHidden();
  await expect(page.getByRole('textbox')).toBeHidden();
  await expect(page.getByRole('button', { name: 'copy' })).toBeHidden();
  await page.getByText('Teilen').click();
  await expect(page.getByRole('button', { name: 'mail' })).toBeVisible();
  // await expect(page.getByRole('textbox')).toBeVisible();
  await expect(page.getByRole('tablist').locator('input[type="text"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'copy' })).toBeVisible();

  await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'mail' }).click()
  ]);
});

test('Drucken', async ({ page }) => {

  await page.goto('./');

  // close welcome drawer
  await page.getByRole('button', { name: 'Schließen' }).click();

  // unfold Drucken
  await expect(page.getByPlaceholder('Bitte geben Sie einen Titel ein')).toBeHidden();
  await expect(page.getByPlaceholder('Bitte geben Sie einen Kommentar ein')).toBeHidden();
  await expect(page.getByText('A3 Hochformat')).toBeHidden();
  await expect(page.getByText('72 DPI')).toBeHidden();
  await expect(page.getByText('PDF')).toBeHidden();
  await expect(page.getByLabel('Legende drucken')).toBeHidden();
  await expect(page.getByRole('button', { name: 'download Ausdruck erzeugen' })).toBeHidden();
  await page.getByText('Drucken').click();
  await expect(page.getByPlaceholder('Bitte geben Sie einen Titel ein')).toBeVisible();
  await expect(page.getByPlaceholder('Bitte geben Sie einen Kommentar ein')).toBeVisible();
  await expect(page.getByText('A3 Hochformat')).toBeVisible();
  await expect(page.getByText('72 DPI')).toBeVisible();
  await expect(page.getByText('PDF')).toBeVisible();
  await expect(page.getByLabel('Legende drucken')).toBeVisible();
  await expect(page.getByRole('button', { name: 'download Ausdruck erzeugen' })).toBeVisible();
});
