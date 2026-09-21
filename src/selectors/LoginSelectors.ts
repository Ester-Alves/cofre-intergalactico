import { Page } from '@playwright/test';

export const getLoginSelectors = (page: Page) => ({
  btnDoLogin: page.locator('#landing-login'),
  txtEmail: page.locator('#login-email'),
  txtPassword: page.locator('#login-password'),
  btnSubmit: page.locator('#login-submit'),
});