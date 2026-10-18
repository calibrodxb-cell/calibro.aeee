import { notFound } from 'next/navigation';
import ProductDetail from '../../../views/ProductDetail';
import { PRODUCTS } from '../../../data/products';

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return {};

  const productsLive = process.env.PRODUCTS_LIVE === 'true';
  const title = `${product.brand} ${product.name} | Bespoke Furniture`;
  const description =
    product.description?.slice(0, 158) ||
    `Bespoke ${String(product.name || 'furniture').toLowerCase()} by Calibro.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    robots: productsLive
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      url: `/products/${product.id}`,
      title,
      description,
      images: product.image
        ? [{ url: product.image, alt: `${product.brand} ${product.name}` }]
        : []
    }
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

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
        name: 'Products',
        item: 'https://calibro.ae/products'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${product.brand} ${product.name}`,
        item: `https://calibro.ae/products/${product.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetail id={id} />
    </>
  );
}
