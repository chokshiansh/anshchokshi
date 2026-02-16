import React from 'react';
import { BuildLog } from '../types';

interface BuildProps {
  logs: BuildLog[];
}

const Build: React.FC<BuildProps> = ({ logs }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-10 sm:space-y-12 lg:space-y-16">
        {logs.map((log) => (
          <div key={log.id} className="relative pl-6 md:pl-0 border-l border-stone-200 md:border-none">
            
            {/* Mobile date marker */}
            <div className="md:hidden absolute -left-[5px] top-1 w-2.5 h-2.5 bg-stone-200 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 sm:gap-6 lg:gap-8">
                {/* Date Column */}
                <div className="hidden md:block text-right">
                    <span className="font-mono text-xs text-stone-400 sticky top-24">{log.date}</span>
                </div>

                {/* Content Column */}
                <div>
                    <span className="md:hidden font-mono text-xs text-stone-400 block mb-2">{log.date}</span>
                    <h3 className="text-base sm:text-lg font-medium text-stone-900 mb-2">{log.title}</h3>
                    <p className="text-sm sm:text-base text-stone-600 font-light mb-4 sm:mb-6">{log.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-stone-50 p-3 sm:p-4 rounded-sm">
                            <span className="block text-[10px] font-bold text-green-700 uppercase tracking-wider mb-2">Worked</span>
                            <p className="text-xs sm:text-sm text-stone-700">{log.worked}</p>
                        </div>
                        <div className="bg-stone-50 p-3 sm:p-4 rounded-sm">
                            <span className="block text-[10px] font-bold text-red-700 uppercase tracking-wider mb-2">Failed</span>
                            <p className="text-xs sm:text-sm text-stone-700">{log.failed}</p>
                        </div>
                    </div>
                    
                    <div className="mt-3 sm:mt-4 text-xs font-mono text-stone-400">
                        {">>>"} Learning: {log.learnings}
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Build;
