import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initApp } from '../../assets/js/main.js';

describe('Main Application Integration Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'pt-BR';
    document.documentElement.removeAttribute('data-theme');
    document.body.innerHTML = `
      <header>
        <button id="theme-toggle"></button>
        <select id="lang-select">
          <option value="pt-BR">PT-BR</option>
          <option value="en-US">EN-US</option>
          <option value="es-ES">ES-ES</option>
        </select>
      </header>
      <main>
        <div id="projects-grid"></div>
        <form id="contact-form">
          <input name="access_key" value="test-key" />
          <input id="contact-name" name="name" />
          <input id="contact-email" name="email" />
          <textarea id="contact-message" name="message"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </main>
      <footer>
        <span id="current-year"></span>
      </footer>
    `;
    vi.restoreAllMocks();
  });

  it('should initialize all modules, render project cards, and set current year', () => {
    initApp();

    expect(document.documentElement.getAttribute('data-theme')).toBeDefined();
    expect(document.documentElement.lang).toBeDefined();

    const projectCards = document.querySelectorAll('.project-card');
    expect(projectCards.length).toBeGreaterThan(0);

    const yearEl = document.getElementById('current-year');
    expect(yearEl.textContent).toBe(new Date().getFullYear().toString());
  });
});
