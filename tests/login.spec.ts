import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('efetuar login com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('ester@cristina.com', 'Portal@123');
  await expect(page.locator('p.greeting')).toContainText('SEJA BEM-VINDO AO COFRE INTERGALÁCTICO');
});

test('não deve logar com senha incorreta', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('ester@cristina.com', 'abc123')
  await expect(page.getByText('Credenciais inválidas. Por favor verificar o seu e-mail e senha.')).toBeVisible();
})