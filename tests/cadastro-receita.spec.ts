import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';
import { CadastroReceita } from '../src/pages/CadastroReceitaPage';
import { Asserts } from '../src/utils/Asserts';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('ester@cristina.com', 'Portal@123');
    await Asserts.validarElementoVisivel(page.getByText('SEJA BEM-VINDO AO COFRE INTERGALÁCTICO'));

    const homePage = new HomePage(page);
    await homePage.btnCadastrarReceita();
    await Asserts.validarElementoVisivel(page.getByText('NOVA RECEITA'));
})

test('cadastrar nova receita com pagamento a vista com sucesso', async ({ page }) => {
    const cadastroReceita = new CadastroReceita(page);
    await cadastroReceita.cadastrarReceita('Nave 3000', '10000', '2026-10-22', 'Aluguel', 'Recebimento à vista', '');
    await Asserts.validarElementoVisivel(page.getByText('COFRE ABASTECIDO!'));
});

test('cadastrar nova receita com pagamento parcelado com sucesso', async ({ page }) => {
    const cadastroReceita = new CadastroReceita(page);
    await cadastroReceita.cadastrarReceita('Nave 6000', '400000', '2026-10-22', 'Aluguel', 'Recebimento parcelado', '4');
    await Asserts.validarElementoVisivel(page.getByText('COFRE ABASTECIDO!'));
});

test('não deve cadastrar nova receita sem valor recebido', async ({ page }) => {
    const cadastroReceita = new CadastroReceita(page);
    await cadastroReceita.cadastrarReceita('Nave 3000', '', '2026-10-22', 'Aluguel', 'Recebimento à vista');
    await Asserts.validarElementoVisivel(page.getByText('O valor deve ser maior que zero.'));
})

//   static readonly ERRO_ORIGEM = 'Identificação da origem é obrigatória.';
//   static readonly ERRO_VALOR = 'O valor deve ser maior que zero.';
//   static readonly ERRO_TIPO_CREDITO = 'Selecione um Tipo de Crédito.';

//   static readonly SUCESSO = 'COFRE ABASTECIDO!';