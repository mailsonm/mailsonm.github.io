import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { translations, translate } from '../../assets/js/i18n.js';

describe('DOM Structure & Semantic SEO Integrity Suite', () => {
  const htmlPath = path.resolve(__dirname, '../../index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;

  describe('Semantic Sections & Structure', () => {
    it('should have semantic landmark tags: header, main, footer', () => {
      expect(document.querySelector('header.site-header')).not.toBeNull();
      expect(document.querySelector('main#main-content')).not.toBeNull();
      expect(document.querySelector('footer.site-footer')).not.toBeNull();
    });

    it('should have all 6 core sections with expected IDs', () => {
      const expectedSections = ['hero', 'about', 'skills', 'projects', 'services', 'contact'];
      expectedSections.forEach(id => {
        const section = document.getElementById(id);
        expect(section, `Section #${id} should exist`).not.toBeNull();
        expect(section.tagName).toBe('SECTION');
      });
    });

    it('should have project filters and projects-grid container', () => {
      const filters = document.querySelector('.projects-filters');
      expect(filters).not.toBeNull();

      const grid = document.getElementById('projects-grid');
      expect(grid).not.toBeNull();
    });

    it('should have contact form and direct contact buttons', () => {
      const form = document.getElementById('contact-form');
      expect(form).not.toBeNull();

      const directChannels = document.querySelector('.direct-channels');
      expect(directChannels).not.toBeNull();
    });
  });

  describe('SEO & Open Graph Metadata', () => {
    it('should have primary SEO meta tags (charset, viewport, description, author)', () => {
      expect(document.querySelector('meta[charset="UTF-8"]')).not.toBeNull();
      expect(document.querySelector('meta[name="viewport"]')).not.toBeNull();
      expect(document.querySelector('meta[name="description"]')).not.toBeNull();
      expect(document.querySelector('meta[name="author"]')).not.toBeNull();
    });

    it('should have Open Graph tags (og:title, og:description, og:type, og:url)', () => {
      expect(document.querySelector('meta[property="og:title"]')).not.toBeNull();
      expect(document.querySelector('meta[property="og:description"]')).not.toBeNull();
      expect(document.querySelector('meta[property="og:type"]')).not.toBeNull();
      expect(document.querySelector('meta[property="og:url"]')).not.toBeNull();
    });

    it('should have Twitter Card tags', () => {
      expect(document.querySelector('meta[name="twitter:card"]')).not.toBeNull();
      expect(document.querySelector('meta[name="twitter:title"]')).not.toBeNull();
    });
  });

  describe('i18n Key Synchronization', () => {
    it('should ensure all data-i18n keys in index.html exist in translation dictionaries', () => {
      const elements = document.querySelectorAll('[data-i18n]');
      expect(elements.length).toBeGreaterThan(10);

      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        expect(translate(key, 'pt-BR')).not.toBe(key);
        expect(translate(key, 'en-US')).not.toBe(key);
        expect(translate(key, 'es-ES')).not.toBe(key);
      });
    });

    it('should ensure all data-i18n-placeholder keys exist in translation dictionaries', () => {
      const elements = document.querySelectorAll('[data-i18n-placeholder]');
      expect(elements.length).toBeGreaterThanOrEqual(3);

      elements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        expect(translate(key, 'pt-BR')).not.toBe(key);
      });
    });
  });
});
