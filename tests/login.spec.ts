import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('efetuar login com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('ester@cristina.com', 'Portal@123');
});