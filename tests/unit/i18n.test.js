import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  I18N_STORAGE_KEY,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  translations,
  getSavedLanguage,
  getBrowserLanguage,
  getEffectiveLanguage,
  translate,
  applyTranslations,
  setLanguage,
  initI18n
} from '../../assets/js/i18n.js';

describe('i18n Translation Manager Module', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'pt-BR';
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('Supported Languages and Dictionary Integrity', () => {
    it('should support pt-BR, en-US and es-ES', () => {
      expect(SUPPORTED_LANGUAGES).toEqual(['pt-BR', 'en-US', 'es-ES']);
    });

    it('should have key sections in all translation dictionaries', () => {
      const requiredSections = ['brand', 'nav', 'hero', 'about', 'skills', 'projects', 'services', 'contact', 'footer'];
      SUPPORTED_LANGUAGES.forEach(lang => {
        expect(translations[lang]).toBeDefined();
        requiredSections.forEach(sec => {
          expect(translations[lang][sec]).toBeDefined();
        });
      });
    });
  });

  describe('getSavedLanguage', () => {
    it('should return null when nothing is in localStorage', () => {
      expect(getSavedLanguage()).toBeNull();
    });

    it('should return valid saved language', () => {
      localStorage.setItem(I18N_STORAGE_KEY, 'en-US');
      expect(getSavedLanguage()).toBe('en-US');

      localStorage.setItem(I18N_STORAGE_KEY, 'es-ES');
      expect(getSavedLanguage()).toBe('es-ES');
    });

    it('should return null if saved language is unsupported', () => {
      localStorage.setItem(I18N_STORAGE_KEY, 'fr-FR');
      expect(getSavedLanguage()).toBeNull();
    });
  });

  describe('getBrowserLanguage', () => {
    it('should detect pt-BR when navigator.language starts with pt', () => {
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('pt-BR');
      expect(getBrowserLanguage()).toBe('pt-BR');

      vi.spyOn(navigator, 'language', 'get').mockReturnValue('pt');
      expect(getBrowserLanguage()).toBe('pt-BR');
    });

    it('should detect en-US when navigator.language starts with en', () => {
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-GB');
      expect(getBrowserLanguage()).toBe('en-US');
    });

    it('should detect es-ES when navigator.language starts with es', () => {
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-AR');
      expect(getBrowserLanguage()).toBe('es-ES');
    });

    it('should fallback to DEFAULT_LANGUAGE (pt-BR) if language is not supported', () => {
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('de-DE');
      expect(getBrowserLanguage()).toBe(DEFAULT_LANGUAGE);
    });
  });

  describe('getEffectiveLanguage', () => {
    it('should prioritize saved language over browser language', () => {
      localStorage.setItem(I18N_STORAGE_KEY, 'en-US');
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-ES');

      expect(getEffectiveLanguage()).toBe('en-US');
    });

    it('should fallback to browser language when no saved preference exists', () => {
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-ES');
      expect(getEffectiveLanguage()).toBe('es-ES');
    });
  });

  describe('translate function', () => {
    it('should return translated text for nested keys', () => {
      expect(translate('brand.name', 'pt-BR')).toBe('Mailson Maia');
      expect(translate('nav.about', 'en-US')).toBe('About');
      expect(translate('nav.about', 'es-ES')).toBe('Sobre mí');
    });

    it('should fallback to default language if key missing in target language', () => {
      expect(translate('brand.name', 'es-ES')).toBe('Mailson Maia');
    });

    it('should return the key itself if not found in any dictionary', () => {
      expect(translate('non.existent.key', 'pt-BR')).toBe('non.existent.key');
    });
  });

  describe('applyTranslations to DOM', () => {
    it('should replace textContent of [data-i18n] elements', () => {
      document.body.innerHTML = `
        <h1 data-i18n="hero.title">Texto Antigo</h1>
        <p data-i18n="hero.subtitle">Subtítulo Antigo</p>
      `;

      applyTranslations('en-US');

      expect(document.querySelector('h1').textContent).toBe(translations['en-US'].hero.title);
      expect(document.querySelector('p').textContent).toBe(translations['en-US'].hero.subtitle);
    });

    it('should replace placeholders for [data-i18n-placeholder]', () => {
      document.body.innerHTML = `
        <input id="name" data-i18n-placeholder="contact.placeholder_name" placeholder="Nome" />
      `;

      applyTranslations('en-US');

      expect(document.getElementById('name').getAttribute('placeholder')).toBe(translations['en-US'].contact.placeholder_name);
    });

    it('should replace aria-label for [data-i18n-aria]', () => {
      document.body.innerHTML = `
        <button id="theme-btn" data-i18n-aria="nav.theme_aria" aria-label="Antigo"></button>
      `;

      applyTranslations('es-ES');

      expect(document.getElementById('theme-btn').getAttribute('aria-label')).toBe(translations['es-ES'].nav.theme_aria);
    });
  });

  describe('setLanguage & initI18n', () => {
    it('should set html lang attribute and save to localStorage on setLanguage', () => {
      setLanguage('en-US');

      expect(document.documentElement.lang).toBe('en-US');
      expect(localStorage.getItem(I18N_STORAGE_KEY)).toBe('en-US');
    });

    it('should initialize language from effective language and bind select element', () => {
      localStorage.setItem(I18N_STORAGE_KEY, 'es-ES');
      document.body.innerHTML = `
        <select id="lang-select">
          <option value="pt-BR">PT-BR</option>
          <option value="en-US">EN-US</option>
          <option value="es-ES">ES-ES</option>
        </select>
        <span data-i18n="nav.about">Sobre</span>
      `;

      initI18n();

      expect(document.documentElement.lang).toBe('es-ES');
      expect(document.getElementById('lang-select').value).toBe('es-ES');
      expect(document.querySelector('span').textContent).toBe(translations['es-ES'].nav.about);

      // Simulate user changing language via select
      const select = document.getElementById('lang-select');
      select.value = 'en-US';
      select.dispatchEvent(new Event('change'));

      expect(document.documentElement.lang).toBe('en-US');
      expect(localStorage.getItem(I18N_STORAGE_KEY)).toBe('en-US');
      expect(document.querySelector('span').textContent).toBe(translations['en-US'].nav.about);
    });
  });
});
