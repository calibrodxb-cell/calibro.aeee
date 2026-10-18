/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/network', destination: '/services', permanent: true },
      { source: '/primo-penthouse', destination: '/projects/il-primo-penthouse', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www.calibro.ae' }], destination: 'https://calibro.ae/:path*', permanent: true }
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
    ] }];
  }
};
export default nextConfig;
