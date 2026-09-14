import { expect, type Locator } from '@playwright/test';

export class Asserts {
	static async validarElementoVisivel(elemento: Locator): Promise<void> {
		await expect(elemento).toBeVisible();
	}
}
