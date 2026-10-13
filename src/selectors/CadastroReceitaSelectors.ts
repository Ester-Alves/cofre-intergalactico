import { Page } from '@playwright/test';

export const getReceitaSelectors = (page: Page) => ({
    campoOrigem: page.locator('#revenue-source'),
    campoValor: page.locator('#revenue-amount'),
    campoData: page.locator('#revenue-date'),
    campoQuantidadeParcelas: page.locator('.input-parcelas'),
    btnTipoCredito: page.locator('#revenue-category'),
    btnRecebimentoAVista: page.locator('#revenue-method-debit'),
    btnRecebimentoParcelado: page.locator('#revenue-method-credit'),
    btnCadastrarReceita: page.locator('#revenue-submit')
});