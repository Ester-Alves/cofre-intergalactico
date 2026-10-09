Para executar a automação enviando report para o testDino, primeiramente precisa inputar o token:
```
$env:TESTDINO_TOKEN=""
```

E em seguida rodar o comando:
npx playwright test tests/login.spec.ts

Por conta de estar citando o token no playwright.config.ts, o report sobe automaticamente:
  reporter: [
    ['html', { outputDir: './playwright-report' }],
    ['@testdino/playwright', { token: process.env.TESTDINO_TOKEN }],
  ],