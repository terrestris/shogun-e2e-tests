import { test, expect } from '@playwright/test';

test('scale-combo functionality', async ({
    page
}) => {
    const initialScaleCombo = await page.getByLabel('scale-combo').innerText();
    const initialScaleLine = await page.getByLabel('scale-line').innerText();

    await expect(page.getByLabel('scale-combo').filter({
        hasText: initialScaleCombo[0].toString()
    })).toBeVisible();
    await expect(page.getByLabel('scale-line').filter({
        hasText: initialScaleLine[0].toString()
    })).toBeVisible();

    await page.getByLabel('scalecombo-dropdown').filter({
        hasText: /1:/
    }).click();
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    const changedScaleCombo = await page.getByLabel('scale-combo').innerText();
    const changedScaleLine = await page.getByLabel('scale-line').innerText();

    await expect(page.getByLabel('scale-combo').filter({
        hasText: changedScaleCombo[0].toString()
    })).toBeVisible();
    await expect(page.getByLabel('scale-line').filter({
        hasText: changedScaleLine[0].toString()
    })).toBeVisible();

    await expect(initialScaleCombo).not.toEqual(changedScaleCombo);
    await expect(initialScaleLine).not.toEqual(changedScaleLine);
});
