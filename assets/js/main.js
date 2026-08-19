/**
 * Main Application Entrypoint
 * Initializes Theme, i18n, Projects Showcase and Contact Form modules.
 */

import { initTheme } from './theme.js';
import { initI18n } from './i18n.js';
import { initProjectsFilter } from './projects.js';
import { initContactForm } from './contact.js';

export function initApp() {
  // 1. Initialize Theme (Dark/Light Mode)
  initTheme();

  // 2. Initialize i18n Translations
  initI18n();

  // 3. Initialize Projects Showcase & Filters
  initProjectsFilter();

  // 4. Initialize Contact Form & Validations
  initContactForm();

  // 5. Update Dynamic Current Year in Footer
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
