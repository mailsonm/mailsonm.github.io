import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  THEME_STORAGE_KEY,
  THEME_DARK,
  THEME_LIGHT,
  getSavedTheme,
  getSystemTheme,
  getEffectiveTheme,
  applyTheme,
  toggleTheme,
  initTheme
} from '../../assets/js/theme.js';

describe('Theme Manager Module', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    vi.restoreAllMocks();
  });

  describe('getSavedTheme', () => {
    it('should return null if no theme is stored in localStorage', () => {
      expect(getSavedTheme()).toBeNull();
    });

    it('should return the saved theme if valid ("dark" or "light")', () => {
      localStorage.setItem(THEME_STORAGE_KEY, THEME_LIGHT);
      expect(getSavedTheme()).toBe(THEME_LIGHT);

      localStorage.setItem(THEME_STORAGE_KEY, THEME_DARK);
      expect(getSavedTheme()).toBe(THEME_DARK);
    });

    it('should return null if stored theme is invalid', () => {
      localStorage.setItem(THEME_STORAGE_KEY, 'invalid-theme');
      expect(getSavedTheme()).toBeNull();
    });
  });

  describe('getSystemTheme', () => {
    it('should return "dark" when prefers-color-scheme: dark matches', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(getSystemTheme()).toBe(THEME_DARK);
    });

    it('should return "light" when prefers-color-scheme: dark does not match', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(getSystemTheme()).toBe(THEME_LIGHT);
    });
  });

  describe('getEffectiveTheme', () => {
    it('should prioritize saved theme over system preference', () => {
      localStorage.setItem(THEME_STORAGE_KEY, THEME_LIGHT);
      window.matchMedia = vi.fn().mockImplementation(() => ({ matches: true }));

      expect(getEffectiveTheme()).toBe(THEME_LIGHT);
    });

    it('should fallback to system theme when no saved theme exists', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)'
      }));

      expect(getEffectiveTheme()).toBe(THEME_DARK);
    });
  });

  describe('applyTheme', () => {
    it('should set data-theme attribute on documentElement and update localStorage', () => {
      applyTheme(THEME_LIGHT);
      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_LIGHT);
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_LIGHT);

      applyTheme(THEME_DARK);
      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_DARK);
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_DARK);
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from dark to light and from light to dark', () => {
      document.documentElement.setAttribute('data-theme', THEME_DARK);
      const newTheme = toggleTheme();
      expect(newTheme).toBe(THEME_LIGHT);
      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_LIGHT);
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_LIGHT);

      const nextTheme = toggleTheme();
      expect(nextTheme).toBe(THEME_DARK);
      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_DARK);
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_DARK);
    });
  });

  describe('initTheme', () => {
    it('should initialize theme on documentElement based on effective theme', () => {
      localStorage.setItem(THEME_STORAGE_KEY, THEME_LIGHT);
      initTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_LIGHT);
    });

    it('should attach click listener to theme-toggle button if present', () => {
      document.body.innerHTML = '<button id="theme-toggle"></button>';
      const button = document.getElementById('theme-toggle');
      
      initTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_DARK); // default fallback
      
      button.click();
      expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_LIGHT);
    });
  });
});
