import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initBlogList, initBlogPost } from '../../assets/js/blog.js';

describe('Blog Client JS Suite (TDD)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('initBlogList & Filter Logic', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div>
          <input type="search" id="blog-search-input" />
          <div id="blog-tags-filter">
            <button class="filter-btn active" data-filter="all">Todos</button>
            <button class="filter-btn" data-filter="odoo">Odoo</button>
            <button class="filter-btn" data-filter="php">PHP</button>
          </div>
          <div id="posts-grid">
            <article class="blog-card" data-tags="odoo,python,tdd">
              <h2 class="blog-card-title">Artigo Odoo 19</h2>
              <p class="blog-card-desc">Testes no Odoo</p>
            </article>
            <article class="blog-card" data-tags="php,wordpress">
              <h2 class="blog-card-title">Plugin WordPress</h2>
              <p class="blog-card-desc">Segurança em PHP</p>
            </article>
          </div>
        </div>
      `;
    });

    it('should filter cards when clicking a tag button', () => {
      initBlogList();

      const odooBtn = document.querySelector('button[data-filter="odoo"]');
      odooBtn?.dispatchEvent(new Event('click'));

      const cards = document.querySelectorAll('.blog-card');
      expect(cards[0].style.display).toBe('flex');
      expect(cards[1].style.display).toBe('none');
    });

    it('should filter cards by search query in input', async () => {
      vi.useFakeTimers();
      initBlogList();

      const input = document.getElementById('blog-search-input');
      if (input) {
        input.value = 'WordPress';
        input.dispatchEvent(new Event('input'));
      }

      vi.advanceTimersByTime(200);

      const cards = document.querySelectorAll('.blog-card');
      expect(cards[0].style.display).toBe('none');
      expect(cards[1].style.display).toBe('flex');
      vi.useRealTimers();
    });
  });

  describe('initBlogPost & Copy Actions', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="prose">
          <pre><code>const a = 1;</code></pre>
        </div>
        <button id="btn-copy-link">Copiar Link</button>
      `;

      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined)
        }
      });
    });

    it('should inject copy code button into pre elements and invoke clipboard.writeText', async () => {
      initBlogPost();

      const copyBtn = document.querySelector('.code-copy-btn');
      expect(copyBtn).not.toBeNull();

      copyBtn?.dispatchEvent(new Event('click'));
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const a = 1;');
    });

    it('should handle copy link button click', async () => {
      initBlogPost();

      const copyLinkBtn = document.getElementById('btn-copy-link');
      copyLinkBtn?.dispatchEvent(new Event('click'));

      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
