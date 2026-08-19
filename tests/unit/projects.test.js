import { describe, it, expect, beforeEach } from 'vitest';
import {
  PROJECTS_DATA,
  filterProjects,
  createProjectCard,
  renderProjects,
  initProjectsFilter
} from '../../assets/js/projects.js';

describe('Projects Filter & Showcase Manager Module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Project Data Structure & Integrity', () => {
    it('should have key portfolio projects defined', () => {
      expect(PROJECTS_DATA.length).toBeGreaterThanOrEqual(4);
      
      const ids = PROJECTS_DATA.map(p => p.id);
      expect(ids).toContain('aviso-de-copia');
      expect(ids).toContain('odoo-modules');
      expect(ids).toContain('n8n-automation');
      expect(ids).toContain('php-pest-api');
    });

    it('should have valid fields on every project item', () => {
      PROJECTS_DATA.forEach(project => {
        expect(project.id).toBeDefined();
        expect(project.category).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.title['pt-BR']).toBeDefined();
        expect(project.title['en-US']).toBeDefined();
        expect(project.title['es-ES']).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.tags).toBeInstanceOf(Array);
        expect(project.tags.length).toBeGreaterThan(0);
        expect(project.githubUrl).toBeDefined();
      });
    });
  });

  describe('filterProjects', () => {
    it('should return all projects when category is "all"', () => {
      const result = filterProjects('all');
      expect(result.length).toBe(PROJECTS_DATA.length);
    });

    it('should filter projects accurately by category', () => {
      const wp = filterProjects('wordpress');
      expect(wp.every(p => p.category === 'wordpress')).toBe(true);
      expect(wp.length).toBeGreaterThanOrEqual(1);

      const odoo = filterProjects('odoo');
      expect(odoo.every(p => p.category === 'odoo')).toBe(true);

      const automation = filterProjects('automation');
      expect(automation.every(p => p.category === 'automation')).toBe(true);
    });

    it('should return empty array for non-existent category', () => {
      const result = filterProjects('non-existent');
      expect(result).toEqual([]);
    });
  });

  describe('createProjectCard', () => {
    it('should generate an article HTML element with correct attributes and tags', () => {
      const project = PROJECTS_DATA[0];
      const card = createProjectCard(project, 'pt-BR');

      expect(card.tagName).toBe('ARTICLE');
      expect(card.classList.contains('project-card')).toBe(true);
      expect(card.getAttribute('data-category')).toBe(project.category);
      
      const titleEl = card.querySelector('.project-title');
      expect(titleEl.textContent).toBe(project.title['pt-BR']);

      const tags = card.querySelectorAll('.tech-tag');
      expect(tags.length).toBe(project.tags.length);

      const githubBtn = card.querySelector('a.btn-github');
      expect(githubBtn).not.toBeNull();
      expect(githubBtn.getAttribute('href')).toBe(project.githubUrl);
    });

    it('should translate project description according to language', () => {
      const project = PROJECTS_DATA[0];
      const cardEn = createProjectCard(project, 'en-US');
      const cardEs = createProjectCard(project, 'es-ES');

      expect(cardEn.querySelector('.project-desc').textContent).toBe(project.description['en-US']);
      expect(cardEs.querySelector('.project-desc').textContent).toBe(project.description['es-ES']);
    });
  });

  describe('renderProjects', () => {
    it('should append project cards into target container', () => {
      document.body.innerHTML = '<div id="projects-grid"></div>';
      const container = document.getElementById('projects-grid');

      renderProjects('all', container, 'pt-BR');

      const cards = container.querySelectorAll('.project-card');
      expect(cards.length).toBe(PROJECTS_DATA.length);
    });

    it('should clear existing cards before re-rendering for a specific category', () => {
      document.body.innerHTML = '<div id="projects-grid"></div>';
      const container = document.getElementById('projects-grid');

      renderProjects('all', container, 'pt-BR');
      renderProjects('wordpress', container, 'pt-BR');

      const wpCards = container.querySelectorAll('.project-card');
      const expectedCount = PROJECTS_DATA.filter(p => p.category === 'wordpress').length;
      expect(wpCards.length).toBe(expectedCount);
    });
  });

  describe('initProjectsFilter', () => {
    it('should bind click handlers to filter buttons and update active class', () => {
      document.body.innerHTML = `
        <div class="projects-filters">
          <button class="filter-btn active" data-filter="all">Todos</button>
          <button class="filter-btn" data-filter="wordpress">WordPress</button>
        </div>
        <div id="projects-grid"></div>
      `;

      initProjectsFilter();

      const wpBtn = document.querySelector('[data-filter="wordpress"]');
      const allBtn = document.querySelector('[data-filter="all"]');

      wpBtn.click();

      expect(wpBtn.classList.contains('active')).toBe(true);
      expect(allBtn.classList.contains('active')).toBe(false);

      const cards = document.querySelectorAll('#projects-grid .project-card');
      const expectedCount = PROJECTS_DATA.filter(p => p.category === 'wordpress').length;
      expect(cards.length).toBe(expectedCount);
    });
  });
});
