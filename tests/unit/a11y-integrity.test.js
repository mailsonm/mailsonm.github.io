import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { createProjectCard, PROJECTS_DATA } from '../../assets/js/projects.js';
import { applyTheme, THEME_LIGHT, THEME_DARK } from '../../assets/js/theme.js';

describe('Accessibility (A11y) & WCAG 2.1/2.2 Compliance Suite', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const htmlPath = path.join(rootDir, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(htmlContent);
  const htmlDoc = dom.window.document;

  describe('Landmarks, Hierarchy & Skip Link', () => {
    it('should have skip link with i18n attribute targeting main content', () => {
      const skipLink = htmlDoc.querySelector('.skip-link');
      expect(skipLink, 'Skip link must exist').not.toBeNull();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
      expect(skipLink.getAttribute('data-i18n')).toBe('nav.skip_link');
    });

    it('should mark decorative and duplicated ticker items with aria-hidden', () => {
      const tickerTrack = htmlDoc.querySelector('.marquee-track');
      expect(tickerTrack).not.toBeNull();
      
      const hiddenItems = tickerTrack.querySelectorAll('.marquee-item[aria-hidden="true"]');
      expect(hiddenItems.length).toBeGreaterThan(0);
    });

    it('should define role="region" or descriptive label on code terminal showcase', () => {
      const terminal = htmlDoc.querySelector('.code-terminal-card');
      expect(terminal).not.toBeNull();
      expect(terminal.getAttribute('role') || terminal.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Projects Contextual Link Labels', () => {
    it('should generate accessible descriptive aria-labels for external project links', () => {
      const project = PROJECTS_DATA[0];
      const card = createProjectCard(project, 'pt-BR');

      const links = card.querySelectorAll('.project-links a');
      expect(links.length).toBeGreaterThan(0);

      links.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label') || '';
        expect(ariaLabel.length).toBeGreaterThan(5);
        expect(ariaLabel).toContain(project.title['pt-BR']);
      });
    });
  });

  describe('Theme Toggle Dynamic ARIA Announcements', () => {
    it('should update theme-toggle aria-label dynamically when theme switches', () => {
      document.body.innerHTML = `
        <button id="theme-toggle" aria-label="Alternar tema"></button>
      `;

      applyTheme(THEME_LIGHT);
      const btn = document.getElementById('theme-toggle');
      expect(btn.getAttribute('aria-label')).toContain('escuro');

      applyTheme(THEME_DARK);
      expect(btn.getAttribute('aria-label')).toContain('claro');
    });
  });
});
