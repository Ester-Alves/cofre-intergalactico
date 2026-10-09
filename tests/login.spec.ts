import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { YamlReader } from '../src/utils/yamlReader';

test('efetuar login com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.realizarLogin(YamlReader.get<string>('data', 'usuario-valido.email'), YamlReader.get<string>('data', 'usuario-valido.senha'));
  await expect(page.locator('p.greeting')).toContainText('SEJA BEM-VINDO AO COFRE INTERGALÁCTICO');
});

test('não deve logar com senha incorreta', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.realizarLogin(YamlReader.get<string>('data', 'usuario-invalido.email'), YamlReader.get<string>('data', 'usuario-invalido.senha'));
  await expect(page.getByText('Credenciais inválidas. Por favor verificar o seu e-mail e senha.')).toBeVisible();
})