import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Acceptance & Acceptance Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test for clean deterministic state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');
  });

  test('Page Load & Core Landmarks', async ({ page }) => {
    // Check Title and Meta
    await expect(page).toHaveTitle(/Mailson Maia Alves/);

    // Check Header, Main, Footer
    await expect(page.locator('header.site-header')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('footer.site-footer')).toBeVisible();

    // Check Hero elements
    await expect(page.locator('.hero-avatar img')).toBeVisible();
    await expect(page.locator('.hero-title')).toHaveText('Mailson Maia Alves');
  });

  test('Theme Toggle (Dark / Light) & Persistence', async ({ page }) => {
    const html = page.locator('html');
    const themeBtn = page.locator('#theme-toggle');

    // Read initial theme
    const initialTheme = await html.getAttribute('data-theme');
    const expectedNextTheme = (initialTheme === 'dark') ? 'light' : 'dark';

    // Click toggle button
    await themeBtn.click();
    await expect(html).toHaveAttribute('data-theme', expectedNextTheme);

    // Check localStorage persistence
    const savedTheme = await page.evaluate(() => localStorage.getItem('portfolio_theme'));
    expect(savedTheme).toBe(expectedNextTheme);

    // Reload page and verify persistence
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', expectedNextTheme);

    // Toggle back
    await themeBtn.click();
    await expect(html).toHaveAttribute('data-theme', initialTheme || 'dark');
  });

  test('Multilingual Switcher (PT-BR, EN-US, ES-ES) & Persistence', async ({ page }) => {
    const langSelect = page.locator('#lang-select');
    const aboutTitle = page.locator('#about .section-title');

    // 1. Explicitly switch to PT-BR
    await langSelect.selectOption('pt-BR');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(aboutTitle).toHaveText('Sobre Mim & Metodologia');

    // 2. Switch to English (EN-US)
    await langSelect.selectOption('en-US');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
    await expect(aboutTitle).toHaveText('About Me & Methodology');

    // 3. Reload and check persistence of EN-US
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
    await expect(aboutTitle).toHaveText('About Me & Methodology');

    // 4. Switch to Spanish (ES-ES)
    await langSelect.selectOption('es-ES');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES');
    await expect(aboutTitle).toHaveText('Sobre Mí & Metodología');
  });

  test('Projects Showcase & Category Filter Interaction', async ({ page }) => {
    const grid = page.locator('#projects-grid');
    const cards = grid.locator('.project-card');

    // Initially all cards rendered
    await expect(cards).toHaveCount(5);

    // Filter by WordPress
    const wpBtn = page.locator('.filter-btn[data-filter="wordpress"]');
    await wpBtn.click();
    await expect(wpBtn).toHaveClass(/active/);
    await expect(cards).toHaveCount(1);
    await expect(cards.first().locator('.project-title')).toContainText(/Aviso de Cópia|Copy Notice|Aviso de Copia/);

    // Filter by Odoo
    const odooBtn = page.locator('.filter-btn[data-filter="odoo"]');
    await odooBtn.click();
    await expect(odooBtn).toHaveClass(/active/);
    await expect(cards).toHaveCount(1);
    await expect(cards.first().locator('.project-title')).toContainText(/Odoo 19/);

    // Filter by All
    const allBtn = page.locator('.filter-btn[data-filter="all"]');
    await allBtn.click();
    await expect(allBtn).toHaveClass(/active/);
    await expect(cards).toHaveCount(5);
  });

  test('Contact Form Validation & Async Submission with Mocked Web3Forms', async ({ page }) => {
    // Intercept Web3Forms API
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully' })
      });
    });

    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
    const messageInput = page.locator('#contact-message');
    const submitBtn = page.locator('#btn-submit-contact');
    const statusMsg = page.locator('#contact-status');

    // 1. Submit empty form to verify validation error
    await submitBtn.click();
    await expect(statusMsg).toBeVisible();
    await expect(statusMsg).toHaveClass(/error/);

    // 2. Fill valid form data
    await nameInput.fill('Carlos Alberto');
    await emailInput.fill('carlos.alberto@empresa.com');
    await messageInput.fill('Olá Mailson, gostaria de solicitar uma consultoria para implantação do Odoo 19.');

    // 3. Submit and verify success feedback
    await submitBtn.click();
    await expect(statusMsg).toBeVisible();
    await expect(statusMsg).toHaveClass(/success/);
    await expect(statusMsg).toContainText(/sucesso|success|éxito/i);

    // Form inputs should be cleared after success
    await expect(nameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(messageInput).toHaveValue('');
  });

  test('Accessibility (A11y) & Skip Link Navigation', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeAttached();

    // Check direct reach buttons
    await expect(page.locator('.btn-whatsapp')).toBeVisible();
    await expect(page.locator('.btn-linkedin')).toBeVisible();
    await expect(page.locator('.btn-email')).toBeVisible();

    // Check all images have alt attributes
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});
