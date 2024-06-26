import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import fs from 'fs';

export const scan = async (page: any) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);

  const reportHtml = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: 'test-application',
      reportFileName: 'accessibility-report.html'
    }
  });

  try {
    fs.writeFileSync('./reports/accessibility-report.html', reportHtml);
    console.log('Report successfully saved.');
  } catch (error) {
    console.error('Error saving report:', error);
  }
};
