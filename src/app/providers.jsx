'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider, useTheme } from '../hooks/useTheme';
import LeadTracking from '../components/LeadTracking';

function ThemeHtmlSync() {
  const pathname = usePathname();
  const { themeValue } = useTheme();

  useEffect(() => {
    const dark = pathname === '/' && themeValue >= 0.5;
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';

    return () => {
      if (pathname === '/') document.documentElement.classList.remove('dark');
    };
  }, [pathname, themeValue]);

  return null;
}

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ThemeHtmlSync />
      <LeadTracking />
      {children}
    </ThemeProvider>
  );
}
