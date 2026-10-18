import App from '../App';

export const metadata = {
  title: 'Custom Furniture Manufacturer in Dubai',
  description:
    'Calibro is a custom furniture factory and contract FF&E partner in Dubai for architects, interior designers, developers and private clients across the UAE and GCC.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Custom Furniture Manufacturer in Dubai | Calibro',
    description:
      'Custom furniture manufacturing and contract FF&E for residential, hospitality and commercial projects across Dubai, the UAE and GCC.',
    images: [{ url: '/spot2.png', alt: 'Custom furniture manufactured by Calibro' }]
  }
};

export default function HomePage() {
  return <App />;
}
