# 🌐 Portfólio Pessoal — Mailson Maia Alves

[![CI](https://github.com/mailsonm/mailsonm.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/mailsonm/mailsonm.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/mailsonm/mailsonm.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/mailsonm/mailsonm.github.io/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **Deploy ao vivo:** [https://mailsonm.github.io/](https://mailsonm.github.io/)  
> **Autor:** Mailson Maia Alves (Consultor de TI & Desenvolvedor Full Stack)  
> **Contato:** `mairuson@gmail.com` | [LinkedIn](https://www.linkedin.com/in/mailson-maia-alves-19a479208/) | [GitHub](https://github.com/mailsonm)

---

## 🌐 Idiomas / Languages / Idiomas
- [🇧🇷 Português (PT-BR)](#-português-pt-br)
- [🇺🇸 English (EN)](#-english-en)
- [🇪🇸 Español (ES)](#-español-es)

---

# 🇧🇷 Português (PT-BR)

## 📌 Sobre o Projeto
Este repositório contém o código-fonte do meu portfólio pessoal. O objetivo foi criar uma aplicação leve, rápida e acessível, utilizando padrões modernos da web sem a necessidade de frameworks pesados para um site estático.

## 🛠️ Tecnologias e Decisões Técnicas
- **Frontend Nativo:** HTML5 semântico, CSS3 moderno (Design Tokens e variáveis nativas) e JavaScript ES6+ modular.
- **Internacionalização (i18n):** Suporte a múltiplos idiomas (**Português**, **Inglês** e **Espanhol**) com detecção automática e troca dinâmica no navegador.
- **Tema Escuro / Claro:** Alternância de tema com detecção da preferência do sistema operacional e persistência em `localStorage`.
- **Acessibilidade & Performance:** Estrutura focada em navegação acessível por teclado, leitor de tela e alta pontuação no Lighthouse.
- **Testes Automatizados:** Testes unitários com Vitest e testes de fluxo no navegador com Playwright.
- **Automação & Deploy:** CI/CD configurado no GitHub Actions para validação e publicação automática no GitHub Pages.

## 🧪 Como Executar Localmente
```bash
# 1. Clonar o repositório
git clone https://github.com/mailsonm/mailsonm.github.io.git
cd mailsonm.github.io

# 2. Instalar as dependências de desenvolvimento e testes
npm install

# 3. Rodar os testes unitários (Vitest)
npm run test

# 4. Rodar os testes E2E no navegador (Playwright)
npm run test:e2e

# 5. Iniciar servidor local
node scripts/server.js
```

---

# 🇺🇸 English (EN)

## 📌 About the Project
This repository contains the source code for my personal portfolio. The goal was to build a fast, lightweight, and accessible web application using modern standard web technologies without unnecessary framework overhead for a static site.

## 🛠️ Tech Stack & Key Decisions
- **Native Frontend:** Semantic HTML5, modern CSS3 (Design Tokens and CSS variables), and modular ES6+ JavaScript.
- **Internationalization (i18n):** Multi-language support (**Portuguese**, **English**, and **Spanish**) with browser detection and instant client-side switching.
- **Dark / Light Theme:** Theme toggle with system preference detection and `localStorage` persistence.
- **Accessibility & Performance:** Semantic landmarks, keyboard navigation, screen reader support, and high Lighthouse performance.
- **Automated Testing:** Unit tests using Vitest and browser-level End-to-End tests using Playwright.
- **CI/CD & Deployment:** Automated pipeline via GitHub Actions for continuous testing and deployment to GitHub Pages.

## 🧪 Running Locally
```bash
# 1. Clone the repository
git clone https://github.com/mailsonm/mailsonm.github.io.git
cd mailsonm.github.io

# 2. Install development and testing dependencies
npm install

# 3. Run unit tests (Vitest)
npm run test

# 4. Run End-to-End tests (Playwright)
npm run test:e2e

# 5. Start local server
node scripts/server.js
```

---

# 🇪🇸 Español (ES)

## 📌 Sobre el Proyecto
Este repositorio contiene el código fuente de mi portafolio personal. El objetivo fue construir una aplicación web ligera, rápida y accesible utilizando tecnologías nativas modernas sin sobrecarga de frameworks para un sitio estático.

## 🛠️ Tecnologías y Decisiones Técnicas
- **Frontend Nativo:** HTML5 semántico, CSS3 moderno (variables de diseño y tokens) y JavaScript ES6+ modular.
- **Internacionalización (i18n):** Soporte multiidioma (**Portugués**, **Inglés** y **Español**) con detección del navegador y cambio dinámico sin recargar.
- **Modo Oscuro / Claro:** Alternancia de tema con detección de preferencias del sistema y persistencia en `localStorage`.
- **Accesibilidad y Rendimiento:** Estructura semántica, navegación por teclado, soporte para lectores de pantalla y alta puntuación en Lighthouse.
- **Pruebas Automatizadas:** Pruebas unitarias con Vitest y pruebas de extremo a extremo (E2E) con Playwright.
- **CI/CD y Despliegue:** Flujo automatizado en GitHub Actions para pruebas continuas y publicación en GitHub Pages.

## 🧪 Ejecución Local
```bash
# 1. Clonar el repositorio
git clone https://github.com/mailsonm/mailsonm.github.io.git
cd mailsonm.github.io

# 2. Instalar dependencias de desarrollo
npm install

# 3. Ejecutar pruebas unitarias (Vitest)
npm run test

# 4. Ejecutar pruebas E2E (Playwright)
npm run test:e2e

# 5. Iniciar servidor local
node scripts/server.js
```

---

## 📄 Licença / License / Licencia
Distribuído sob a licença **MIT**. Veja o arquivo [`LICENSE`](file:///c:/Projectos/PLANO_PORTFOLIO_GITHUB_PAGES/LICENSE) para mais detalhes.
