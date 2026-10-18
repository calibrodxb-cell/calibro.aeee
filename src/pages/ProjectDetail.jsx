'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { PROJECTS } from '../data/projects.js';
import useSmoothScroll from '../hooks/useSmoothScroll.js';

const accent = 'var(--color-accent)';
const SECTION_IDS = ['meta', 'gallery', 'next', 'cta'];

export default function ProjectDetail({ id }) {
  const index = PROJECTS.findIndex(p => p.id === id);

  const [revealed, setRevealed] = useState({});
  const [galleryRevealed, setGalleryRevealed] = useState({});
  const sectionRefs = useRef({});
  const galleryRefs = useRef([]);

  // Slower, heavier page scroll — shared site-wide tuning, see the hook.
  useSmoothScroll();

  // Section-level reveal (meta/description, gallery heading, next-project,
  // CTA) — same fade-up-on-scroll pattern used across the homepage.
  useEffect(() => {
    setRevealed({});
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sid = entry.target.getAttribute('data-reveal-id');
          setRevealed(s => ({ ...s, [sid]: true }));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    SECTION_IDS.forEach(sid => {
      const node = sectionRefs.current[sid];
      if (node) { node.setAttribute('data-reveal-id', sid); observer.observe(node); }
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Per-photo reveal for the gallery — each tile fades/lifts in as it
  // crosses into view, staggered slightly by column for a cascading feel.
  useEffect(() => {
    setGalleryRevealed({});
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-gallery-index'));
          setGalleryRevealed(s => ({ ...s, [idx]: true }));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    galleryRefs.current.forEach((node, i) => {
      if (node) { node.setAttribute('data-gallery-index', String(i)); observer.observe(node); }
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (index === -1) return null;

  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const meta = [
    { label: 'Category', value: project.category },
    { label: 'Location', value: project.location },
    { label: 'Size', value: project.size },
    project.designer && { label: 'Interior Design', value: project.designer }
  ].filter(Boolean);

  const revealStyle = sid => {
    const on = !!revealed[sid];
    return {
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(30px)',
      transition: 'opacity 1000ms cubic-bezier(.16,1,.3,1), transform 1000ms cubic-bezier(.16,1,.3,1)'
    };
  };

  const galleryTileStyle = i => {
    const on = !!galleryRevealed[i];
    const delay = (i % 2) * 90;
    return {
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(36px)',
      transition: `opacity 800ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 800ms cubic-bezier(.16,1,.3,1) ${delay}ms`
    };
  };

  return (
    <div className="project-detail-page" style={{ position: 'relative', background: 'var(--color-bg)' }}>
      <SiteNav />

      {/* HERO — full-bleed cover photo, name bottom-left, same treatment as the homepage hero video. */}
      <section className="project-detail-hero" style={{ position: 'relative', height: '100vh', minHeight: 640, width: '100%' }}>
        <img
          src={project.cover}
          alt={`${project.name} — cover`}
          loading="eager"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, oklch(0.15 0.02 50 / 0.25) 0%, oklch(0.15 0.02 50 / 0.05) 40%, oklch(0.1 0.02 50 / 0.72) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '6vw', bottom: 72, right: '6vw' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(0.92 0.01 65 / 0.85)', marginBottom: 20 }}>
            <Link href="/projects" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</Link> &nbsp;/&nbsp; {project.category}
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(34px, 5.4vw, 72px)', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.02, color: 'oklch(0.98 0.004 75)', maxWidth: '18ch', textShadow: '0 2px 24px oklch(0.1 0.02 50 / 0.35)' }}>
            {project.name}
          </h1>
        </div>
      </section>

      {/* META + DESCRIPTION */}
      <section ref={el => (sectionRefs.current.meta = el)} style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 6vw 0', ...revealStyle('meta') }}>
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', paddingBottom: 56, borderBottom: '1px solid var(--color-border-soft)' }}>
          {meta.map(m => (
            <div key={m.label}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: 8 }}>{m.label}</div>
              <div style={{ fontSize: 15, color: 'var(--color-text)' }}>{m.value}</div>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 48, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {project.description.map((paragraph, i) => (
            <p key={i} style={{ margin: 0, fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.75, fontWeight: 300, color: 'var(--color-text-secondary)', maxWidth: '70ch' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* GALLERY — portrait-first grid, sized for the mostly-portrait project
          photography (unlike the wide/landscape placeholders in the original
          prototype). Every photo in the project's folder is shown, each
          tile fading/lifting in as it scrolls into view. */}
      <section style={{ maxWidth: 1560, margin: '0 auto', padding: '110px 6vw 60px' }}>
        <div ref={el => (sectionRefs.current.gallery = el)} style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 40, ...revealStyle('gallery') }}>
          Gallery &mdash; {project.images.length} photos
        </div>
        <div className="project-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {project.images.map((src, i) => (
            <div
              key={src}
              ref={el => (galleryRefs.current[i] = el)}
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                gridColumn: i % 5 === 0 ? 'span 2' : 'span 1',
                ...galleryTileStyle(i)
              }}
            >
              <img
                src={src}
                alt={`${project.name} — photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="project-gallery-image"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section ref={el => (sectionRefs.current.next = el)} style={{ maxWidth: 1560, margin: '0 auto', padding: '40px 6vw 60px', borderTop: '1px solid var(--color-border-soft)', ...revealStyle('next') }}>
        <Link
          href={`/projects/${next.id}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, textDecoration: 'none', color: 'inherit', paddingTop: 56, paddingBottom: 8 }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: 14 }}>Next Project</div>
            <div style={{ fontSize: 'clamp(26px, 3.4vw, 42px)', fontWeight: 600, letterSpacing: '-0.01em' }}>{next.name}</div>
          </div>
          <div style={{ fontSize: 26, color: accent }}>&rarr;</div>
        </Link>
      </section>

      <section ref={el => (sectionRefs.current.cta = el)} style={{ padding: '20px 6vw 170px', textAlign: 'center', ...revealStyle('cta') }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, letterSpacing: '-0.01em' }}>Have a project in mind?</h2>
        <p style={{ margin: '16px 0 40px', fontSize: 17, color: 'var(--color-text-muted)', maxWidth: '46ch', marginLeft: 'auto', marginRight: 'auto' }}>
          Tell us about your brief and timeline &mdash; we&rsquo;ll walk you through how we scope, manufacture, and deliver.
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
