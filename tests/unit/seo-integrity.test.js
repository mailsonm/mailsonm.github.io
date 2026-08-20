import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

describe('SEO & Technical Indexability Suite', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const htmlPath = path.join(rootDir, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;

  describe('Robots.txt & Sitemap.xml Integrity', () => {
    it('should have a valid robots.txt file allowing crawlers and linking sitemap', () => {
      const robotsPath = path.join(rootDir, 'robots.txt');
      expect(fs.existsSync(robotsPath), 'robots.txt must exist').toBe(true);

      const content = fs.readFileSync(robotsPath, 'utf-8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Allow: /');
      expect(content).toContain('Sitemap: https://mailsonm.github.io/sitemap.xml');
    });

    it('should have a valid sitemap.xml with xhtml:link hreflang annotations', () => {
      const sitemapPath = path.join(rootDir, 'sitemap.xml');
      expect(fs.existsSync(sitemapPath), 'sitemap.xml must exist').toBe(true);

      const content = fs.readFileSync(sitemapPath, 'utf-8');
      expect(content).toContain('<urlset');
      expect(content).toContain('<loc>https://mailsonm.github.io/</loc>');
      expect(content).toContain('hreflang="pt-BR"');
      expect(content).toContain('hreflang="en-US"');
      expect(content).toContain('hreflang="es-ES"');
      expect(content).toContain('hreflang="x-default"');
    });
  });

  describe('Custom 404 Error Page Integrity', () => {
    it('should have 404.html configured for GitHub Pages with noindex tag', () => {
      const errorPagePath = path.join(rootDir, '404.html');
      expect(fs.existsSync(errorPagePath), '404.html must exist').toBe(true);

      const content = fs.readFileSync(errorPagePath, 'utf-8');
      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('<meta name="robots" content="noindex, follow">');
      expect(content).toContain('404');
    });
  });

  describe('Schema.org JSON-LD Structured Data in index.html', () => {
    it('should contain a valid Schema.org script of type application/ld+json', () => {
      const schemaScript = document.querySelector('script[type="application/ld+json"]');
      expect(schemaScript, 'JSON-LD script should exist in index.html').not.toBeNull();

      const schemaData = JSON.parse(schemaScript.textContent);
      expect(schemaData['@context']).toBe('https://schema.org');
      expect(Array.isArray(schemaData['@graph'])).toBe(true);

      const types = schemaData['@graph'].map(item => item['@type']);
      expect(types).toContain('WebSite');
      expect(types).toContain('ProfilePage');
      expect(types).toContain('Person');
      expect(types).toContain('ProfessionalService');
    });

    it('should have accurate person and service details in JSON-LD', () => {
      const schemaScript = document.querySelector('script[type="application/ld+json"]');
      const schemaData = JSON.parse(schemaScript.textContent);
      const person = schemaData['@graph'].find(item => item['@type'] === 'Person');

      expect(person.name).toBe('Mailson Maia Alves');
      expect(person.url).toBe('https://mailsonm.github.io/');
      expect(person.image).toContain('profile-1.webp');
      expect(person.sameAs).toContain('https://github.com/mailsonm');
      expect(person.knowsAbout).toContain('Odoo 19 ERP');
      expect(person.knowsAbout).toContain('PHP 8.3');
    });
  });

  describe('Head Performance & Preload / Hreflang Tags', () => {
    it('should preload hero avatar for LCP optimization', () => {
      const preloadLink = document.querySelector('link[rel="preload"][as="image"]');
      expect(preloadLink, 'Avatar preload link should exist').not.toBeNull();
      expect(preloadLink?.getAttribute('href')).toContain('profile-1.webp');
    });

    it('should define alternate hreflang tags for all supported languages', () => {
      const hreflangPt = document.querySelector('link[rel="alternate"][hreflang="pt-BR"]');
      const hreflangEn = document.querySelector('link[rel="alternate"][hreflang="en-US"]');
      const hreflangEs = document.querySelector('link[rel="alternate"][hreflang="es-ES"]');
      const hreflangDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');

      expect(hreflangPt).not.toBeNull();
      expect(hreflangEn).not.toBeNull();
      expect(hreflangEs).not.toBeNull();
      expect(hreflangDefault).not.toBeNull();
    });
  });
});
