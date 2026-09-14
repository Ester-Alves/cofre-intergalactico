import { expect, type Page } from '@playwright/test';

export const getHomeSelectors = (page: Page) => ({
  btnCadastReceita: page.locator('text=RECEITA'),
  btnCadastDespesa: page.locator('text=DESPESA'),
});