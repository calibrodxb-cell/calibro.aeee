'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import ImageSlot from './components/ImageSlot.jsx';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack.jsx';
import AccordionGallery from './components/AccordionGallery.jsx';
import DomeGallery from './components/DomeGallery.jsx';
import TextLoop from './components/TextLoop.jsx';
import ContactForm from './components/ContactForm.jsx';
import SiteNav from './components/SiteNav.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import { useTheme } from './hooks/useTheme.jsx';

const REVEAL_IDS = ['introStatement', 'statement', 'philosophyMedia', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'armchairs', 'promise', 'aboutIntro', 'aboutWhy', 'cta', 'contactSection'];

// Homepage-only body background — a neutral, cool two-stop gradient whose
// colors slide continuously between light and dark mode with no pink cast.
// Overriding --color-bg on the page
// root (rather than touching every section) lets every section that
// already paints itself with `background: var(--color-bg)` pick this up
// automatically via the CSS cascade.
const HOMEPAGE_BG_LIGHT_START = [192, 206, 225];
const HOMEPAGE_BG_DARK_START = [40, 52, 75];
const HOMEPAGE_BG_LIGHT_END = [244, 246, 249];
const HOMEPAGE_BG_DARK_END = [18, 24, 36];
function mixChannel(a, b, t) { return Math.round(a + (b - a) * t); }
function homepageStartColor(themeValue) {
  const [r, g, b] = HOMEPAGE_BG_LIGHT_START.map((c, i) => mixChannel(c, HOMEPAGE_BG_DARK_START[i], themeValue));
  return `rgb(${r}, ${g}, ${b})`;
}
function homepageEndColor(themeValue) {
  const [r, g, b] = HOMEPAGE_BG_LIGHT_END.map((c, i) => mixChannel(c, HOMEPAGE_BG_DARK_END[i], themeValue));
  return `rgb(${r}, ${g}, ${b})`;
}
function homepageBgGradient(themeValue) {
  return `linear-gradient(${homepageStartColor(themeValue)}, ${homepageEndColor(themeValue)})`;
}
function homepageThemeTokens(themeValue) {
  const dark = themeValue >= 0.5;
  return dark ? {
    '--color-text': 'rgb(250, 248, 245)',
    '--color-text-secondary': 'rgba(250, 248, 245, 0.86)',
    '--color-text-muted': 'rgba(250, 248, 245, 0.74)',
    '--color-text-faint': 'rgba(250, 248, 245, 0.62)',
    '--color-border': 'rgba(255, 255, 255, 0.3)',
    '--color-border-soft': 'rgba(255, 255, 255, 0.2)',
    '--color-surface': 'rgba(20, 28, 44, 0.42)',
    '--color-input-bg': 'rgba(20, 28, 44, 0.52)',
    '--color-accent': 'rgb(255, 216, 198)',
    '--color-accent-hover': 'rgb(255, 239, 231)',
    '--color-on-accent': 'rgb(35, 29, 35)'
  } : {
    '--color-text': 'rgb(20, 28, 42)',
    '--color-text-secondary': 'rgb(35, 47, 66)',
    '--color-text-muted': 'rgb(49, 64, 85)',
    '--color-text-faint': 'rgb(67, 83, 105)',
    '--color-border': 'rgba(20, 28, 42, 0.32)',
    '--color-border-soft': 'rgba(20, 28, 42, 0.2)',
    '--color-surface': 'rgba(255, 255, 255, 0.34)',
    '--color-input-bg': 'rgba(255, 255, 255, 0.48)',
    '--color-accent': 'rgb(105, 42, 59)',
    '--color-accent-hover': 'rgb(73, 27, 42)',
    '--color-on-accent': 'rgb(255, 250, 247)'
  };
}
const ABOUT_STATS = [
  { label: 'Pricing', desc: 'Competitive, transparent pricing — no hidden margins.' },
  { label: 'Quality', desc: 'Factory inspections and rigorous sign-off on every order.' },
  { label: 'Timelines', desc: 'Speed and efficiency, from assembly to delivery.' }
];
const WHY_CHOOSE = [
  { label: 'Single point of accountability', desc: 'One team manages your entire procurement journey, start to finish.' },
  { label: '18+ years of expertise', desc: 'Deep experience in UAE customs, approvals, and delivery standards.' },
  { label: 'Comprehensive aftercare', desc: 'Post-installation support and warranty handled directly by us.' }
];
// Lifestyle renders picked from public/ARM CHAIRS (see scripts/generate-arm-chair-thumbs.mjs
// for how these were resized down from 2-7MB source PNGs).
const ARMCHAIR_ITEMS = [
  { image: '/arm-chairs-thumbs/arm-chair-01.jpg', label: '' },
  { image: '/arm-chairs-thumbs/arm-chair-02.jpg', label: '' },
  { image: '/arm-chairs-thumbs/arm-chair-03.jpg', label: '' },
  { image: '/arm-chairs-thumbs/arm-chair-04.jpg', label: '' },
  { image: '/arm-chairs-thumbs/arm-chair-05.jpg', label: '' },
  { image: '/arm-chairs-thumbs/arm-chair-06.jpg', label: '' },
  { image: '/arm-chairs-thumbs/arm-chair-07.jpg', label: '' },
  { image: '/arm-chairs-thumbs/arm-chair-08.jpg', label: '' }
];
const STAGGER = { item1: 0, item2: 90, item3: 90, item4: 0, item5: 90, item6: 90 };
// Sourced from PROJECTS-thumbs (see scripts/generate-gallery-thumbs.mjs) — the
// PROJECTS originals here are 15-18MB camera files that stalled scrolling
// while this scroll-pinned section was in view.
const SPOTLIGHT_ITEMS = [
  { id: 'spot-dorsale', label: '001 STYLING', name: 'Dorsale', category: 'Sofa', placeholder: 'Dorsale — full-bleed detail', image: '/optimized/spot1.webp' },
  { id: 'spot-piana', label: '002 CALIBRO', name: 'Piana', category: 'Lounge chair', placeholder: 'Piana — full-bleed detail', image: '/optimized/spot2.webp', mobileImage: '/spot2mobile.png' },
  { id: 'spot-tavolo', label: '003 FF&E', name: 'Tavolo Massello', category: 'Table', placeholder: 'Tavolo Massello — full-bleed detail', image: '/optimized/spot3.webp' },
  { id: 'spot-quattro', label: '004 BESPOKE FURNITURE', name: 'Quattro', category: 'Collection', placeholder: 'Quattro — full-bleed detail', image: '/optimized/spot44.webp', mobileImage: '/spot4mobile.png' }
];
const SPOTLIGHT_COLORS = ['#49111C', '#1B2F6B', '#BDBDBD', '#333333'];

// Random pick (3 per project folder) from public/PROJECTS — the originals
// there are already web-sized, so used as-is with no further compression.
// Feeds the DomeGallery in the Projects section; DomeGallery cycles a
// smaller pool to fill its ~175 dome tiles, same as its own default image set.
const PROJECT_GALLERY_IMAGES = [
  { src: '/PROJECTS/New folder (3)/123.jpg', alt: 'SO/Uptown Tower — hospitality project' },
  { src: '/PROJECTS/New folder (3)/QEQW.jpg', alt: 'SO/Uptown Tower — hospitality project' },
  { src: '/PROJECTS/New folder (3)/2343.jpg', alt: 'SO/Uptown Tower — hospitality project' },
  { src: '/PROJECTS/New folder (4)/Penthouse-40.jpg', alt: 'Il Primo Tower Penthouse — residential project' },
  { src: '/PROJECTS/New folder (4)/Penthouse-86.jpg', alt: 'Il Primo Tower Penthouse — residential project' },
  { src: '/PROJECTS/New folder (4)/Penthouse-7.jpg', alt: 'Il Primo Tower Penthouse — residential project' },
  { src: '/PROJECTS/New folder (6)/SADA.jpg', alt: 'Private Office — corporate project' },
  { src: '/PROJECTS/New folder (6)/12321DSA.jpg', alt: 'Private Office — corporate project' },
  { src: '/PROJECTS/New folder (6)/123221.jpg', alt: 'Private Office — corporate project' },
  { src: '/PROJECTS/New folder (7)/9.jpg', alt: 'Calibro project' },
  { src: '/PROJECTS/New folder (7)/1.jpg', alt: 'Calibro project' },
  { src: '/PROJECTS/New folder (7)/12.jpg', alt: 'Calibro project' },
  { src: '/PROJECTS/New folder (8)/Bleu-4.jpg', alt: 'Grand Blu Tower 1 — residential project' },
  { src: '/PROJECTS/New folder (8)/Bleu-50.jpg', alt: 'Grand Blu Tower 1 — residential project' },
  { src: '/PROJECTS/New folder (8)/Bleu-17.jpg', alt: 'Grand Blu Tower 1 — residential project' },
  { src: '/PROJECTS/New folder (9)/5.jpg', alt: 'Calibro project' },
  { src: '/PROJECTS/New folder (9)/2.jpg', alt: 'Calibro project' },
  { src: '/PROJECTS/New folder (9)/3.jpg', alt: 'Calibro project' },
  { src: '/PROJECTS/VILLA/10.JPG', alt: 'Study House — residential project' },
  { src: '/PROJECTS/VILLA/25.JPG', alt: 'Study House — residential project' },
  { src: '/PROJECTS/VILLA/7.JPG', alt: 'Study House — residential project' },
  { src: '/PROJECTS/duabi hills fairways/3.jpg', alt: 'Dubai Hills Fairways — residential project' },
  { src: '/PROJECTS/duabi hills fairways/9.jpg', alt: 'Dubai Hills Fairways — residential project' },
  { src: '/PROJECTS/duabi hills fairways/8.jpg', alt: 'Dubai Hills Fairways — residential project' },
  { src: '/PROJECTS/dubai hills Grove/4.jpg', alt: 'Emerald Hills — residential project' },
  { src: '/PROJECTS/dubai hills Grove/5.jpg', alt: 'Emerald Hills — residential project' },
  { src: '/PROJECTS/dubai hills Grove/1.jpg', alt: 'Emerald Hills — residential project' }
];

const accent = 'var(--color-accent)';

// Homepage visual system only. Scoped classes prevent accidental changes to
// SiteNav, ContactForm, SiteFooter, or other routes. No interaction logic here.
const CALIBRO_HOME_DESIGN_CSS = `
  .homepage-shell .calibro-home-hero { isolation: isolate; }
  .homepage-shell .calibro-hero-content {
    position: absolute;
    left: clamp(20px, 2.7vw, 46px);
    right: clamp(20px, 2.7vw, 46px);
    bottom: clamp(73px, 10vh, 115px);
    color: #fff;
    pointer-events: none;
  }
  .homepage-shell .calibro-hero-eyebrow {
    margin: 0 0 12px;
    font-size: clamp(10px, .8vw, 13px);
    font-weight: 600;
    letter-spacing: .14em;
    text-transform: uppercase;
  }
  .homepage-shell .calibro-hero-title {
    margin: 0;
    font-size: clamp(44px, 7.65vw, 132px);
    font-weight: 750;
    line-height: .97;
    letter-spacing: -.054em;
    text-transform: uppercase;
    white-space: nowrap;
    text-shadow: 0 2px 22px rgba(0,0,0,.18);
  }
  .homepage-shell .calibro-hero-subtitle {
    margin: 14px 0 22px;
    font-size: clamp(17px, 2.05vw, 30px);
    font-weight: 400;
    line-height: 1.2;
  }
  .homepage-shell .calibro-hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    pointer-events: auto;
  }
  .homepage-shell .calibro-hero-link {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 24px;
    border: 1px solid rgba(255,255,255,.9);
    border-radius: 6px;
    color: #fff;
    font-size: 11px;
    font-weight: 650;
    letter-spacing: .045em;
    text-decoration: none;
    text-transform: uppercase;
    background: rgba(14,18,27,.10);
    transition: color 240ms ease, background 240ms ease, border-color 240ms ease;
  }
  .homepage-shell .calibro-hero-link--primary {
    background: #f7f7f5;
    border-color: #f7f7f5;
    color: #263247;
  }
  .homepage-shell .calibro-hero-link:hover { background: rgba(255,255,255,.20); }
  .homepage-shell .calibro-hero-link--primary:hover { background: #dfdfdd; border-color: #dfdfdd; }
  .homepage-shell .calibro-home-intro { box-sizing: border-box; }
  .homepage-shell .calibro-home-statement { max-width: 1440px; }
  .homepage-shell .calibro-intro-stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(14px, 2.4vw, 42px);
    margin-top: clamp(24px, 3vw, 56px);
  }
  .homepage-shell .calibro-intro-stat {
    padding-top: 14px;
    border-top: 1px solid var(--color-border);
  }
  .homepage-shell .calibro-intro-stat-value {
    display: block;
    font-size: clamp(26px, 3vw, 47px);
    font-weight: 350;
    line-height: 1.05;
    letter-spacing: -.035em;
    color: var(--color-text);
    white-space: nowrap;
  }
  .homepage-shell .calibro-intro-stat-label {
    display: block;
    margin-top: 10px;
    color: var(--color-text-muted);
    font-size: 10px;
    font-weight: 650;
    letter-spacing: .11em;
    text-transform: uppercase;
  }
  .homepage-shell .calibro-collection-detail {
    margin-top: 16px;
    color: var(--color-text-muted);
    font-size: 13px;
    font-weight: 450;
    line-height: 1.6;
  }
  .homepage-shell .calibro-collection-detail--caps {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .025em;
    text-transform: uppercase;
  }
  .homepage-shell .calibro-collection-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding: 12px 18px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    color: #263247;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .055em;
    text-decoration: none;
    text-transform: uppercase;
    transition: background 240ms ease;
  }
  .homepage-shell .calibro-collection-link:hover { background: #eae9e7; }
  .homepage-shell .calibro-focus-topline {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 20px;
  }
  .homepage-shell .calibro-focus-topline .focus-title { margin-bottom: 0 !important; }
  .homepage-shell .calibro-focus-explore {
    color: var(--color-text);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .04em;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-transform: uppercase;
  }
  .homepage-shell .calibro-material-card { min-width: 0; height: 100%; display: flex; flex-direction: column; }
  .homepage-shell .calibro-material-media { position: relative; width: 100%; flex: 1; min-height: 0; overflow: hidden; }
  .homepage-shell .calibro-material-caption {
    margin: 10px 0 0;
    color: var(--color-text-muted);
    font-size: 11px;
    font-weight: 650;
    line-height: 1.25;
    letter-spacing: .05em;
    text-transform: uppercase;
  }
  .homepage-shell .calibro-split-cta {
    display: grid;
    grid-template-columns: minmax(0, .74fr) minmax(0, 1.26fr);
    align-items: center;
    gap: clamp(28px, 3.4vw, 66px);
  }
  .homepage-shell .calibro-split-cta-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: clamp(22px, 4vw, 55px);
  }
  .homepage-shell .calibro-split-cta-title {
    margin: 0;
    font-size: clamp(40px, 4.45vw, 78px);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -.035em;
    text-transform: uppercase;
    color: var(--color-text);
  }
  .homepage-shell .calibro-enquiry-cta {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-width: min(100%, 290px);
    padding: 13px 16px;
    border-radius: 6px;
    background: #fff;
    color: #273248;
    font-size: clamp(13px, 1.3vw, 19px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: .005em;
    text-decoration: none;
    text-transform: uppercase;
    transition: background 240ms ease;
  }
  .homepage-shell .calibro-enquiry-cta:hover { background: #eae9e7; }
  .homepage-shell .calibro-enquiry-arrow { font-size: 31px; font-weight: 400; line-height: .7; }
  .homepage-shell .calibro-tailored-label {
    margin-bottom: 12px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .085em;
    text-transform: uppercase;
  }
  .homepage-shell .calibro-tailored-desc {
    font-size: clamp(14px, 1.1vw, 17px);
    font-weight: 600;
    line-height: 1.28;
  }
  .homepage-shell .calibro-about-grid { display: grid; grid-template-columns: minmax(0, .92fr) minmax(0, 1.3fr); gap: clamp(30px, 5vw, 92px); align-items: end; }
  .homepage-shell .calibro-about-copy { padding-bottom: clamp(0px, 1vw, 25px); }
  .homepage-shell .calibro-about-grid .about-calibro-image-wrap { min-width: 0; }
  .homepage-shell .calibro-about-grid .about-calibro-copy { min-width: 0; }
  .homepage-shell .calibro-info-grid > div { border-top: 1px solid var(--color-border-soft); }

  @media (max-width: 1050px) {
    .homepage-shell .calibro-hero-title { font-size: clamp(40px, 7.25vw, 78px); }
    .homepage-shell .calibro-split-cta-title { font-size: clamp(32px, 4.2vw, 55px); }
  }
  @media (max-width: 767px) {
    .homepage-shell .calibro-hero-title { font-size: clamp(34px, 9vw, 70px); white-space: normal; max-width: 12ch; }
    .homepage-shell .calibro-hero-content { bottom: 84px; }
    .homepage-shell .calibro-hero-subtitle { font-size: 18px; margin: 16px 0 20px; }
    .homepage-shell .calibro-hero-link { padding: 11px 14px; font-size: 10px; min-height: 40px; }
    .homepage-shell .calibro-home-intro { padding: 65px 20px 45px !important; }
    .homepage-shell .calibro-home-statement { font-size: clamp(24px, 5.5vw, 39px) !important; }
    .homepage-shell .calibro-intro-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 25px; }
    .homepage-shell .calibro-intro-stat-value { font-size: clamp(27px, 6vw, 38px); }
    .homepage-shell .calibro-intro-stat-label { font-size: 9px; }
    .homepage-shell .collection-secondary.calibro-collection { padding: 24px 20px 0 !important; }
    .homepage-shell .calibro-focus-materials { padding: 46px 20px 50px !important; }
    .homepage-shell .calibro-focus-topline { gap: 14px; }
    .homepage-shell .calibro-focus-explore { font-size: 9px; }
    .homepage-shell .calibro-material-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; height: auto !important; min-height: 0 !important; row-gap: 22px !important; }
    .homepage-shell .calibro-material-card { height: auto; }
    .homepage-shell .calibro-material-media { aspect-ratio: 3 / 4; flex: none; }
    .homepage-shell .calibro-material-caption { font-size: 10px; }
    .homepage-shell .calibro-split-cta { grid-template-columns: minmax(0, 1fr); gap: 40px; }
    .homepage-shell .calibro-split-cta-title { font-size: clamp(40px, 10vw, 62px); max-width: 12ch; }
    .homepage-shell .calibro-split-cta-left { gap: 26px; }
    .homepage-shell .calibro-enquiry-cta { min-width: min(100%, 320px); }
    .homepage-shell .calibro-about-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
    .homepage-shell .calibro-about-copy { padding-bottom: 0; }
  }
  @media (max-width: 420px) {
    .homepage-shell .calibro-hero-title { font-size: clamp(32px, 9.5vw, 42px); }
    .homepage-shell .calibro-hero-content { left: 18px; right: 18px; }
    .homepage-shell .calibro-hero-actions { gap: 8px; }
  }
`;


export default function App({ motionEnabled = true, ctaStyle = 'filled-outline' }) {
  const { themeValue } = useTheme();
  const [revealed, setRevealed] = useState({});
  // Show the hero and navigation immediately, without a splash overlay.
  const heroIn = true;
  // Hide the navigation only in the existing immersive sections.
  const [navHiddenForSpotlight, setNavHiddenForSpotlight] = useState(false);
  const [navHiddenForProjects, setNavHiddenForProjects] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [spotlightInView, setSpotlightInView] = useState(false);

  const refs = useRef(Object.fromEntries(REVEAL_IDS.map(id => [id, React.createRef()]))).current;
  const heroVideoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const spotlightSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const tryPlayHero = () => {
    const v = heroVideoRef.current;
    if (v && v.paused) { v.defaultMuted = true; v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => { }); }
  };
  const tryPlayPhilosophy = () => {
    const v = refs.philosophyMedia.current;
    if (v && v.paused) { v.defaultMuted = true; v.muted = true; v.loop = true; const p = v.play(); if (p && p.catch) p.catch(() => { }); }
  };

  useEffect(() => {
    const retryPlayback = () => {
      tryPlayHero();
      if (revealed.philosophyMedia) tryPlayPhilosophy();
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') retryPlayback();
    };

    window.addEventListener('touchstart', retryPlayback, { passive: true, once: true });
    window.addEventListener('pointerdown', retryPlayback, { passive: true, once: true });
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('touchstart', retryPlayback);
      window.removeEventListener('pointerdown', retryPlayback);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [revealed.philosophyMedia]);


  useEffect(() => {
    const timers = [];
    tryPlayHero();
    [100, 400, 1000, 2000].forEach(t => timers.push(setTimeout(tryPlayHero, t)));
    if (motionEnabled === false) {
      setRevealed(Object.fromEntries(REVEAL_IDS.map(id => [id, true])));
      return () => timers.forEach(clearTimeout);
    }

    // Keep the original scroll-triggered reveal behavior, but without
    // blocking scrolling or delaying the first hero render.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-reveal-id');
          setRevealed(prev => ({ ...prev, [id]: true }));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    REVEAL_IDS.forEach(id => {
      const node = refs[id].current;
      if (node) { node.setAttribute('data-reveal-id', id); observer.observe(node); }
    });

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nav visibility over the spotlight section: unlike the reveal observer
  // above (which fires once and unobserves), this needs to toggle both ways
  // every time the section enters and leaves, so it's a separate observer.
  useEffect(() => {
    const node = spotlightSectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavHiddenForSpotlight(entry.isIntersecting),
      { threshold: 0, rootMargin: '-10% 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The floating contact shortcut stays out of the two immersive media
  // sections so it never competes with the hero or Spotlight artwork.
  useEffect(() => {
    const heroNode = heroSectionRef.current;
    const spotlightNode = spotlightSectionRef.current;
    if (!heroNode || !spotlightNode) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === heroNode) setHeroInView(entry.isIntersecting);
        if (entry.target === spotlightNode) setSpotlightInView(entry.isIntersecting);
      });
    }, { threshold: 0 });

    observer.observe(heroNode);
    observer.observe(spotlightNode);
    return () => observer.disconnect();
  }, []);

  // Same pattern for the full-bleed Projects dome — the nav pill would
  // otherwise float over the gallery's own drag surface.
  useEffect(() => {
    const node = projectsSectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavHiddenForProjects(entry.isIntersecting),
      { threshold: 0, rootMargin: '-10% 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealStyle = (id) => {
    const on = !!revealed[id];
    const delay = STAGGER[id] || 0;
    return {
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(30px)',
      transition: `opacity 1000ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 1000ms cubic-bezier(.16,1,.3,1) ${delay}ms`
    };
  };

  const philOn = !!revealed.philosophyMedia;
  useEffect(() => {
    if (philOn) tryPlayPhilosophy();
  }, [philOn]);

  const philosophyVideoStyle = {
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0,
    opacity: philOn ? 1 : 0, transform: philOn ? 'scale(1)' : 'scale(1.08)',
    transition: 'opacity 1400ms cubic-bezier(.16,1,.3,1), transform 1800ms cubic-bezier(.16,1,.3,1)'
  };

  const introCopyTextStyle = {
    margin: 0, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 500,
    lineHeight: 1.5, letterSpacing: '-0.006em', color: 'var(--color-text)'
  };
  const homeIntroTextStyle = {
    ...introCopyTextStyle,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    lineHeight: 1.2
  };
  const heroTextStyle = {
    opacity: heroIn ? 1 : 0,
    transform: heroIn ? 'translateY(0)' : 'translateY(100%)',
    transition: 'opacity 1100ms cubic-bezier(.16,1,.3,1) 200ms, transform 1100ms cubic-bezier(.16,1,.3,1) 200ms'
  };

  const filledBase = { padding: '16px 32px', borderRadius: '2px', fontSize: '15px', fontWeight: 500, letterSpacing: '0.01em', border: `1px solid ${accent}`, transition: 'background 300ms ease, color 300ms ease', cursor: 'pointer' };
  const quoteButtonStyle = { ...filledBase, background: accent, color: 'var(--color-on-accent)' };
  const showroomButtonStyle = ctaStyle === 'stacked-fill'
    ? { ...filledBase, background: 'oklch(0.28 0.03 50)', color: 'var(--color-on-accent)', border: '1px solid oklch(0.28 0.03 50)' }
    : { ...filledBase, background: 'transparent', color: 'var(--color-text)' };
  const showroomButtonClass = ctaStyle === 'stacked-fill' ? 'btn-showroom-filled' : 'btn-showroom-outline';

  return (
    <div className="homepage-shell" style={{ position: 'relative', background: homepageBgGradient(themeValue), ...homepageThemeTokens(themeValue) }}>
      <style>{CALIBRO_HOME_DESIGN_CSS}</style>

      {/* The same sticky SiteNav component and visibility props as before.
          Placed over the hero in the PDF's visual order; sticky behavior is unchanged. */}
      <SiteNav
  entranceVisible={heroIn}
  hidden={navHiddenForSpotlight || navHiddenForProjects}
/>

      <section className="home-hero calibro-home-hero" ref={heroSectionRef} style={{
        position: 'relative', height: '100vh', minHeight: 640, width: '100%',
        opacity: heroIn ? 1 : 0,
        transform: heroIn ? 'translateY(0)' : 'translateY(110px)',
        transition: 'opacity 1500ms cubic-bezier(.16,1,.3,1), transform 1500ms cubic-bezier(.16,1,.3,1)',
        willChange: heroIn ? 'auto' : 'opacity, transform'
      }}>
        <video ref={heroVideoRef} src="/herobig.mp4" autoPlay muted loop playsInline onCanPlay={tryPlayHero} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(9,12,18,.28) 0%, rgba(8,11,16,.06) 35%, rgba(8,11,16,.59) 100%)', pointerEvents: 'none' }} />
        <div className="calibro-hero-content">
          <div style={{ overflow: 'hidden' }}>
            <div style={heroTextStyle}>
              <p className="calibro-hero-eyebrow">Dubai · UAE · GCC</p>
              <h1 className="calibro-hero-title">Bespoke Furniture</h1>
              <p className="calibro-hero-subtitle">&amp; Contract FF&amp;E in Dubai</p>
              <div className="calibro-hero-actions">
                <a href="#contact" className="calibro-hero-link calibro-hero-link--primary">Request a quote</a>
                <a href="/projects" className="calibro-hero-link">View projects</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 20, bottom: 24, fontSize: 12, letterSpacing: '0.08em', color: 'oklch(0.9 0.006 75 / 0.75)', textTransform: 'uppercase' }}>Scroll</div>
      </section>

      {/* PDF styling: editorial introduction directly under the hero.
          Existing reveal ref/IntersectionObserver remain intact. */}
      <section className="home-intro calibro-home-intro" style={{ background: 'transparent', padding: '90px 20px 30px' }}>
        <div ref={refs.introStatement} style={revealStyle('introStatement')}>
          <p className="home-intro-copy calibro-home-statement" style={{
            ...homeIntroTextStyle, fontSize: 'clamp(28px, 3.2vw, 52px)', fontWeight: 600,
            lineHeight: 1.2, letterSpacing: '-0.025em', maxWidth: 1440
          }}>
            We are Calibro, a bespoke furniture and contract FF&amp;E partner for architects, interior designers, developers, and private clients across the UAE and the wider GCC. We create custom-made pieces and source, validate, and deliver furniture, joinery, lighting, and rugs — with one team accountable from brief to installation.
          </p>
          <div className="calibro-intro-stats" aria-label="Calibro at a glance">
            <div className="calibro-intro-stat"><span className="calibro-intro-stat-value">26</span><span className="calibro-intro-stat-label">Projects delivered</span></div>
            <div className="calibro-intro-stat"><span className="calibro-intro-stat-value">28,357 m²</span><span className="calibro-intro-stat-label">Areas covered</span></div>
            <div className="calibro-intro-stat"><span className="calibro-intro-stat-value">18+ years</span><span className="calibro-intro-stat-label">Experience</span></div>
            <div className="calibro-intro-stat"><span className="calibro-intro-stat-value">5–13 weeks</span><span className="calibro-intro-stat-label">Drawing approval to installation</span></div>
          </div>
        </div>
      </section>

      {/* <section style={{ background: 'transparent', padding: '150px 6vw' }}>
        <div
          ref={refs.promise}
          style={{ ...revealStyle('promise'), maxWidth: 1560, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'flex-start', flexWrap: 'wrap' }}
        >
          <div style={{ flex: '7 1 0', minWidth: 300 }}>
            <div style={{ width: '100%', aspectRatio: '4 / 3.7', background: 'transparent' }}>
              <img
                src="/sketch.png"
                alt="Calibro design sketch — a wingback lounge chair with construction notes"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
          <div style={{ flex: '3 1 0', minWidth: 260 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>Our promise</div>
            <p style={{ margin: 0, fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 400, lineHeight: 1.6, letterSpacing: '-0.005em', color: 'var(--color-text)' }}>
              Where <span style={{ fontWeight: 700 }}>TIMELINES</span> are respected, <span style={{ fontWeight: 700 }}>QUALITY</span> is assured, <span style={{ fontWeight: 700 }}>PRICING</span> remains precise, and every project is backed by warranty.
            </p>
          </div>
        </div>
      </section> */}
      <section id="collection-secondary" className="collection-secondary calibro-collection" style={{ position: 'relative', width: '100%', padding: '20px 20px 40px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <div className="collection-desktop-item" style={{ position: 'sticky', top: 140, width: '34%', flexShrink: 0 }}>
          <div ref={refs.item4} style={revealStyle('item4')}>
            <p style={{ margin: '0 0 28px', fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: '49ch' }}>WE OFFER COMPLETE DESIGN FLEXIBILITY TO MEET THE NEEDS OF ARCHITECTS, DESIGNERS, DEVELOPERS, AND CLIENTS WHO DON’T SETTLE FOR OFF-THE-SHELF SOLUTIONS.</p>
            <div style={{ width: '88%', aspectRatio: '4 / 5', overflow: 'hidden' }}>
              <ImageSlot placeholder="Dorsale — portrait, sofa detail" src="/optimized/feat5.webp" />
            </div>
            <p className="calibro-collection-detail">Every piece is engineered from your drawings, BOQ and finish schedule. Shop drawings and physical samples are signed off before production, and approved samples become the benchmark for final inspection.</p>
            <a href="#contact" className="calibro-collection-link">Send your drawings</a>
          </div>
        </div>
        <div className="collection-desktop-item" style={{ flex: '1 1 0', minWidth: 0 }}>
          <div className="collection-feature-image" ref={refs.item5} style={{ ...revealStyle('item5'), position: 'relative', width: '88%', aspectRatio: '1.38 / 1', marginLeft: 'auto', overflow: 'hidden' }}>
            <ImageSlot placeholder="Piana — landscape, lounge chair" src="/optimized/bed44444.webp" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 70%, rgba(10,14,24,.15) 100%)', pointerEvents: 'none' }} />
          </div>
          <p className="calibro-collection-detail calibro-collection-detail--caps" style={{ width: '88%', marginLeft: 'auto' }}>Trusted by professionals and private clients across the UAE and the wider GCC.</p>
        </div>
        <div className="collection-mobile-slider-wrap">
          <div className="collection-mobile-slider" aria-label="Featured collection images">
            {[
              { src: '/optimized/feat5.webp', alt: 'Calibro featured furniture collection' },
              { src: '/bed44mobile.png', alt: 'Calibro bespoke bedroom collection' },
            ].map((item, index, items) => (
              <div className="collection-mobile-slide" key={item.src}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <span>{index + 1}/{items.length}</span>
              </div>
            ))}
          </div>
          <div className="collection-mobile-copy">
            <div className="collection-mobile-heading-row">
              <h2>Featured Collection</h2>
              <a href="/products">Discover</a>
            </div>
            <p>We offer complete design flexibility to meet the needs of architects, designers, developers, and clients who don’t settle for off-the-shelf solutions.</p>
          </div>
        </div>
      </section>

      {/* <section style={{ maxWidth: 1560, margin: '0 auto', padding: '100px 20px 190px', display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div ref={refs.item6} style={{ ...revealStyle('item6'), width: '80%', maxWidth: 496, flexShrink: 0 }}>
          <div style={{ width: '100%', height: 384, overflow: 'hidden' }}>
            <div className="zoom-045" style={{ width: '100%', height: '100%' }}>
              <ImageSlot placeholder="Tavolo Massello — square, walnut table detail" src="/featured/materials_bed_green.jpg" />
            </div>
          </div>
          <div style={{ marginTop: 20 }}> */}
            {/* <div style={{ fontSize: 20, fontWeight: 600 }}>Tavolo Massello</div> */}
            {/* <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: '42ch' }}>TRUSTED BY PROFESSIONALS AND PRIVATE CLIENTS THROUGHOUT EUROPE, THE UAE AND ACROSS THE WIDER GCC.</p>
          </div>
        </div>
        <div style={{ flex: '0 1 80%', marginTop: 192, marginLeft: 'auto' }}>
          <div style={{ width: '100%', height: 384, overflow: 'hidden' }}>
            <ImageSlot placeholder="Sedia — walnut chair detail" src="public/featured/bed2.jpg" />
          </div>
        </div>
      </section> */}

      <section className="focus-section calibro-focus-materials" style={{ padding: '64px 20px', background: 'transparent' }}>
        <div className="calibro-focus-topline">
          <div className="focus-title" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16, color: 'var(--color-text)' }}>
            Focus on — Materials &amp; craft
          </div>
          <a className="calibro-focus-explore" href="/products">Explore bespoke furniture →</a>
        </div>
        <div className="focus-grid calibro-material-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, height: '70vh', minHeight: 400 }}>
          {[
            { img: '/focus/focus_wood_panel.jpg', caption: 'Shaped timber' },
            { img: '/focus/focus_cane_curve.jpg', caption: 'Cane & woven' },
            { img: '/focus/alo2.jpeg', caption: 'Metal frames' },
            { img: '/focus/alo.jpeg', caption: 'Leather upholstery' },
          ].map((item, i) => (
            <div key={i} className="calibro-material-card">
              <div className="calibro-material-media" style={{ backgroundColor: 'var(--color-border-soft)' }}>
                <img className="focus-image" src={item.img} alt={item.caption} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <span className="focus-counter">{i + 1}/4</span>
              </div>
              <p className="calibro-material-caption">{item.caption}</p>
            </div>
          ))}
        </div>
      </section>


      <section ref={spotlightSectionRef} style={{ position: 'relative', background: 'transparent' }}>
        <ScrollStack
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={40}
          stackPosition="0%"
          scaleEndPosition="-20%"
          baseScale={0.80}
          useWindowScroll={true}
          className="spotlight-scroll-stack"
        >
          {SPOTLIGHT_ITEMS.map((item, index) => (
            <ScrollStackItem key={item.id} itemClassName="spotlight-stack-card">
              <div style={{
                width: '100%',
                height: 'auto',
                overflow: 'hidden',
                boxShadow: '0 40px 80px -30px oklch(0.15 0.02 50 / 0.35)',
                position: 'relative',
                backgroundColor: SPOTLIGHT_COLORS[index],
                padding: '60px 18px 18px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 24,
                  right: 24,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: index === 2 ? '#222222' : '#ffffff',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}>
                  <span>{item.label}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 3.44 2.56 6.31 5.86 6.87V20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-4.13c3.3-.56 5.86-3.43 5.86-6.87 0-3.87-3.13-7-7-7zm-1 19.5v-1h2v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5z" />
                  </svg>
                </div>
                <div className="spotlight-media" style={{ position: 'relative', width: '100%', aspectRatio: '2 / 1', flex: 'none', overflow: 'hidden' }}>
                  <ImageSlot
                    placeholder={item.placeholder}
                    src={item.image}
                    mobileSrc={item.mobileImage}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, oklch(0.15 0.02 50 / 0.4) 0%, transparent 32%, oklch(0.12 0.02 50 / 0.55) 100%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', left: 28, right: 28, bottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'oklch(0.98 0.005 75)' }}>
                    {/* <div style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', fontWeight: 600, letterSpacing: '-0.01em' }}>{item.name}</div> */}
                    {/* <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '0.06em' }}>{item.category}</div> */}
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      <section className="focus-section" style={{ padding: '64px 20px', background: 'transparent' }}>
        <div className="focus-title" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16, color: 'var(--color-text)' }}>
          FOCUS ON
        </div>
        <div className="focus-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, height: '70vh', minHeight: 400 }}>
          {[
            { img: '/1.jpeg', caption: '' },
            { img: '/2.jpeg', caption: '' },
            { img: '/3.jpeg', caption: '' },
            { img: '/4.jpeg', caption: '' },
          ].map((item, i) => (
            <div key={i} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'var(--color-border-soft)' }}>
              <img className="focus-image" src={item.img} alt={item.caption} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="focus-counter">{i + 1}/4</span>
              <div style={{ position: 'absolute', bottom: 16, left: 16, color: '#fff', fontSize: 11, fontWeight: 500, letterSpacing: '0.02em', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section style={{ position: 'relative', width: '100%', background: 'transparent', padding: '48px 0' }}>
        <div style={{ height: 320, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <TextLoop
            text="Explore our projects"
            shape="wave"
            speed={70}
            direction="forward"
            separator="✦"
            curviness={40}
            fontSize={32}
            fontWeight={700}
            letterSpacing={2}
            uppercase
            color="var(--color-on-accent)"
            ribbon
            ribbonColor={accent}
            ribbonWidth={70}
            pauseOnHover
          />
        </div>
      </section> */}

      {/* <section style={{ position: 'relative', zIndex: 10, background: 'transparent', maxWidth: 1560, margin: '0 auto', padding: '90px 6vw 170px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        {SPOTLIGHT_ITEMS.map(item => (
          <div key={item.id}>
            <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
              <div className="zoom-06" style={{ width: '100%', height: '100%' }}>
                <ImageSlot placeholder={item.placeholder} src={item.image} />
              </div>
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ fontWeight: 600 }}>{item.name}</span>
              <span style={{ color: 'var(--color-text-faint)' }}>{item.category}</span>
            </div>
          </div>
        ))}
      </section> */}


      {/* <section
        ref={projectsSectionRef}
        style={{ position: 'relative', width: '100vw', marginLeft: 'calc(50% - 50vw)', background: 'transparent', padding: '90px 0 110px' }}
      >
        <div style={{ padding: '0 6vw', marginBottom: 48 }}> */}
      {/* <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 16 }}>04 &mdash; Projects</div> */}
      {/* <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.01em', color: 'oklch(0.98 0.004 75)' }}>Delivered across the UAE and GCC.</h2> */}
      {/* </div>
        <div style={{ width: '100vw', height: '100vh', minHeight: 720 }}>
          <DomeGallery
            images={PROJECT_GALLERY_IMAGES}
            fit={1.1}
            fitBasis="width"
            minRadius={600}
            padFactor={0.1}
            grayscale={false}
            overlayBlurColor="var(--color-bg)"
            imageBorderRadius="14px"
            openedImageBorderRadius="14px"
            openedImageWidth="560px"
            openedImageHeight="560px"
          />
        </div>
      </section> */}


      {/* <section style={{ background: 'transparent', padding: '150px 0 160px' }}>
        <div ref={refs.armchairs} style={revealStyle('armchairs')}> */}
      {/* <div style={{ padding: '0 6vw', marginBottom: 52 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>05 &mdash; Armchairs</div>
            <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.01em' }}>Five ways to sit down properly.</h2>
          </div> */}
      {/* <div style={{ padding: '0 6vw' }}>
            <AccordionGallery
              items={ARMCHAIR_ITEMS}
              defaultIndex={2}
              height={500}
              gap={12}
              radius={10}
              expandRatio={0.5}
              accentColor={"transparent"}
              overlayColor="oklch(0.16 0.02 50)"
              textColor="oklch(0.98 0.004 75)"
              trigger="hover"
            />
          </div>
        </div>
      </section> */}
      {/* <section id="collection" style={{ position: 'relative', width: '100%', padding: '40px 20px 0', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <div style={{ position: 'sticky', top: 140, width: '34%', flexShrink: 0 }}>
          <div ref={refs.item1} style={revealStyle('item1')}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>02 &mdash; Featured collection</div> */}
            {/* <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Dorsale</div> */}
            {/* <p style={{ margin: '0 0 28px', fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: '36ch' }}>WE OFFER COMPLETE DESIGN FLEXIBILITY TO MEET THE NEEDS OF ARCHITECTS, DESIGNERS, DEVELOPERS, AND CLIENTS WHO DON’T SETTLE FOR OFF-THE-SHELF SOLUTIONS.</p>
            <div style={{ width: '68%', aspectRatio: '4 / 5', overflow: 'hidden' }}>
              <ImageSlot placeholder="Dorsale — portrait, sofa detail" src="/11.png" />
            </div>
          </div>
        </div>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <div ref={refs.item2} style={{ ...revealStyle('item2'), position: 'relative', width: '80%', height: '116vh', marginLeft: 'auto', overflow: 'hidden' }}>
            <ImageSlot placeholder="Piana — landscape, lounge chair" src="/33.png" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, oklch(0.15 0.02 50 / 0.55) 100%)', pointerEvents: 'none' }} /> */}
            {/* <div style={{ position: 'absolute', left: 28, right: 28, bottom: 28, color: 'oklch(0.98 0.005 75)' }}> */}
            {/* <div style={{ fontSize: 18, fontWeight: 600 }}>Piana</div> */}
            {/* <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5, color: 'oklch(0.92 0.01 60 / 0.92)', maxWidth: '38ch' }}>Low, wide, unhurried. A lounge chair built around the idea that comfort shouldn't announce itself.</p> */}
            {/* </div> */}
          {/* </div>
        </div>
      </section> */}

      {/* <section style={{ maxWidth: 1560, margin: '0 auto', padding: '100px 20px 190px', display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div ref={refs.item3} style={{ ...revealStyle('item3'), width: '80%', maxWidth: 496, flexShrink: 0 }}>
          <div style={{ width: '100%', height: 384, overflow: 'hidden' }}>
            <div className="zoom-045" style={{ width: '100%', height: '100%' }}>
              <ImageSlot placeholder="Tavolo Massello — square, walnut table detail" src="/22.png" />
            </div>
          </div> */}
          {/* <div style={{ marginTop: 20 }}> */}
            {/* <div style={{ fontSize: 20, fontWeight: 600 }}>Tavolo Massello</div> */}
            {/* <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: '42ch' }}>TRUSTED BY PROFESSIONALS AND PRIVATE CLIENTS THROUGHOUT EUROPE, THE UAE AND ACROSS THE WIDER GCC.</p>
          </div>
        </div>
        <div style={{ flex: '0 1 80%', marginTop: 192, marginLeft: 'auto' }}>
          <div style={{ width: '100%', height: 384, overflow: 'hidden' }}>
            <ImageSlot placeholder="Sedia — walnut chair detail" src="/44.png" />
          </div>
        </div> */}
      {/* </section> */}

      <section className="tailored-dreams-section" style={{ position: 'relative', width: '100%', padding: '100px 20px 80px', overflow: 'hidden' }}>
        <div className="calibro-split-cta">
          <div className="calibro-split-cta-left" ref={refs.cta} style={revealStyle('cta')}>
            <h2 className="calibro-split-cta-title">Let’s talk<br />about your<br />space</h2>
            <a href="#contact" className="calibro-enquiry-cta">Send an enquiry <span className="calibro-enquiry-arrow" aria-hidden="true">⟶</span></a>
          </div>
          <div style={{ minWidth: 0 }}>
            <div ref={refs.statement} style={{ ...revealStyle('statement'), marginBottom: 14, color: 'var(--color-text)' }}>
              <div className="calibro-tailored-label">Tailored Dreams</div>
              <p className="calibro-tailored-desc" style={{ margin: 0 }}>
                Time, materials, and place come together to create a vision where artisanal craftsmanship and contemporary sensibility converge, giving rise to products that embody the artistry of tailoring, blending responsibility with enduring beauty.
              </p>
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}>
              <video ref={refs.philosophyMedia} src="/vidd.mp4" preload="metadata" autoPlay muted loop playsInline onCanPlay={tryPlayPhilosophy} style={philosophyVideoStyle} />
              <a href="#about" style={{ position: 'absolute', left: 12, bottom: 12, zIndex: 1, minWidth: 190, padding: '7px 14px', border: '1px solid #fff', borderRadius: 999, color: '#fff', fontSize: 11, lineHeight: 1, textDecoration: 'none' }}>
                Learn more about us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="focus-section" style={{ padding: '64px 20px', background: 'transparent' }}>
        <div className="focus-title" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16, color: 'var(--color-text)' }}>
          FOCUS ON
        </div>
        <div className="focus-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, height: '70vh', minHeight: 400 }}>
          {[
            { img: '/focus/f1.jpeg', caption: '' },
            { img: '/focus/f2.jpeg', caption: '' },
            { img: '/focus/f3.jpeg', caption: '' },
            { img: '/focus/f4.jpeg', caption: '' },
          ].map((item, i) => (
            <div key={i} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'var(--color-border-soft)' }}>
              <img className="focus-image" src={item.img} alt={item.caption} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="focus-counter">{i + 1}/4</span>
              <div style={{ position: 'absolute', bottom: 16, left: 16, color: '#fff', fontSize: 11, fontWeight: 500, letterSpacing: '0.02em', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about-section" style={{ width: '100%', boxSizing: 'border-box', background: 'transparent', padding: '150px 20px 0' }}>
        <div ref={refs.aboutIntro} style={{ ...revealStyle('aboutIntro'), width: '100%', boxSizing: 'border-box' }}>
          <div className="about-calibro-layout calibro-about-grid">
            <div className="about-calibro-image-wrap">
              <div className="about-calibro-image" style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
                <img src="/optimized/about.webp" alt="Calibro furniture and FF&amp;E craftsmanship" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <div className="about-calibro-copy calibro-about-copy" style={{ textTransform: 'uppercase' }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>About Calibro</div>
              <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.01em', maxWidth: '22ch' }}>An FF&amp;E partner, not just a supplier.</h2>
              <p style={{ margin: '20px 0 0', fontSize: 16, lineHeight: 1.7, color: 'var(--color-text-muted)', maxWidth: '48ch' }}>We manufacture bespoke furniture in Dubai and coordinate selected joinery, lighting, rugs and contract FF&amp;E through trusted partners &mdash; with one team accountable from brief to installation.</p>
            </div>
          </div>
          <div className="info-grid calibro-info-grid" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {ABOUT_STATS.map(stat => (
              <div key={stat.label} style={{ paddingTop: 18 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{stat.label}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section" style={{ background: 'transparent', padding: '110px 20px 150px' }}>
        <div ref={refs.aboutWhy} style={{ ...revealStyle('aboutWhy'), width: '100%', boxSizing: 'border-box' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>Why choose Calibro</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.01em', maxWidth: '26ch' }}>Trusted by professionals across Europe, the UAE, and the wider GCC.</h2>
          <div className="info-grid calibro-info-grid" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {WHY_CHOOSE.map(item => (
              <div key={item.label} style={{ paddingTop: 18 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{item.label}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section style={{ padding: '170px 6vw', textAlign: 'center' }}>
        <div ref={refs.cta} style={revealStyle('cta')}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 24 }}>07 &mdash; Visit</div>
          <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, letterSpacing: '-0.01em' }}>Come see it in person.</h2>
          <p style={{ margin: '16px 0 48px', fontSize: 17, color: 'var(--color-text-muted)' }}>Talk to us about a piece, a space, or a full room.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            <a href="#contact" className="btn-quote" style={quoteButtonStyle}>Request a quote</a>
            <a href="#contact" className={showroomButtonClass} style={showroomButtonStyle}>Book a showroom visit</a>
          </div>
        </div>
      </section> */}

      <section id="contact" className="contact-section" style={{ padding: '60px 20px 190px' }}>
        <div ref={refs.contactSection} style={{ ...revealStyle('contactSection'), width: '100%', boxSizing: 'border-box', display: 'flex', gap: 80, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 340px', minWidth: 280 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 24 }}>08 &mdash; Contact</div>
            <h2 style={{ margin: 0, fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, letterSpacing: '-0.01em' }}>Let&rsquo;s talk about your space.</h2>
            <p style={{ margin: '16px 0 40px', fontSize: 17, lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: '38ch' }}>Reach us directly, or send a message and we&rsquo;ll get back to you within one business day.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="mailto:info@calibro.ae" className="contact-method" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', background: 'transparent', color: 'var(--color-text)', fontSize: 15, fontWeight: 500, transition: 'color 200ms ease' }}>
                <Mail size={18} strokeWidth={1.75} />
                info@calibro.ae
              </a>
              <a href="https://wa.me/971586045588" target="_blank" rel="noopener noreferrer" className="contact-method" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', background: 'transparent', color: 'var(--color-text)', fontSize: 15, fontWeight: 500, transition: 'color 200ms ease' }}>
                <MessageCircle size={18} strokeWidth={1.75} />
                WhatsApp +971 58 604 5588
              </a>
              <a href="tel:+971586045588" className="contact-method" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', background: 'transparent', color: 'var(--color-text)', fontSize: 15, fontWeight: 500, transition: 'color 200ms ease' }}>
                <Phone size={18} strokeWidth={1.75} />
                Call +971 58 604 5588
              </a>
            </div>
          </div>
          <div style={{ flex: '1 1 420px', minWidth: 300 }}>
            <ContactForm accentColor={accent} />
          </div>
        </div>
      </section>

      <SiteFooter />

      <a
        href="https://wa.me/971586045588"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contact Calibro on WhatsApp"
        title="Contact us on WhatsApp"
        style={{
          opacity: !heroInView && !spotlightInView ? 1 : 0,
          visibility: !heroInView && !spotlightInView ? 'visible' : 'hidden',
          pointerEvents: !heroInView && !spotlightInView ? 'auto' : 'none'
        }}
      >
        <MessageCircle size={25} strokeWidth={1.8} aria-hidden="true" />
      </a>

    </div>
  );
}