# Final content and design decisions (the exact values the site ended up with)

## Identity
- Name: SIVA Techno Mart. SIVA = Smart Intelligent Virtual Agents (plural).
- Tagline (amber/gold-orange #F2A33A): Raising Your Skills to the Next Level with Smart Intelligent Virtual Agents
- Positioning: AI Academy & Entrepreneurship Hub. Brand line: Learn. Innovate. Build. Empower.
- Logo: Option B, "S-Circuit" (files in `logo/`; header uses the icon plus the name and tagline).
  Icon SVG, viewBox 0 0 120 124: path `M86 30H52a16 16 0 0 0 0 32H68a16 16 0 0 1 0 32H34` stroke #43D9EE width 8, round caps;
  circle (86,30) r8 #D9B86C; circle (34,94) r8 #1478D4; two eye dots (52,62) and (68,62) r3.5 #08162E.

## Palette and type
- navy #08162E, blue #1478D4, cyan #43D9EE, gold #D9B86C, cloud #F5F8FC, muted #A8B8CF,
  green #3DDC97, yellow #FFD84D, amber #F2A33A (tagline).
- Fonts: Sora (headings), Manrope (body), JetBrains Mono (labels). Font sizes were reduced on request (prompt 12).

## Structure
- Single-file HTML + Three.js r128 (cdnjs), hash routes: #home, #academy, #academy-ai-foundations, #academy-vibe-coding,
  #academy-entrepreneurship, #vibe-coding-lab, #launchpad, #ai-solutions, #innovation-lab, #about, #contact, #privacy, #terms.
- WebGL fallback (`html.no3d`) and `prefers-reduced-motion` support.
- `CONFIG.formEndpoint` = the Apps Script /exec URL. `CONFIG.showPlaceholders` = false hides placeholder notes.
- Forms POST `text/plain;charset=utf-8` JSON (avoids a CORS preflight) and expect `{"ok":true}`.

## Founder text (About and Home)
Heading: Journey – From Passion to Purpose  (en dash U+2013)

My journey began over 25 years ago with a passion for technology, growing into a career in enterprise data architecture, cloud innovation, and digital transformation. Along the way, I discovered that technology's true value lies in making people's lives better.

This belief inspired me to found SIVA Techno Mart, with a vision to simplify everyday life through AI, empower families, transform learning, and turn ideas into opportunities.

As a lifelong learner, educator, and mentor, I believe knowledge grows when shared and innovation thrives when everyone has the opportunity to learn.

My mission is simple: Transform experience into innovation, innovation into opportunity, and opportunity into a better future for everyone.

## Deployment
- Source form of the page (no doctype) is used for the claude.ai artifact; `build_deploy.py SOURCE OUTPUT` adds the full
  HTML skeleton (doctype, charset utf-8, viewport) for hosting. The repo `index.html` is the built, hosted file.
- `_headers` sets no-cache on index.html (Cloudflare). Hosted at https://siva-tm.technomarketplace.workers.dev
- Inquiries: `apps-script/Code.gs` deployed as a Google Apps Script web app (Execute as Me, access Anyone),
  writing to the SIVA-TM-Inquiries Google Sheet (Drive folder SIVA-TM / Inquiries).
- `worker/` holds an unused alternative (Cloudflare Worker that appends to a CSV on the `inquiries` branch).

## Open items
Founder name and photo, KinKeep link, FamilyBuddy status (currently "Beta"), real Privacy and Terms text.
