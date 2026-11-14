# SIVA Techno Mart: 3D site (Phase 1)

Single file: `index.html`. Three.js r128 loads from cdnjs. If WebGL or the CDN is unavailable, the page falls back to a gradient background and everything else still works.

## Sitemap (hash routes)
`#home` `#academy` `#academy-ai-foundations` `#academy-vibe-coding` `#academy-entrepreneurship` `#vibe-coding-lab` `#launchpad` `#ai-solutions` `#innovation-lab` `#about` `#contact` plus `#privacy` and `#terms` placeholders.
(Hash routes were used so the page works as a single static file. For real paths like `/academy`, move to a React Router build.)

## Editing content
Top of the script: `CONFIG`, `PRODUCTS` (status + url), `COURSES`, `JOURNEY`, `FAQ`, `LAB`.
Status must be `Available`, `Beta`, `Prototype` or `Coming Soon`. KinKeep has no URL yet.

## Form integration plan
Forms validate in the browser, have a honeypot, and never claim success without a backend.
1. Create a form endpoint (Formspree, Basin, or a serverless function) that accepts a JSON POST and emails or stores it.
2. Put its URL in `CONFIG.formEndpoint`.
3. Add server-side spam checks (Turnstile verification) at the endpoint. Keep secrets server-side.
Idea submissions go only to that endpoint, never to an AI service.

## Deployment
Any static host (GitHub Pages, Netlify, Cloudflare Pages): upload `index.html`. Optionally self-host Three.js and fonts.

## Testing checklist
- Every route loads one visible section with an h1; unknown hash shows home.
- Mobile menu opens, closes on navigation; no horizontal scroll at 390px.
- Empty forms show errors; valid submit with no endpoint says "Not sent".
- Vibe Coding demo: default $24.84; 20% tip $25.92; zero people shows a message.
- Keyboard: skip link, tabs (arrow keys), FAQ, forms.
- Reduced motion: scene renders one static frame, no tilt.
- WebGL blocked: fallback background, no console errors.
- Not yet verified: the WebGL scene itself (see below).

## Unfinished
- Form backend; business email and address.
- Founder, team, instructor details; course dates, delivery, pricing (all unconfirmed).
- KinKeep URL; confirm FamilyBuddy status (set to Beta as a placeholder).
- Privacy and Terms need legal review.
- Analytics, cookie controls: not added.
- Real logo; React/TypeScript/Tailwind port if required.

## Repository layout
- `index.html`: the 3D site (this is what GitHub Pages serves).
- `react-phase1-source/`: earlier React + TypeScript + Tailwind Phase 1 source. It has not been built or type-checked yet.

## Publish with GitHub Pages
Settings > Pages > Build and deployment > Deploy from a branch > `main` / `(root)`.
