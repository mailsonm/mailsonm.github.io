/**
 * Theme Manager Module
 * Handles Light/Dark mode, system preference detection, and localStorage persistence.
 */

export const THEME_STORAGE_KEY = 'portfolio_theme';
export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';

/**
 * Retrieves the theme saved in localStorage if valid.
 * @returns {'dark' | 'light' | null}
 */
export function getSavedTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === THEME_DARK || saved === THEME_LIGHT) {
    return saved;
  }
  return null;
}

/**
 * Detects the user's operating system color scheme preference.
 * @returns {'dark' | 'light'}
 */
export function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? THEME_DARK : THEME_LIGHT;
  }
  return THEME_DARK;
}

/**
 * Determines the effective theme (saved preference or system fallback).
 * @returns {'dark' | 'light'}
 */
export function getEffectiveTheme() {
  const saved = getSavedTheme();
  if (saved) {
    return saved;
  }
  return getSystemTheme();
}

/**
 * Applies the specified theme to the DOM and saves it in localStorage.
 * @param {'dark' | 'light'} theme
 */
export function applyTheme(theme) {
  const targetTheme = (theme === THEME_LIGHT) ? THEME_LIGHT : THEME_DARK;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', targetTheme);
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      const isLight = targetTheme === THEME_LIGHT;
      toggleBtn.setAttribute('aria-label', isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro');
      toggleBtn.setAttribute('title', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
    }
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, targetTheme);
  }
}

/**
 * Toggles the current theme between dark and light.
 * @returns {'dark' | 'light'} The new active theme.
 */
export function toggleTheme() {
  const current = (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || getEffectiveTheme();
  const nextTheme = (current === THEME_DARK) ? THEME_LIGHT : THEME_DARK;
  applyTheme(nextTheme);
  return nextTheme;
}

/**
 * Initializes theme on page load and sets up event listener on toggle button if present.
 */
export function initTheme() {
  const initialTheme = getEffectiveTheme();
  applyTheme(initialTheme);

  if (typeof document !== 'undefined') {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        toggleTheme();
      });
    }
  }
}
