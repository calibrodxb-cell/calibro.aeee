import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <SiteNav />
      <main style={{ minHeight: '78vh', padding: '170px 20px 110px', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 24 }}>404</div>
          <h1 style={{ margin: 0, fontSize: 'clamp(54px, 10vw, 140px)', lineHeight: 0.9, letterSpacing: '-0.06em' }}>Page not found.</h1>
          <p style={{ maxWidth: 520, margin: '36px auto 0', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
            The page may have moved or the address may be incorrect.
          </p>
          <Link href="/" style={{ display: 'inline-block', marginTop: 42, padding: '14px 28px', border: '1px solid var(--color-text)', borderRadius: 999, color: 'var(--color-text)' }}>
            Return home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
