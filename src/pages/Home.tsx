import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LINKS: Record<string, string> = {
  seismic: 'https://www.seismic.com/platform/aura/',
  mireye: 'https://www.mireye.ai/',
  uoft: 'https://www.linkedin.com/feed/update/urn:li:activity:7077305545455472640/',
  upsquare: 'https://upsquaretech.com/',
  badminton: 'https://www.youtube.com/watch?v=wQKMdH3aiAo&t=183s',
};

const Home: React.FC = () => {
  const [pokerOpen, setPokerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const pastItems = [
    { org: 'seismic', role: 'aiml engineer' },
    { org: 'mireye', role: 'ceo & founder (failed)' },
    { org: 'poker pit', role: 'co-founder (acquired)' },
    { org: 'uoft', role: 'cs, econ, math' },
    { org: 'upsquare', role: 'intern' },
    { org: 'badminton', role: 'state champion athlete' },
  ];

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-5rem)] sm:h-[calc(100vh-7rem)] lg:h-[calc(100vh-8rem)] min-h-0 overflow-hidden animate-in fade-in duration-1000">
      
      {/* 1. HEADER */}
      <div>
        <div className="font-bold text-black text-sm sm:text-base lg:text-lg leading-none mb-1">ansh</div>
        <div className="text-stone-600 text-sm sm:text-base lg:text-lg leading-none">san francisco</div>
      </div>

      {/* 2. TODAY */}
      <section>
        <h2 className="font-bold text-black mb-2 text-sm sm:text-base lg:text-lg">today</h2>
        <div className="text-stone-600 leading-relaxed font-normal text-sm sm:text-base lg:text-lg">
          <p>
            i take calculated risks based on expected value, game theory optimal, intuition, research and emotions for a living
          </p>
        </div>
      </section>

      {/* 3. PAST */}
      <section>
        <h2 className="font-bold text-black mb-3 text-sm sm:text-base lg:text-lg">past</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-4 sm:gap-x-4 lg:gap-x-6 lg:gap-y-5">
          {pastItems.map((item) => {
            const href = LINKS[item.org];
            const isPoker = item.org === 'poker pit';

            return (
              <div key={item.org} className="flex flex-col">
                {isPoker ? (
                  <button
                    onClick={() => setPokerOpen(true)}
                    className="text-black font-medium leading-tight text-sm sm:text-base lg:text-lg truncate text-left hover:text-stone-600 transition-colors"
                  >
                    {item.org}
                  </button>
                ) : href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-medium leading-tight text-sm sm:text-base lg:text-lg truncate no-underline hover:text-stone-600 transition-colors"
                    style={{ textDecoration: 'none' }}
                  >
                    {item.org}
                  </a>
                ) : (
                  <span className="text-black font-medium leading-tight text-sm sm:text-base lg:text-lg truncate">{item.org}</span>
                )}
                <span className="text-stone-600 text-xs sm:text-sm lg:text-base leading-tight truncate">{item.role}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CONNECT */}
      <section>
        <div className="flex items-baseline gap-4 mb-2">
          <h2 className="font-bold text-black text-sm sm:text-base lg:text-lg leading-none m-0">connect</h2>
          <span className="inline-flex items-center gap-4 text-stone-400" style={{ transform: 'translateY(1px)' }}>
            <a href="https://x.com/ansh_chokshi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-[18px] h-[18px] hover:text-black transition-colors" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/ansh-chokshi/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-[18px] h-[18px] hover:text-black transition-colors" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="mailto:anshchokshi@gmail.com" className="inline-flex items-center justify-center w-[18px] h-[18px] hover:text-black transition-colors" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </a>
          </span>
        </div>
        <Link 
          to="/coffee"
          className="text-stone-600 hover:text-black transition-colors text-left leading-relaxed font-normal text-sm sm:text-base lg:text-lg border-b border-stone-300 hover:border-black pb-0.5"
        >
          there is only one thing better than coffee, free coffee :)
        </Link>
      </section>

      {/* 5. INTERESTS */}
      <section>
        <h2 className="font-bold text-black mb-2 text-sm sm:text-base lg:text-lg">interests</h2>
        <div className="text-stone-600 leading-relaxed font-normal text-sm sm:text-base lg:text-lg">
          surf more waves, chase wildlife shots, grow healthier plants, create thoughtful spaces
        </div>
      </section>

      {/* 6. QUOTE */}
      <section>
        <p className="italic text-stone-700 text-sm sm:text-base lg:text-lg leading-relaxed">
          "our works main goal must be to tell children that life is worth living"
        </p>
        <p className="text-stone-600 mt-1 text-xs sm:text-sm lg:text-base">
          - hayao miyazaki
        </p>
      </section>

      {/* POKER PIT MODAL */}
      {pokerOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-stone-900/20 backdrop-blur-sm" onClick={() => setPokerOpen(false)} />
          <div
            className="fixed z-[61] bg-white w-[calc(100%-2rem)] max-w-sm rounded-sm shadow-xl p-5 sm:p-6"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <button
              onClick={() => setPokerOpen(false)}
              className="absolute top-3 right-3 text-stone-400 hover:text-black transition-colors text-lg leading-none"
            >
              &times;
            </button>
            <h3 className="text-sm sm:text-base font-bold text-black mb-3">poker pit</h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              co-founded an online poker club in 2021, scaling to $20K MRR. Profitable from day one, bootstrapped and acquired within a year.
            </p>
          </div>
        </>
      )}

    </div>
  );
};

export default Home;
