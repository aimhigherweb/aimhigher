# AimHigher Web Design

Website for AimHigher Web Design

[![Netlify Status](https://api.netlify.com/api/v1/badges/bd11b5cc-485f-41ff-9544-ee6a146d0516/deploy-status)](https://app.netlify.com/sites/aimhigher/deploys)

## Development

Built with [Astro](https://astro.build). Needs Node 22.23+ (see `config/.nvmrc`). Tooling config (Astro, ESLint, Prettier, pa11y) lives in `config/`.

```sh
git submodule update --init   # lib/ = aimhigherweb/aimhigher-components
npm install
npm start                     # astro dev with secrets from 1Password (`op` CLI)
```

| Script | What it does |
| --- | --- |
| `npm start` | Dev server with secrets from 1Password (`op run --env-file=config/.env.1password`) |
| `npm run dev` | Dev server without secrets (CMS content is empty) |
| `npm run build` | Static build to `dist/` (used by Netlify, which supplies its own env vars) |
| `npm run build:local` | Static build with secrets from 1Password |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint with fixes ([house](https://github.com/amykapernick/house) rules) |
| `npm run lint:ci` | ESLint without fixes |
| `npm run test:a11y` | pa11y against `$URL` |

VS Code has a task for each script (`.vscode/tasks.json`), and `start` runs when the folder opens.

### Content

- `_data/content/**/*.md` – page copy, loaded as the `content` collection (`src/content.config.js`)
- `_data/menus/*.json` – header, footer and social menus
- Strapi (GraphQL) – blog posts, FAQs, case studies and partners, via `src/utils/cms.js`

### Environment

| Variable | Used for |
| --- | --- |
| `STRAPI_API_URL`, `STRAPI_TOKEN` | Strapi GraphQL API (required for production builds) |
| `FATHOM_SITE_ID` | Fathom analytics |
| `GTM_ID` | Google Tag Manager container ID (production only) |

Locally these come from 1Password: `config/.env.1password` holds `op://` references and `op run` resolves them. Netlify builds use the site's own environment variables.
