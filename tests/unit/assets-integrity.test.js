import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

describe('Assets & Media Integrity Suite', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const htmlPath = path.join(rootDir, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(htmlContent);
  const { document } = dom.window;

  describe('Physical Asset Files Existence', () => {
    it('should have favicon.svg in assets/img directory', () => {
      const faviconPath = path.join(rootDir, 'assets/img/favicon.svg');
      expect(fs.existsSync(faviconPath), 'favicon.svg must exist').toBe(true);
      
      const content = fs.readFileSync(faviconPath, 'utf-8');
      expect(content).toContain('<svg');
    });

    it('should have profile avatar asset in assets/img directory', () => {
      const svgPath = path.join(rootDir, 'assets/img/profile.svg');
      const webpPath = path.join(rootDir, 'assets/img/profile.webp');
      const pngPath = path.join(rootDir, 'assets/img/profile.png');
      
      const avatarExists = fs.existsSync(svgPath) || fs.existsSync(webpPath) || fs.existsSync(pngPath);
      expect(avatarExists, 'Avatar file (profile.svg/webp/png) must exist').toBe(true);
    });
  });

  describe('HTML Link and Media References', () => {
    it('should link favicon in index.html head', () => {
      const faviconLink = document.querySelector('link[rel="icon"]');
      expect(faviconLink, 'link[rel="icon"] should exist').not.toBeNull();
      expect(faviconLink?.getAttribute('href')).toContain('favicon.svg');
    });

    it('should have an accessible avatar img tag in hero section with explicit dimensions', () => {
      const heroImg = document.querySelector('.hero-avatar img');
      expect(heroImg, 'Hero avatar img should exist').not.toBeNull();
      expect(heroImg?.getAttribute('alt')).toBeTruthy();
      expect(heroImg?.getAttribute('width')).toBe('160');
      expect(heroImg?.getAttribute('height')).toBe('160');
    });
  });
});
