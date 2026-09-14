import { Page } from '@playwright/test';

export const getReceitaSelectors = (page: Page) => ({
    origem: page.getByPlaceholder('Ex: Império das Vendas, Freelance em Marte...'),
    valor: page.getByPlaceholder('0,00'),
    data: page.locator('.input-group:has(label:has-text("DATA DE ENTRADA")) input'),
    quantidadeParcelas: page.locator('.input-parcelas'),
    tipoCredito: page.getByText('Selecione›'),
    formaRecebimento: (formaRecebimento: string) =>
        page.getByRole('button', { name: formaRecebimento }),
    btnCadastrar: page.getByRole('button', { name: 'CONFIRMAR ENTRADA NO COFRE' })
});

    // await page.getByText('Selecione›').click();
    // await page.getByText('Aluguel').click();