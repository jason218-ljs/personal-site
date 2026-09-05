import { Metadata } from 'next';
import { Locale } from '@/content/config/i18n';
import { getProjectDetail, getAllProjectSlugs, getSiteConfig } from '@/lib/content';
import { ProjectDetailPage } from './ProjectDetailPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectDetail(slug, locale);
  const config = getSiteConfig();
  
  if (!project) {
    return { title: 'Not Found' };
  }

  return {
    title: project.title[locale],
    description: project.shortDescription[locale],
    openGraph: {
      title: project.title[locale],
      description: project.shortDescription[locale],
      type: 'article',
      images: project.thumbnail ? [project.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title[locale],
      description: project.shortDescription[locale],
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  const params = [];
  for (const slug of slugs) {
    params.push({ locale: 'zh', slug });
    params.push({ locale: 'en', slug });
  }
  return params;
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = await getProjectDetail(slug, locale);
  
  if (!project) {
    notFound();
  }

  return <ProjectDetailPage locale={locale} project={project} />;
}