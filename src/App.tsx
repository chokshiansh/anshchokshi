import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import Coffee from './pages/Coffee';
import Write from './pages/Write';
import Build from './pages/Build';
import Travel from './pages/Travel';
import Life from './pages/Life';
import Admin from './pages/Admin';
import {
  INITIAL_ESSAYS,
  INITIAL_BUILD_LOGS,
  INITIAL_TRAVEL_ENTRIES,
  INITIAL_LIFE_EVENTS,
} from './constants';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FAF9F7]">
        <div className="mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl px-5 sm:px-6 lg:px-8">
          <main className="py-10 sm:py-14 lg:py-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coffee" element={<Coffee />} />
              <Route path="/write/:slug" element={<Write essays={INITIAL_ESSAYS} />} />
              <Route path="/build" element={<Build logs={INITIAL_BUILD_LOGS} />} />
              <Route path="/travel" element={<Travel entries={INITIAL_TRAVEL_ENTRIES} />} />
              <Route path="/life" element={<Life events={INITIAL_LIFE_EVENTS} />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </div>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
