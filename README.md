idee:
e2e tests werden in dem repo geschrieben und als npm package exportiert
in der jeweiligen appliakation wird dann das package importiert mit playwright als peerdependency
-> so wird dann immer das playwright aus dem jeweiligen projekt genutzt


um das paket zu installieren muss aktuell folgender import aufgerufen werden:
`npm install '../shogun-e2e-tests'`

später sollte das module im nexus hochgeladen werden und kann dann von dort importiert werden

Fürs Development:
In das shogun-e2e-tests Repo wechseln:
`cd shogun-e2e-tests`

Folgenden Befehl ausführen:
`watch-build-copy './src' 'npm run tsc' './dist' '../shogun-gis-client/node_modules/shogun-e2e-tests/src/'`


example test:
```
import {
  test
} from '@playwright/test';

// import tests as module as follow:
import myTest from 'shogun-e2e-tests/src/shogun-gis-client/toolbox/print';

test.use({
  storageState: 'playwright/.auth/admin.json'
});

test('test', async ({
  page
}) => {

  // open application
  await page.goto(`https://${process.env.HOST}/client/?applicationId=${process.env.ID}`);
  // await page.goto(`${process.env.HOST}/client`);

  await page.getByRole('button', {name: 'Export'}).click();

  // use tests as follow:
  await myTest(page);
});
```