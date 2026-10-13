import { Page } from '@playwright/test';

export const getLoginSelectors = (page: Page) => ({
  btnAcessarLogin: page.locator('#landing-login'),
  campoEmail: page.locator('#login-email'),
  campoSenha: page.locator('#login-password'),
  btnEnviarLogin: page.locator('#login-submit'),
});