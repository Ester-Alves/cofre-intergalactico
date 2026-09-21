import { Page } from '@playwright/test';

export const getReceitaSelectors = (page: Page) => ({
    origem: page.locator('#revenue-source'),
    valor: page.locator('#revenue-amount'),
    data: page.locator('#revenue-date'),
    quantidadeParcelas: page.locator('.input-parcelas'),
    tipoCredito: page.locator('#revenue-category'),
    formaRecebimento: {
        aVista: page.locator('#revenue-method-debit'),
        parcelado: page.locator('#revenue-method-credit'),
    },
    btnCadastrar: page.locator('#revenue-submit')
});