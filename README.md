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

## Saving inquiries to Google Sheets
Submissions from the Contact, Training-inquiry and Idea forms are saved as rows in the Google Sheet **SIVA-TM-Inquiries** (Drive folder `SIVA-TM / Inquiries`) by the Apps Script in `apps-script/Code.gs`.

One-time setup:
1. Open the **SIVA-TM-Inquiries** spreadsheet > **Extensions > Apps Script**.
2. Delete the sample code, paste in all of `apps-script/Code.gs`, and save. (The sheet ID at the top is already filled in.)
3. Optional check: choose the function `testAppend` and click **Run**, then approve the permissions. A test row appears in the sheet; delete it afterwards.
4. **Deploy > New deployment > type: Web app**. Set *Execute as* **Me** and *Who has access* **Anyone**. Click Deploy and copy the **Web app URL** (it ends in `/exec`).
5. In `index.html`, paste that URL into `CONFIG.formEndpoint` near the top of the script, commit, and let Pages redeploy.
6. Submit a test inquiry on the live site and confirm a new row appears.

If you later change `Code.gs`, use **Deploy > Manage deployments > Edit > New version** so the same URL keeps working.

Columns: Received, Type (`inquiry` or `idea`), Name, Email, Interest, Idea title, Assistance requested, Message, Source page.

Safeguards: length limits, required-field and email checks, a hidden spam field, formula-injection protection, and a script lock so simultaneous submissions don't overwrite each other. The web-app URL is public by design, so anyone who finds it could submit rows; they can only add rows to this one sheet. For stronger spam protection later, add Cloudflare Turnstile and verify it in the script.
