import { LifeEvent, TravelEntry, Essay, BuildLog, Cafe } from './types';

export const INITIAL_LIFE_EVENTS: LifeEvent[] = [
  {
    id: '1',
    year: '2024',
    items: [
      'Moved to San Diego',
      'Built and shipped multiple side projects',
      'Learned to sit with uncertainty'
    ]
  },
  {
    id: '2',
    year: '2021',
    items: [
      'Graduated',
      'First full-time role',
      'Felt lost, stayed curious'
    ]
  },
  {
    id: '3',
    year: '2018',
    items: [
      'First solo trip abroad',
      'Started writing code seriously'
    ]
  }
];

export const INITIAL_TRAVEL_ENTRIES: TravelEntry[] = [
  {
    id: '1',
    city: 'Kyoto',
    country: 'Japan',
    date: 'Nov 2023',
    reflection: 'The silence in the temples felt louder than the city streets. I learned that pause is an action.',
    coordinates: [135.7681, 35.0116],
    images: ['https://picsum.photos/seed/kyoto1/400/300', 'https://picsum.photos/seed/kyoto2/400/300']
  },
  {
    id: '2',
    city: 'Lisbon',
    country: 'Portugal',
    date: 'Mar 2023',
    reflection: 'Sunlight hits differently here. Spent days just walking up and down hills, drinking espresso.',
    coordinates: [-9.1393, 38.7223],
    images: ['https://picsum.photos/seed/lisbon/400/300']
  },
  {
    id: '3',
    city: 'New York',
    country: 'USA',
    date: 'Sep 2022',
    reflection: 'Overwhelming energy. Felt small, but in a good way.',
    coordinates: [-74.0060, 40.7128]
  }
];

export const INITIAL_ESSAYS: Essay[] = [
  {
    id: '1',
    title: 'The Art of Subtracting',
    date: 'Jan 12, 2024',
    readTime: '4 min read',
    content: `
      We are constantly taught to add. Add features, add habits, add connections. 
      
      But clarity comes from subtraction. It is the art of removing the unessential until only the truth remains. 
      In design, this is whitespace. In life, this is focus.
      
      I've been trying to apply this to my digital life. Less consumption, more creation. Less noise, more signal.
    `,
    why: 'Written after deleting Instagram.'
  },
  {
    id: '2',
    title: 'Slow Software',
    date: 'Oct 05, 2023',
    readTime: '6 min read',
    content: `
      Fast software breaks things. Slow software respects the user's time and attention. 
      It doesn't scream for engagement. It waits to be useful.
      
      We need more tools that feel like well-crafted furniture—sturdy, quiet, and reliable.
    `,
    why: 'Thoughts on the current state of SaaS.'
  }
];

export const INITIAL_BUILD_LOGS: BuildLog[] = [
  {
    id: '1',
    date: 'Feb 2024',
    title: 'Personal Log Site',
    description: 'A minimal, wabi-sabi inspired personal website to replace my portfolio.',
    worked: 'Tailwind for styling, keeping the layout strictly single-column.',
    failed: 'Tried to add complex animations, felt wrong. Removed them.',
    learnings: 'Imperfection is a feature. Stop polishing everything.'
  },
  {
    id: '2',
    date: 'Dec 2023',
    title: 'Coffee Timer App',
    description: 'A simple PWA to time pour-over coffee steps.',
    worked: 'Service workers for offline support.',
    failed: 'Notification sounds were annoying.',
    learnings: 'Audio UX is harder than visual UX.'
  }
];

// San Francisco Coffee Shops
export const INITIAL_CAFES: Cafe[] = [
  { 
    id: '1', 
    name: 'Sightglass', 
    location: 'SoMa', 
    address: '270 7th St',
    notes: 'The cathedral of coffee. High ceilings, smell of roasting beans.',
    coordinates: [-122.4085, 37.7775] 
  },
  { 
    id: '2', 
    name: 'The Mill', 
    location: 'NoPa', 
    address: '736 Divisadero St',
    notes: 'Expensive toast, but worth it. Beautiful light in the afternoon.',
    coordinates: [-122.4389, 37.7764] 
  },
  { 
    id: '3', 
    name: 'Saint Frank', 
    location: 'Russian Hill', 
    address: '2340 Polk St',
    notes: 'Clean, minimalist, precise. The almond macadamia latte is unmatched.',
    coordinates: [-122.4214, 37.7986] 
  },
  { 
    id: '4', 
    name: 'Ritual', 
    location: 'Mission', 
    address: '1026 Valencia St',
    notes: 'The classic. Good energy for deep work sessions.',
    coordinates: [-122.4219, 37.7563] 
  },
  { 
    id: '5', 
    name: 'Andytown', 
    location: 'Outer Sunset', 
    address: '3655 Lawton St',
    notes: 'Snowy Plover drink. Ocean breeze. Wabi-sabi realized.',
    coordinates: [-122.5020, 37.7565] 
  }
];
