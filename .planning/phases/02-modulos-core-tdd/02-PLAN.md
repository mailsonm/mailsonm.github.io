# 📋 PLAN: Fase 2 - Módulos Core JS com TDD

**Fase:** 02-modulos-core-tdd  
**Status:** Pronto para Execução  
**Metodologia:** TDD-First (Akita Way) — Red -> Green -> Refactor  
**Autor:** Mailson Maia Alves <59203034+mailsonm@users.noreply.github.com>  

---

## 🎯 Objetivo
Desenvolver os 4 módulos centrais de lógica do portfólio (`theme.js`, `i18n.js`, `projects.js`, `contact.js`) em JavaScript ES6+ puro seguindo estritamente o ciclo TDD-First com testes unitários em Vitest + JSDOM e isolamento total de dependências externas através de mocks.

---

## 🧪 Declaração Nyquist & Matriz de Tarefas

### Tarefa 1: Theme Manager (`assets/js/theme.js`)
- **Descrição:** Módulo para gerenciamento de tema (Dark/Light), detecção de `prefers-color-scheme`, toggle manual, atualização de `data-theme` no `document.documentElement` e persistência em `localStorage`.
- **Arquivo de Teste:** `tests/unit/theme.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/theme.test.js`

### Tarefa 2: i18n Translation Manager (`assets/js/i18n.js`)
- **Descrição:** Módulo de internacionalização com suporte a `pt-BR`, `en-US` e `es-ES`, interpolação de chaves no DOM (`data-i18n`, `data-i18n-placeholder`, `data-i18n-aria`), detecção automática do idioma do navegador e persistência em `localStorage`.
- **Arquivo de Teste:** `tests/unit/i18n.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/i18n.test.js`

### Tarefa 3: Projects Filter Manager (`assets/js/projects.js`)
- **Descrição:** Módulo de gerenciamento e filtragem de projetos por categorias (Todos, WordPress, Odoo, Automação, PHP, Games), geração e renderização dinâmica de cards com acessibilidade.
- **Arquivo de Teste:** `tests/unit/projects.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/projects.test.js`

### Tarefa 4: Contact Form Manager (`assets/js/contact.js`)
- **Descrição:** Módulo de validação de formulário (nome, e-mail válido, mensagem), envio assíncrono para a API do Web3Forms com gerenciamento de estados (loading, sucesso, erro), proteção anti-bot e fallback para `mailto:`.
- **Arquivo de Teste:** `tests/unit/contact.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/contact.test.js`

### Tarefa 5: Integração no Entrypoint (`assets/js/main.js`) & Suíte Completa
- **Descrição:** Integração e inicialização dos 4 módulos no `main.js` com execução da suíte completa de testes unitários.
- **Arquivo de Teste:** `tests/unit/*.test.js`
- **Comando de Validação:** `npm run test`

---

## 🔍 Critérios de Aceite (UAT)
1. Cada módulo JS possui sua respectiva suíte de testes unitários escrita antes da implementação (Fase Red confirmada).
2. Todos os testes passam com 100% de sucesso (`npm run test`).
3. Módulos desacoplados, exportando funções puras e classes/objetos de fácil manutenção.
