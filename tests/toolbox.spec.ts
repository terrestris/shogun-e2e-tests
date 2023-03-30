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

test('draw-point', async ({ page }, workerInfo) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Point' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-point-'
    + workerInfo.project.name +'-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });

  await expect(page).not.toHaveScreenshot('draw-point-'
  + workerInfo.project.name 
  + '-linux.png');

});

test('draw-line', async ({ page }, workerInfo) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Line' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-line-' 
    + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.dblclick(500, 500, { delay: 500 });

  await expect(page).toHaveScreenshot('draw-line-'
  + workerInfo.project.name 
  + '-linux.png');
});

test('draw-polygon', async ({ page }, workerInfo) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Polygon' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-polygon-' 
    + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(400, 300, { delay: 500 });
  await page.mouse.dblclick(500, 500, { delay: 500 });

  await expect(page).not.toHaveScreenshot('draw-polygon-'
  + workerInfo.project.name 
  + '-linux.png');
});

test('draw-circle', async ({ page }, workerInfo) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

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
});

test('draw-rectangle', async ({ page }, workerInfo) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Rectangle' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-rectangle-' 
    + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await page.mouse.click(400, 500, { delay: 500 });
  
  await expect(page).not.toHaveScreenshot('draw-rectangle-'
  + workerInfo.project.name 
  + '-linux.png');
});

test('draw-annotation', async ({ page }, workerInfo) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Annotation' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-annotation-' 
    + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await expect(page.getByRole('dialog').filter({ hasText: 'Label' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Ok' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Cancel' })).toBeVisible();

  (await page.waitForSelector('.ant-input')).fill('test');

  await page.getByRole('button').filter({ hasText: 'Ok' }).click();
  await expect(page).not.toHaveScreenshot('draw-annotation-'
  + workerInfo.project.name 
  + '-linux.png');

  // testing cancel button
  page.reload();
  await page.getByRole('button', { name: 'Draw' }).click();
  await page.getByRole('button', { name: 'Annotation' }).click();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-annotation-' 
    + workerInfo.project.name + '-linux.png'
  });
  await page.mouse.click(500, 300, { delay: 500 });
  await expect(page.getByRole('dialog').filter({ hasText: 'Label' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Ok' })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: 'Cancel' })).toBeVisible();

  (await page.waitForSelector('.ant-input')).fill('test');

  await page.getByRole('button').filter({ hasText: 'Cancel' }).click();
  await expect(page).not.toHaveScreenshot('draw-annotation-'
  + workerInfo.project.name 
  + '-linux.png');
});

test('draw-edit', async ({ page }, workerInfo) => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await timeout(1000);
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
  + '-linux.png');
});

test('draw-upload', async ({ page }, workerInfo) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-upload-' 
    + workerInfo.project.name + '-linux.png'
  });
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('textbox').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('./additional-files/test-geometries.geojson');
  await expect(page).not.toHaveScreenshot('draw-upload-'
  + workerInfo.project.name 
  + '-linux.png');
});

test('draw-export', async ({ page }, workerInfo) => {
  // ToDo: comparator needs to be less strict + wait for all http request to be finished

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  // ToDo instead of dublicating the code use import here (draw-rectangle)
  await page.getByRole('button', { name: 'Rectangle' }).click();
  await timeout(500);
  await page.mouse.click(500, 300, { delay: 500 });
  await timeout(500);
  await page.mouse.click(400, 500, { delay: 500 });
  await timeout(500);
  await page.getByRole('button', { name: 'Rectangle' }).click();
  // replace code until here

  await timeout(6000);
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-export-' 
    + workerInfo.project.name + '-linux.png'
  });

  // Export file
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', {name: 'Export', exact: true}).click();
  const download = await downloadPromise;
  // console.log(await download.path());
  await download.saveAs('./additional-files/download-example.geojson');

  // reload application and import the file again
  await page.reload()
  await page.waitForResponse(res => res.status() === 200)
  await page.getByRole('button', { name: 'Draw' }).click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('textbox').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('./additional-files/download-example.geojson');
  await timeout(6000);
  await expect(page).toHaveScreenshot('draw-export-'
  + workerInfo.project.name 
  + '-linux.png');
});

test('draw-delete', async ({ page }, workerInfo) => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();
  await timeout(1000);

  // add point to map
  await page.getByRole('button', { name: 'Point' }).click();
  await page.mouse.click(500, 300, { delay: 500 });
  await timeout(500);
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/draw-delete-' 
    + workerInfo.project.name + '-linux.png'
  });

  // delete point
  await page.getByRole('button', { name: 'Delete' }).click({ delay: 1000 });
  await page.mouse.click(500, 300, { delay: 500 });

  await expect(page).not.toHaveScreenshot('draw-delete-'
  + workerInfo.project.name 
  + '-linux.png');
});

test('draw-modify-color-scheme', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Draw' }).click();

  await page.getByRole('button', { name: 'Modify color scheme' }).click();
  await expect(page.getByLabel('geostyler-drawer')).toBeVisible();
});

test('query-map-features', async ({ page }) => {

  await page.goto('https://localhost/client/');

  // ToDo: Query map feature:
  // 1. Countries layer hinzufügen -> layertree tests
  // auf bonn zoomen -> suchfunktions-test
  // in die karte klicken
});

test('export', async ({ page }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Export' }).click();

  await expect(page.getByLabel('print-title', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-comment', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-layout', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-scale', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-dpi', { exact: true })).toBeVisible();
  await expect(page.getByLabel('print-format', { exact: true })).toBeVisible();
  await expect(page.getByLabel('create-print', { exact: true })).toBeVisible();

  await page.getByLabel('print-title-input').fill('My Test');
  await page.getByLabel('print-comment-input').fill('My comment using special characters: öäü!"§²%&[}=?*#');
  // ToDo: select different drop-down items. Problem: they dont appear as a normal <select>, but as a <Select> imported from antd which is not recognised by .selectOption()

  // test download
  const downloadPromise = page.waitForEvent('download');
  await page.getByLabel('create-print').click();
  const download = await downloadPromise;
  await download.saveAs('./additional-files/print-download-example.pdf');
});

test('layertree', async ({ page }, workerInfo) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Maps' }).click();

  await expect(page.getByLabel('layertree')).toBeVisible();
  await expect(page.getByRole('button', {name: /Add WMS/})).toBeVisible();
  await page.getByRole('button', {name: /Add WMS/}).click();

  // add wms
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByLabel('add-all')).toBeVisible();
  await expect(page.getByLabel('add-all')).toBeDisabled();
  await expect(page.getByLabel('add-selected')).toBeVisible();
  await expect(page.getByLabel('add-selected')).toBeDisabled();
  await expect(page.getByLabel('Select all')).toBeVisible();
  await expect(page.getByLabel('input-search')).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'select-version' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  
  await page.getByLabel('input-search').fill('https://sgx.geodatenzentrum.de/wms_topplus_open')
  await page.getByRole('img', {name: 'search', exact: true}).click();
  await page.getByRole('checkbox').check();
  await page.getByLabel('add-selected').click();
  
  // test layertree
  await expect(page.getByLabel('holder').first()).toBeVisible();
  await expect(page.getByLabel('caret-down').first()).toBeVisible();
  await expect(page.getByLabel('layer-group').filter({hasText: 'External layers'})).toBeVisible();
  
  // test layertree-node
  await page.getByLabel('caret-down').first().click();
  await expect(page.getByLabel('layer-name').first()).toBeVisible();
  await expect(page.getByLabel('loading-indicator').first()).toBeVisible();
  await expect(page.getByLabel('transparency-slider').first()).toBeVisible();
  await expect(page.getByLabel('layer-context-menu').first()).toBeVisible();
  await page.getByLabel('layer-context-menu').first().click();
  await expect(page.getByLabel('layer-context', {exact: true}).first()).toBeVisible();

  // test layer context - zoom
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/zoom-' 
    + workerInfo.project.name + '-linux.png'
  });
  await page.getByLabel('layer-context-menu').first().click();
  await page.getByRole('menuitem', {name: 'Zoom to layer extent'}).click();
  await expect(page).not.toHaveScreenshot('zoom-'
  + workerInfo.project.name 
  + '-linux.png');

  // test layer context - legend
  await page.getByLabel('layer-context-menu').first().click();
  await page.getByRole('menuitem', {name: 'Show legend'}).click();
  await expect(page.getByAltText('TopPlusOpen Light Grau legend')).toBeVisible();

  // test layer context - remove layer
  await expect(page.getByLabel('layer-name').filter({hasText: 'TopPlusOpen Light Grau'})).toBeVisible();
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/delete-layer-' 
    + workerInfo.project.name + '-linux.png'
  });
  await page.getByLabel('layer-context-menu').first().click();
  await page.getByRole('menuitem', {name: 'Remove layer'}).click();
  await expect(page.getByLabel('layer-name').filter({hasText: 'TopPlusOpen Light Grau'})).toBeHidden();
  await expect(page).not.toHaveScreenshot('delete-layer-'
  + workerInfo.project.name 
  + '-linux.png');
});

test('Teilen', async ({ page, context }) => {

  await page.goto('https://localhost/client/');
  await page.getByRole('button', { name: 'Share' }).click();

  await expect(page.getByLabel('twitter')).toBeVisible();
  await expect(page.getByLabel('whats-app')).toBeVisible();
  await expect(page.getByLabel('mail')).toBeVisible();
  await expect(page.getByLabel('copy')).toBeVisible();
  await expect(page.getByLabel('permalink-url')).toBeVisible();

  await Promise.all([
    context.waitForEvent('page'),
    page.getByLabel('mail').click()
  ]);
});



test('test', async ({ page }, workerInfo) => {
  
  await page.goto('https://localhost/client/');

  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/screenshot-' 
    + workerInfo.project.name + '-linux.png'
  });

  await expect(page).toHaveScreenshot('screenshot-'
  + workerInfo.project.name 
  + '-linux.png');

});
