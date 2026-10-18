'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import useSmoothScroll from '../hooks/useSmoothScroll.js';

const accent = 'var(--color-accent)';

import { PRODUCTS } from '../data/products.js';

const SECTION_IDS = ['gallery', 'info', 'lifestyle', 'materials', 'dimensions', 'story', 'related'];

export default function ProductDetail({ id }) {
  useSmoothScroll();

  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [imgFade, setImgFade] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [selectedBase, setSelectedBase] = useState(1);
  const [revealed, setRevealed] = useState({});
  const sectionRefs = useRef({});

  const selectImg = (i) => {
    if (i === mainImgIndex) return;
    setImgFade(true);
    setTimeout(() => {
      setMainImgIndex(i);
      setImgFade(false);
    }, 180);
  };

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
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    SECTION_IDS.forEach(sid => {
      const node = sectionRefs.current[sid];
      if (node) { node.setAttribute('data-reveal-id', sid); observer.observe(node); }
    });

    return () => observer.disconnect();
  }, [id]);

  const revealStyle = sid => {
    const on = !!revealed[sid];
    return {
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(30px)',
      transition: 'opacity 1000ms cubic-bezier(.16,1,.3,1), transform 1000ms cubic-bezier(.16,1,.3,1)'
    };
  };

  const getRingStyle = (isSelected) => isSelected
    ? { boxShadow: '0 0 0 2px var(--color-bg), 0 0 0 3px var(--color-text)', border: 'none' }
    : { boxShadow: 'inset 0 0 0 1px var(--color-border)' };

  const p = PRODUCTS.find(prod => prod.id === id);
  if (!p) {
    return (
      <div style={{ position: 'relative', background: 'var(--color-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SiteNav />
        <h1 style={{ fontSize: 40, color: 'var(--color-text)' }}>Product not found</h1>
      </div>
    );
  }

  return (
    <div className="product-detail-page" style={{ position: 'relative', background: 'var(--color-bg)', minHeight: '100vh' }}>
      <SiteNav />

      {/* DETAIL SPLIT */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 160, paddingBottom: 80 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 lg:gap-12 items-center w-full max-w-[1920px] mx-auto">
          
          {/* GALLERY (70%) */}
          <div ref={el => (sectionRefs.current.gallery = el)} style={revealStyle('gallery')} className="w-full flex flex-col items-center justify-center">
            <div style={{ position: 'relative', width: '85%', maxWidth: 900, aspectRatio: '1/1', background: 'transparent', overflow: 'hidden' }}>
              <div style={{ opacity: imgFade ? 0 : 1, transition: 'opacity 250ms ease', width: '100%', height: '100%', mixBlendMode: 'multiply' }}>
                 <ImageSlot placeholder={p.images[mainImgIndex].label} src={p.images[mainImgIndex].src} style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 40, justifyContent: 'center' }}>
              {p.images.map((im, i) => (
                <div 
                  key={i} 
                  onClick={() => selectImg(i)}
                  style={{ 
                    width: 50, height: 50, 
                    background: 'transparent', 
                    position: 'relative', 
                    cursor: 'pointer',
                    transition: 'opacity 300ms ease, transform 200ms ease',
                    opacity: i === mainImgIndex ? 1 : 0.35,
                    transform: i === mainImgIndex ? 'scale(1.1)' : 'scale(1)'
                  }}
                  onMouseEnter={e => { if (i !== mainImgIndex) e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={e => { if (i !== mainImgIndex) e.currentTarget.style.opacity = '0.35'; }}
                >
                  <div style={{ width: '100%', height: '100%', mixBlendMode: 'multiply' }}>
                    <ImageSlot src={im.src} placeholder="" style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS (30%) */}
          <div ref={el => (sectionRefs.current.info = el)} className="px-[6vw] lg:px-0 lg:pr-[8vw]" style={revealStyle('info')}>
            <h1 style={{ margin: 0, fontSize: 'clamp(36px, 3.5vw, 52px)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {p.brand}
            </h1>
            <div style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 400, color: 'var(--color-text-secondary)', marginBottom: 28, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {p.name}
            </div>
            
            <p style={{ margin: '0 0 40px', fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-muted)', maxWidth: 460 }}>
              {p.description}
            </p>

            <Link href="/#contact" style={{
              display: 'inline-block',
              background: '#333333',
              color: '#ffffff',
              padding: '14px 28px',
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'background 200ms ease'
            }}>
              Ask for information
            </Link>
          </div>
        </div>
      </section>

      {/* FULL-BLEED LIFESTYLE */}
      <section style={{ padding: '60px 0 0' }}>
        <div className="product-lifestyle" ref={el => (sectionRefs.current.lifestyle = el)} style={{ width: '100%', height: 820, position: 'relative', overflow: 'hidden', background: 'var(--color-border-soft)', ...revealStyle('lifestyle') }}>
           <ImageSlot src={p.lifestyleImage} placeholder={`lifestyle — ${p.brand} in a styled setting`} style={{ objectFit: 'cover' }} />
        </div>
      </section>

      {/* MATERIALS & FINISHES */}
      <section ref={el => (sectionRefs.current.materials = el)} style={{ maxWidth: 1380, margin: '0 auto', padding: '120px 6vw 40px', ...revealStyle('materials') }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 600, letterSpacing: '-0.01em' }}>
          Materials &amp; <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text-muted)' }}>finishes</span>
        </h2>
        <p style={{ margin: '0 0 56px', fontSize: 16, lineHeight: 1.8, color: 'var(--color-text-secondary)', maxWidth: 560 }}>
          Every {p.brand} is upholstered and finished by hand. Choose from our curated palette of fabrics, leathers and base finishes — or enquire about a bespoke material of your own.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 28 }}>
          {p.materials.map((m, i) => (
            <div key={i}>
              <div style={{ aspectRatio: '1/1', borderRadius: 4, background: m.color, marginBottom: 14 }}></div>
              <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--color-text)' }}>{m.name}</div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginTop: 4 }}>{m.type}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DIMENSIONS */}
      <section style={{ maxWidth: 1380, margin: '0 auto', padding: '96px 6vw 40px' }}>
        <div className="product-dimensions-layout">
          <div ref={el => (sectionRefs.current.story = el)} style={revealStyle('story')}>
            <h2 style={{ margin: '0 0 32px', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 600, letterSpacing: '-0.01em' }}>Dimensions</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {p.dimensions.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--color-border-soft)', fontSize: 15 }}>
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{d.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div ref={el => (sectionRefs.current.dimensions = el)} className="product-dimensions-card" style={revealStyle('dimensions')}>
            <ImageSlot src={p.measurementsImage} placeholder={`measurements — ${p.brand}`} style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* DESIGNER STORY */}
      <section style={{ padding: '120px 0' }}>
        <div className="product-story-grid" style={{ maxWidth: 1380, margin: '0 auto', padding: '0 6vw', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 72, alignItems: 'center' }}>
          <div style={{ aspectRatio: '3/4', background: 'var(--color-border-soft)', position: 'relative', borderRadius: 4 }}>
             <ImageSlot placeholder="portrait — Atelier Calibro" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 22 }}>The story</div>
            <h2 style={{ margin: '0 0 26px', fontSize: 'clamp(30px, 3.8vw, 44px)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 }}>An unorthodox silhouette, refined over fifty years.</h2>
            <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
              Faro began as a study in repose — a shell drawn to cradle the body, set on a base turned so fine it almost disappears. The contrast between mass and line is what gives the chair its quiet presence.
            </p>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
              Like every Calibro piece, it is made to order, allowing the craft to meet the room it is destined for.
            </p>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section ref={el => (sectionRefs.current.related = el)} style={{ maxWidth: 1560, margin: '0 auto', padding: '40px 6vw 120px', ...revealStyle('related') }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Complete the <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text-muted)' }}>collection</span>
          </h2>
          <Link href="/products" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text)', textDecoration: 'none' }}>
            View all &rarr;
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 36 }}>
          {p.related.map(r => (
            <Link key={r.id} href={`/products/${r.id}`} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', background: 'transparent', overflow: 'hidden', borderRadius: 4 }}>
                 <div className="zoom-045" style={{ width: '100%', height: '100%', transition: 'transform 600ms cubic-bezier(.2,.6,.2,1)' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
                 >
                   <ImageSlot placeholder={`render ${r.brand}`} />
                 </div>
              </div>
              <div style={{ marginTop: 18, fontSize: 20, color: 'var(--color-text)' }}>
                <span style={{ fontWeight: 600 }}>{r.brand}</span> <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>{r.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
