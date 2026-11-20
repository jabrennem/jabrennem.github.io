import { defineConfig } from 'vite';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';
import { parse } from 'yaml';

const postsDirectory = path.resolve('src/pages/blog/posts');
const virtualPostsId = 'virtual:blog-posts';
const resolvedVirtualPostsId = `\0${virtualPostsId}`;
const siteOrigin = 'https://jabrennem.github.io';
const defaultShareImage = '/assets/media/blog-share/blog.png';
const blogPage = {
  title: 'Blog | Joshua Brenneman',
  description: 'Build notes about AWS data platforms, engineering, and AI by Joshua Brenneman.',
};

function getMdxFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return getMdxFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.mdx') ? [entryPath] : [];
  });
}

function getPostFrontmatter(file) {
  const source = readFileSync(file, 'utf8');
  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] || '';
  const metadata = parse(frontmatter) || {};
  const visibility = metadata.visibility || 'public';

  if (!['public', 'unlisted', 'private'].includes(visibility)) {
    throw new Error(`Invalid visibility "${visibility}" in ${path.relative(process.cwd(), file)}. Use public, unlisted, or private.`);
  }

  return { ...metadata, visibility };
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function blogPageHtml(shell, route, page, type) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = escapeHtml(new URL(`/${route}/`, siteOrigin).href);
  const image = escapeHtml(new URL(page.shareImage || defaultShareImage, siteOrigin).href);

  return shell.replace(/<!-- page metadata -->[\s\S]*?<!-- \/page metadata -->/, () => [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  ].join('\n  '));
}

function blogPagesPlugin() {
  return {
    name: 'blog-share-pages',
    apply: 'build',
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const shell = bundle['index.html'].source;
        const emitPage = (route, page, type) => {
          this.emitFile({
            type: 'asset',
            fileName: `${route}/index.html`,
            source: blogPageHtml(shell, route, page, type),
          });
        };

        emitPage('blog', blogPage, 'website');
        for (const file of getMdxFiles(postsDirectory)) {
          const post = getPostFrontmatter(file);
          if (post.visibility === 'private') continue;
          emitPage(`blog/${post.slug}`, post, 'article');
        }
      },
    },
  };
}

function blogPostsPlugin() {
  let server;

  const reloadPosts = () => {
    const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualPostsId);
    if (virtualModule) server.moduleGraph.invalidateModule(virtualModule);
    server.ws.send({ type: 'full-reload' });
  };

  const isPostFile = (file) => path.relative(postsDirectory, file).split(path.sep)[0] !== '..'
    && file.endsWith('.mdx');

  return {
    name: 'blog-post-visibility',
    resolveId(id) {
      if (id === virtualPostsId) return resolvedVirtualPostsId;
      return null;
    },
    load(id) {
      if (id !== resolvedVirtualPostsId) return null;

      const files = getMdxFiles(postsDirectory).sort();
      const imports = [];
      const entries = [];

      files.forEach((file, index) => {
        if (getPostFrontmatter(file).visibility === 'private') return;
        const importName = `post${index}`;
        imports.push(`import * as ${importName} from ${JSON.stringify(file.split(path.sep).join('/'))};`);
        entries.push(importName);
      });

      return `${imports.join('\n')}
const posts = [${entries.join(', ')}].map((mod) => ({
  ...mod.frontmatter,
  visibility: mod.frontmatter.visibility || 'public',
  outline: mod.frontmatter.outline || [],
  Component: mod.default,
  Thumbnail: mod.Thumbnail || null,
}));
export const publicPosts = posts.filter((post) => post.visibility === 'public');
export const blogTitle = ${JSON.stringify(blogPage.title)};
export default posts;
`;
    },
    configureServer(viteServer) {
      server = viteServer;
      viteServer.watcher.on('add', (file) => {
        if (isPostFile(file)) reloadPosts();
      });
      viteServer.watcher.on('unlink', (file) => {
        if (isPostFile(file)) reloadPosts();
      });
    },
    handleHotUpdate({ file }) {
      if (server && isPostFile(file)) reloadPosts();
    },
  };
}

export default defineConfig({
  plugins: [
    blogPostsPlugin(),
    blogPagesPlugin(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          [rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: true }],
        ],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
});
