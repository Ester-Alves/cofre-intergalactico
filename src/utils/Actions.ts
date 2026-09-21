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
}