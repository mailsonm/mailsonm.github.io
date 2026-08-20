import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

describe('Application Security & Hardening Suite', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const htmlPath = path.join(rootDir, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;

  describe('Content Security Policy (CSP) & HTTP-Equiv Headers', () => {
    it('should have Content Security Policy meta tag configured in index.html', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      expect(cspMeta, 'CSP meta tag should exist').not.toBeNull();
      
      const cspContent = cspMeta?.getAttribute('content') || '';
      expect(cspContent).toContain("default-src 'self'");
      expect(cspContent).toContain('https://api.web3forms.com');
      expect(cspContent).toContain("object-src 'none'");
    });

    it('should have Referrer-Policy and security meta tags in index.html', () => {
      const referrerMeta = document.querySelector('meta[name="referrer"]');
      expect(referrerMeta).not.toBeNull();
      expect(referrerMeta?.getAttribute('content')).toBe('strict-origin-when-cross-origin');

      const nosniffMeta = document.querySelector('meta[http-equiv="X-Content-Type-Options"]');
      expect(nosniffMeta).not.toBeNull();
      expect(nosniffMeta?.getAttribute('content')).toBe('nosniff');
    });

    it('should have CSP and security headers in 404.html', () => {
      const errorPagePath = path.join(rootDir, '404.html');
      const errorContent = fs.readFileSync(errorPagePath, 'utf-8');
      const errorDom = new JSDOM(errorContent);

      const csp = errorDom.window.document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      expect(csp, '404.html should have CSP meta tag').not.toBeNull();
    });
  });

  describe('Reverse Tabnabbing Protection', () => {
    it('should have rel="noopener noreferrer" on all target="_blank" links', () => {
      const blankLinks = document.querySelectorAll('a[target="_blank"]');
      expect(blankLinks.length).toBeGreaterThan(0);

      blankLinks.forEach(link => {
        const rel = link.getAttribute('rel') || '';
        expect(rel.includes('noopener') || rel.includes('noreferrer'), `Link ${link.getAttribute('href')} must have rel="noopener noreferrer"`).toBe(true);
      });
    });
  });

  describe('Form Privacy & LGPD Disclaimer', () => {
    it('should have a privacy note within the contact form area', () => {
      const privacyNote = document.querySelector('.form-privacy-note');
      expect(privacyNote, 'Privacy disclaimer element should exist').not.toBeNull();
    });
  });
});
