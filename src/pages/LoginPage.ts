import { expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { getLoginSelectors } from '../selectors/LoginSelectors';
import { Actions } from '../utils/Actions';

const config = load(
  readFileSync(path.resolve(__dirname, '../resources/config/url-prod.yml'), 'utf8'),
) as { 'base-url': string };

export class LoginPage {
  private readonly actions = new Actions();

  constructor(private readonly page: Page) {}

  async realizarLogin(email: string, password: string) {
    const selectors = getLoginSelectors(this.page);

    await this.page.goto(config['base-url']);
    await selectors.btnDoLogin.click();
    await this.actions.preencher(selectors.txtEmail, email);
    await this.actions.preencher(selectors.txtPassword, password);
    await selectors.btnSubmit.click();
  }
}