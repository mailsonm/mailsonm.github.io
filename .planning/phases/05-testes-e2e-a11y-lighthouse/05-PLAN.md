# 📋 PLAN: Fase 5 - Testes E2E, A11y & Auditoria Lighthouse

**Fase:** 05-testes-e2e-a11y-lighthouse  
**Status:** Pronto para Execução  
**Metodologia:** TDD-First & E2E Acceptance (Akita Way)  
**Autor:** Mailson Maia Alves <59203034+mailsonm@users.noreply.github.com>  

---

## 🎯 Objetivo
Desenvolver uma suíte abrangente de testes de ponta a ponta (E2E) com Playwright cobrindo os fluxos críticos da aplicação no navegador (Dark/Light mode, seletor de idiomas i18n, filtragem de projetos, validação e envio do formulário com mock de API, e acessibilidade A11y).

---

## 🧪 Declaração Nyquist & Matriz de Tarefas

### Tarefa 1: Configuração do Servidor Web Local e Browser Engine do Playwright
- **Descrição:** Configurar `playwright.config.js` para servir a pasta raiz com servidor estático e instalar o binário do Chromium headless.
- **Arquivo de Teste:** `tests/e2e/sanity.spec.js`
- **Comando de Validação:** `npx playwright test tests/e2e/sanity.spec.js`

### Tarefa 2: Suíte de Testes E2E de Fluxos Interativos (`tests/e2e/portfolio.spec.js`)
- **Descrição:** Criar testes automatizados cobrindo:
  1. Alternância de tema e persistência no `localStorage`.
  2. Troca de idioma (PT-BR, EN-US, ES-ES) e atualização do DOM.
  3. Filtragem de projetos por categorias.
  4. Validação de formulário de contato e submissão com mock de rede.
  5. Acessibilidade de navegação e skip-link.
- **Arquivo de Teste:** `tests/e2e/portfolio.spec.js`
- **Comando de Validação:** `npx playwright test tests/e2e/portfolio.spec.js`

### Tarefa 3: Execução Unificada de Testes Unitários e E2E
- **Descrição:** Executar `npm run test` (8 suítes unitárias) e `npm run test:e2e` (testes E2E completos), garantindo 100% de aprovação.
- **Arquivo de Teste:** `tests/unit/*.test.js` e `tests/e2e/*.spec.js`
- **Comando de Validação:** `npm run test; npx playwright test`

---

## 🔍 Critérios de Aceite (UAT)
1. Playwright executa todos os testes E2E em modo headless com 100% de sucesso.
2. Todos os fluxos reais de usuário (tema, idioma, filtros, formulário) testados em navegador real.
3. Repositório com documentação e scripts de teste consolidados.
