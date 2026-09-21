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
    await this.selectors.origem.fill(origem);
    await this.selectors.valor.fill(valor);
    await this.selectors.data.fill(data);

    await this.actions.click(this.selectors.tipoCredito);
    await this.actions.click(this.page.getByText(tipoCredito));

    // Verifica se é parcelado    //condição ternária
    const pagamentoParcelado = formaRecebimento.toLowerCase().includes('parcelado');
    const formaRecebimentoLocator = pagamentoParcelado
      ? this.selectors.formaRecebimento.parcelado
      : this.selectors.formaRecebimento.aVista;

    await this.actions.click(formaRecebimentoLocator);

    if (pagamentoParcelado) {
      await this.selectors.quantidadeParcelas.fill(quantidadeParcelas ?? '');
    }
    
    await this.actions.click(this.selectors.btnCadastrar);
  }
}
