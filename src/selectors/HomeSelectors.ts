import { expect, type Page } from '@playwright/test';

export const getHomeSelectors = (page: Page) => ({
  btnCadastReceita: page.locator('#home-new-revenue'),
  btnCadastDespesa: page.locator('#home-new-expense'),
});