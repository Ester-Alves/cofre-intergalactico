import { Page } from '@playwright/test';

export const getReceitaSelectors = (page: Page) => ({
    txtOrigem: page.locator('#revenue-source'),
    txtValor: page.locator('#revenue-amount'),
    txtData: page.locator('#revenue-date'),
    txtQuantidadeParcelas: page.locator('.input-parcelas'),
    btnTipoCredito: page.locator('#revenue-category'),
    btnRecebimentoAVista: page.locator('#revenue-method-debit'),
    btnParcelado: page.locator('#revenue-method-credit'),
    btnCadastrar: page.locator('#revenue-submit')
});