'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { PROJECTS } from '../data/projects.js';
import useSmoothScroll from '../hooks/useSmoothScroll.js';

const accent = 'var(--color-accent)';

const CATEGORIES = ['All', 'Residential', 'Hospitality', 'Corporate'];

export default function Projects() {
  useSmoothScroll();
  const [active, setActive] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <div className="projects-page" style={{ position: 'relative', background: 'var(--color-bg)' }}>
      <SiteNav />

      <section style={{ width: '100%', boxSizing: 'border-box', padding: '172px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>Selected Work</div>
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, fontSize: 'clamp(32px, 4.6vw, 60px)', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1 }}>Our Projects.</h1>
          <p style={{ margin: '0 0 6px', fontSize: 16, lineHeight: 1.7, color: 'var(--color-text-muted)', maxWidth: '42ch' }}>
            A selection of custom furniture manufacturing projects delivered across the UAE and GCC — from private residences to hospitality and corporate fit-outs.
          </p>
        </div>
      </section>

      <section style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--color-sticky-bg)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderBottom: '1px solid var(--color-border-soft)', marginTop: 56 }}>
        <div style={{ width: '100%', boxSizing: 'border-box', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 8px', fontFamily: 'inherit',
                  fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
                  color: c === active ? 'var(--color-text)' : 'var(--color-text-faint)',
                  borderBottom: c === active ? '1px solid var(--color-text)' : '1px solid transparent'
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12, letterSpacing: '0.04em', color: 'var(--color-text-faint)' }}>{filtered.length} projects</div>
        </div>
      </section>

      <section style={{ maxWidth: 1560, margin: '0 auto', padding: '64px 6vw 40px' }}>
        <div className="projects-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px 16px' }}
          onMouseLeave={() => setHoveredId(null)}
        >
          {filtered.map(p => {
            const isHovered = hoveredId === p.id;
            const isDimmed = hoveredId !== null && !isHovered;
            return (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                onMouseEnter={() => setHoveredId(p.id)}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  zIndex: isHovered ? 2 : 1,
                  cursor: 'pointer',
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 400ms cubic-bezier(.16,1,.3,1)'
                }}
              >
                <div style={{ width: '100%', aspectRatio: '4 / 5', overflow: 'hidden', position: 'relative', boxShadow: isHovered ? '0 24px 48px -16px rgba(0,0,0,0.35)' : 'none', transition: 'box-shadow 400ms cubic-bezier(.16,1,.3,1)' }}>
                  <div className="zoom-06" style={{ width: '100%', height: '100%' }}>
                    <img src={p.cover} alt={`${p.name} — ${p.category.toLowerCase()} project`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                  </div>
                  {/* Grey-white film over the image only — dims everything except
                      the hovered card, without touching the rest of the page. */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'var(--color-dim-overlay)',
                      opacity: isDimmed ? 1 : 0,
                      transition: 'opacity 400ms cubic-bezier(.16,1,.3,1)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
                <div style={{ marginTop: 18 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ marginTop: 6, fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>
                    {p.category} &middot; {p.location}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section style={{ padding: '90px 6vw 170px', textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, letterSpacing: '-0.01em' }}>Have a project in mind?</h2>
        <p style={{ margin: '16px 0 40px', fontSize: 17, color: 'var(--color-text-muted)', maxWidth: '46ch', marginLeft: 'auto', marginRight: 'auto' }}>
          Tell us about your brief and timeline — we'll walk you through how we scope, manufacture, and deliver.
        </p>
        <a
          href="/#contact"
          className="btn-quote"
          style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em', color: 'var(--color-on-accent)', background: accent, padding: '16px 32px', borderRadius: '2px', transition: 'background 250ms ease' }}
        >
          Request a quote
        </a>
      </section>

      <SiteFooter />
    </div>
  );
}
