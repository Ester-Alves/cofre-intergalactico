import { expect, type Page } from '@playwright/test';
import { getLoginSelectors } from '../selectors/LoginSelectors';
import { Actions } from '../utils/Actions';
import { YamlReader } from '../utils/yamlReader';

export class LoginPage {
  private readonly actions = new Actions();

  constructor(private readonly page: Page) {}

  async realizarLogin(email: string, password: string) {
    const selectors = getLoginSelectors(this.page);

    await this.page.goto(YamlReader.get<string>('config', 'base-url'));
    await this.actions.click(selectors.btnDoLogin);
    await this.actions.preencher(selectors.txtEmail, email);
    await this.actions.preencher(selectors.txtPassword, password);
    await this.actions.click(selectors.btnSubmit);
  }
}