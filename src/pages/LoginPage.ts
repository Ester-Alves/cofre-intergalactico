import { expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { getLoginSelectors } from '../selectors/LoginSelectors';

const config = load(
  readFileSync(path.resolve(__dirname, '../resources/config/url-prod.yml'), 'utf8'),
) as { 'base-url': string };

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(email: string, password: string) {
    const selectors = getLoginSelectors(this.page);

    await this.page.goto(config['base-url']);
    await selectors.btnDoLogin.click();
    await selectors.txtEmail.fill(email);
    await selectors.txtPassword.fill(password);
    await selectors.btnSubmit.click();

    await expect(this.page.locator('p.greeting')).toContainText('SEJA BEM-VINDO AO COFRE INTERGALÁCTICO');
  }
}