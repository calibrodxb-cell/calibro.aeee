import SeoLandingPage from '../../components/SeoLandingPage';

export const metadata = {
  title: 'Furniture Factory in Dubai',
  description:
    'Explore Calibro furniture manufacturing capabilities in Dubai, including custom joinery, metalworks, upholstery, finishing, quality control and installation.',
  alternates: { canonical: '/our-factory' },
  openGraph: {
    url: '/our-factory',
    title: 'Furniture Factory in Dubai | Calibro',
    description:
      'Custom furniture manufacturing in Dubai, from material sourcing and joinery to upholstery, finishing, quality control and installation.'
  }
};

const sections = [
  {
    title: 'Custom furniture manufacturing',
    body: 'Made-to-order furniture for residential, hospitality and commercial interiors, developed from drawings, samples, reference imagery or an approved design brief.'
  },
  {
    title: 'Joinery and woodworks',
    body: 'Custom cabinetry, storage, wall features, tables and detailed timber elements produced to project dimensions and finish requirements.'
  },
  {
    title: 'Metalworks and fabrication',
    body: 'Integrated metal frames, decorative details, supports and custom components are coordinated with the furniture package.'
  },
  {
    title: 'Upholstery and soft furnishing',
    body: 'Bespoke seating, headboards and soft furniture are produced with project-specific fabrics, leathers, foam specifications and detailing.'
  },
  {
    title: 'Custom finishing',
    body: 'Veneers, stains, lacquers, paints and specialist finishes are sampled and approved before final production.'
  },
  {
    title: 'Quality control and installation',
    body: 'Pre-delivery checks, documentation, coordinated logistics, site delivery, assembly and installation are managed as one process.'
  }
];

export default function FactoryPage() {
  return (
    <SeoLandingPage
      canonicalPath="/our-factory"
      eyebrow="Our Factory"
      title="Custom furniture manufacturing in Dubai."
      intro="From bespoke joinery and upholstery to metalwork, finishing and final installation, Calibro coordinates the production stages required to turn an approved design into finished furniture."
      statement="The objective is not simply to produce a piece of furniture. It is to control materials, proportions, detailing, finish and delivery closely enough that the manufactured result still feels like the approved design."
      sections={sections}
      ctaTitle="Have drawings or a BOQ ready?"
      ctaBody="Send the project information and quantities. Calibro can review manufacturing feasibility, finishes, programme and the next commercial step."
    />
  );
}
