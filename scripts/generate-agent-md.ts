/**
 * Generates the machine-readable layer of anshchokshi.com.
 *
 * The site is a client-rendered SPA, so anything that does not execute JavaScript
 * (most crawlers, LLM fetchers, people-search enrichment tools) sees an empty
 * <div id="root">. This script emits a parallel, static, plain-text copy of the
 * same content so those clients get the real thing.
 *
 * Outputs:
 *   public/llms.txt            index of everything, llmstxt.org convention
 *   public/llms-full.txt       every word of the site in one file
 *   public/ansh-chokshi.md     the full profile / dossier
 *   public/write/<slug>.md     one file per essay
 *   public/sitemap.xml         every real URL, HTML and markdown alike
 *   index.html                 JSON-LD + <noscript> regions, injected in place
 *
 * Run: npm run generate  (also runs automatically before every build)
 */

import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { INITIAL_ESSAYS } from '../src/constants';
import { PROFILE, CHAPTERS, CHAPTER_LINKS, PUBLIC_ROUTES, SITE_URL } from '../src/profile';
import type { Essay } from '../src/types';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

/* ------------------------------------------------------------------ helpers */

function write(relPath: string, contents: string): void {
  const full = join(PUBLIC, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, contents.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n', 'utf8');
  console.log(`  public/${relPath}`);
}

/** "Aug 2, 2026" -> "2026-08-02". Falls back to today if unparseable. */
function isoDate(human: string): string {
  const parsed = new Date(human);
  const d = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  return d.toISOString().slice(0, 10);
}

/** Titles may contain a hard newline for on-site line breaks; flatten for markdown. */
function flatTitle(essay: Essay): string {
  return essay.title.replace(/\s*\n\s*/g, ' ').trim();
}

/**
 * The essay source uses a small ad-hoc format. Convert it to real markdown:
 *   - "\n----\n" is a section break, but bare "----" under a text line would be
 *     parsed as a setext H2. Emit a properly padded thematic break instead.
 *   - A line that is entirely **bolded** is acting as a section heading.
 *   - Emphasis markers (***, **, *) are already markdown-compatible.
 */
function toMarkdown(content: string): string {
  return content
    .split(/\n----\n/)
    .map((block) =>
      block
        .trim()
        .split('\n')
        .map((line) => {
          const heading = line.trim().match(/^\*\*([^*]+)\*\*$/);
          return heading ? `## ${heading[1].trim()}` : line;
        })
        .join('\n')
    )
    .join('\n\n---\n\n');
}

function essayUrl(essay: Essay): string {
  return `${SITE_URL}/write/${essay.slug}`;
}

/* -------------------------------------------------------------- profile body */

const CONTACT_LINES = [
  `- Email: ${PROFILE.email}`,
  `- X / Twitter: ${PROFILE.socials.x}`,
  `- LinkedIn: ${PROFILE.socials.linkedin}`,
  `- GitHub: ${PROFILE.socials.github}`,
  `- Website: ${SITE_URL}`,
  `- Book a coffee chat in San Francisco: ${SITE_URL}/coffee`,
].join('\n');

const CHAPTER_LINES = CHAPTERS.map((c) => {
  const link = CHAPTER_LINKS[c.org];
  const name = link ? `[${c.org}](${link})` : c.org;
  return `- **${name}** — ${c.role}${c.detail ? `. ${c.detail}` : ''}`;
}).join('\n');

const ESSAY_INDEX = INITIAL_ESSAYS.map(
  (e) => `- [${flatTitle(e)}](${essayUrl(e)}) — ${e.date}, ${e.readTime}. Markdown: ${SITE_URL}/write/${e.slug}.md`
).join('\n');

const PROFILE_MD = `# ${PROFILE.name}

> ${PROFILE.headline} Based in ${PROFILE.location}.

This is the plain-text edition of ${SITE_URL}, published for crawlers, language
models and agents. It is generated from the same source as the website, so it is
never out of date.

## Now

${PROFILE.company.role} of [${PROFILE.company.name}](${PROFILE.company.url}).

${PROFILE.company.problem}

${PROFILE.company.what} Mission: ${PROFILE.company.mission}

In his own words: "${PROFILE.today}"

## Chapters

${CHAPTER_LINES}

## Writing

${PROFILE.name} writes essays on building companies, taking concentrated bets, moving
between cities, and what work costs you.

${ESSAY_INDEX}

## Interests

${PROFILE.interests}

## Contact

${CONTACT_LINES}

## Topics

${PROFILE.knowsAbout.map((k) => `- ${k}`).join('\n')}
`;

/* ------------------------------------------------------------------- outputs */

console.log('Generating agent-readable files…');

write('ansh-chokshi.md', PROFILE_MD);

for (const essay of INITIAL_ESSAYS) {
  write(
    `write/${essay.slug}.md`,
    `# ${flatTitle(essay)}

*By [${PROFILE.name}](${SITE_URL}) · ${essay.date} · ${essay.readTime}*

Canonical: ${essayUrl(essay)}

---

${toMarkdown(essay.content)}
${essay.why ? `\n---\n\nContext: ${essay.why}\n` : ''}
---

More essays by ${PROFILE.name}: ${SITE_URL}/llms.txt
`
  );
}

/* llms.txt — the index an agent reads first. */
write(
  'llms.txt',
  `# ${PROFILE.name}

> ${PROFILE.headline} ${PROFILE.company.role} of ${PROFILE.company.name} (${PROFILE.company.url}), based in ${PROFILE.location}.

${SITE_URL} is a JavaScript-rendered single-page app. If you cannot execute
JavaScript, use the markdown files below — they contain the complete content of
the site. For everything in a single request, fetch ${SITE_URL}/llms-full.txt

## Profile

- [Full profile](${SITE_URL}/ansh-chokshi.md): background, roles, company, contact details
- [Everything in one file](${SITE_URL}/llms-full.txt): profile plus every essay

## Essays

${INITIAL_ESSAYS.map((e) => `- [${flatTitle(e)}](${SITE_URL}/write/${e.slug}.md): ${e.date}, ${e.readTime}`).join('\n')}

## Elsewhere

${CONTACT_LINES}
`
);

/* llms-full.txt — one request, entire site. */
write(
  'llms-full.txt',
  `${PROFILE_MD}
---

# Essays in full

${INITIAL_ESSAYS.map(
  (e) => `
## ${flatTitle(e)}

*${e.date} · ${e.readTime} · ${essayUrl(e)}*

${toMarkdown(e.content)}
${e.why ? `\nContext: ${e.why}\n` : ''}
---
`
).join('\n')}
`
);

/* sitemap.xml — every real URL, with the homepage images preserved. */
const HOME_IMAGES = [
  ['ansh-chokshi.jpg', 'Ansh Chokshi', 'Ansh Chokshi, founder of Mireye, San Francisco'],
  ['ansh-chokshi-yc.jpg', 'Ansh Chokshi at Y Combinator', 'Ansh Chokshi at Y Combinator headquarters'],
  ['ansh-chokshi-badminton.jpg', 'Ansh Chokshi badminton state champion', 'Ansh Chokshi, badminton state champion athlete'],
  ['ansh-chokshi-badminton-young.jpg', 'Ansh Chokshi playing badminton', 'Ansh Chokshi competing in badminton tournament'],
];

const newestEssay = isoDate(INITIAL_ESSAYS[0].date);

const urlEntries: string[] = [
  `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${newestEssay}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${HOME_IMAGES.map(
  ([file, title, caption]) => `    <image:image>
      <image:loc>${SITE_URL}/${file}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${caption}</image:caption>
    </image:image>`
).join('\n')}
  </url>`,
  ...PUBLIC_ROUTES.filter((r) => r.path !== '/').map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  ),
  ...INITIAL_ESSAYS.flatMap((e) => [
    `  <url>
    <loc>${essayUrl(e)}</loc>
    <lastmod>${isoDate(e.date)}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>`,
    `  <url>
    <loc>${essayUrl(e)}.md</loc>
    <lastmod>${isoDate(e.date)}</lastmod>
    <priority>0.5</priority>
  </url>`,
  ]),
  `  <url>
    <loc>${SITE_URL}/ansh-chokshi.md</loc>
    <lastmod>${newestEssay}</lastmod>
    <priority>0.7</priority>
  </url>`,
  `  <url>
    <loc>${SITE_URL}/llms.txt</loc>
    <lastmod>${newestEssay}</lastmod>
    <priority>0.7</priority>
  </url>`,
];

write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>`
);

/* ------------------------------------------- inject into index.html in place */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: PROFILE.name,
      givenName: 'Ansh',
      familyName: 'Chokshi',
      description: `${PROFILE.company.role} of ${PROFILE.company.name}. ${PROFILE.headline}`,
      disambiguatingDescription: PROFILE.company.problem,
      image: `${SITE_URL}/ansh-chokshi.jpg`,
      url: SITE_URL,
      email: `mailto:${PROFILE.email}`,
      jobTitle: PROFILE.company.role,
      homeLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
      },
      worksFor: { '@id': `${SITE_URL}/#organization` },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Toronto',
        sameAs: 'https://www.utoronto.ca/',
      },
      knowsAbout: [...PROFILE.knowsAbout],
      sameAs: [PROFILE.socials.x, PROFILE.socials.linkedin, PROFILE.socials.github, PROFILE.company.url],
      mainEntityOfPage: { '@id': `${SITE_URL}/#webpage` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: PROFILE.company.name,
      url: PROFILE.company.url,
      description: PROFILE.company.what,
      slogan: PROFILE.company.mission,
      founder: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: PROFILE.name,
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en',
      hasPart: INITIAL_ESSAYS.map((e) => ({
        '@type': 'BlogPosting',
        '@id': `${essayUrl(e)}#article`,
        headline: flatTitle(e),
        url: essayUrl(e),
        datePublished: isoDate(e.date),
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#person` },
      })),
    },
  ],
};

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Content mirror for non-JS clients. Invisible to anyone with JavaScript on, so
 * the rendered site is completely unaffected.
 */
const noscript = `    <noscript>
      <div id="agent-readable">
        <h1>${PROFILE.name}</h1>
        <p>${esc(PROFILE.headline)} Based in ${PROFILE.location}.</p>
        <p>
          This site is rendered with JavaScript. A complete plain-text copy is available at
          <a href="/llms.txt">/llms.txt</a>, <a href="/ansh-chokshi.md">/ansh-chokshi.md</a>
          and <a href="/llms-full.txt">/llms-full.txt</a>.
        </p>

        <h2>Today</h2>
        <p>${esc(PROFILE.today)}</p>
        <p>
          ${PROFILE.company.role} of <a href="${PROFILE.company.url}">${PROFILE.company.name}</a>.
          ${esc(PROFILE.company.problem)} ${esc(PROFILE.company.what)}
          Mission: ${esc(PROFILE.company.mission)}
        </p>

        <h2>Chapters</h2>
        <ul>
${CHAPTERS.map((c) => {
  const link = CHAPTER_LINKS[c.org];
  const name = link ? `<a href="${esc(link)}">${c.org}</a>` : c.org;
  return `          <li>${name} — ${esc(c.role)}${c.detail ? `. ${esc(c.detail)}` : ''}</li>`;
}).join('\n')}
        </ul>

        <h2>Writing</h2>
        <ul>
${INITIAL_ESSAYS.map(
  (e) =>
    `          <li><a href="/write/${e.slug}">${esc(flatTitle(e))}</a> — ${e.date}, ${e.readTime} (<a href="/write/${e.slug}.md">markdown</a>)</li>`
).join('\n')}
        </ul>

        <h2>Interests</h2>
        <p>${esc(PROFILE.interests)}</p>

        <h2>Contact</h2>
        <ul>
          <li><a href="mailto:${PROFILE.email}">${PROFILE.email}</a></li>
          <li><a href="${PROFILE.socials.x}">X / Twitter</a></li>
          <li><a href="${PROFILE.socials.linkedin}">LinkedIn</a></li>
          <li><a href="${PROFILE.socials.github}">GitHub</a></li>
          <li><a href="/coffee">Book a coffee chat in San Francisco</a></li>
        </ul>
      </div>
    </noscript>`;

const indexPath = join(ROOT, 'index.html');
let html = readFileSync(indexPath, 'utf8');

function injectRegion(source: string, marker: string, body: string): string {
  const re = new RegExp(
    `([ \\t]*<!-- AGENT:${marker}:START[^>]*-->)[\\s\\S]*?([ \\t]*<!-- AGENT:${marker}:END -->)`
  );
  if (!re.test(source)) {
    throw new Error(
      `index.html is missing the AGENT:${marker} markers. Restore them or regeneration cannot run.`
    );
  }
  return source.replace(re, (_m, start: string, end: string) => `${start}\n${body}\n${end}`);
}

html = injectRegion(
  html,
  'JSONLD',
  `    <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)
    .split('\n')
    .map((l) => `    ${l}`)
    .join('\n')}\n    </script>`
);
html = injectRegion(html, 'CONTENT', noscript);

writeFileSync(indexPath, html, 'utf8');
console.log('  index.html (JSON-LD + noscript regions)');
console.log(`Done — ${INITIAL_ESSAYS.length} essays exported.`);
