/**
 * Static Blog Generator (SSG) for mailsonm.github.io
 * Generates static HTML, RSS 2.0 feed and updates sitemap from Markdown posts.
 * Follows TDD-First & Akita Way principles.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// Setup marked instance with syntax highlighting
const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

/**
 * Extracts frontmatter and markdown body from raw string.
 * @param {string} markdownText 
 * @returns {{ data: Record<string, any>, content: string }}
 */
export function extractFrontmatter(markdownText) {
  if (!markdownText || typeof markdownText !== 'string') {
    return { data: {}, content: '' };
  }
  const parsed = matter(markdownText);
  return {
    data: parsed.data || {},
    content: parsed.content || ''
  };
}

/**
 * Calculates estimated reading time based on word count.
 * @param {string} content 
 * @param {number} [wpm=200] Words per minute
 * @returns {number} Estimated minutes (minimum 1)
 */
export function calculateReadTime(content, wpm = 200) {
  if (!content || typeof content !== 'string') return 1;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  if (words <= 0) return 1;
  return Math.max(1, Math.ceil(words / wpm));
}

/**
 * Compiles markdown string to semantic HTML with syntax highlighting.
 * @param {string} markdownText 
 * @returns {string} Compiled HTML
 */
export function renderMarkdownToHtml(markdownText) {
  if (!markdownText || typeof markdownText !== 'string') return '';
  return marked.parse(markdownText);
}

/**
 * Derives a clean URL slug from filename and frontmatter metadata.
 * @param {string} filename 
 * @param {Record<string, any>} [frontmatter={}] 
 * @returns {string}
 */
export function generatePostSlug(filename, frontmatter = {}) {
  if (frontmatter && frontmatter.slug && typeof frontmatter.slug === 'string' && frontmatter.slug.trim().length > 0) {
    return frontmatter.slug.trim();
  }
  const basename = path.basename(filename, path.extname(filename));
  // Remove leading date patterns like YYYY-MM-DD- or YYYY-MM-
  const withoutDate = basename.replace(/^\d{4}-\d{2}-\d{2}-?/, '').replace(/^\d{4}-\d{2}-?/, '');
  return withoutDate.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || basename;
}

/**
 * Generates an RSS 2.0 XML feed.
 * @param {Array<Record<string, any>>} posts 
 * @param {{ title: string, siteUrl: string, description: string }} siteMeta 
 * @returns {string} RSS 2.0 XML
 */
export function generateRssFeed(posts, siteMeta) {
  const siteUrl = (siteMeta.siteUrl || 'https://mailsonm.github.io').replace(/\/+$/, '');
  const now = new Date().toUTCString();

  const itemsXml = posts.map(post => {
    const postUrl = `${siteUrl}/blog/posts/${post.slug}.html`;
    const pubDate = post.date ? new Date(post.date).toUTCString() : now;
    const tagsXml = Array.isArray(post.tags) 
      ? post.tags.map(t => `<category><![CDATA[${t}]]></category>`).join('\n      ')
      : '';

    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.author || 'Mailson Maia Alves'}]]></author>
      <description><![CDATA[${post.description || ''}]]></description>
      ${tagsXml}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteMeta.title || 'Mailson Maia Alves | Blog'}</title>
    <link>${siteUrl}/blog/</link>
    <description>${siteMeta.description || 'Artigos técnicos de TI e Desenvolvimento'}</description>
    <language>pt-BR</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`.trim();
}

/**
 * Appends blog index and post links to sitemap.xml.
 * @param {Array<Record<string, any>>} posts 
 * @param {string} existingSitemapXml 
 * @returns {string} Updated sitemap XML
 */
export function updateSitemapWithBlog(posts, existingSitemapXml) {
  const siteUrl = 'https://mailsonm.github.io';
  const blogUrl = `${siteUrl}/blog/`;
  
  let sitemap = existingSitemapXml || `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>`;

  // Ensure blog root URL is present
  if (!sitemap.includes(`<loc>${blogUrl}</loc>`)) {
    const blogEntry = `  <url>\n    <loc>${blogUrl}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    sitemap = sitemap.replace('</urlset>', `${blogEntry}</urlset>`);
  }

  // Add each post
  posts.forEach(post => {
    const postUrl = `${siteUrl}/blog/posts/${post.slug}.html`;
    if (!sitemap.includes(`<loc>${postUrl}</loc>`)) {
      const lastmod = post.date || new Date().toISOString().split('T')[0];
      const postEntry = `  <url>\n    <loc>${postUrl}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      sitemap = sitemap.replace('</urlset>', `${postEntry}</urlset>`);
    }
  });

  return sitemap.trim();
}

/**
 * Formats a date string to Portuguese readable format.
 * @param {string} dateString 
 * @returns {string}
 */
export function formatDateReadable(dateString) {
  if (!dateString) return '';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parts[2];
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      return `${day} de ${months[monthIndex] || ''} de ${year}`;
    }
  } catch (e) {
    // fallback
  }
  return dateString;
}

/**
 * Builds the entire static blog from posts directory into output directory.
 * @param {Object} options 
 * @returns {Promise<{ postsCount: number, posts: Array<any> }>}
 */
export async function buildBlog(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const postsDir = options.postsDir || path.join(rootDir, 'posts');
  const templatesDir = options.templatesDir || path.join(rootDir, 'templates');
  const outputDir = options.outputDir || path.join(rootDir, 'blog');
  const siteUrl = (options.siteUrl || 'https://mailsonm.github.io').replace(/\/+$/, '');

  // Ensure output directories exist
  const postsOutputDir = path.join(outputDir, 'posts');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(postsOutputDir, { recursive: true });

  // Read post files
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const posts = [];

  for (const filename of filenames) {
    const filePath = path.join(postsDir, filename);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = extractFrontmatter(rawContent);

    // Skip drafts
    if (data.published === false) {
      continue;
    }

    const slug = generatePostSlug(filename, data);
    const readTime = calculateReadTime(content);
    const htmlContent = renderMarkdownToHtml(content);

    const postObj = {
      title: data.title || 'Artigo sem título',
      slug,
      date: data.date ? String(data.date) : new Date().toISOString().split('T')[0],
      formattedDate: formatDateReadable(data.date ? String(data.date) : ''),
      author: data.author || 'Mailson Maia Alves',
      tags: Array.isArray(data.tags) ? data.tags : [],
      lang: data.lang || 'pt-BR',
      description: data.description || '',
      readTime,
      htmlContent,
      url: `${siteUrl}/blog/posts/${slug}.html`,
      relativeUrl: `posts/${slug}.html`
    };

    posts.push(postObj);
  }

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Load templates
  const listTemplatePath = path.join(templatesDir, 'blog-list.html');
  const postTemplatePath = path.join(templatesDir, 'blog-post.html');

  const listTemplate = fs.existsSync(listTemplatePath)
    ? fs.readFileSync(listTemplatePath, 'utf-8')
    : '<html><body><h1>Blog</h1><!-- POSTS_LIST --></body></html>';

  const postTemplate = fs.existsSync(postTemplatePath)
    ? fs.readFileSync(postTemplatePath, 'utf-8')
    : '<html><body><h1><!-- POST_TITLE --></h1><!-- POST_CONTENT --></body></html>';

  // 1. Generate individual post HTML files
  for (const post of posts) {
    const tagsHtml = post.tags
      .map(t => `<span class="badge-tag" data-tag="${t.toLowerCase()}">${t}</span>`)
      .join(' ');

    let postHtml = postTemplate
      .replace(/<!-- POST_TITLE -->/g, post.title)
      .replace(/<!-- POST_DATE -->/g, post.date)
      .replace(/<!-- POST_DATE_FORMATTED -->/g, post.formattedDate)
      .replace(/<!-- POST_READ_TIME -->/g, `${post.readTime} min de leitura`)
      .replace(/<!-- POST_TAGS -->/g, tagsHtml)
      .replace(/<!-- POST_AUTHOR -->/g, post.author)
      .replace(/<!-- POST_DESCRIPTION -->/g, post.description)
      .replace(/<!-- POST_SLUG -->/g, post.slug)
      .replace(/<!-- POST_CONTENT -->/g, post.htmlContent)
      .replace(/<!-- POST_LANG -->/g, post.lang)
      .replace(/<!-- SITE_URL -->/g, siteUrl)
      .replace(/<!-- POST_URL -->/g, post.url);

    fs.writeFileSync(path.join(postsOutputDir, `${post.slug}.html`), postHtml, 'utf-8');
  }

  // 2. Generate Blog List HTML
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));
  const tagsFilterHtml = `
    <button class="filter-btn active" data-filter="all">Todos (${posts.length})</button>
    ${allTags.map(tag => {
      const count = posts.filter(p => p.tags.includes(tag)).length;
      return `<button class="filter-btn" data-filter="${tag.toLowerCase()}">${tag} (${count})</button>`;
    }).join('\n    ')}
  `.trim();

  const postsCardsHtml = posts.length === 0
    ? `<div class="empty-blog-state"><p>Nenhum artigo publicado no momento. Em breve novos conteúdos!</p></div>`
    : posts.map(post => `
      <article class="blog-card" data-tags="${post.tags.map(t => t.toLowerCase()).join(',')}">
        <div class="blog-card-meta">
          <time datetime="${post.date}">${post.formattedDate}</time>
          <span class="meta-separator">•</span>
          <span class="read-time">${post.readTime} min de leitura</span>
        </div>
        <h2 class="blog-card-title">
          <a href="${post.relativeUrl}">${post.title}</a>
        </h2>
        <p class="blog-card-desc">${post.description}</p>
        <div class="blog-card-footer">
          <div class="blog-card-tags">
            ${post.tags.map(t => `<span class="badge-tag">${t}</span>`).join('')}
          </div>
          <a href="${post.relativeUrl}" class="btn-read-more">Ler artigo <span class="arrow">→</span></a>
        </div>
      </article>
    `.trim()).join('\n');

  let listHtml = listTemplate
    .replace(/<!-- POSTS_LIST -->/g, postsCardsHtml)
    .replace(/<!-- TAGS_FILTER -->/g, tagsFilterHtml)
    .replace(/<!-- TOTAL_POSTS -->/g, String(posts.length))
    .replace(/<!-- SITE_URL -->/g, siteUrl);

  fs.writeFileSync(path.join(outputDir, 'index.html'), listHtml, 'utf-8');

  // 3. Generate RSS Feed
  const rssXml = generateRssFeed(posts, {
    title: 'Mailson Maia Alves | Blog Técnico',
    siteUrl,
    description: 'Artigos técnicos sobre Odoo 19, PHP 8.3, WordPress, Automações n8n e TDD-First.'
  });

  const rssPath = path.join(rootDir, 'feed.xml');
  fs.writeFileSync(rssPath, rssXml, 'utf-8');

  // 4. Update Sitemap
  const sitemapPath = path.join(rootDir, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const currentSitemap = fs.readFileSync(sitemapPath, 'utf-8');
    const updated = updateSitemapWithBlog(posts, currentSitemap);
    fs.writeFileSync(sitemapPath, updated, 'utf-8');
  }

  return {
    postsCount: posts.length,
    posts
  };
}

// CLI Execution if run directly: node scripts/build-blog.js
const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

if (isDirectExecution || process.argv.includes('--execute')) {
  console.log('🚀 Compiling Static Blog (Node SSG)...');
  buildBlog().then(result => {
    console.log(`✅ Blog compilation finished successfully! Processed ${result.postsCount} posts.`);
  }).catch(err => {
    console.error('❌ Error compiling blog:', err);
    process.exit(1);
  });
}
