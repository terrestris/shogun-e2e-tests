# SHOGun E2E-Tests for the basic functionalities

This package provides a collection of End-to-End-tests for the basic functions and ui-components of the SHOGun-web-application.

The tests must first be imported into the project as an npm package via the following command: 
```npm i @terrestris/shogun-e2e-tests```. 
Then the desired tests can be called individually via an import.

## Usage

Each test-file must start with the following import:

```
import {
  test,
  expect
} from '@playwright/test';
```

Then the desired test must be imported:

```
import myTest from 'shogun-e2e-tests/e2e-tests/shogun-gis-client/header/userMenu';
```

The following code example can be used to authenticate as a specific role:

```
test.use({
  storageState: 'playwright/.auth/admin.json'
});
```

Each test can be structured as follows:

```
test('test', async ({
  page
}) => {

  // Open application
  await page.goto(`https://${process.env.HOST}/client/?applicationId=${process.env.ID}`);

  // Navigate to the feature using the selectors
  await page.getByRole('button', {name: Draw}).click();

  // Use tests from the package as follow:
  await myTest(page);

  // Further application-specific testing can be added
});
```

For some tests the parameter `workerInfo` besides the parameter `page` is needed also. 
