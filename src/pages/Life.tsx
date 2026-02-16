import React from 'react';
import { LifeEvent } from '../types';

interface LifeProps {
  events: LifeEvent[];
}

const Life: React.FC<LifeProps> = ({ events }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-0 relative border-l border-stone-200 ml-3 sm:ml-16 md:ml-32 pb-16 sm:pb-20">
        {events.map((event) => (
          <div key={event.id} className="relative pl-6 sm:pl-8 pb-12 sm:pb-16 last:pb-0">
             
             {/* Timeline Dot */}
             <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-stone-300 border-2 border-[#FAF9F7] group-hover:bg-black transition-colors"></div>

            <div className="group">
              {/* Year Label */}
              <div className="sm:absolute sm:-left-20 md:-left-32 sm:w-16 md:w-24 sm:text-right top-1">
                 <span className="text-xl sm:text-2xl md:text-xl font-mono text-stone-300 group-hover:text-black transition-colors duration-300">
                    {event.year}
                 </span>
              </div>
              
              <div className="pt-1">
                <ul className="space-y-3 sm:space-y-4">
                  {event.items.map((item, idx) => (
                    <li key={idx} className="text-sm sm:text-base text-stone-800 leading-relaxed font-light">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center text-stone-400 italic mt-8 sm:mt-12 text-xs sm:text-sm">
        Processing...
      </div>
    </div>
  );
};

export default Life;
