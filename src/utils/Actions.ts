import { type Locator } from '@playwright/test';
import { Asserts } from './Asserts';

export class Actions {
	async click(locator: Locator): Promise<void> {
		try {
			await Asserts.validarElementoClicavel(locator);
			await locator.click();
		} catch (error: any) {
			throw error;
		}
	}

	async preencher(locator: Locator, value: string): Promise<void> {
		try {
			await Asserts.validarElementoVisivel(locator);
			await locator.fill(value);
		} catch (error: any) {
			throw error;
		}
	}
}