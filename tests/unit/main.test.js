import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initApp, initMobileMenu } from '../../assets/js/main.js';

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
        <button id="mobile-menu-toggle" aria-expanded="false">
          <span class="hamburger-icon">☰</span>
        </button>
        <ul id="nav-links">
          <li><a href="#about" class="nav-link">Sobre</a></li>
          <li><a href="#skills" class="nav-link">Especialidades</a></li>
        </ul>
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

  it('should toggle mobile menu open and close on button click', () => {
    initMobileMenu();

    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const icon = toggleBtn.querySelector('.hamburger-icon');

    // Click to open
    toggleBtn.click();
    expect(navLinks.classList.contains('mobile-open')).toBe(true);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');
    expect(icon.textContent).toBe('✕');

    // Click to close
    toggleBtn.click();
    expect(navLinks.classList.contains('mobile-open')).toBe(false);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    expect(icon.textContent).toBe('☰');
  });

  it('should close mobile menu when a nav link is clicked or Escape is pressed', () => {
    initMobileMenu();

    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const link = navLinks.querySelector('.nav-link');

    // Open first
    toggleBtn.click();
    expect(navLinks.classList.contains('mobile-open')).toBe(true);

    // Click a nav link
    link.click();
    expect(navLinks.classList.contains('mobile-open')).toBe(false);

    // Open again and press Escape
    toggleBtn.click();
    expect(navLinks.classList.contains('mobile-open')).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(navLinks.classList.contains('mobile-open')).toBe(false);
  });
});
