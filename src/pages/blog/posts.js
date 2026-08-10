// Auto-imports all .mdx files under posts/*/.
// Each module exports frontmatter fields (slug, title, description, etc.)
// and a default component (the rendered MDX content).

const modules = import.meta.glob('./posts/**/*.mdx', { eager: true });

const posts = Object.values(modules).map((mod) => ({
  ...mod.frontmatter,
  outline: mod.frontmatter.outline || [],
  Component: mod.default,
}));

export default posts;
