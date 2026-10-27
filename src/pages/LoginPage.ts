import { type Page } from '@playwright/test';
import { getLoginSelectors } from '../selectors/LoginSelectors';
import { Actions } from '../utils/Actions';
import { Logger } from '../utils/Logger';

/**
 * Representa a página de login da aplicação.
 * Centraliza o fluxo de autenticação com ações reutilizáveis do utilitário Actions.
 */
export class LoginPage {
  private readonly actions = new Actions();

  constructor(private readonly page: Page) {}

  /**
   * Realiza a autenticação do usuário com e-mail e senha informados.
   * @param email E-mail do usuário
   * @param senha Senha do usuário
   */
  async realizarLogin(email: string, senha: string) {
    const selectors = getLoginSelectors(this.page);

    await this.actions.click(selectors.btnAcessarLogin);
    await this.actions.preencher(selectors.campoEmail, email);
    await this.actions.preencher(selectors.campoSenha, senha);
    await this.actions.click(selectors.btnEnviarLogin);
    Logger.secure('[LoginPage] Formulário de login enviado.');
  }
}