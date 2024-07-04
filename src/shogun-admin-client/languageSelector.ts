import { expect } from '@playwright/test';

export const languageSelector = async (page: any) => {
    await page.waitForTimeout(3000);
    const selector = await page.locator('.language-select');
    await expect(selector).toBeVisible();
  
    const initialLanguage = await page.locator('.language-select').innerText();
    const initialTitle = await page.locator('.ant-menu-title-content').first().innerText();
  
    await expect(page.locator('.language-select').filter({
      hasText: initialLanguage.toString()
    })).toBeVisible();
    await expect(page.locator('.ant-menu-title-content').filter({
      hasText: initialTitle.toString()
    })).toBeVisible();
  
    await page.getByTitle('EN').click();
  
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
  
    const changedLanguage = await page.locator('.language-select').innerText();
    const changedTitle = await page.locator('.ant-menu-title-content').first().innerText();
  
    await expect(page.locator('.language-select').filter({
      hasText: changedLanguage[0].toString()
    })).toBeVisible();
    await expect(page.locator('.ant-menu-title-content').filter({
      hasText: changedTitle.toString()
    })).toBeVisible();
  
    await expect(initialLanguage).not.toEqual(changedLanguage);
    await expect(initialTitle).not.toEqual(changedTitle);
  };
  