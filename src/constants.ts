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
    id: '3',
    title: 'Dear Future Children',
    date: 'Mar 6, 2026',
    readTime: '3 min read',
    content: `A few things I've learned about life the hard way. I hope they help you live it well.
Not rules, just reminders for living a meaningful life.

1. Be kind, well-spoken, and thoughtful.
2. Think before you speak. Words stay longer than you think.
3. Read, Write, Build, Reflect, Train. Do it daily.
4. Take risks and get uncomfortable from time to time. That's where growth hides.
5. Health is your greatest asset. Protect your mind and body.
6. Believe in your gut and instinct. They're usually right.
7. Love requires sacrifices. The real kind always does.
8. Don't wait for things to be perfect. Enjoy the process and make friends with imperfections.
9. Always help others. It costs little and matters a lot.
10. You only need a couple of best friends. Quality > quantity.
11. Don't seek validation from society. You don't owe anyone an explanation.
12. Being a good human > being successful. Always.
13. Time is your most valuable resource. Use it intentionally.
14. Don't follow a mundane routine. Live like a lion. Obsess over things you want, go all in, go deep for a while - then rest, be lazy, and recover.
15. Curiosity + hard work beats talent. Every time.
16. Set out to do the impossible. Be an outlier and believe in yourself. It's okay if people think you're crazy.
17. Never do long-distance relationships. Trust me.
18. Your life isn't defined by the work you do, but by the relationships you build.
19. There are no shortcuts in life. Nothing meaningful comes easy and it's rarely fun if it does.
20. Manifestation works. Act like the future version of yourself.`,
  },
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
