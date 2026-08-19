# 📋 PLAN: Fase 3 - Design System CSS & HTML5 Semântico

**Fase:** 03-design-system-html5  
**Status:** Pronto para Execução  
**Metodologia:** TDD-First (Akita Way)  
**Autor:** Mailson Maia Alves <59203034+mailsonm@users.noreply.github.com>  

---

## 🎯 Objetivo
Construir o Design System em CSS puro (CSS Variables, Flexbox/Grid, Dark/Light mode, animações e responsividade Mobile First) e a estrutura completa de `index.html` semântica com metatags de SEO, Open Graph e Twitter Cards, conectando perfeitamente a todos os atributos `data-i18n`.

---

## 🧪 Declaração Nyquist & Matriz de Tarefas

### Tarefa 1: Design System CSS Moderno (`assets/css/style.css`)
- **Descrição:** Criação dos design tokens (cores, espaçamentos, tipografia, elevações, transições), suporte completo a temas claro/escuro com alto contraste WCAG AA/AAA, estilização da barra de navegação, hero, cards de projetos, botões de ação rápida, inputs e layout responsivo.
- **Arquivo de Teste:** `tests/unit/main.test.js`
- **Comando de Validação:** `npm run test`

### Tarefa 2: Estrutura HTML5 Semântica & Metadados de SEO (`index.html`)
- **Descrição:** Implementação de todas as seções planejadas (`hero`, `about`, `skills`, `projects`, `services`, `contact`, `footer`) com marcação semântica, metatags de SEO (Open Graph, Twitter Cards, robots, canonical) e atributos `data-i18n` completos.
- **Arquivo de Teste:** `tests/unit/dom-structure.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/dom-structure.test.js`

### Tarefa 3: Testes de Integridade Semântica & Acessibilidade do DOM (`tests/unit/dom-structure.test.js`)
- **Descrição:** Criação de suíte de testes unitários que lê o `index.html` real, valida a presença de todas as seções semânticas, metatags SEO e confere que 100% das chaves `data-i18n` declaradas no HTML existem nos dicionários do `i18n.js`.
- **Arquivo de Teste:** `tests/unit/dom-structure.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/dom-structure.test.js`

---

## 🔍 Critérios de Aceite (UAT)
1. `index.html` possui todas as seções semânticas e metadados Open Graph.
2. `style.css` implementa tema dark/light através de CSS Custom Properties.
3. A suíte de integridade do DOM (`dom-structure.test.js`) e todos os testes unitários passam com 100% de sucesso.
