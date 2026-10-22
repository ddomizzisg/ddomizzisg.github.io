# Dante D. Sánchez-Gallegos — personal website

Built with [Astro](https://astro.build). Deployed to GitHub Pages by `.github/workflows/deploy.yml`.

```
npm install
npm run dev      # local server at http://localhost:4321
npm run build    # static site in dist/
```

- Publications: edit `public/publications.bib` (standard BibTeX). `@article` → Journal papers, `@inproceedings`/`@conference` → Conference papers, anything else → Other. Each entry needs `title` and `year`; `doi` or `url` adds a link. The file is also served at `/publications.bib`.
- Nav, links, research topics: `src/data/site.ts`
- Pages: `src/pages/` · Shared layout/components: `src/layouts/`, `src/components/`
- Colours and typography: `src/styles/global.css` (CSS variables at the top)
- CV and favicon: `public/`
