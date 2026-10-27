import { test, TestInfo } from '@playwright/test';
import { YamlReader } from '../utils/yamlReader';
import { Logger } from '../utils/Logger';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

/**
 * Gerencia os hooks globais do ciclo de vida dos testes, incluindo a limpeza
 * dos relatórios, a inicialização dos logs e o acompanhamento das execuções.
 */
class Hooks {
  /**
  * Exclui os diretórios de relatórios de testes anteriores para garantir
  * uma execução limpa e evitar que dados antigos afetem os resultados atuais.
   */
  async cleanReports(): Promise<void> {
    const reportDirs = ['allure-results', 'playwright-report', 'test-results']
      .map(dir => path.join(__dirname, '..', '..', dir));

    for (const dir of reportDirs) {
      try {
        await fs.rm(dir, { recursive: true, force: true });
        Logger.info(`[Hooks] Exclusão do diretorio de relatorio: ${path.basename(dir)}`);
      } catch (err: any) {
        Logger.warn(`[Hooks] Erro ao excluir ${path.basename(dir)}: ${err.message}`);
      }
    }
  }

  /**
  * Executa uma vez antes de todos os testes.
  * Exclui os relatórios anteriores e limpa o arquivo de log.
   */
  async beforeAllTests(): Promise<void> {
    await this.cleanReports();
    Logger.clearLogFile();
    Logger.info(`[Hooks] Arquivo de Log limpo e o ambiente de teste inicializado.`);
  }

  /**
  * Executa antes de cada teste.
  * Define um ID de execução único e acessa a URL base.
   *
  * @param page - Instância da página do Playwright
  * @param testInfo - Metadados do teste atual
   */
  async beforeEachTest(page: any, testInfo: TestInfo): Promise<void> {
    Logger.setExecutionId();
    Logger.info(`[Hooks] Teste iniciado: ${testInfo.title}`);

    const baseUrl = YamlReader.get<string>('config', 'base-url');
    await page.goto(baseUrl);
  }

  /**
  * Executa após cada teste.
  * Fecha a página do navegador.
   *
  * @param page - Instância da página do Playwright
  * @param testInfo - Metadados do teste concluído
   */
  async afterEachTest(page: any, testInfo: TestInfo): Promise<void> {
    Logger.info(`[Hooks] Teste concluído: ${testInfo.title}`);

    // Limpeza: fecha a página do navegador
    await page.close();
    Logger.info(`[Hooks] Instancia da pagina encerrada`);
  }
}

// Registra os hooks globalmente
const hooks = new Hooks();

test.beforeAll(async () => {
  await hooks.beforeAllTests();
});

test.beforeEach(async ({ page }, testInfo) => {
  await hooks.beforeEachTest(page, testInfo);
});

test.afterEach(async ({ page }, testInfo) => {
  await hooks.afterEachTest(page, testInfo);
});

export default Hooks;