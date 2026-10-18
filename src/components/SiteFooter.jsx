'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Anchor sections (#collection, #about, #contact) only exist on the homepage,
// so from any other route these need to link back to "/" with the hash —
// plain "#collection" would just silently do nothing on e.g. /projects.
function SectionLink({ hash, children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return isHome ? <a href={hash}>{children}</a> : <Link href={`/${hash}`}>{children}</Link>;
}

export default function SiteFooter() {
  return (
    <footer className="site-footer" style={{ paddingTop: 90, overflow: 'hidden' }}>
      <div className="site-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48, width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 22, fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Calibro.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
          <Link href="/products">Products</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/our-factory">Our Factory</Link>
          <Link href="/services">Services</Link>
          <SectionLink hash="#contact">Contact</SectionLink>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
          <div>1, Jebel Ali Industrial Area</div>
          <div>47th Street, Dubai, UAE</div>
          <a href="tel:+971586045588" style={{ marginTop: 8 }}>+971 58 604 5588</a>
          <a href="mailto:info@calibro.ae">info@calibro.ae</a>
        </div>
      </div>
      <div className="site-footer-legal" style={{ width: '100%', margin: '64px 0 0', padding: '24px 20px 0', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color-text-faint)' }}>
        <div>&copy; 2026 Calibro. All rights reserved.</div>
        <Link href="/privacy-policy">Privacy</Link>
      </div>
      <div style={{ width: '100%', textAlign: 'center', whiteSpace: 'nowrap', fontSize: '25vw', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '-0.055em', color: 'var(--color-text)', lineHeight: 0.78, marginTop: 28, userSelect: 'none' }}>Calibro.</div>
    </footer>
  );
}
