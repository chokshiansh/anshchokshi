import React, { useState } from 'react';
import { TravelEntry, ViewMode } from '../types';
import WorldMap from '../components/WorldMap';

interface TravelProps {
  entries: TravelEntry[];
}

const Travel: React.FC<TravelProps> = ({ entries }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-end items-center mb-10 sm:mb-16 pb-4">
        <div className="flex bg-stone-100 rounded-lg p-1 gap-1">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-black shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
          >
            List
          </button>
          <button 
             onClick={() => setViewMode('map')}
             className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewMode === 'map' ? 'bg-white text-black shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Map
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <WorldMap entries={entries} />
      ) : (
        <div className="space-y-14 sm:space-y-20">
          {entries.map((entry) => (
            <div key={entry.id} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-medium text-stone-900">
                  {entry.city} <span className="text-stone-400 font-light">/ {entry.country}</span>
                </h3>
                <span className="text-xs font-mono text-stone-400 bg-stone-100 px-2 py-1 rounded-sm mt-2 sm:mt-0 inline-block w-fit">
                    {entry.date}
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light mb-4 sm:mb-6 border-l-2 border-stone-200 pl-4">
                {entry.reflection}
              </p>

              {entry.images && entry.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {entry.images.map((img, i) => (
                    <div key={i} className="overflow-hidden rounded-sm">
                        <img 
                        src={img} 
                        alt={`${entry.city} ${i}`}
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                        />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Travel;
