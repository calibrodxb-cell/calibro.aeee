import { notFound } from 'next/navigation';
import ProjectDetail from '../../../views/ProjectDetail';
import { PROJECTS } from '../../../data/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return {};

  const description =
    project.description?.[0]?.slice(0, 158) ||
    `Bespoke furniture project by Calibro in ${project.location}.`;
  const title = `${project.name} | Bespoke Furniture Project`;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: 'article',
      url: `/projects/${project.id}`,
      title: `${project.name} | Calibro`,
      description,
      images: project.cover
        ? [{ url: project.cover, alt: `${project.name} bespoke furniture project` }]
        : []
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Calibro`,
      description,
      images: project.cover ? [project.cover] : []
    }
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

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
        name: 'Projects',
        item: 'https://calibro.ae/projects'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.name,
        item: `https://calibro.ae/projects/${project.id}`
      }
    ]
  };

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    url: `https://calibro.ae/projects/${project.id}`,
    description: project.description?.join?.(' ') || project.description,
    image: project.cover ? `https://calibro.ae${project.cover}` : undefined,
    locationCreated: project.location,
    creator: { '@id': 'https://calibro.ae/#business' }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectDetail id={id} />
    </>
  );
}
