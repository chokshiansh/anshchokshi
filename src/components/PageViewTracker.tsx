import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '@vercel/analytics/react';

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home',
  '/coffee': 'Coffee',
  '/build': 'Build',
  '/travel': 'Travel',
  '/life': 'Life',
  '/admin': 'Admin',
};

function getPageName(pathname: string): string {
  if (pathname in PAGE_NAMES) return PAGE_NAMES[pathname];
  if (pathname.startsWith('/write/')) return `Write: ${pathname.replace('/write/', '')}`;
  if (pathname.startsWith('/cards/')) return `Card: ${pathname.replace('/cards/', '')}`;
  return pathname;
}

const PageViewTracker: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    track('Page View', {
      path: pathname,
      page: getPageName(pathname),
    });
  }, [pathname]);

  return null;
};

export default PageViewTracker;
