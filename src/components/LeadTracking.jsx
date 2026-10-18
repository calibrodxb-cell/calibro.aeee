'use client';

import { useEffect } from 'react';

function pushEvent(event, payload = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export default function LeadTracking() {
  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target?.closest?.('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const pagePath = window.location.pathname;

      if (href.startsWith('tel:')) {
        pushEvent('phone_click', { link_url: href, page_path: pagePath });
      } else if (href.includes('wa.me/') || href.includes('api.whatsapp.com/')) {
        pushEvent('whatsapp_click', { link_url: href, page_path: pagePath });
      } else if (href.startsWith('mailto:')) {
        pushEvent('email_click', { link_url: href, page_path: pagePath });
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
