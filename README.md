# SIVA Techno Mart website

AI Academy and Entrepreneurship Hub. Static site: one HTML page with hash routes, Three.js r128 (cdnjs) for the 3D
background, plus small standalone apps. If WebGL or the CDN is unavailable the page falls back to a gradient background.

## Files
| Path | What it is |
| --- | --- |
| `index.html` | The hosted page (built from `source/index.src.html`). Cloudflare and GitHub Pages serve this. |
| `source/index.src.html` | The editable source. It has no doctype or charset because the claude.ai artifact viewer adds them. **Edit this file.** |
| `build_deploy.py` | `python3 build_deploy.py source/index.src.html index.html` adds the full HTML skeleton (doctype, charset utf-8, viewport). |
| `_headers` | Cloudflare: `index.html` is never cached, so updates appear on refresh. |
| `try/<name>/index.html` | Six standalone apps shown under Vibe Code Marketplace > Try for Free. |
| `apps-script/Code.gs` | Google Apps Script that saves form submissions to the SIVA-TM-Inquiries Google Sheet. |
| `logo/` | S-Circuit logo SVGs. |
| `worker/` | Unused alternative: Cloudflare Worker that appends inquiries to a CSV on the `inquiries` branch. |
| `react-phase1-source/` | Early React/Vite planning source. **Not** the live site. |
| `VibeCodingPrompt/` | The briefs, every prompt, the final decisions and a snapshot of the implemented code, for recreating the site. |

## Sitemap (hash routes)
`#home` `#academy` `#academy-ai-foundations` `#academy-vibe-coding` `#academy-entrepreneurship` `#vibe-coding-lab` `#launchpad`
`#ai-solutions` `#innovation-lab` `#vibe-marketplace` `#vibe-book` (`#vibe-book-1` to `#vibe-book-17`) `#vibe-try-free` `#about` `#contact` `#privacy` `#terms`.
Menu order: AI Academy, Vibe Coding Lab, Launchpad, AI Solutions, Innovation Lab, Vibe Code Marketplace, About, Contact.

## Editing content (top of the page script in `source/index.src.html`)
- `CONFIG.formEndpoint`: the Apps Script `/exec` URL. `CONFIG.showPlaceholders`: `false` hides placeholder notes, `true` shows them.
- `PRODUCTS`, `COURSES`, `JOURNEY`, `FAQ`, `LAB`: page content. Product status is `Available`, `Beta`, `Prototype` or `Coming Soon`.
- `BOOK`: the 17 sections of the Vibecode Beginner's Book (HTML per section). `TRY`: the six app cards (`url` turns a card on).

## Publishing a change
1. Edit `source/index.src.html`.
2. `python3 build_deploy.py source/index.src.html index.html`
3. Commit and push to `main`. Cloudflare rebuilds; hard refresh (Ctrl+Shift+R) to see it.

## Inquiry forms
Forms POST `text/plain;charset=utf-8` JSON to `CONFIG.formEndpoint` and expect `{"ok":true}`. `apps-script/Code.gs` validates,
honors a honeypot field, defuses spreadsheet formulas and appends a row to the sheet. Deploy it as a web app (Execute as Me, access Anyone).

## Still open
Founder name and photo, team and instructor details, course dates and pricing, business email and address, KinKeep URL,
FamilyBuddy status (set to Beta as a placeholder), Privacy and Terms legal text.
