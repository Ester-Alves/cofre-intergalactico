import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { YamlReader } from '../src/utils/yamlReader';
import '../src/core/hooks';

test('efetuar login com sucesso', { tag: '@smoke' }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.realizarLogin(YamlReader.get('data', 'usuario-valido.email'), YamlReader.get('data', 'usuario-valido.senha'));
  await expect(page.locator('p.greeting')).toContainText('SEJA BEM-VINDO AO COFRE INTERGALÁCTICO');
});

test('não deve logar com senha incorreta', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.realizarLogin(YamlReader.get('data', 'usuario-valido.email'), YamlReader.get('data', 'usuario-invalido.senha'));
  await expect(page.getByText('Credenciais inválidas. Por favor verificar o seu e-mail e senha.')).toBeVisible();
})