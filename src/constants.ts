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
    id: '7',
    slug: 'the-honest-truth-about-moving',
    title: 'The Honest Truth About Moving',
    date: 'Apr 13, 2026',
    readTime: '7 min read',
    passcode: '211024',
    content: `I have moved through five cities and three countries in the past eight years.

For a long time, I thought moving was about starting over. New place. New people. New version of you.

Now I think it is more about learning how to grieve.

I left home when I was 17. I still get texts from my mom saying she let me go too early. There is something about that line that stays with me. It sounds light when she says it now, but it carries the weight of everything we gave up when I left.

I thought I was just choosing independence. I did not know I was also choosing distance.

That has been the honest truth behind moving for me.

Every move gave me something. A new city. A new routine. A new set of people. A new life that, for some time, felt like the only life that mattered.

But every move took something too.

Not in one dramatic way. In quieter ways.
----
**The People**

The hardest part of moving has always been the people.

Every city in my life has had its own inner circle. Its own cast. The people I spent all my time with. The people who knew what phase I was in without me having to explain it.

They knew the jokes. The habits. The routines. They knew which version of me they were getting.

And every time I moved, I did the same thing.

I got immersed in the new life. I got close to the new people.

And slowly, without ever meaning to, I let the old ones drift.

I am not proud of that. I am a very in-person person.

I am good at presence and bad at maintenance. Good at intensity. Bad at distance.

If you are reading this, I am sorry. I will do better.

Still, moving taught me something honest about relationships.

***Not everyone you love comes with you.***

And when you see those people again, something strange happens. The gap disappears for a moment. The inside jokes come back. You laugh in a way that reminds you who you were then.

Maybe that is the gift. You do lose people over time. But if the bond was real, it never fully leaves your body.
----
**The Memories**

People say you make new memories, and you do.

But that has never made the old ones feel smaller to me.

I hold memory very close. I have over 100,000 photos in my camera roll, which probably says enough. Sometimes when I am homesick, or lonely, or just not fully myself, I go back.

I scroll back to an older phase of my life and sit inside it for a while.

That is the thing about memory.

People talk about the past like it is over.

It is not over. It is dormant. It waits.

Then one photo, one song, one smell, or one street name brings it all back at once.

I do not think memory exists to trap us in the past.

***Sometimes it helps us survive the distance between who we were and who we are now.***
----
**The City**

Then there is the city itself.

Your city. Your spots. Your route. Your places.

The place where your life happened for a while.

Late-night walks at college park. Sunsets at Torrey Pines. Favorite penne alla vodka at Ricarda's. Mocha at Jimmy's. Slice at Fresca. Small places that would mean nothing to someone else and everything to you.

What moving really takes is familiarity.

You leave behind the version of the city that only exists because you were living inside it.

I used to think leaving meant losing those places. But I do not think that anymore.

If anything, distance makes them more precious.

When I go back, I feel it immediately. A kind of rush I still do not know how to explain properly. Something between nostalgia and electricity. My body remembers before my mind does.

I do not just remember the place. I remember who I was there.

***A place can stop being your home and still stay sacred.***

Maybe that is what a good city does. ***It outlives your time in it.***
----
**The Things**

Then there are the things.

This is probably the easiest lesson to say and the hardest one to practice.

Do not get too attached.

When I lived in Toronto, I was a hardcore sneaker head. At one point I had more than 30 pairs. Then I moved, and my whole life had to fit into two 32 kg bags.

That is when moving becomes very honest.

You sell some. Leave some. Give some away. Pretend it is practical. Pretend it does not mean anything.

But of course it does.

And you realize you were never just attached to the object. You were attached to the version of yourself that came with it.

I do not regret letting them go. It was a real phase. A meaningful one. But still a phase.

Sometimes letting go of things is really just admitting that a version of you has ended.
----
**Mono No Aware**

The older I get, the more I think moving has been showing me the same thing.

Something deeper than ambition, independence, or change.

***Impermanence.***

On my flight to San Diego, I opened a huge card my family and friends in Toronto had filled with messages. Every person close to my heart had written something in it. Somewhere over the clouds, I sat there sobbing, reading memory after memory from a life I had just left behind.

There is a Japanese term for that feeling: mono no aware.

The ache of something beautiful ending. The feeling of already missing it while it is still warm.

***Things are not beautiful despite being temporary.***

***They are beautiful because they are temporary.***`,
  },
  {
    id: '6',
    slug: 'the-art-of-doing-it-anyway',
    title: 'The Art of Doing it Anyway',
    date: 'Mar 21, 2026',
    readTime: '5 min read',
    content: `**Being early and being right are the only ways to get exponential outcomes. Everything else tends to grow slower than you expect.**

The real game is simple. Put yourself in positions where those two can meet, and do it often enough that one works in your favor.

The more bets you take, the better your chances.

----
**In your twenties, this matters even more. This is the phase to take concentrated bets, not scatter your effort or constantly hedge.**

Hedging works when you already have volume. At the start, volume comes from committing, not protecting.

You've heard this before: not taking risks is the biggest risk. But in practice, it's more subtle.

It's not about doing random things. It's about walking away from something too soon, just because it didn't show results fast enough.

Now think about this. If you chose a path with a low success rate, how would you behave?

Would you treat the first few outcomes as the answer, or would you assume the signals are weak and give it time for something real to show up?

That difference is small, but it changes everything.

People who benefit from timing don't expect clarity at the start. They expect noise, and they stay long enough to see if they were right.

I've seen this up close. When I joined Seismic as an intern, AI wasn't even a main focus. It was a small ML team working on hard problems without a clear long term vision, this was before the ChatGPT and LLM wave.

At the time, it didn't feel like momentum. It felt like ambiguity. The work was hard, the signal was weak, and it wasn't obvious where it would lead. But over time, the same work started to make more sense in a different context, not because it changed, but because the world around it did.

----
**There's a reason many high performers were once gamers or athletes. They learned this early.**

The game doesn't end when you lose. It ends when you stop playing.

Lose a level and you restart. Die at the final boss and you start again. But the second run is never as slow as the first. You've seen the traps, you recognize the patterns, and even in the worst case, getting back takes less time.

That's how progress actually works. You're not starting over. You're building forward.

Action produces information. Every attempt sharpens your judgment, and after a point, it comes down to appetite.

----
**The discomfort of discipline is nothing compared to the pain of regret.**

Strategy matters. Luck matters. But neither replaces being early and right, and nothing helps if you don't stay long enough for timing to work in your favor.

Keep placing concentrated bets on things that feel ahead of the curve, and stay with them long enough to learn.

The odds shift. Not instantly, but eventually.

And when they do, the outcome is rarely small.`,
  },
  {
    id: '5',
    slug: 'create-more-than-you-consume-give-more-than-you-take',
    title: 'Create more than you Consume,\nGive more than you Take',
    listingTitle: 'Create more than you Consume',
    date: 'Mar 16, 2026',
    readTime: '1 min read',
    content: `I am in debt to the world. Every movie, artist, song, show, tutorial, and game has shaped who I am. I have spent a lifetime consuming the brilliance of others. Now, it is time to pay it back.

The shift is humbling. I create something I love and the world stays silent. No impact. No change. I had to shift the goalpost. I started creating for myself first. When I am the audience, I can never be ghosted.

I am in debt to the people who built me. Mentors who saw my potential. Strangers who pointed the way. The mechanic who fixed my car. The doctor who healed me. I have spent a lifetime receiving. Now, it is time to give more than I take.

This goes beyond the single medium or interaction. It is about how I show up in the world. Am I doing my bit for my community? Am I taking care of the person who cuts my hair? It is a decision to be useful instead of just comfortable.

Moving from a life of taking to a life of contributing is a constant, quiet effort. It is the difference between being a guest in the world and being a host.

I am not saying it is going to be easy but what a privilege to be challenged by a life you created on purpose.`,
  },
  {
    id: '4',
    slug: 'the-last-15-days-of-my-life',
    title: 'The Last 15 Days of My Life',
    date: 'Mar 10, 2026',
    readTime: '4 min read',
    content: `What if you knew you only had fifteen days left to live? Not on earth, but in a life you loved. I gave my notice. My fifteen days started the moment I chose to leave a perfect present for an uncertain future.

San Diego was my dream city. My job was my passion. My colleagues were my closest friends. I had built the life I always wanted. Then, growth called. And growth, I learned, demands mourning.

I saw San Diego as a place for families. I didn't have one yet, so I worked to build a future where I could enjoy this city with my partner and kids. Every time I saw a happy family on the sand, I thought to myself *one day.*

I lived in San Diego. But I didn't live San Diego. Surfing lessons remained a fantasy. Beach days were a deferred promise. The extraordinary became routine. I was physically present, mentally absent.

I knew I was taking it for granted. A quiet guilt simmered. But guilt changes nothing. Without urgency, there is no action. The dream, once achieved, had lost its edge.

The opportunity came. A step forward. A new city. The decision was clear, yet the feeling was not. No one warns you about the amount of mourning in growth.

I was leaving the city I had built my life around. The job I loved. The people I cherished. This wasn't just a move; it was an amputation. I was leaving the ghost of a future family. I was leaving the blueprint for a life I hadn't built yet.

My last fifteen days in San Diego were a blur of hyper-presence. I started smiling at every stranger I passed. I made conversation with people I would have normally ignored. I finally took those surfing lessons. I woke up eager, not just awake. Impromptu beach reads, sunset frisbee games. The smallest things felt profound.

I wasn't planning life. I was living it. Every moment was sharp, vibrant, real. It was the city I had always dreamed of, finally experienced, just as it was slipping away.

You can escape the winter, or you can learn to play in the snow. For years, I tried to escape the winter of my own complacency. Only when faced with its end did I choose to play.

This isn't about San Diego. It's about life. We all have our winters. Our dream cities. Our jobs we love. Our people. But we also have an expiration date. We just don't know when it starts.

Stop waiting for the two-week notice. Imagine you have X years left. Or X months. What would you do differently? What would you finally do?

This life is not a dress rehearsal. You are never getting this life again. Live it now. Play in your snow. Surf your waves. Mourn your growth. But live.

Even if you know what's coming, you're never prepared for how it feels. The joy of new beginnings is always tinged with the quiet ache of what was left behind. That is the cost of growth. That is the beauty of living. That is the truth of "one day."`,
  },
  {
    id: '3',
    slug: 'dear-future-children',
    title: 'Dear Future Children',
    date: 'Mar 6, 2026',
    readTime: '2 min read',
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
