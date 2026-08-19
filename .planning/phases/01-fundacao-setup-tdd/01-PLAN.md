# 📋 PLAN: Fase 1 - Fundação & Setup de Testes TDD

**Fase:** 01-fundacao-setup-tdd  
**Status:** Pronto para Execução  
**Metodologia:** TDD-First (Akita Way)  
**Autor:** Mailson Maia Alves <59203034+mailsonm@users.noreply.github.com>  

---

## 🎯 Objetivo
Configurar todo o ambiente de testes unitários (Vitest + JSDOM) e testes E2E (Playwright), definindo os scripts no `package.json`, arquivos de configuração e a árvore de diretórios do projeto com um walking skeleton inicial verificado.

---

## 🧪 Declaração Nyquist & Matriz de Tarefas

### Tarefa 1: Inicialização do `package.json` & Dependências de Testes
- **Descrição:** Configurar `package.json` como módulo ES (`"type": "module"`), instalar `vitest`, `jsdom`, `@vitest/coverage-v8`, `@playwright/test` como dependências de desenvolvimento.
- **Arquivo de Teste:** `tests/unit/sanity.test.js`
- **Comando de Validação:** `npm run test`

### Tarefa 2: Configuração dos Runners de Teste (`vitest.config.js` & `playwright.config.js`)
- **Descrição:** Criar `vitest.config.js` com ambiente `jsdom`, globals e setup de mock, e `playwright.config.js` para testes de integração/E2E com servidor local.
- **Arquivo de Teste:** `tests/unit/sanity.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/sanity.test.js`

### Tarefa 3: Estrutura de Diretórios & Walking Skeleton
- **Descrição:** Criar a estrutura física de diretórios (`assets/css/`, `assets/js/`, `assets/img/projects/`, `tests/unit/`, `tests/e2e/`), criar `index.html` mínimo (Walking Skeleton) e suíte de sanidade de teste unitário e E2E.
- **Arquivo de Teste:** `tests/unit/sanity.test.js` e `tests/e2e/sanity.spec.js`
- **Comando de Validação:** `npm run test`

---

## 🔍 Critérios de Aceite (UAT)
1. `npm run test` executa Vitest em ambiente JSDOM e passa com 100% de sucesso.
2. Estrutura de pastas pronta para receber os módulos da Fase 2 (`theme.js`, `i18n.js`, `projects.js`, `contact.js`).
3. Arquivos de configuração de teste versionados e sem dependências globais não declaradas.
