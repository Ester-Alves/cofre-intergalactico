import { test, TestInfo } from '@playwright/test';
import { YamlReader } from '../utils/yamlReader';
import { Logger } from '../utils/Logger';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

/**
 * Manages global test lifecycle hooks including environment setup,
 * report cleanup, Azure DevOps integration, metrics collection,
 * and per-test execution tracking.
 */
class Hooks {
  /**
   * Deletes previous test report directories to ensure a clean run.
   * This prevents stale data from affecting current test results.
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
   * Runs once before all tests.
   * Cleans up previous reports, initializes logging, and starts the metrics server.
   */
  async beforeAllTests(): Promise<void> {
    await this.cleanReports();
    Logger.clearLogFile();
    Logger.info(`[Hooks] Arquivo de Log limpo e o ambiente de teste inicializado.`);
  }

  /**
   * Runs before each test.
   * Sets a unique execution ID, navigates to the base URL, and activates the test case in Azure DevOps.
   *
   * @param page - Playwright page instance
   * @param testInfo - Metadata about the current test
   */
  async beforeEachTest(page: any, testInfo: TestInfo): Promise<void> {
    Logger.setExecutionId();
    Logger.info(`[Hooks] Teste iniciado: ${testInfo.title}`);

    const baseUrl = YamlReader.get<string>('config', 'base-url');
    await page.goto(baseUrl);
  }

  /**
   * Runs after each test.
   * Publishes the test result to Azure DevOps, updates BrowserStack status,
   * records metrics, and closes the browser page.
   *
   * @param page - Playwright page instance
   * @param testInfo - Metadata about the completed test
   */
  async afterEachTest(page: any, testInfo: TestInfo): Promise<void> {
    Logger.info(`[Hooks] Teste concluído: ${testInfo.title}`);

    // Cleanup: Close browser page
    await page.close();
    Logger.info(`[Hooks] Instancia da pagina encerrada`);
  }
}

// Register hooks globally
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