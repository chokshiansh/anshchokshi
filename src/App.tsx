import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import PageViewTracker from './components/PageViewTracker';
import Home from './pages/Home';
import Coffee from './pages/Coffee';
import Write from './pages/Write';
import Admin from './pages/Admin';
import { INITIAL_ESSAYS } from './constants';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <div className="min-h-screen bg-[#FAF9F7]">
        <div className="mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl px-5 sm:px-6 lg:px-8">
          <main className="py-10 sm:py-14 lg:py-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coffee" element={<Coffee />} />
              <Route path="/write/:slug" element={<Write essays={INITIAL_ESSAYS} />} />
              <Route path="/admin" element={<Admin />} />
              {/* Unknown paths (including the retired /life, /travel, /build) go home
                  rather than rendering a blank page. */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
