import Products from '../../pages/Products';

const productsLive = process.env.PRODUCTS_LIVE === 'true';

export const metadata = {
  title: 'Bespoke Furniture Collection — Coming Soon',
  description:
    'The Calibro bespoke furniture collection is being prepared. Discover furniture made for distinctive residential, hospitality and commercial spaces.',
  alternates: { canonical: '/products' },
  robots: productsLive
    ? { index: true, follow: true }
    : { index: false, follow: true },
  openGraph: {
    url: '/products',
    title: 'Bespoke Furniture Collection — Coming Soon | Calibro',
    description: 'The Calibro bespoke furniture collection is being prepared.'
  }
};

export default function ProductsPage() {
  return <Products />;
}
