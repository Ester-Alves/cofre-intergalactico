import { expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { getReceitaSelectors } from '../selectors/CadastroReceitaSelectors';
import { Actions } from '../utils/Actions';

const config = load(
  readFileSync(path.resolve(__dirname, '../resources/config/url-prod.yml'), 'utf8'),
) as { 'cadastro-receita-url': string };

/**
 * Representa a tela de cadastro de receitas.
 * Centraliza o preenchimento dos campos e o fluxo de confirmação do cadastro.
 */
export class CadastroReceita {
  private readonly selectors;
  private readonly actions = new Actions();

  constructor(private readonly page: Page) {
    this.selectors = getReceitaSelectors(this.page);
  }

  /**
   * Registra uma nova receita com origem, valor, data, tipo e forma de recebimento.
   * @param origem Nome da receita ou origem do valor
   * @param valor Valor da receita
   * @param data Data do recebimento
   * @param tipoCredito Tipo de crédito relacionado
   * @param formaRecebimento Forma de recebimento: à vista ou parcelado
   * @param quantidadeParcelas Quantidade de parcelas quando o pagamento for parcelado
   */
  async registrarReceita(
    origem: string,
    valor: string,
    data: string,
    tipoCredito: string,
    formaRecebimento: string,
    quantidadeParcelas?: string
  ) {
    await this.actions.preencher(this.selectors.campoOrigem, origem);
    await this.actions.preencher(this.selectors.campoValor, valor);
    await this.actions.preencher(this.selectors.campoData, data);

    await this.actions.click(this.selectors.btnTipoCredito);
    await this.actions.click(this.page.getByText(tipoCredito));

    switch (formaRecebimento.toLowerCase()) {
      case 'recebimento à vista':
        await this.actions.click(this.selectors.btnRecebimentoAVista);
        break;
      case 'recebimento parcelado':
        await this.actions.click(this.selectors.btnRecebimentoParcelado);
        await this.actions.preencher(this.selectors.campoQuantidadeParcelas, quantidadeParcelas ?? '');
        break;
      default:
        throw new Error(`Forma de recebimento inválida: ${formaRecebimento}`);
    }

    await this.actions.click(this.selectors.btnCadastrarReceita);
  }
}
