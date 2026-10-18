import Link from 'next/link';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

export default function SeoLandingPage({
  eyebrow,
  title,
  intro,
  sections,
  statement,
  canonicalPath,
  ctaTitle = 'Planning a furniture or FF&E project?',
  ctaBody = 'Share your BOQ, drawings, moodboard, quantities and target programme. Calibro can review the scope and recommend the next step.'
}) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://calibro.ae/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: `https://calibro.ae${canonicalPath}`
      }
    ]
  };

  return (
    <div className="seo-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteNav />

      <main>
        <section className="seo-hero">
          <div className="seo-kicker-row">
            <span>{eyebrow}</span>
            <span>Dubai · UAE · GCC</span>
          </div>

          <h1>{title}</h1>

          <div className="seo-hero-bottom">
            <p>{intro}</p>
            <Link href="/#contact" className="seo-arrow-link">
              Start a project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        {statement && (
          <section className="seo-statement-wrap">
            <p className="seo-statement">{statement}</p>
          </section>
        )}

        <section className="seo-services-grid" aria-label={`${eyebrow} capabilities`}>
          {sections.map((section, index) => (
            <article key={section.title} className="seo-service-card">
              <div className="seo-service-index">{String(index + 1).padStart(2, '0')}</div>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        <section className="seo-proof-band">
          <div>
            <span className="seo-proof-label">Project model</span>
            <strong>One team.</strong>
            <span>Brief to aftercare.</span>
          </div>
          <div>
            <span className="seo-proof-label">Experience</span>
            <strong>18+ years.</strong>
            <span>International + UAE.</span>
          </div>
          <div>
            <span className="seo-proof-label">Coverage</span>
            <strong>UAE + GCC.</strong>
            <span>Residential, hospitality, commercial.</span>
          </div>
        </section>

        <section className="seo-cta-band">
          <div>
            <div className="seo-cta-kicker">Talk to Calibro</div>
            <h2>{ctaTitle}</h2>
            <p>{ctaBody}</p>
          </div>
          <div className="seo-cta-actions">
            <a
              href="https://wa.me/971586045588?text=Hello%20Calibro%20team%2C%20I%20would%20like%20to%20discuss%20a%20furniture%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="seo-primary-cta"
            >
              WhatsApp Calibro
            </a>
            <a href="tel:+971586045588" className="seo-secondary-cta">
              Call +971 58 604 5588
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
