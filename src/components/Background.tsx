import React from 'react';

const Background: React.FC = () => {
  const traces = [
    { text: 'null', top: '15%', left: '5%', rotate: '-15deg' },
    { text: 'void', top: '40%', left: '85%', rotate: '10deg' },
    { text: '未完', top: '75%', left: '10%', rotate: '5deg' },
    { text: 'undefined', top: '20%', left: '60%', rotate: '-5deg' },
    { text: 'entropy', top: '85%', left: '70%', rotate: '-10deg' },
    { text: '試行', top: '10%', left: '80%', rotate: '15deg' },
    { text: '// todo', top: '50%', left: '40%', rotate: '-2deg' },
    { text: '0x0', top: '65%', left: '90%', rotate: '20deg' },
    { text: '無常', top: '30%', left: '15%', rotate: '-8deg' },
    { text: 'break', top: '90%', left: '40%', rotate: '5deg' },
    { text: '404', top: '5%', left: '40%', rotate: '12deg' },
    { text: '{...}', top: '60%', left: '5%', rotate: '-20deg' },
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
            filter: 'contrast(120%) brightness(100%)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {traces.map((trace, i) => (
        <div
          key={i}
          className="absolute font-mono font-bold text-stone-900 opacity-[0.03] whitespace-nowrap"
          style={{
            top: trace.top,
            left: trace.left,
            transform: `rotate(${trace.rotate}) scale(${1.5 + (i % 3) * 0.25})`,
            fontSize: '2rem',
          }}
        >
          {trace.text}
        </div>
      ))}

      <svg 
        viewBox="0 0 100 100" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] opacity-[0.015]"
      >
        <path 
            d="M 20 50 Q 50 10 80 50 T 140 50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="20" 
            className="text-stone-900"
        />
      </svg>
    </div>
  );
};

export default Background;
