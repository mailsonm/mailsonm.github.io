/**
 * Main Application Entrypoint
 * Initializes Theme, i18n, Projects Showcase, Contact Form and Animations modules.
 */

import { initTheme } from './theme.js';
import { initI18n } from './i18n.js';
import { initProjectsFilter } from './projects.js';
import { initContactForm } from './contact.js';
import { initAnimations } from './animations.js';

export function initMobileMenu() {
  if (typeof document === 'undefined') return;
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggleBtn || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove('mobile-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    const icon = toggleBtn.querySelector('.hamburger-icon');
    if (icon) icon.textContent = '☰';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const icon = toggleBtn.querySelector('.hamburger-icon');
    if (icon) icon.textContent = isOpen ? '✕' : '☰';
  });

  // Close menu when a navigation anchor is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
      closeMenu();
    }
  });
}

export function initApp() {
  // 1. Initialize Theme (Dark/Light Mode)
  initTheme();

  // 2. Initialize i18n Translations
  initI18n();

  // 3. Initialize Mobile Menu Toggle
  initMobileMenu();

  // 4. Initialize Projects Showcase & Filters
  initProjectsFilter();

  // 5. Initialize Contact Form & Validations
  initContactForm();

  // 6. Initialize Particles, Scroll Reveal & Interactive Animations
  initAnimations();

  // 7. Update Dynamic Current Year in Footer
  if (typeof document !== 'undefined') {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString();
    }
  }
}

// Auto-run when DOM content is loaded in browser
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
