import { expect } from '@playwright/test';

export const layersPage = async (page: any) => {
    await page.waitForTimeout(3000);
    const languageIndicator = page.locator('#root').getByText('DE').isVisible();
    if (languageIndicator) {
      await page.locator('.language-select').click();
      await page.locator('.ant-select-item-option-content').getByText('EN', { exact: true }).click();
    }
  
    await expect(page.getByRole('link', { name: 'appstore Layers … that move' })).toBeVisible();
    const layersNumberText = await page.getByRole('link', { name: ' Layers' }).innerText();
    const layersNumber = layersNumberText.match(/\d+/)?.[0];
    await expect(page.locator('.ant-statistic-content-value').filter({
      hasText: layersNumber
    })).toBeVisible();
    await page.getByRole('menuitem', { name: 'bank Layers' }).locator('span').first().click();
  
    await expect(page.locator('.ant-table-container')).toBeVisible();
    await expect(page.getByLabel(/^ID$/)).toBeVisible();
    await expect(page.getByText(/^Name$/)).toBeVisible();
    await expect(page.getByText(/^Type$/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'form Create Layer' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'upload Upload Layer' })).toBeVisible();
  
    await expect(page.getByText('Total:')).toBeVisible();
    const totalLayersNumberText = await page.getByText('Total:').innerText();
    const totalLayersNumber = totalLayersNumberText.match(/\d+/)?.[0];
    await expect(totalLayersNumber).toBe(layersNumber);
  
    await page.getByRole('button', { name: 'form Create Layer' }).click();
    await expect(page.getByText(/^Created at$/)).toBeVisible();
    await expect(page.getByText(/^Last edited on$/)).toBeVisible();
    await expect(page.getByText(/^Public layer$/)).toBeVisible();
    await expect(page.getByTitle(/^Configuration$/)).toBeVisible();
    await expect(page.getByTitle(/^Datasource$/)).toBeVisible();
    await expect(page.getByTitle(/^User permissions$/)).toBeVisible();
    await expect(page.getByTitle(/^Group permissions$/)).toBeVisible();
    await expect(page.getByTitle(/^Role permissions$/)).toBeVisible();
  
    await page.locator('.ant-select-selection-item').filter({ hasText: /^TILEWMS$/ }).click();
    await expect(page.locator('.ant-select-item-option-content').filter({ hasText: /^WFS$/ })).toBeVisible();
    await expect(page.locator('.ant-select-item-option-content').filter({ hasText: /^WMS$/ })).toBeVisible();
    await expect(page.locator('.ant-select-item-option-content').filter({ hasText: /^WMSTIME$/ })).toBeVisible();
    await expect(page.locator('.ant-select-item-option-content').filter({ hasText: /^XYZ$/ })).toBeVisible();
  
    await page.getByLabel('Name').fill('Test Layer Playwright');
    await page.getByRole('button', { name: 'save Save Layer' }).click();
    await expect(page.getByText('Layer successfully saved')).toBeVisible();
    await page.getByLabel('Close', { exact: true }).click();
    await page.getByRole('menuitem', { name: 'bank Layer' }).locator('span').first().click();
    await expect(page.getByText('Test Layer Playwright').first()).toBeVisible();
  
    await page.getByText('Go toPage').click();
    await page.getByLabel('Page', { exact: true }).click();
    await page.getByLabel('Page', { exact: true }).fill('2');
    await page.getByLabel('Page', { exact: true }).press('Enter');
  
    await expect(page.getByText('Test Layer Playwright').first()).not.toBeVisible();
    await page.getByRole('listitem', {
      name: 'Previous page',
      exact: true
    }).getByRole('button').click();
    await expect(page.getByText('Test Layer Playwright').first()).toBeVisible();
    await page.getByRole('row', { name: 'Test Layer Playwright' }).locator('path').first().click();
    await expect(page.getByText('Layer preview (Test Layer Playwright)')).toBeVisible();
    await expect(page.locator('.ol-layer')).toBeVisible();
    await expect(page.getByRole('button', { name: '+' })).toBeVisible();
    await expect(page.getByRole('button', { name: '–' })).toBeVisible();
    await page.getByLabel('Close', { exact: true }).click();
  
    await page.getByRole('cell', { name: 'Test Layer Playwright' }).first().click();
    await page.getByTitle('Name').first().fill('Test Layer Playwright EDITED');
    await page.getByRole('button', { name: 'undo Reset Layer' }).click();
    await expect(page.getByText('Test Layer Playwright EDITED')).not.toBeVisible();
    await page.getByTitle('Name').first().fill('Test Layer Playwright EDITED');
    await page.getByRole('button', { name: 'save Save Layer' }).click();
    await expect(page.getByText('Layer successfully saved')).toBeVisible();
    await page.getByRole('menuitem', { name: 'bank Layers' }).locator('span').first().click();
    await expect(page.getByText('Test Layer Playwright EDITED').first()).toBeVisible();
  
    await page.getByRole('row', { name: 'Test Layer Playwright EDITED' }).first().locator('div svg').click();
    await expect(page.getByText('Delete Entity')).toBeVisible();
    await page.getByRole('dialog').getByRole('textbox').fill('Test Layer Playwright EDITED');
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('Delete successful')).toBeVisible();
  
    await page.getByRole('columnheader', { name: 'ID' }).click();
    await page.waitForTimeout(1000);
    const firstRow = await page.locator('.ant-table-row').first();
    const firstRowContent = await firstRow.innerText();
    const firstID = firstRowContent.match(/\d+/)?.[0];
    const secondRow = await page.locator('.ant-table-row').nth(1);
    const secondRowContent = await secondRow.innerText();
    const secondID = secondRowContent.match(/\d+/)?.[0];
    await expect(parseInt(secondID, 10)).toBeGreaterThan(parseInt(firstID, 10));
  
    await page.getByRole('columnheader', { name: 'ID' }).click();
    await page.waitForTimeout(1000);
    const firstRowUpdated = await page.locator('.ant-table-row').first();
    const firstRowContentUpdated = await firstRowUpdated.innerText();
    const firstIDUpdated = firstRowContentUpdated.match(/\d+/)?.[0];
    const secondRowUpdated = await page.locator('.ant-table-row').nth(1);
    const secondRowContentUpdated = await secondRowUpdated.innerText();
    const secondIDUpdated = secondRowContentUpdated.match(/\d+/)?.[0];
    await expect(parseInt(firstIDUpdated, 10)).toBeGreaterThan(parseInt(secondIDUpdated, 10));
  
    await page.getByRole('columnheader', { name: 'Type' }).click();
    const firstRowType = await page.locator('.ant-table-row').first();
    const firstRowTypeContent = await firstRowType.innerText();
    await expect(firstRowTypeContent).toContain('TILEWMS');
  
    await page.getByRole('button', { name: 'upload Upload Layer' }).click();
    await page.locator('input[type="file"]').setInputFiles('src/additional-files/testfile.zip');
  
    await expect(page.getByText('Layer successfully created')).toBeVisible();
  };