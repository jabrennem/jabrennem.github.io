# jabrennem.github.io

Personal portfolio site for Joshua Brenneman — software engineering, audio production, and build notes.

Built with React, Vite, and React Router. Deployed to GitHub Pages via GitHub Actions.

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

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the site and deploys to GitHub Pages.

Make sure your repo's Pages source is set to **GitHub Actions** (Settings → Pages → Source).

## Project structure

```
src/
  components/   Shared layout, header, footer, network background
  data/         Site content as JS objects
  pages/        Route-level page components
  style.css     Global styles
public/         Static assets (images, resume, favicon)
```

## Stack

- React 18
- React Router 6 (HashRouter)
- Vite 5
- GitHub Actions + GitHub Pages
