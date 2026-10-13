import type { Locator } from '@playwright/test';

/**
 * Destaca visualmente um elemento na página para facilitar a identificação durante a automação.
 * Útil para depuração de testes, especialmente quando um elemento não está sendo encontrado ou interagido como esperado.
 */
export async function highlightElement(locator: Locator, color: string = 'rgba(225, 255, 0, 1)'): Promise<void> {
  try {
    // Aplica uma borda interna de destaque no elemento para que ele fique visível no navegador.
    await locator.evaluate((el, highlightColor) => {
      el.style.boxShadow = `inset 0 0 0 1000px ${highlightColor}`;
      el.style.transition = 'box-shadow 0.3s ease-in-out';
      setTimeout(() => {
        el.style.boxShadow = '';
      }, 1000);
    }, color);
  } catch {
    // Se o elemento não puder ser estilizado, registra o erro sem interromper a execução do teste.
    console.error('[HighlightElement] Falha no destaque: o elemento não pôde ser estilizado.');
  }
}