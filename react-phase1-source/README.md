# SIVA Techno Mart website (Phase 1)

React + TypeScript + Tailwind CSS + Vite. Content-first: no backend, no paid APIs, no secrets.

## Run it

```bash
npm install
npm run dev       # local preview
npm run build     # production build in dist/
```

## Editing content (no code changes)

All text lives in `src/content/`. You can edit these files directly on GitHub (pencil icon) and commit.

| File | What it controls |
|---|---|
| `site.json` | Tagline, hero text, "Why SIVA" themes, journey steps, contact-form interest areas |
| `products.json` | FamilyBuddy AI / KinKeep cards. Set `status` to `Available`, `Beta`, `Prototype` or `Coming Soon`, and set `url` to the live app (leave `""` until live) |
| `pathways.json` | The 10 Academy pathways |
| `divisions.json` | Financial, Wealth, Launchpad and Innovation Lab lists |
| `team.json` | Founder and team. Empty until you supply real details |

All products currently default to **Coming Soon** with no link, because their real status and URLs have not been supplied. Update them as each is confirmed.

## Configuration (`.env.local`, see `.env.example`)

- `VITE_FORM_ENDPOINT`: form service URL that receives contact submissions. Until set, the form tells visitors it is not connected.
- `VITE_TURNSTILE_SITE_KEY`: optional Cloudflare Turnstile **site** key. Verify tokens on the form service side.
- `VITE_PLAUSIBLE_DOMAIN`: optional privacy-friendly analytics, loaded only after consent.
- `VITE_SITE_URL`: canonical URL.

Only public values belong in these variables. Never place API keys or secrets in this project.

## Integrating existing apps

FamilyBuddy AI and KinKeep are not modified or rebuilt here. Each product card links to its independently hosted app through the `url` field in `products.json`.

## Hosting

Any static host works. `public/_redirects` handles client-side routing on Netlify and Cloudflare Pages; other hosts need an equivalent "serve index.html for all routes" rule.

## Known limits of Phase 1

- Pages are client-rendered. For stronger SEO later, add pre-rendering (for example `vite-plugin-ssr` or static generation).
- Privacy Policy and Terms are placeholders pending legal review.
- Fonts load from Google Fonts; self-host them if you want zero third-party requests.
- Founder, team, logo and contact details are intentionally blank.
