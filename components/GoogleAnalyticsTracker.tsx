'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalyticsTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && window.gtag) {
      const handleRouteChange = () => {
        window.gtag('config', gaId, {
          page_path: pathname,
          page_title: document.title, 
          page_location: window.location.href,
        });
      };

      const timeoutId = setTimeout(handleRouteChange, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, gaId]);

  return null;
}