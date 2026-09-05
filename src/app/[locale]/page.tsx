import { Metadata } from 'next';
import { Locale } from '@/content/config/i18n';
import { getAboutContent, getFeaturedProjects, getSiteConfig } from '@/lib/content';
import { AboutPageContent } from './AboutPageContent';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const config = getSiteConfig();
  return {
    title: config.title[locale],
    description: config.description[locale],
    openGraph: {
      title: config.title[locale],
      description: config.description[locale],
      type: 'profile',
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const [about, projects] = await Promise.all([
    getAboutContent(locale),
    getFeaturedProjects(locale, 4),
  ]);

  return <AboutPageContent locale={locale} about={about} projects={projects} />;
}
