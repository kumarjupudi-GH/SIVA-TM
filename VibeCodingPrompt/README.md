# VibeCodingPrompt: how to recreate the SIVA Techno Mart website

Use this if the site is lost. Fastest route: the finished source is already in this repo (`index.html`, `logo/`,
`apps-script/`). To rebuild from prompts instead, give Claude these in order, in one conversation:

1. `01-brief-premium-company-website.md`   (original company-site brief)
2. `02-brief-ai-academy-3d-website.md`      (the AI Academy and 3D brief that drove the final site)
3. `03-follow-up-prompts.md`                (every change request, verbatim, in order)
4. `04-final-content-and-design-decisions.md` (exact palette, tagline, logo, founder text, config)

Tip: ask Claude to build the single-file site from file 02, then apply file 04 directly instead of replaying
all 30 follow-ups; use file 03 as the history of intent.
