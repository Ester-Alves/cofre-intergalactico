import { expect, type Locator } from '@playwright/test';
import { highlightElement } from './highlightElement';

export class Asserts {
	static async validarElementoVisivel(locator: Locator): Promise<void> {
		await highlightElement(locator);
		await expect(locator).toBeVisible();
	}

	static async validarElementoClicavel(locator: Locator): Promise<void> {
		try {
			await highlightElement(locator);
			await expect(locator).toBeEnabled();
			await locator.click({ trial: true });
		} catch (error: any) {
			throw error;
		}
	}
}