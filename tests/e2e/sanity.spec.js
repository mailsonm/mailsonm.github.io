import { test, expect } from '@playwright/test';

test.describe('Sanity E2E Suite', () => {
  test('should load the page and find the hero title', async ({ page }) => {
    await page.goto('/');
    const title = page.locator('h1');
    await expect(title).toHaveText('Mailson Maia Alves');
  });

  test('should have theme and language controls present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#theme-toggle')).toBeVisible();
    await expect(page.locator('#lang-select')).toBeVisible();
  });
});
