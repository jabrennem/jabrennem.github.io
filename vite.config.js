import { defineConfig } from 'vite';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';

const postsDirectory = path.resolve('src/pages/blog/posts');
const virtualPostsId = 'virtual:blog-posts';
const resolvedVirtualPostsId = `\0${virtualPostsId}`;

function getMdxFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return getMdxFiles(entryPath);
    return entry.isFile() && entry.name.endsWith('.mdx') ? [entryPath] : [];
  });
}

function getVisibility(file) {
  const source = readFileSync(file, 'utf8');
  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] || '';
  const rawVisibility = frontmatter.match(/^visibility\s*:\s*(.*?)\s*(?:#.*)?$/m)?.[1]
    ?.trim()
    .replace(/^(['"])(.*)\1$/, '$2');
  const visibility = rawVisibility || 'public';

  if (!['public', 'unlisted', 'private'].includes(visibility)) {
    throw new Error(`Invalid visibility "${visibility}" in ${path.relative(process.cwd(), file)}. Use public, unlisted, or private.`);
  }

  return visibility;
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
        if (getVisibility(file) === 'private') return;
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
