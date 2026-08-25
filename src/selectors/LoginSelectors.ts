import { Page } from '@playwright/test';

export const getLoginSelectors = (page: Page) => ({
  btnDoLogin: page.locator('text=LOGIN'),
  txtEmail: page.locator('input[name="email"]'),
  txtPassword: page.locator('input[name="password"]'),
  btnSubmit: page.locator('text=ABRIR COFRE'),
});