import { expect } from '@playwright/test';

export const layertree = async (page: any, workerInfo: any) => {
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Maps' }).click();
  
  await expect(page.getByLabel('layertree')).toBeVisible();
  await expect(page.getByRole('button', { name: /Add WMS/ })).toBeVisible();
  await page.getByRole('button', { name: /Add WMS/ }).click();
  
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
  await page.getByRole('img', { name: 'search', exact: true }).click();
  await page.getByRole('checkbox').check();
  await page.getByLabel('add-selected').click();
  
  // test layertree
  await expect(page.getByLabel('holder').first()).toBeVisible();
  await expect(page.getByLabel('caret-down').first()).toBeVisible();
  await expect(page.getByLabel('layer-group').filter({ hasText: 'External layers' })).toBeVisible();
  
  // test layertree-node
  await page.getByLabel('caret-down').first().click();
  await expect(page.getByLabel('layer-name').first()).toBeVisible();
  await expect(page.getByLabel('loading-indicator').first()).toBeVisible();
  await expect(page.getByLabel('transparency-slider').first()).toBeVisible();
  await expect(page.getByLabel('layer-context-menu').first()).toBeVisible();
  await page.getByLabel('layer-context-menu').first().click();
  await expect(page.getByLabel('layer-context', { exact: true }).first()).toBeVisible();
  
  // test layer context - zoom
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/zoom-'
      + workerInfo.project.name + '-linux.png'
  });
  await page.getByLabel('layer-context-menu').first().click();
  await page.getByRole('menuitem', { name: 'Zoom to layer extent' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page).not.toHaveScreenshot('zoom-'
    + workerInfo.project.name
    + '-linux.png');
  
  // test layer context - legend
  await page.getByLabel('layer-context-menu').first().click();
  await page.getByRole('menuitem', { name: 'Show legend' }).click();
  await expect(page.getByAltText('TopPlusOpen Light Grau legend')).toBeVisible();
  
  // test layer context - remove layer
  await expect(page.getByLabel('layer-name').filter({ hasText: 'TopPlusOpen Light Grau' })).toBeVisible();
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/delete-layer-'
      + workerInfo.project.name + '-linux.png'
  });
  await page.getByLabel('layer-context-menu').first().click();
  await page.getByRole('menuitem', { name: 'Remove layer' }).click();
  await expect(page.getByLabel('layer-name').filter({ hasText: 'TopPlusOpen Light Grau' })).toBeHidden();
  await page.waitForLoadState('networkidle');
  await expect(page).not.toHaveScreenshot('delete-layer-'
    + workerInfo.project.name
    + '-linux.png');
};
