import SeoLandingPage from '../../components/SeoLandingPage';

export const metadata = {
  title: 'Custom Furniture & Contract FF&E Services Dubai',
  description:
    'Custom furniture manufacturing, contract FF&E, sourcing, value engineering, logistics, installation and aftercare for Dubai, UAE and GCC projects.',
  alternates: { canonical: '/services' },
  openGraph: {
    url: '/services',
    title: 'Custom Furniture & Contract FF&E Services Dubai | Calibro',
    description:
      'One coordinated route from brief and specification through manufacturing, sourcing, delivery, installation and aftercare.'
  }
};

const sections = [
  {
    title: 'Brief and specification review',
    body: 'We review BOQs, drawings, moodboards, quantities, material requirements and target budgets to establish a practical procurement and manufacturing plan.'
  },
  {
    title: 'Bespoke manufacturing',
    body: 'Custom furniture is engineered and manufactured to the approved dimensions, materials, finishes and performance requirements.'
  },
  {
    title: 'Contract FF&E',
    body: 'Furniture, joinery, lighting and selected FF&E can be sourced and coordinated under one project workflow for hospitality, residential and commercial schemes.'
  },
  {
    title: 'Value engineering',
    body: 'Equivalent materials, construction methods and sourcing options can be evaluated where necessary to protect design intent while improving cost or lead time.'
  },
  {
    title: 'Logistics and delivery',
    body: 'Orders can be consolidated, quality checked and coordinated for site delivery across Dubai, the UAE and the wider GCC.'
  },
  {
    title: 'Installation and aftercare',
    body: 'Site assembly, installation, handover support and warranty coordination complete the project delivery cycle.'
  }
];

export default function ServicesPage() {
  return (
    <SeoLandingPage
      canonicalPath="/services"
      eyebrow="Services"
      title="From brief to installation."
      intro="Calibro supports residential, hospitality and commercial projects with bespoke furniture manufacturing and contract FF&E services managed through one accountable team."
      statement="The work between an approved specification and a finished space is where projects are won or lost. Our service model is built to keep that middle ground controlled, visible and accountable."
      sections={sections}
    />
  );
}
