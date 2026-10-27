import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const testDinoReporter = require.resolve('@testdino/playwright').replace(/index\.js$/, 'index.mjs');

/**
 * Consulte https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Executa todos os testes em paralelo. */
  fullyParallel: true,
  /* Faz a execução falhar na CI se houver test.only no código-fonte. */
  forbidOnly: !!process.env.CI,
  /* Repete os testes apenas na CI. */
  retries: process.env.CI ? 2 : 0,
  /* Desativa a execução paralela na CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Relatórios utilizados. Consulte https://playwright.dev/docs/test-reporters. */
  reporter: [
    ['html', { outputDir: './playwright-report' }],
    [testDinoReporter, { token: process.env.TESTDINO_TOKEN }],
  ],
  /* Configurações compartilhadas por todos os projetos abaixo. Consulte https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    /* URL base usada em ações como `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Coleta rastreamentos ao repetir um teste. Consulte https://playwright.dev/docs/trace-viewer. */
    trace: 'on-first-retry',
  },

  /* Projetos disponíveis; atualmente, apenas Chromium está habilitado. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Exemplos desativados para dispositivos móveis. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Exemplos desativados para navegadores específicos. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Exemplo desativado para iniciar um servidor local antes dos testes. */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});