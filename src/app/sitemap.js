import { PROJECTS } from '../data/projects';
import { PRODUCTS } from '../data/products';

export default function sitemap() {
  const base = 'https://calibro.ae';
  const now = new Date();
  const productsLive = process.env.PRODUCTS_LIVE === 'true';

  const staticDefinitions = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/our-factory', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
    ...(productsLive
      ? [{ path: '/products', priority: 0.7, changeFrequency: 'monthly' }]
      : []),
    { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' }
  ];

  const staticPages = staticDefinitions.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path || '/'}`,
    lastModified: now,
    changeFrequency,
    priority
  }));

  const projects = PROJECTS.map((p) => ({
    url: `${base}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75
  }));

  const products = productsLive
    ? PRODUCTS.map((p) => ({
        url: `${base}/products/${p.id}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.55
      }))
    : [];

  return [...staticPages, ...projects, ...products];
}
