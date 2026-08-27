import { test, expect } from '@playwright/test';

test.describe('Technical Blog E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Portfolio Home should feature Blog preview and Navigation link', async ({ page }) => {
    await page.goto('/');

    // Check Blog link in nav
    const blogNavLink = page.locator('nav .nav-links a[href*="blog"]');
    await expect(blogNavLink).toBeVisible();

    // Check Blog Preview section
    const blogSection = page.locator('#blog-preview');
    await expect(blogSection).toBeVisible();

    const blogCards = blogSection.locator('.blog-card');
    await expect(blogCards).toHaveCount(3);
  });

  test('Blog List Page (/blog/index.html) - Filtering & Search', async ({ page }) => {
    await page.goto('/blog/index.html');

    await expect(page).toHaveTitle(/Blog Técnico | Mailson Maia Alves/);
    await expect(page.locator('.blog-main-title')).toBeVisible();

    // Check that cards exist
    const cards = page.locator('#posts-grid .blog-card');
    const totalCount = await cards.count();
    expect(totalCount).toBeGreaterThanOrEqual(3);

    // Test Tag Filter (Odoo)
    const odooBtn = page.locator('button[data-filter="odoo"]');
    if (await odooBtn.isVisible()) {
      await odooBtn.click();
      await expect(odooBtn).toHaveClass(/active/);
      
      const visibleCards = page.locator('#posts-grid .blog-card:visible');
      const count = await visibleCards.count();
      expect(count).toBeGreaterThanOrEqual(1);
    }

    // Reset to "all"
    await page.locator('button[data-filter="all"]').click();

    // Test Search input
    const searchInput = page.locator('#blog-search-input');
    await searchInput.fill('WordPress');
    await page.waitForTimeout(250);

    const filteredCards = page.locator('#posts-grid .blog-card:visible');
    const wpCount = await filteredCards.count();
    expect(wpCount).toBeGreaterThanOrEqual(1);
    await expect(filteredCards.first()).toContainText('WordPress');
  });

  test('Article Page Navigation, Code Highlighting & Dark Theme', async ({ page }) => {
    await page.goto('/blog/posts/odoo-19-tdd-best-practices.html');

    // Check Article Heading
    await expect(page.locator('h1.article-title')).toContainText('Desenvolvimento Orientado a Testes no Odoo 19');

    // Check Syntax Highlighting in pre code block
    const codeBlock = page.locator('.prose pre code').first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveClass(/hljs/);

    // Check Copy Code Button
    const copyBtn = page.locator('.code-copy-btn').first();
    await expect(copyBtn).toBeVisible();

    // Check Author Bio Card
    await expect(page.locator('.author-bio-card')).toBeVisible();
    await expect(page.locator('.author-bio-info h4')).toHaveText('Mailson Maia Alves');

    // Test Theme Toggle on Article Page
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');
    const themeBtn = page.locator('#theme-toggle');
    await themeBtn.click();
    
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });
});
