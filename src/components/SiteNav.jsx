'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.jsx';

// Anchor sections (#collection, #about, #contact) only exist on the homepage,
// so from any other route these need to link back to "/" with the hash —
// plain "#collection" would just silently do nothing on e.g. /projects.
function SectionLink({ hash, className, style, children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return isHome
    ? <a href={hash} className={className} style={style}>{children}</a>
    : <Link href={`/${hash}`} className={className} style={style}>{children}</Link>;
}

// Continuous light↔dark control — a draggable dot on a track between a sun
// and a moon, replacing the old click-to-flip toggle. `value` is 0 (light)
// .. 1 (dark). Uses pointer capture so dragging keeps tracking even if the
// pointer strays off the track, without needing document-level listeners.
function ThemeSlider({ value, onChange }) {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = (clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    onChange(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
  };

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const stopDragging = () => {
    draggingRef.current = false;
    setIsDragging(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') onChange(Math.max(0, value - 0.05));
    else if (e.key === 'ArrowRight') onChange(Math.min(1, value + 0.05));
    else if (e.key === 'Home') onChange(0);
    else if (e.key === 'End') onChange(1);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Sun size={14} strokeWidth={1.75} style={{ flexShrink: 0, color: 'var(--color-text)', opacity: 1 - value * 0.55 }} />
      <div
        ref={trackRef}
        role="slider"
        aria-label="Light / dark theme"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative', width: 128, height: 26, cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none',
          display: 'flex', alignItems: 'center'
        }}
      >
        <div style={{ position: 'absolute', left: 0, right: 0, height: 3, borderRadius: 999, background: 'var(--color-border)' }} />
        <div
          style={{
            position: 'absolute', top: '50%', left: `${value * 100}%`, width: 14, height: 14, borderRadius: '50%',
            background: 'color-mix(in srgb, var(--color-nav-bg), var(--color-text) 38%)', transform: 'translate(-50%, -50%)',
            boxShadow: '0 1px 3px rgba(17,17,26,0.35)',
            transition: isDragging
              ? 'background-color 300ms ease, box-shadow 300ms ease'
              : 'left 160ms cubic-bezier(.22,1,.36,1), background-color 300ms ease, box-shadow 300ms ease'
          }}
        />
      </div>
      <Moon size={14} strokeWidth={1.75} style={{ flexShrink: 0, color: 'var(--color-text)', opacity: 0.45 + value * 0.55 }} />
    </div>
  );
}

// Shared nav for every page — floating glass pill, identical everywhere.
// `hidden` is a homepage-only concern: it hides again over the
// Spotlight/Projects sections further down the page. `sticky` is also
// homepage-only: rendered between the intro-statement section and the hero,
// it sits in its natural flow position (roughly mid-screen on load, right
// where the hero begins) until scrolling carries it up to `top`, at which
// point it sticks there for the rest of the page — no scroll needed to see
// it, and no separate "always fixed" logic required. Other pages render it
// plain `fixed`, always in place from the first frame.
export default function SiteNav({ hidden = false, sticky = false, entranceVisible = true }) {
  const pathname = usePathname();
  const { themeValue, setThemeValue } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // `position: sticky` only honours left/right/top offsets once the
  // element is actually stuck — while it's still sitting in its normal
  // flow position (i.e. everything before that point), those offsets are
  // ignored entirely. So the usual `left: 50%` + `translateX(-50%)`
  // centering trick (which `fixed` always applies) silently does nothing
  // pre-stick and the nav renders flush left. `margin: 0 auto` centers a
  // block-level box regardless of stuck state, so that's what the sticky
  // variant uses instead — no `left` involved, only a vertical transform
  // for the hidden/shown toggle.
  // marginTop only affects the nav's natural (pre-stick) resting spot —
  // nudges it a bit further down from the intro section above rather than
  // sitting flush against it. Once actually stuck, `top` alone governs its
  // position, so this has no effect on the stuck state.
  const positionStyle = sticky
  ? { position: 'sticky', margin: '0 auto' }
  : { position: 'fixed', left: '50%' };
  const verticalPosition = hidden ? '-140%' : entranceVisible ? '0' : '110%';
  const hideTransform = sticky
    ? `translateY(${verticalPosition})`
    : `translate(-50%, ${verticalPosition})`;

  return (
    <nav
      className={`site-nav-glass${mobileOpen ? ' is-open' : ''}`}
      style={{
        ...positionStyle, top: 24, zIndex: 30, width: 'calc(100% - clamp(24px, 3vw, 48px))',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        padding: '6px 32px',
        marginBottom: "24px",
        borderRadius: 999,
        background: 'var(--color-nav-bg)',
        backdropFilter: 'blur(16px) saturate(150%) brightness(1.04)',
        WebkitBackdropFilter: 'blur(16px) saturate(150%) brightness(1.04)',
        boxShadow: '0 1px 1px rgba(17,17,26,0.04), 0 8px 24px rgba(17,17,26,0.06), inset 0 1px 0 rgba(255,255,255,0.55)',
        opacity: hidden || !entranceVisible ? 0 : 1,
        transform: hideTransform,
        transition: 'opacity 1400ms cubic-bezier(.16,1,.3,1), transform 1400ms cubic-bezier(.16,1,.3,1), background-color 300ms ease',
        pointerEvents: hidden || !entranceVisible ? 'none' : 'auto'
      }}
    >
      <Link
        href="/"
        style={{
          justifySelf: 'start', alignSelf: 'center', lineHeight: 1, fontSize: '19px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '-0.01em',
          whiteSpace: 'nowrap', color: 'var(--color-text)'
        }}
      >
        Calibro.
      </Link>
      <div className={`site-nav-links${mobileOpen ? ' is-open' : ''}`} style={{ justifySelf: 'center', alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 34, lineHeight: 1, fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: 'var(--color-text)' }}>
         <SectionLink hash="#about" className="nav-link">About</SectionLink>
        <Link href="/products" className={`nav-link${pathname === '/products' ? ' current' : ''}`}>Products</Link>
        <Link href="/projects" className={`nav-link${pathname === '/projects' ? ' current' : ''}`}>Projects</Link>
        <Link href="/our-factory" className={`nav-link${pathname === '/our-factory' ? ' current' : ''}`}>Our Factory</Link>
        <Link href="/services" className={`nav-link${pathname === '/services' ? ' current' : ''}`}>Services</Link>
       
        
      </div>
      <div className="site-nav-actions" style={{ justifySelf: 'end', alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 22 }}>
        <SectionLink
          hash="#contact"
          className="nav-link"
          style={{ lineHeight: 1, fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: 'var(--color-text)' }}
        >
          Contact us
        </SectionLink>
        <ThemeSlider value={themeValue} onChange={setThemeValue} />
      </div>
      <button className="site-nav-menu" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(v => !v)}>
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </nav>
  );
}
