# 🌐 PROJECT.md: Portfólio Profissional no GitHub Pages

## 📌 Visão Geral & Identidade
- **Nome do Projeto:** `mailsonm.github.io`
- **Desenvolvedor:** Mailson Maia Alves (Consultor de TI & Desenvolvedor Full Stack)
- **Repositório GitHub:** [mailsonm/mailsonm.github.io](https://github.com/mailsonm/mailsonm.github.io)
- **URL de Produção:** [https://mailsonm.github.io/](https://mailsonm.github.io/)
- **Custo Operacional:** R$ 0,00 (Hospedagem perpétua no GitHub Pages com SSL/HTTPS incluso)

---

## 🎯 Objetivos de Negócio & Posicionamento
1. **Presença Digital de Alta Performance:** Consolidar a autoridade técnica de Mailson Maia Alves como Consultor de TI e Desenvolvedor Full Stack sênior.
2. **Showcase Dinâmico de Projetos Reais:**
   - Plugin WordPress *Aviso de Cópia* (link repo, badges de versão, documentação).
   - Módulos ERP Odoo 19 & Python (regras de negócio, TransactionCase, clean architecture).
   - Automações n8n & Soluções de Produtividade CLI/PowerShell.
   - Aplicações PHP 8.3+ (Pest TDD) e Game Dev Godot Engine.
3. **Conversão de Clientes & Contatos:**
   - Acesso direto via WhatsApp, LinkedIn e E-mail.
   - Formulário de contato serverless assíncrono via Web3Forms com fallback inteligente.
4. **Excelência Técnica (Lighthouse 100):**
   - Performance impecável, SEO estruturado, Acessibilidade (A11y) e boas práticas de engenharia (Akita Way / TDD-First).

---

## 🛠️ Stack Tecnológica & Arquitetura

| Camada | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Hospedagem & CDN** | **GitHub Pages** | Gratuito, CDN global de alta performance, deploy automatizado via CI/CD. |
| **Estrutura** | **HTML5 Semântico** | Máxima indexação por motores de busca (SEO) e conformidade WCAG/A11y. |
| **Design System** | **Vanilla CSS3 Moderno** | CSS Custom Properties, Grid/Flexbox, Dark/Light mode com zero dependências externas pesadas. |
| **Lógica & Interatividade** | **Vanilla JS (ES6+ Modules)** | Micro-animações nativas, filtro de projetos por tag, seletor i18n dinâmico e gestão de tema. |
| **Internacionalização (i18n)** | **Dicionário JSON nativo** | Suporte trilíngue nativo (PT-BR, EN, ES) com persistência em `localStorage`. |
| **Formulário de Contato** | **Web3Forms API + Fallback mailto/WhatsApp** | Envio assíncrono sem recarregar a página e sem backend próprio. |
| **Testes Automatizados** | **Vitest + JSDOM + Playwright** | Validação de lógica, renderização de componentes e testes E2E/Acessibilidade. |
| **CI / CD** | **GitHub Actions** | Linting, execução de testes unitários/E2E e build/deploy para GitHub Pages. |

---

## 🏛️ Diretrizes de Engenharia & Filosofia (Akita Way)
- **TDD-First Absoluto:** Todo componente e módulo JS (ex: i18n, tema, filtro de tags, formulário) possui teste automatizado prévio via Vitest antes da implementação.
- **Zero Vibe / Disciplina:** Código testado, sem frameworks monolíticos desnecessários para um portfólio estático, garantindo carregamento instantâneo (< 500ms).
- **Identidade Git:** Commits estritamente em nome de `Mailson Maia Alves` (`59203034+mailsonm@users.noreply.github.com`).
- **Padrão Trilíngue:** Conteúdo e documentação projetados para Inglês (EN), Português (PT-BR) e Espanhol (ES).
