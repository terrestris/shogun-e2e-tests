import { test, expect } from '@playwright/test';

test('footer has most important components', async ({ page }) => {
    await expect(page.getByLabel('scale-line')).toBeVisible();
    await expect(page.getByLabel('scale-combo')).toBeVisible();
    await expect(page.getByLabel('reference-system')).toBeVisible();
    await expect(page.getByLabel('mouse-position')).toBeVisible();
});
