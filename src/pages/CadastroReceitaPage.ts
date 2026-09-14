import { expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { getReceitaSelectors } from '../selectors/CadastroReceitaSelectors';

const config = load(
  readFileSync(path.resolve(__dirname, '../resources/config/url-prod.yml'), 'utf8'),
) as { 'cadastro-receita-url': string };

export class CadastroReceita {
  private readonly selectors;

  constructor(private readonly page: Page) {
    this.selectors = getReceitaSelectors(this.page);
  }

  async cadastrarReceita(
    origem: string,
    valor: string,
    data: string,
    tipoCredito: string,
    formaRecebimento: string,
    quantidadeParcelas?: string
  ) {
    await this.selectors.origem.fill(origem);
    await this.selectors.valor.fill(valor);
    await this.selectors.data.fill(data);
    await this.selectors.tipoCredito.click();
    await this.page.getByText(tipoCredito).click();
    formaRecebimento.includes('parcelado')
      ? (
        await this.selectors.formaRecebimento(formaRecebimento).click(),
        await this.selectors.quantidadeParcelas.fill(quantidadeParcelas ?? '')
      )
      : await this.selectors.formaRecebimento(formaRecebimento).click();

    await this.selectors.btnCadastrar.click();
  }
}