import { expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { getReceitaSelectors } from '../selectors/CadastroReceitaSelectors';
import { Actions } from '../utils/Actions';

const config = load(
  readFileSync(path.resolve(__dirname, '../resources/config/url-prod.yml'), 'utf8'),
) as { 'cadastro-receita-url': string };

export class CadastroReceita {
  private readonly selectors;
  private readonly actions = new Actions();

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
    await this.actions.preencher(this.selectors.txtOrigem, origem);
    await this.actions.preencher(this.selectors.txtValor, valor);
    await this.actions.preencher(this.selectors.txtData, data);

    await this.actions.click(this.selectors.btnTipoCredito);
    await this.actions.click(this.page.getByText(tipoCredito));

    switch (formaRecebimento.toLowerCase()) {
      case 'recebimento à vista':
        await this.actions.click(this.selectors.btnRecebimentoAVista);
        break;
      case 'recebimento parcelado':
        await this.actions.click(this.selectors.btnParcelado);
        await this.actions.preencher(this.selectors.txtQuantidadeParcelas, quantidadeParcelas ?? '');
        break;
      default:
        throw new Error(`Forma de recebimento inválida: ${formaRecebimento}`);
    }

    await this.actions.click(this.selectors.btnCadastrar);
  }
}
