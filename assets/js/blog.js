/**
 * Blog Client Module: Mailson Maia Alves Portfolio
 * Handles search filtering, tag active state, and code copy buttons.
 */

import { initTheme } from './theme.js';

/**
 * Initializes filtering and search on the blog list page.
 */
export function initBlogList() {
  const searchInput = document.getElementById('blog-search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.blog-card');

  let currentTag = 'all';
  let searchQuery = '';

  function filterPosts() {
    let visibleCount = 0;

    cards.forEach(card => {
      const cardTags = (card.getAttribute('data-tags') || '').toLowerCase().split(',');
      const cardTitle = (card.querySelector('.blog-card-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.blog-card-desc')?.textContent || '').toLowerCase();

      const matchesTag = currentTag === 'all' || cardTags.includes(currentTag);
      const matchesSearch = !searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery) || cardTags.some(t => t.includes(searchQuery));

      if (matchesTag && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Check if empty state message should appear
    const grid = document.getElementById('posts-grid');
    let emptyNotice = document.getElementById('no-results-notice');

    if (visibleCount === 0) {
      if (!emptyNotice && grid) {
        emptyNotice = document.createElement('div');
        emptyNotice.id = 'no-results-notice';
        emptyNotice.className = 'empty-blog-state';
        emptyNotice.innerHTML = '<p>Nenhum artigo encontrado para os filtros selecionados.</p>';
        grid.appendChild(emptyNotice);
      }
    } else if (emptyNotice) {
      emptyNotice.remove();
    }
  }

  // Tag filter click handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTag = (btn.getAttribute('data-filter') || 'all').toLowerCase();
      filterPosts();
    });
  });

  // Search input handler with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = (e.target.value || '').trim().toLowerCase();
        filterPosts();
      }, 150);
    });
  }
}

/**
 * Initializes code copy buttons and link copy on individual post pages.
 */
export function initBlogPost() {
  // 1. Add copy button to pre code blocks
  const codeBlocks = document.querySelectorAll('.prose pre');
  codeBlocks.forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.setAttribute('type', 'button');
    copyBtn.setAttribute('aria-label', 'Copiar código');
    copyBtn.textContent = 'Copiar';

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent || '');
        copyBtn.textContent = 'Copiado!';
        setTimeout(() => {
          copyBtn.textContent = 'Copiar';
        }, 2000);
      } catch (err) {
        copyBtn.textContent = 'Erro ao copiar';
      }
    });

    pre.appendChild(copyBtn);
  });

  // 2. Share Copy Link button
  const copyLinkBtn = document.getElementById('btn-copy-link');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<span aria-hidden="true">✓</span> Link Copiado!';
        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText;
        }, 2500);
      } catch (err) {
        // fallback
      }
    });
  }
}

// Auto-initialize when loaded as a module in browser
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  const init = () => {
    initTheme();

    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
        navLinks.classList.toggle('nav-active');
      });
    }

    if (document.getElementById('posts-grid')) {
      initBlogList();
    }
    if (document.getElementById('article-content')) {
      initBlogPost();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
