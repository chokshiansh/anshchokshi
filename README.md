# anshchokshi.com

my corner of the internet. part portfolio, part love letter to san francisco coffee shops.

## what's inside

- **home** -- a one-pager about me that refuses to scroll (it has strong opinions)
- **coffee chat** -- an interactive D3 map of ~90 SF coffee shops where you can book a chat with me. yes, I mapped them all. no, I don't have a problem.
- a booking flow that emails me directly so I can't ghost you
- a 2-second espresso GIF that plays every time you visit the coffee page, because ambiance matters

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
