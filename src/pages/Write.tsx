import React from 'react';
import { Essay } from '../types';

interface WriteProps {
  essays: Essay[];
}

const Write: React.FC<WriteProps> = ({ essays }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-14 sm:space-y-20">
        {essays.map((essay) => (
          <article key={essay.id} className="group">
            <header className="mb-4 sm:mb-6">
              <div className="flex items-center gap-3 text-xs font-mono text-stone-400 mb-2">
                <span>{essay.date}</span>
                <span className="w-px h-3 bg-stone-300"></span>
                <span>{essay.readTime}</span>
              </div>
              <h3 className="text-xl sm:text-2xl text-stone-900 font-medium group-hover:text-stone-600 transition-colors">
                {essay.title}
              </h3>
            </header>

            <div className="prose prose-stone prose-sm sm:prose-lg text-stone-800 leading-loose font-light">
              {essay.content.split('\n').filter(line => line.trim() !== '').map((line, i) => {
                const trimmed = line.trim();
                const isNumbered = /^\d+\./.test(trimmed);
                if (isNumbered) {
                  const dotAfterNum = trimmed.indexOf('. ');
                  const rest = trimmed.slice(dotAfterNum + 2);
                  const sentenceEnd = rest.indexOf('.');
                  if (sentenceEnd > 0 && sentenceEnd < rest.length - 1) {
                    return (
                      <p key={i} className="my-1">
                        {trimmed.slice(0, dotAfterNum + 2)}<span className="font-semibold">{rest.slice(0, sentenceEnd + 1)}</span>{rest.slice(sentenceEnd + 1)}
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="my-1">
                      {trimmed.slice(0, dotAfterNum + 2)}<span className="font-semibold">{rest}</span>
                    </p>
                  );
                }
                return <p key={i} className="my-1 font-semibold italic">{trimmed}</p>;
              })}
            </div>
            
            {essay.why && (
                <div className="mt-6 sm:mt-8 bg-stone-50 p-3 sm:p-4 border-l-2 border-stone-200 text-xs sm:text-sm text-stone-500 italic">
                  Context: {essay.why}
                </div>
            )}
          </article>
        ))}
      </div>
      
      <div className="pt-8 sm:pt-12 border-t border-stone-200 mt-8 sm:mt-12">
        <p className="text-xs sm:text-sm text-stone-400 text-center">
            No comments, no likes. Just thoughts. <br/>
            <a href="mailto:email@example.com" className="text-stone-900 hover:underline">Reply via email</a>
        </p>
      </div>
    </div>
  );
};

export default Write;
