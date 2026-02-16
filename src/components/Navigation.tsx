import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'home' },
  { to: '/write', label: 'write' },
  { to: '/build', label: 'build' },
  { to: '/travel', label: 'travel' },
  { to: '/life', label: 'life' },
  { to: '/coffee', label: 'coffee' },
];

const Navigation: React.FC = () => {
  return (
    <nav className="py-6 sm:py-8 lg:py-10">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6 lg:gap-x-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `text-xs sm:text-sm font-mono transition-colors duration-200 ${
                isActive
                  ? 'text-black font-medium'
                  : 'text-stone-400 hover:text-stone-700'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
