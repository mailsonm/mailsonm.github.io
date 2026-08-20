import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { translations } from '../../assets/js/i18n.js';

describe('Performance & CRO (Conversion Rate Optimization) Suite', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const htmlPath = path.join(rootDir, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;

  describe('Hero Image LCP & Decoding Optimization', () => {
    it('should have fetchpriority="high" and decoding="async" on hero avatar', () => {
      const avatarImg = document.querySelector('.hero-avatar img');
      expect(avatarImg, 'Avatar img must exist').not.toBeNull();
      expect(avatarImg.getAttribute('fetchpriority')).toBe('high');
      expect(avatarImg.getAttribute('decoding')).toBe('async');
    });
  });

  describe('Conversion & Quick Contact Hooks (CRO)', () => {
    it('should configure pre-filled message parameter on WhatsApp direct links', () => {
      const waLinks = document.querySelectorAll('a[href*="wa.me"]');
      expect(waLinks.length).toBeGreaterThan(0);

      waLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        expect(href).toContain('text=');
      });
    });

    it('should have a floating WhatsApp quick contact CTA button', () => {
      const floatingWa = document.querySelector('.floating-whatsapp');
      expect(floatingWa, 'Floating WhatsApp button must exist').not.toBeNull();
      expect(floatingWa.getAttribute('target')).toBe('_blank');
      expect(floatingWa.getAttribute('rel')).toContain('noopener');
      expect(floatingWa.getAttribute('aria-label')).toBeTruthy();
    });

    it('should align hero GitHub button key in translation dictionaries', () => {
      expect(translations['pt-BR'].hero.btn_github).toBeDefined();
      expect(translations['en-US'].hero.btn_github).toBeDefined();
      expect(translations['es-ES'].hero.btn_github).toBeDefined();
    });
  });
});
