import { expect } from '@playwright/test';
import { searchBar } from '../header/searchBar';

export const share = async (page: any, context: any, workerInfo: any) => {
  function timeout(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await expect(page.getByLabel('twitter')).toBeVisible();
  await expect(page.getByLabel('whats-app')).toBeVisible();
  await expect(page.getByLabel('mail')).toBeVisible();
  await expect(page.getByLabel('copy')).toBeVisible();
  await expect(page.getByLabel('permalink-url')).toBeVisible();
  
  // test twitter
  const twitterPromise = context.waitForEvent('page');
  await page.getByLabel('twitter').click();
  const twitter = await twitterPromise;
  await expect(twitter).toHaveURL(/twitter.com/);
  twitter.close();
  
  // test whats-app
  const whatsAppPromise = context.waitForEvent('page');
  await page.getByLabel('whats-app').click();
  const whatsApp = await whatsAppPromise;
  await expect(whatsApp).toHaveURL(/whatsapp.com/);
  whatsApp.close();
  
  // test mailto
  // ToDo: The main problem is recognising the mailto and closing it again. Testing the functionality will be done in a follow up
  
  // test permalink
  await searchBar(page);

  await page.getByRole('button', { name: 'Maps' }).click();
  await page.getByRole('button', { name: /Add WMS/ }).click();
  await page.getByLabel('input-search').fill('https://sgx.geodatenzentrum.de/wms_topplus_open')
  await page.getByRole('img', { name: 'search', exact: true }).click();
  await page.getByRole('checkbox').check();
  await page.getByLabel('add-selected').click();
  
  await timeout(5000);
  await page.screenshot({
    path: './e2e-tests/additional-files/screenshots/permalink-'
      + workerInfo.project.name + '-linux.png'
  });
  
  let url = await page.locator('#app input[type="text"]').inputValue();
  await page.goto(`${url}`);
  await page.waitForLoadState('networkidle');
  
  await timeout(5000);
  await expect(page).toHaveScreenshot('permalink-'
    + workerInfo.project.name
    + '-linux.png', {maxDiffPixelRatio: 0.02});
};
