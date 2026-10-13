import { type Locator } from '@playwright/test';
import { Asserts } from './Asserts';
import { Logger } from './Logger';

/**
 * Centraliza as ações básicas de interação com a interface.
 * Encapsula cliques e preenchimentos com validações e registros de log para manter a automação consistente.
 */
export class Actions {
	/**
	 * Executa um clique no elemento após validar que ele está visível e clicável.
	 * @param locator Elemento que receberá o clique
	 */
	async click(locator: Locator): Promise<void> {
		try {
			await Asserts.validarElementoClicavel(locator);
			await locator.click();
			Logger.secure(`[Actions] Clique executado no ${locator}`);
		} catch (error: any) {
			Logger.secure(`[Actions] Clique falhou no ${locator}: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Preenche um campo de texto após confirmar que o elemento está visível na tela.
	 * @param locator Campo que receberá o valor
	 * @param value Texto a ser inserido
	 */
	async preencher(locator: Locator, value: string): Promise<void> {
		try {
			await Asserts.validarElementoVisivel(locator);
			await locator.fill(value);
			Logger.secure(`[Actions] Texto preenchido no campo ${locator}`);
		} catch (error: any) {
			Logger.secure(`[Actions] Preenchimento de texto falhou no campo ${locator}: ${error.message}`);
			throw error;
		}
	}
}