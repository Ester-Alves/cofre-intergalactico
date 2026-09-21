import { expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { getHomeSelectors } from '../selectors/HomeSelectors';
import { Actions } from '../utils/Actions';

const config = load(
  readFileSync(path.resolve(__dirname, '../resources/config/url-prod.yml'), 'utf8'),
) as { 'home-url': string };

export class HomePage {
  private readonly selectors: ReturnType<typeof getHomeSelectors>;
  private readonly actions = new Actions();


  constructor(private readonly page: Page) {
    this.selectors = getHomeSelectors(this.page);
  }

  async btnCadastrarReceita() {
    await this.actions.click(this.selectors.btnCadastReceita);
  }

  async btnCadastrarDespesa() {
    await this.actions.click(this.selectors.btnCadastDespesa);
  }
}