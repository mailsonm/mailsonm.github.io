import { describe, it, expect } from 'vitest';
import { generateRssFeed, updateSitemapWithBlog } from '../../scripts/build-blog.js';

describe('Blog RSS & Sitemap Unit Suite (TDD)', () => {
  it('should generate valid RSS 2.0 with multiple categories and correctly formatted dates', () => {
    const posts = [
      {
        title: 'Post com Caracteres Especiais & <Tags>',
        slug: 'post-especial',
        date: '2026-08-27',
        author: 'Mailson Maia Alves',
        description: 'Um resumo com <strong>HTML</strong> e caracteres & símbolos.',
        tags: ['Odoo 19', 'Python & AI', 'TDD']
      },
      {
        title: 'Segundo Post de Teste',
        slug: 'segundo-post',
        date: '2026-08-20',
        author: 'Mailson Maia Alves',
        description: 'Segundo resumo.',
        tags: ['WordPress']
      }
    ];

    const siteMeta = {
      title: 'Mailson Maia Alves | Blog',
      siteUrl: 'https://mailsonm.github.io',
      description: 'Consultoria e Engenharia de Software'
    };

    const rss = generateRssFeed(posts, siteMeta);

    expect(rss).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
    expect(rss).toContain('<atom:link href="https://mailsonm.github.io/feed.xml" rel="self" type="application/rss+xml" />');
    expect(rss).toContain('<title><![CDATA[Post com Caracteres Especiais & <Tags>]]></title>');
    expect(rss).toContain('<category><![CDATA[Odoo 19]]></category>');
    expect(rss).toContain('<category><![CDATA[Python & AI]]></category>');
    expect(rss).toContain('<guid isPermaLink="true">https://mailsonm.github.io/blog/posts/post-especial.html</guid>');
    expect(rss).toContain('<guid isPermaLink="true">https://mailsonm.github.io/blog/posts/segundo-post.html</guid>');
  });

  it('should not duplicate blog entries in sitemap if already present', () => {
    const existingSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mailsonm.github.io/</loc>
  </url>
  <url>
    <loc>https://mailsonm.github.io/blog/</loc>
  </url>
  <url>
    <loc>https://mailsonm.github.io/blog/posts/post-1.html</loc>
  </url>
</urlset>`;

    const posts = [{ slug: 'post-1', date: '2026-08-27' }, { slug: 'post-2', date: '2026-08-28' }];
    const updated = updateSitemapWithBlog(posts, existingSitemap);

    const matchesBlog = updated.match(/<loc>https:\/\/mailsonm\.github\.io\/blog\/<\/loc>/g) || [];
    expect(matchesBlog.length).toBe(1);

    const matchesPost1 = updated.match(/<loc>https:\/\/mailsonm\.github\.io\/blog\/posts\/post-1\.html<\/loc>/g) || [];
    expect(matchesPost1.length).toBe(1);

    const matchesPost2 = updated.match(/<loc>https:\/\/mailsonm\.github\.io\/blog\/posts\/post-2\.html<\/loc>/g) || [];
    expect(matchesPost2.length).toBe(1);
  });
});
