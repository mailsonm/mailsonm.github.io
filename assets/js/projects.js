/**
 * Projects Manager Module
 * Contains portfolio projects catalog, category filters, and DOM rendering.
 */

import { getEffectiveLanguage, translate } from './i18n.js';

export const PROJECTS_DATA = [
  {
    id: 'aviso-de-copia',
    category: 'wordpress',
    title: {
      'pt-BR': 'Aviso de Cópia — Plugin WordPress',
      'en-US': 'Copy Notice — WordPress Plugin',
      'es-ES': 'Aviso de Copia — Plugin WordPress'
    },
    description: {
      'pt-BR': 'Plugin profissional e acessível para WordPress que adiciona avisos de direitos autorais ao copiar conteúdos, com customização no painel e conformidade com WCAG.',
      'en-US': 'Professional, accessible WordPress plugin that adds copyright notices when text is copied, featuring full admin panel customization and WCAG compliance.',
      'es-ES': 'Plugin profesional y accesible para WordPress que añade avisos de derechos de autor al copiar contenido, con panel de administración y normas WCAG.'
    },
    tags: ['WordPress', 'PHP 8.3', 'JavaScript', 'CSS3', 'WCAG A11y'],
    githubUrl: 'https://github.com/mailsonm/aviso-de-copia',
    liveUrl: null,
    docsUrl: 'https://github.com/mailsonm/aviso-de-copia#readme'
  },
  {
    id: 'odoo-modules',
    category: 'odoo',
    title: {
      'pt-BR': 'Módulos Odoo 19 & Regras de Negócio',
      'en-US': 'Odoo 19 Custom Modules & Business Logic',
      'es-ES': 'Módulos Odoo 19 & Lógica de Negocio'
    },
    description: {
      'pt-BR': 'Módulos ERP para Odoo 19 com arquitetura limpa, herança de modelos, automação de fluxos fiscais/comerciais e suíte completa de testes via TransactionCase.',
      'en-US': 'ERP modules for Odoo 19 featuring clean architecture, model inheritance, automated workflows, and comprehensive TransactionCase test suites.',
      'es-ES': 'Módulos ERP para Odoo 19 con arquitectura limpia, herencia de modelos, flujos automatizados y pruebas unitarias completas via TransactionCase.'
    },
    tags: ['Python 3.12', 'Odoo 19', 'PostgreSQL', 'Docker', 'TDD'],
    githubUrl: 'https://github.com/mailsonm',
    liveUrl: null,
    docsUrl: null
  },
  {
    id: 'n8n-automation',
    category: 'automation',
    title: {
      'pt-BR': 'Automações Empresariais com n8n & Webhooks',
      'en-US': 'Enterprise Automations with n8n & Webhooks',
      'es-ES': 'Automatizaciones Empresariales con n8n & Webhooks'
    },
    description: {
      'pt-BR': 'Pipelines de automação inteligentes conectando APIs REST, mensageria (WhatsApp/Telegram), bancos de dados e sistemas legados com tratamento robusto de erros.',
      'en-US': 'Intelligent automation pipelines connecting REST APIs, messaging (WhatsApp/Telegram), databases, and legacy systems with resilient error handling.',
      'es-ES': 'Pipelines de automatización inteligente conectando APIs REST, mensajería, bases de datos y sistemas legados con gestión robusta de errores.'
    },
    tags: ['n8n.io', 'Node.js', 'REST APIs', 'Webhooks', 'Docker'],
    githubUrl: 'https://github.com/mailsonm',
    liveUrl: null,
    docsUrl: null
  },
  {
    id: 'php-pest-api',
    category: 'php',
    title: {
      'pt-BR': 'API REST Moderna com PHP 8.3 & Pest PHP',
      'en-US': 'Modern REST API with PHP 8.3 & Pest PHP',
      'es-ES': 'API REST Moderna con PHP 8.3 & Pest PHP'
    },
    description: {
      'pt-BR': 'Arquitetura de API orientada a microsserviços desenvolvida estritamente com TDD-First usando Pest PHP, PSR-12, injeção de dependências e Docker.',
      'en-US': 'Microservices-oriented API architecture strictly developed with TDD-First using Pest PHP, PSR-12, dependency injection, and Docker.',
      'es-ES': 'Arquitectura de API orientada a microservicios desarrollada con TDD-First usando Pest PHP, PSR-12, inyección de dependencias y Docker.'
    },
    tags: ['PHP 8.3', 'Pest PHP', 'PSR-12', 'Docker', 'Clean Code'],
    githubUrl: 'https://github.com/mailsonm',
    liveUrl: null,
    docsUrl: null
  },
  {
    id: 'godot-game-mechanics',
    category: 'games',
    title: {
      'pt-BR': 'Mecânicas de Jogo 2D/3D no Godot Engine',
      'en-US': '2D/3D Game Mechanics in Godot Engine',
      'es-ES': 'Mecánicas de Juego 2D/3D en Godot Engine'
    },
    description: {
      'pt-BR': 'Protótipos modulares desacoplados desenvolvidos no Godot Engine com GDScript/C#, comunicação orientada a sinais e testes unitários via GUT framework.',
      'en-US': 'Decoupled modular game mechanics prototypes developed in Godot Engine with GDScript/C#, signal-driven communication, and GUT unit testing.',
      'es-ES': 'Prototipos modulares desacoplados en Godot Engine con GDScript/C#, comunicación por señales y pruebas unitarias con GUT.'
    },
    tags: ['Godot Engine', 'GDScript', 'C#', 'GUT Testing', 'Game Design'],
    githubUrl: 'https://github.com/mailsonm',
    liveUrl: null,
    docsUrl: null
  }
];

/**
 * Filters the project list based on category.
 * @param {string} category
 * @returns {Array<object>}
 */
export function filterProjects(category = 'all') {
  if (category === 'all') {
    return PROJECTS_DATA;
  }
  return PROJECTS_DATA.filter(p => p.category === category);
}

/**
 * Creates an article element representing a project card.
 * @param {object} project
 * @param {string} lang
 * @returns {HTMLElement}
 */
export function createProjectCard(project, lang = getEffectiveLanguage()) {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.setAttribute('data-category', project.category);

  const titleText = (project.title && project.title[lang]) || project.title['pt-BR'];
  const descText = (project.description && project.description[lang]) || project.description['pt-BR'];

  const tagsHtml = project.tags
    .map(tag => `<span class="tech-tag">${tag}</span>`)
    .join('');

  const btnCodeText = translate('projects.btn_code', lang) || 'Código';
  const btnDocsText = translate('projects.btn_docs', lang) || 'Docs';
  const btnLiveText = translate('projects.btn_live', lang) || 'Live Demo';

  let linksHtml = `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-project btn-github">${btnCodeText}</a>`;
  
  if (project.docsUrl) {
    linksHtml += `<a href="${project.docsUrl}" target="_blank" rel="noopener noreferrer" class="btn-project btn-docs">${btnDocsText}</a>`;
  }
  if (project.liveUrl) {
    linksHtml += `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-project btn-live">${btnLiveText}</a>`;
  }

  article.innerHTML = `
    <div class="project-header">
      <h3 class="project-title">${titleText}</h3>
      <span class="project-category-badge">${project.category.toUpperCase()}</span>
    </div>
    <p class="project-desc">${descText}</p>
    <div class="project-tags">${tagsHtml}</div>
    <div class="project-links">${linksHtml}</div>
  `;

  return article;
}

/**
 * Renders filtered project cards into a container.
 * @param {string} category
 * @param {HTMLElement} container
 * @param {string} lang
 */
export function renderProjects(category = 'all', container = document.getElementById('projects-grid'), lang = getEffectiveLanguage()) {
  if (!container) return;

  container.innerHTML = '';
  const filtered = filterProjects(category);

  filtered.forEach((project, index) => {
    const card = createProjectCard(project, lang);
    card.classList.add('reveal-fade-up', 'revealed');
    card.style.setProperty('--stagger-index', (index + 1).toString());
    container.appendChild(card);
  });
}

/**
 * Initializes project filter buttons and event listeners.
 */
export function initProjectsFilter() {
  const container = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let activeCategory = 'all';

  function updateFilter(category) {
    activeCategory = category;
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === category) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
    renderProjects(category, container, getEffectiveLanguage());
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter') || 'all';
      updateFilter(category);
    });
  });

  // Re-render when language changes
  if (typeof window !== 'undefined') {
    window.addEventListener('languagechange', (e) => {
      const lang = e.detail ? e.detail.language : getEffectiveLanguage();
      renderProjects(activeCategory, container, lang);
    });
  }

  // Initial render
  renderProjects(activeCategory, container, getEffectiveLanguage());
}
