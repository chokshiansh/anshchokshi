import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Essay } from '../types';

interface WriteProps {
  essays: Essay[];
}

/** Inline: ***bold+italic***, **bold**, *italic* (longest match first) */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
    const k = `${keyPrefix}-${i}`;
    if (part.startsWith('***') && part.endsWith('***')) {
      return <strong key={k}><em>{part.slice(3, -3)}</em></strong>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={k}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={k}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={k}>{part}</React.Fragment>;
  });
}

function renderContent(text: string): React.ReactNode {
  const blocks = text.split(/\n----\n/);
  return blocks.map((block, bi) => (
    <React.Fragment key={`block-${bi}`}>
      {bi > 0 && <hr className="my-8 sm:my-10 border-stone-200" />}
      <span className="block whitespace-pre-line">{renderInline(block, `b${bi}`)}</span>
    </React.Fragment>
  ));
}

const Write: React.FC<WriteProps> = ({ essays }) => {
  const { slug } = useParams<{ slug: string }>();
  const essay = essays.find((e) => e.slug === slug);
  const otherEssays = essays.filter((e) => e.slug !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!essay) {
    return (
      <div className="animate-in fade-in duration-700 text-center py-20">
        <p className="text-stone-500 text-lg mb-4">writing not found</p>
        <Link to="/" className="text-stone-900 underline underline-offset-2 decoration-stone-300 hover:decoration-black transition-colors">
          go home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ textTransform: 'none' }}>
      <article>
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 text-xs font-mono text-stone-400 mb-2">
            <span>{essay.date}</span>
            <span className="w-px h-3 bg-stone-300"></span>
            <span>{essay.readTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl text-stone-900 font-medium leading-tight whitespace-pre-line">
            {essay.title}
          </h1>
        </header>

        <div className="prose prose-stone prose-sm sm:prose-lg text-stone-800 leading-loose font-medium">
          {renderContent(essay.content)}
        </div>

        {essay.why && (
          <div className="mt-6 sm:mt-8 bg-stone-50 p-3 sm:p-4 border-l-2 border-stone-200 text-xs sm:text-sm text-stone-500 italic">
            Context: {essay.why}
          </div>
        )}
      </article>

      {otherEssays.length > 0 && (
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-stone-200">
          <h2 className="text-sm font-mono text-stone-400 mb-5">other writings</h2>
          <div className="flex flex-col gap-4">
            {otherEssays.map((e) => (
              <Link
                key={e.id}
                to={`/write/${e.slug}`}
                className="group flex items-baseline justify-between gap-4"
              >
                <span className="text-stone-900 font-medium text-sm sm:text-base group-hover:text-stone-500 transition-colors">
                  {e.title}
                </span>
                <span className="text-xs font-mono text-stone-400 whitespace-nowrap">
                  {e.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
