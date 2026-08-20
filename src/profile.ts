/**
 * Single source of truth for identity/bio facts.
 *
 * Consumed by:
 *   - src/pages/Home.tsx        (what humans see)
 *   - scripts/generate-agent-md.ts (what crawlers, LLMs and agents read)
 *
 * Edit here and both stay in sync. Nothing in this file should be aspirational —
 * it is the machine-readable record people will cite.
 */

export const SITE_URL = 'https://anshchokshi.com';

export const CHAPTER_LINKS: Record<string, string> = {
  seismic: 'https://www.seismic.com/platform/aura/',
  mireye: 'https://www.mireye.ai',
  uoft: 'https://www.linkedin.com/feed/update/urn:li:activity:7077305545455472640/',
  eraser: 'https://www.youtube.com/watch?v=3fhoV2WFaM4',
  badminton: 'https://www.youtube.com/watch?v=wQKMdH3aiAo&t=183s',
};

export interface Chapter {
  org: string;
  role: string;
  /** Expanded, agent-readable version of the role. Not rendered on the site. */
  detail?: string;
}

export const CHAPTERS: Chapter[] = [
  {
    org: 'mireye',
    role: 'ceo & founder (now)',
    detail:
      'Founder and CEO of Mireye. Building geospatial infrastructure so AI agents can reliably reason about the physical world.',
  },
  {
    org: 'eraser',
    role: 'aiml engineer',
    detail: 'AI/ML engineer at Eraser.',
  },
  {
    org: 'seismic',
    role: 'data scientist',
    detail:
      'Data scientist at Seismic, on the ML team that became Seismic Aura. Joined as an intern before the ChatGPT/LLM wave, when the team was small and the direction was still ambiguous.',
  },
  {
    org: 'poker pit',
    role: 'co-founder (acquired)',
    detail:
      'Co-founded an online poker club in 2021 and scaled it to $250,000 revenue. Profitable, bootstrapped, and acquired within a year.',
  },
  {
    org: 'uoft',
    role: 'cs, econ, math',
    detail:
      'University of Toronto — computer science, economics, and mathematics.',
  },
  {
    org: 'badminton',
    role: 'state champion athlete',
    detail: 'State champion badminton player.',
  },
];

/** Shown in the poker pit modal on the home page. */
export const POKER_PIT_NOTE =
  'co-founded an online poker club in 2021, scaling to $250,000 revenue. Profitable, bootstrapped and acquired within a year.';

export const PROFILE = {
  name: 'Ansh Chokshi',
  handle: 'ansh',
  headline: 'Athlete, engineer, founder of Mireye.',
  location: 'San Francisco, California, USA',
  today:
    'i take calculated risks based on expected value, game theory optimal, intuition, research and emotions for a living',
  interests:
    'surf more waves, chase wildlife shots, grow healthier plants, create thoughtful spaces',
  email: 'anshchokshi@gmail.com',
  socials: {
    x: 'https://x.com/ansh_chokshi',
    linkedin: 'https://www.linkedin.com/in/ansh-chokshi/',
    github: 'https://github.com/chokshiansh',
  },
  company: {
    name: 'Mireye',
    url: 'https://www.mireye.ai',
    role: 'Founder & CEO',
    mission:
      'Index every inch of the earth and make it as queryable as the web.',
    problem:
      "AI agents are starting to act in the real world, but they can't reliably understand it. Ask a model a specific question about a specific place and it guesses.",
    what: 'Geospatial infrastructure for AI agents — a queryable index of the physical world.',
  },
  /** Topics this person can credibly be asked about. Used for schema.org knowsAbout. */
  knowsAbout: [
    'Geospatial data infrastructure',
    'AI agents',
    'Machine learning',
    'Startups and company building',
    'Data science',
    'Site selection and land analysis',
    'Badminton',
  ],
} as const;

/** Routes worth exposing to crawlers. Unlinked/demo routes are deliberately excluded. */
export const PUBLIC_ROUTES = [
  { path: '/', title: 'Ansh Chokshi', description: PROFILE.headline },
  {
    path: '/coffee',
    title: 'Coffee chat with Ansh Chokshi',
    description:
      'An interactive map of independent San Francisco coffee shops. Pick one and book a coffee chat.',
  },
] as const;
