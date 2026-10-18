export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/']
    },
    sitemap: 'https://calibro.ae/sitemap.xml',
    host: 'https://calibro.ae'
  };
}
