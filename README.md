# jabrennem.github.io

Personal portfolio site for Joshua Brenneman — software engineering, audio production, and build notes.

Built with React, Vite, and React Router. Deployed to GitHub Pages via GitHub Actions.

GitHub repos show the code. These blog posts focus on narrative, (problem + solution, the reasoning behind the decisions, quick test)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Blog link previews

The build generates a page with Open Graph metadata for each published post at
`/blog/<slug>/`. Share that URL to use the post's title, description, and image.
Set `shareImage` in the post's frontmatter to an image under
`/assets/media/blog-share/`. Use a 1200 × 627 px image for LinkedIn. Posts
without a `shareImage` use the default blog image. Existing `/#/blog/…` links
still open in the browser.

## Blog recommendations

Each post ends with up to three recommended posts, ranked by the number of shared
keywords (case-insensitive, separated by `·`). Ties use the newest `date` first;
missing or invalid dates sort last within the same score. Posts with no shared
keywords can fill remaining slots. Add a quoted ISO publication `date`
(`YYYY-MM-DD`) to new posts' frontmatter. Existing dates reflect their first
publication in Git history.

Set a post's frontmatter `visibility` to `public`, `unlisted`, or `private`.
Public posts appear in the blog and recommendations. Unlisted posts are
deployed and reachable by direct URL, but do not appear in listings or
recommendations. Private posts are excluded from the app's module graph, so
their MDX content is not included in local or production site builds. GitHub
Pages cannot protect static pages with authentication.

Run the recommendation tests with `node --test src/pages/blog/recommendPosts.test.js`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the site and deploys to GitHub Pages.

Make sure your repo's Pages source is set to **GitHub Actions** (Settings → Pages → Source).

## Analytics

GoatCounter tracks pageviews at https://jabrennem.goatcounter.com/. The script in
`index.html` counts the initial visit, and `TrackPageViews` in `src/App.jsx` counts
subsequent route changes. Page paths are reported as `/`, `/blog`, and
`/blog/<slug>`; section anchors and query strings are excluded. GoatCounter's
default filtering excludes localhost visits.

## Project structure

```
src/
  components/   Shared layout, header, footer, network background
  data/         Site content as JS objects
  pages/        Route-level page components
  style.css     Global styles
public/         Static assets (images, favicon)
```

## Stack

- React 18
- React Router 6 (BrowserRouter)
- Vite 5
- GitHub Actions + GitHub Pages
