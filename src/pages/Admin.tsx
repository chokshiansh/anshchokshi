import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = (): void => {
    if (!content.trim()) return;
    setIsPublished(true);
    setTimeout(() => {
      setContent('');
      setIsPublished(false);
    }, 2000);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white border border-stone-200 p-1 rounded-sm shadow-sm">
        <textarea 
          className="w-full h-48 sm:h-64 p-3 sm:p-4 text-stone-700 font-mono text-sm focus:outline-none resize-none bg-transparent"
          placeholder="What's on your mind? (Markdown supported)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between items-center p-2 bg-stone-50 border-t border-stone-200">
          <span className="text-xs text-stone-400 font-mono">
            {new Date().toLocaleDateString()}
          </span>
          <button 
            onClick={handlePublish}
            disabled={!content.trim() || isPublished}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-all ${
              isPublished 
                ? 'bg-green-100 text-green-800'
                : 'bg-stone-900 text-white hover:bg-black'
            }`}
          >
            {isPublished ? 'Published' : 'Publish'}
          </button>
        </div>
      </div>
      <p className="mt-4 text-xs text-stone-400 text-center">
        This is a local simulation. Content resets on refresh.
      </p>
    </div>
  );
};

export default Admin;
