import { expect } from '@playwright/test';

export const footer = async (page: any) => {
    await expect(page.getByLabel('scale-line')).toBeVisible();
    await expect(page.getByLabel('scale-combo')).toBeVisible();
    await expect(page.getByLabel('reference-system')).toBeVisible();
    await expect(page.getByLabel('mouse-position')).toBeVisible();
};
