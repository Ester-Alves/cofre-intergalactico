import { type Page } from '@playwright/test';
import { getReceitaSelectors } from '../selectors/CadastroReceitaSelectors';
import { Actions } from '../utils/Actions';
import { Logger } from '../utils/Logger';

/**
 * Representa a tela de cadastro de receitas.
 * Centraliza o preenchimento dos campos e envio do formulário de cadastro.
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
        Logger.secure('[CadastroReceita] Formulário de cadastro de receita enviado.');
  }
}
