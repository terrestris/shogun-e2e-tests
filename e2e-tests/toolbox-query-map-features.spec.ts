import { test } from '@playwright/test';

test('query-map-features', async ({ page }) => {
  await page.waitForLoadState('networkidle');

  // ToDo: Add queryable map to the application
});
