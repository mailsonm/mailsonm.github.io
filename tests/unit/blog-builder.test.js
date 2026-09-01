import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractFrontmatter,
  calculateReadTime,
  renderMarkdownToHtml,
  generatePostSlug,
  generateRssFeed,
  updateSitemapWithBlog,
  buildBlog
} from '../../scripts/build-blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Blog Builder Unit Test Suite (TDD-First)', () => {
  const sampleMarkdown = `---
title: Desenvolvimento Orientado a Testes no Odoo 19
slug: odoo-19-tdd-best-practices
date: '2026-08-27'
author: Mailson Maia Alves
tags:
  - Odoo
  - Python
  - TDD
lang: pt-BR
description: Como implementar testes de integração no Odoo 19 utilizando TransactionCase e Pytest.
published: true
---

# Testes no Odoo 19

Odoo 19 introduz melhorias significativas para testes automatizados.

\`\`\`python
from odoo.tests.common import TransactionCase

class TestPartner(TransactionCase):
    def test_creation(self):
        partner = self.env['res.partner'].create({'name': 'Test'})
        self.assertEqual(partner.name, 'Test')
\`\`\`

Aqui está uma lista de boas práticas:
- Usar TransactionCase
- Isolar dependências
`;

  describe('Frontmatter & Metadata Extraction', () => {
    it('should extract YAML frontmatter attributes and raw markdown content', () => {
      const { data, content } = extractFrontmatter(sampleMarkdown);

      expect(data).toBeDefined();
      expect(data.title).toBe('Desenvolvimento Orientado a Testes no Odoo 19');
      expect(data.slug).toBe('odoo-19-tdd-best-practices');
      expect(data.date).toBe('2026-08-27');
      expect(data.author).toBe('Mailson Maia Alves');
      expect(data.tags).toEqual(['Odoo', 'Python', 'TDD']);
      expect(data.lang).toBe('pt-BR');
      expect(data.published).toBe(true);
      expect(content).toContain('# Testes no Odoo 19');
    });

    it('should extract image or thumbnail metadata if provided in frontmatter', () => {
      const markdownWithImage = `---
title: Post com Capa
slug: post-com-capa
image: /assets/img/posts/capa.webp
---
Conteúdo do artigo`;
      const { data } = extractFrontmatter(markdownWithImage);
      expect(data.image).toBe('/assets/img/posts/capa.webp');
    });

    it('should handle markdown without frontmatter gracefully with default values', () => {
      const rawMarkdown = '# Simple Title\n\nJust some text without YAML.';
      const { data, content } = extractFrontmatter(rawMarkdown);

      expect(data).toBeDefined();
      expect(data.title).toBeUndefined();
      expect(content.trim()).toBe(rawMarkdown.trim());
    });
  });

  describe('Reading Time Calculation', () => {
    it('should calculate reading time accurately for given text length', () => {
      const shortText = 'Palavra '.repeat(100);
      expect(calculateReadTime(shortText, 200)).toBe(1);

      const longerText = 'Palavra '.repeat(550);
      expect(calculateReadTime(longerText, 200)).toBe(3);
    });

    it('should return minimum 1 minute for empty or very short content', () => {
      expect(calculateReadTime('', 200)).toBe(1);
      expect(calculateReadTime('Oi', 200)).toBe(1);
    });
  });

  describe('Markdown to HTML Compilation & Syntax Highlighting', () => {
    it('should convert markdown headings and paragraphs into semantic HTML', () => {
      const raw = '## Subtítulo Importante\n\nEste é um parágrafo com **negrito** e *itálico*.';
      const html = renderMarkdownToHtml(raw);

      expect(html).toContain('<h2>Subtítulo Importante</h2>');
      expect(html).toContain('<strong>negrito</strong>');
      expect(html).toContain('<em>itálico</em>');
    });

    it('should highlight code blocks with syntax highlighting classes (highlight.js)', () => {
      const raw = '```python\ndef hello():\n    return "world"\n```';
      const html = renderMarkdownToHtml(raw);

      expect(html).toContain('<pre><code');
      expect(html).toContain('hljs');
      expect(html).toContain('language-python');
    });

    it('should properly render links, blockquotes and lists', () => {
      const raw = `> Citação importante\n\n- Item 1\n- Item 2\n\n[Link](https://mailsonm.github.io)`;
      const html = renderMarkdownToHtml(raw);

      expect(html).toContain('<blockquote>');
      expect(html).toContain('<ul>');
      expect(html).toContain('<li>Item 1</li>');
      expect(html).toContain('<a href="https://mailsonm.github.io"');
    });
  });

  describe('Slug Generation', () => {
    it('should prioritize explicit frontmatter slug if present', () => {
      const slug = generatePostSlug('2026-08-27-sample-file.md', { slug: 'custom-clean-slug' });
      expect(slug).toBe('custom-clean-slug');
    });

    it('should derive slug from filename if frontmatter slug is absent', () => {
      const slug1 = generatePostSlug('2026-08-27-odoo19-tdd.md', {});
      expect(slug1).toBe('odoo19-tdd');

      const slug2 = generatePostSlug('wordpress-aviso-copia.md', {});
      expect(slug2).toBe('wordpress-aviso-copia');
    });
  });

  describe('RSS Feed Generation', () => {
    it('should generate valid RSS 2.0 XML with channel metadata and item entries', () => {
      const posts = [
        {
          title: 'Artigo Teste 1',
          slug: 'artigo-teste-1',
          date: '2026-08-27',
          description: 'Resumo do artigo 1',
          author: 'Mailson Maia Alves',
          tags: ['Python', 'Odoo']
        }
      ];

      const siteMeta = {
        title: 'Mailson Maia Alves | Blog',
        siteUrl: 'https://mailsonm.github.io',
        description: 'Artigos técnicos sobre Odoo, PHP, WordPress, Automações e TDD.'
      };

      const rssXml = generateRssFeed(posts, siteMeta);

      expect(rssXml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(rssXml).toContain('<rss version="2.0"');
      expect(rssXml).toContain('<title>Mailson Maia Alves | Blog</title>');
      expect(rssXml).toContain('<link>https://mailsonm.github.io/blog/</link>');
      expect(rssXml).toContain('<title><![CDATA[Artigo Teste 1]]></title>');
      expect(rssXml).toContain('https://mailsonm.github.io/blog/posts/artigo-teste-1.html');
      expect(rssXml).toContain('<description><![CDATA[Resumo do artigo 1]]></description>');
    });
  });

  describe('Sitemap Integration', () => {
    it('should append blog index and post urls to sitemap.xml', () => {
      const baseSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mailsonm.github.io/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;

      const posts = [
        {
          slug: 'post-1',
          date: '2026-08-27'
        }
      ];

      const updatedSitemap = updateSitemapWithBlog(posts, baseSitemap);

      expect(updatedSitemap).toContain('https://mailsonm.github.io/blog/');
      expect(updatedSitemap).toContain('https://mailsonm.github.io/blog/posts/post-1.html');
      expect(updatedSitemap.trim().endsWith('</urlset>')).toBe(true);
    });
  });

  describe('Full End-to-End Build Process', () => {
    const testDir = path.resolve(__dirname, '../fixtures/temp-blog');
    const postsDir = path.join(testDir, 'posts');
    const templatesDir = path.join(testDir, 'templates');
    const outputDir = path.join(testDir, 'output');

    beforeEach(() => {
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
      }
      fs.mkdirSync(postsDir, { recursive: true });
      fs.mkdirSync(templatesDir, { recursive: true });
      fs.mkdirSync(outputDir, { recursive: true });

      // Create test post
      fs.writeFileSync(path.join(postsDir, '2026-08-27-odoo-test.md'), sampleMarkdown, 'utf-8');

      // Create dummy templates
      fs.writeFileSync(
        path.join(templatesDir, 'blog-list.html'),
        '<html><body><h1>Blog</h1><div id="posts-list"><!-- POSTS_LIST --></div></body></html>',
        'utf-8'
      );
      fs.writeFileSync(
        path.join(templatesDir, 'blog-post.html'),
        '<html><head><title><!-- POST_TITLE --></title></head><body><h1><!-- POST_TITLE --></h1><article><!-- POST_CONTENT --></article></body></html>',
        'utf-8'
      );
    });

    it('should compile posts and generate static index and article HTML files', async () => {
      const result = await buildBlog({
        postsDir,
        templatesDir,
        outputDir,
        siteUrl: 'https://mailsonm.github.io'
      });

      expect(result.postsCount).toBe(1);
      expect(fs.existsSync(path.join(outputDir, 'index.html'))).toBe(true);
      expect(fs.existsSync(path.join(outputDir, 'posts', 'odoo-19-tdd-best-practices.html'))).toBe(true);

      const postHtml = fs.readFileSync(path.join(outputDir, 'posts', 'odoo-19-tdd-best-practices.html'), 'utf-8');
      expect(postHtml).toContain('Desenvolvimento Orientado a Testes no Odoo 19');
      expect(postHtml).toContain('TestPartner');
      expect(postHtml).toContain('TransactionCase');
      expect(postHtml).toContain('hljs language-python');
    });

    it('should render featured image and card thumbnail when post has image in frontmatter', async () => {
      const postWithImage = `---
title: Post com Imagem
slug: post-com-imagem
image: /assets/img/posts/thumb-exemplo.webp
date: '2026-09-01'
published: true
---
Conteúdo do post com imagem.`;
      fs.writeFileSync(path.join(postsDir, '2026-09-01-post-com-imagem.md'), postWithImage, 'utf-8');

      fs.writeFileSync(
        path.join(templatesDir, 'blog-post.html'),
        '<html><head><meta property="og:image" content="<!-- POST_OG_IMAGE -->"></head><body><!-- POST_FEATURED_IMAGE --><h1><!-- POST_TITLE --></h1><article><!-- POST_CONTENT --></article></body></html>',
        'utf-8'
      );

      const result = await buildBlog({
        postsDir,
        templatesDir,
        outputDir,
        siteUrl: 'https://mailsonm.github.io'
      });

      expect(result.postsCount).toBe(2);

      // Check card thumbnail in list
      const listHtml = fs.readFileSync(path.join(outputDir, 'index.html'), 'utf-8');
      expect(listHtml).toContain('blog-card-thumb');
      expect(listHtml).toContain('thumb-exemplo.webp');

      // Check featured image and og:image in post
      const postHtml = fs.readFileSync(path.join(outputDir, 'posts', 'post-com-imagem.html'), 'utf-8');
      expect(postHtml).toContain('article-featured-image');
      expect(postHtml).toContain('thumb-exemplo.webp');
      expect(postHtml).toContain('https://mailsonm.github.io/assets/img/posts/thumb-exemplo.webp');
    });

    afterAll(() => {
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
      }
    });
  });
});
