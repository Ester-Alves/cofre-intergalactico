import { expect, type Locator } from '@playwright/test';
import { highlightElement } from './highlightElement';
import { Logger } from './Logger';

/**
 * Centraliza as validações de estado dos elementos da interface.
 * Garante que os campos e botões estejam visíveis, habilitados e prontos para ação antes da interação.
 */
export class Asserts {
	/**
	 * Verifica se o elemento está visível na tela antes de continuar a ação.
	 * Também destaca visualmente o campo para facilitar a depuração e registra o resultado no log.
	 */
	static async validarElementoVisivel(locator: Locator): Promise<void> {
    try {
      await highlightElement(locator);
      await expect(locator).toBeVisible();
      Logger.secure(`[CustomAsserts] Validação concluída: ${locator} está visível.`);
    } catch (error: any) {
      Logger.secure(`[CustomAsserts] Validação falhou: ${locator} não está visível: ${error.message}`);
      throw error;
    }
  }

	/**
	 * Confirma que o elemento está habilitado e pode receber clique.
	 * O teste com { trial: true } simula o clique sem causar efeito colateral e registra o resultado no log.
	 */
	static async validarElementoClicavel(locator: Locator): Promise<void> {
    try {
      await highlightElement(locator);
      await expect(locator).toBeEnabled();
      await locator.click({ trial: true });
      Logger.secure(`[CustomAsserts] Validação concluída: ${locator} está clicável.`);
    } catch (error: any) {
      Logger.secure(`[CustomAsserts] Validação falhou: ${locator} não está clicável: ${error.message}`);
      throw error;
    }
  }
}