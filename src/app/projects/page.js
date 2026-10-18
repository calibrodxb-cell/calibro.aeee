import Projects from '../../views/Projects';

export const metadata = {
  title: 'Bespoke Furniture Projects in Dubai',
  description:
    'Explore bespoke furniture manufacturing projects delivered by Calibro across Dubai, the UAE and GCC for residential, hospitality and corporate interiors.',
  alternates: { canonical: '/projects' },
  openGraph: {
    url: '/projects',
    title: 'Bespoke Furniture Projects in Dubai | Calibro',
    description:
      'Selected custom furniture manufacturing and FF&E work across residential, hospitality and corporate interiors.'
  }
};

export default function ProjectsPage() {
  return <Projects />;
}
