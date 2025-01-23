import { expect } from '@playwright/test';

export const applicationConfig = async (page: any) => {
    const logo = await page.locator('.header-logo');
    await expect(logo).toBeVisible();
    await expect(page.locator('.language-select')).toBeVisible();
    const languageIndicator = page.locator('#root').getByText('DE').isVisible();
    if (languageIndicator) {
      await page.locator('.language-select').click();
      await page.locator('.ant-select-item-option-content').getByText('EN', { exact: true }).click();
    }
  
    await expect(page.locator('.user-menu')).toBeVisible();
  
    await page.getByRole('menuitem', { name: 'bank Layers' }).locator('span').first().click();
    await page.getByRole('button', { name: 'form Create Layer' }).click();
    await page.getByLabel('Name').fill('Test Config Layer Playwright');
    await page.getByRole('button', { name: 'save Save Layer' }).click();
    await expect(page.getByText('Layer successfully saved')).toBeVisible();
    await page.getByLabel('Close', { exact: true }).click();
  
    const targetRowLayer = await page.locator('.ant-table-row').filter({
      hasText: 'Test Config Layer Playwright'
    }).first();
    const rowContentLayer = await targetRowLayer.innerText();
    const layerID: string = rowContentLayer.match(/\d+/)?.[0];
  
    await page.getByRole('menuitem', { name: 'bank Application' }).locator('span').first().click();
    await page.getByRole('button', { name: 'form Create Application' }).click();
    await page.getByLabel('Name').fill('Test Config Application Playwright');
  
    await page.getByRole('button', { name: 'fullscreen' }).first().click();
    await expect(page.locator('.monaco-editor').first()).toBeVisible();
    await page.locator('.view-lines > div:nth-child(26)').click();
    await page.evaluate(() => {
      navigator.clipboard.writeText(`,
        "defaultLanguage": "de"
      `);
    }, layerID);
    await page.bringToFront();
    await page.keyboard.press('Control+V');
    await page.getByRole('button', { name: 'save Save Application' }).click();
    await expect(page.getByTitle(/^Layertree$/)).toBeVisible();
  
    await page.getByRole('button', { name: 'fullscreen' }).nth(1).click();
    await expect(page.locator('.monaco-editor').first()).toBeVisible();
    const jsonEditor = 'div:nth-child(8) > .ant-row > div:nth-child(2) > .ant-form-item-control-input >'
      + '.ant-form-item-control-input-content > .fs-wrapper > .json-editor > section > div > .monaco-editor >'
      + '.overflow-guard > div:nth-child(2) > .lines-content > .view-lines > .view-line';
    await page.locator(jsonEditor).click();
    // eslint-disable-next-line no-shadow
    await page.evaluate((layerID: string) => {
      navigator.clipboard.writeText(`{
        "title": "root",
        "children": [
          {
            "title": "Test Layer",
            "checked": true,
            "layerId": ${layerID}
          }
        ]
      }
        `);
    }, layerID);
    await page.bringToFront();
    await page.keyboard.press('Control+V');
    await page.getByLabel('Editor content;Press Alt+F1').nth(2).press('ControlOrMeta+ ');
    await expect(page.getByLabel('Suggest').locator('a')).toBeVisible();
  
    await page.getByRole('button', { name: 'save Save Application' }).click();
    await expect(page.getByText('Application successfully saved').first()).toBeVisible();
    await page.locator('.ant-notification-notice-close').click();
    await expect(page.getByTitle(/^Configure Tools$/)).toBeVisible();
  
    await page.getByRole('button', { name: 'fullscreen' }).nth(3).click();
    await expect(page.locator('.monaco-editor').first()).toBeVisible();
    await page.locator('.view-lines > div:nth-child(27)').click();
    await page.getByText('true').nth(1).click();
    for (let i = 0; i <= 1; i++) {
      await page.keyboard.press('Backspace');
    }
    for (let i = 0; i <= 1; i++) {
      await page.keyboard.press('Delete');
    }
    await page.keyboard.type('false');
    await page.bringToFront();
  
    await page.getByRole('button', { name: 'save Save Application' }).click();
    await expect(page.getByText('Application successfully saved')).toBeVisible();
    await page.getByLabel('Close', { exact: true }).click();
  
    const targetRow = await page.locator('.ant-table-row').filter({
      hasText: 'Test Config Application Playwright'
    }).first();
    const rowContent = await targetRow.innerText();
    const applicationID = rowContent.match(/\d+/)?.[0];
  
    await page.goto(`/client/?applicationId=${applicationID}`);
    await expect(page.locator('#map')).toBeVisible();
    await expect(page.getByText('Messen')).not.toBeVisible();
    await expect(page.getByText('Karten').first()).toBeVisible();
    await page.getByRole('button', { name: 'right Karten' }).nth(1).click();
    await expect(page.getByText('Test Layer')).toBeVisible();
  
    await page.goto('/admin/portal');
    await page.getByRole('menuitem', { name: 'bank Application' }).locator('span').first().click();
    await page.getByRole('row', { name: 'Test Config Application Playwright' }).locator('div svg').nth(1).click();
    await expect(page.getByText('Delete Entity')).toBeVisible();
    await page.getByRole('dialog').getByRole('textbox').fill('Test Config Application Playwright');
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('Delete successful')).toBeVisible();
  
    await page.getByRole('menuitem', { name: 'bank Layers' }).locator('span').first().click();
    await page.getByRole('row', { name: 'Test Config Layer Playwright' }).first().locator('div svg').click();
    await expect(page.getByText('Delete Entity')).toBeVisible();
    await page.getByRole('dialog').getByRole('textbox').fill('Test Config Layer Playwright');
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('Delete successful')).toBeVisible();
  };
