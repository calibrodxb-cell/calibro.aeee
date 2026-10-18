import '@fontsource/sora/300.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/500.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './globals.css';
import Script from 'next/script';
import Providers from './providers';

export const metadata = {
  metadataBase: new URL('https://calibro.ae'),
  title: {
    default: 'Custom Furniture Manufacturer in Dubai | Calibro',
    template: '%s | Calibro'
  },
  description:
    'Calibro is a custom furniture manufacturer in Dubai serving architects, interior designers, developers and private clients across the UAE and GCC.',
  applicationName: 'Calibro',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  openGraph: {
    type: 'website',
    siteName: 'Calibro',
    url: '/',
    title: 'Custom Furniture Manufacturer in Dubai | Calibro',
    description:
      'Bespoke furniture manufacturing and contract FF&E for projects across Dubai, the UAE and GCC.',
    images: [{ url: '/spot2.png', alt: 'Bespoke furniture by Calibro' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Furniture Manufacturer in Dubai | Calibro',
    description: 'Bespoke furniture manufacturing and contract FF&E across the UAE and GCC.',
    images: ['/spot2.png']
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', sizes: 'any' }
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }]
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://calibro.ae/#business',
      name: 'Calibro',
      url: 'https://calibro.ae/',
      image: 'https://calibro.ae/optimized/about.webp',
      email: 'info@calibro.ae',
      telephone: '+971586045588',
      description:
        'Dubai-based custom furniture manufacturer and contract FF&E partner serving the UAE and GCC.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1, Jebel Ali Industrial Area, 47th Street',
        addressLocality: 'Dubai',
        addressCountry: 'AE'
      },
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Place', name: 'Gulf Cooperation Council' }
      ],
      knowsAbout: [
        'Custom furniture manufacturing',
        'Bespoke furniture',
        'Joinery',
        'Upholstery',
        'Contract FF&E',
        'Furniture installation'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://calibro.ae/#website',
      url: 'https://calibro.ae/',
      name: 'Calibro',
      publisher: { '@id': 'https://calibro.ae/#business' },
      inLanguage: 'en'
    }
  ]
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {gtmId && (
          <>
            <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}</Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
