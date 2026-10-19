import { expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { getHomeSelectors } from '../selectors/HomeSelectors';
import { Actions } from '../utils/Actions';

const config = load(
  readFileSync(path.resolve(__dirname, '../resources/config/url-prod.yml'), 'utf8'),
) as { 'home-url': string };

/**
 * Representa a página inicial após o login.
 * Agrupa ações de navegação para cadastro de receitas e despesas.
 */
export class HomePage {
  private readonly selectors: ReturnType<typeof getHomeSelectors>;
  private readonly actions = new Actions();

  constructor(private readonly page: Page) {
    this.selectors = getHomeSelectors(this.page);
  }

  /**
   * Abre a tela de cadastro de receita.
   */
  async abrirCadastroReceita() {
    await this.actions.click(this.selectors.btnCadastReceita);
  }

  /**
   * Abre a tela de cadastro de despesa.
   */
  async abrirCadastroDespesa() {
    await this.actions.click(this.selectors.btnCadastDespesa);
  }
}
