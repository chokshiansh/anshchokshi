# anshchokshi.com

my corner of the internet. part portfolio, part love letter to san francisco coffee shops.

## what's inside

- **home** -- a one-pager about me that refuses to scroll (it has strong opinions)
- **coffee chat** -- an interactive D3 map of ~90 SF coffee shops where you can book a chat with me. yes, I mapped them all. no, I don't have a problem.
- a booking flow that emails me directly so I can't ghost you
- a 2-second espresso GIF that plays every time you visit the coffee page, because ambiance matters

## the machine-readable layer

this site is a client-rendered SPA, so anything that doesn't run javascript (most
crawlers, LLM fetchers, people-search enrichment tools) used to see an empty
`<div id="root">`. there is now a static plain-text mirror alongside it:

| url | what it is |
| --- | --- |
| `/llms.txt` | index of everything, [llmstxt.org](https://llmstxt.org) convention |
| `/llms-full.txt` | the entire site — profile + every essay — in one request |
| `/ansh-chokshi.md` | the full profile / dossier |
| `/write/<slug>.md` | one file per essay |
| `/robots.txt` | explicitly allows search + AI crawlers, points at the sitemap |
| `/sitemap.xml` | every real url, html and markdown alike |

all of it is **generated**, never hand-written:

```bash
npm run generate   # runs automatically as part of npm run build
```

`scripts/generate-agent-md.ts` reads `src/profile.ts` (bio, roles, links) and
`src/constants.ts` (essays) and writes the files above. it also injects the
schema.org JSON-LD and a `<noscript>` content mirror into `index.html`, between
the `AGENT:JSONLD` and `AGENT:CONTENT` marker comments. don't hand-edit those
regions or the generated files — edit the source and re-run.

`src/profile.ts` is the single source of truth for bio facts and is imported by
`Home.tsx`, so the site and the markdown can't drift apart. the `<noscript>`
block is invisible to anyone with javascript on; the rendered site is unaffected.

## tech stack

react + typescript + vite + tailwind v4. the whole thing is held together by d3.js, react portals, and an unreasonable amount of `useMemo`.

## run locally

```bash
npm install
npm run dev
```

needs a `.env.local` with:
```
VITE_FORMSPREE_FORM_ID=your_form_id
```

## deploy

hosted on vercel, pointed at `anshchokshi.com` via godaddy. pushes to `main` trigger a redeploy because we live in the future.

## disclaimer

the coffee shop hours were fetched by an AI. if you show up at 7am and they're closed, that's between you and the machine.
