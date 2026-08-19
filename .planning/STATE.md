# 📊 STATE.md: Estado do Projeto

## 🎯 Meta Ativa
- **Meta:** Inicialização e Estruturação do Portfólio `mailsonm.github.io`
- **Fase Atual:** Fase 1: Fundação & Setup de Testes TDD (Pronto para Iniciar)
- **Status Geral:** Projeto inicializado com sucesso via GSD (`/gsd-new-project`)

---

## 📈 Progresso das Fases

| Fase | Título | Status | Testes |
| :---: | :--- | :---: | :---: |
| **01** | Fundação & Setup de Testes TDD | ⏳ Pronto para iniciar | Vitest / Playwright setup |
| **02** | Módulos Core JS com TDD | 📋 Planejado | `tests/unit/*.test.js` |
| **03** | Design System CSS & HTML5 Semântico | 📋 Planejado | Visual / Layout checks |
| **04** | Showcase de Projetos & Formulário | 📋 Planejado | Vitest mocks / Web3Forms |
| **05** | Testes E2E, A11y & Lighthouse | 📋 Planejado | `tests/e2e/*.spec.js` |
| **06** | GitHub Actions CI/CD & Deploy Pages | 📋 Planejado | CI Actions workflow |

---

## 🔑 Decisões Arquiteturais Registradas (ADR)
1. **[ADR-001] Stack Ultra-Leve Vanilla:** HTML5 + Vanilla CSS3 + Vanilla JS (ES6+ Modules) sem dependência de frameworks volumosos para atingir nota 100 no Lighthouse e carregamento instantâneo.
2. **[ADR-002] Multi-idioma Nativo:** Dicionário i18n em JS com troca reativa no DOM sem recarregar a página e persistência no `localStorage`.
3. **[ADR-003] Estratégia de Contato Híbrida:** Botões diretos para canais de alta conversão (WhatsApp, LinkedIn, Email) + Formulário assíncrono Web3Forms com fallback transparente para `mailto:`.
4. **[ADR-004] TDD-First & Qualidade:** Vitest + JSDOM para testes de unidade dos módulos JS e Playwright para validação E2E e Acessibilidade.
5. **[ADR-005] Identidade Git:** Autor estrito: `Mailson Maia Alves` (`59203034+mailsonm@users.noreply.github.com`).

---

## ⏩ Próximo Passo
Executar `/gsd-plan-phase 1` para criar o plano detalhado de execução da **Fase 1: Fundação & Setup de Testes TDD**.
