import { Metadata } from 'next';
import { Locale } from '@/content/config/i18n';
import { getProjectMeta, getSiteConfig } from '@/lib/content';
import { ProjectsPageContent } from './ProjectsPageContent';

interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const config = getSiteConfig();
  return {
    title: { zh: '项目经历', en: 'Projects' }[locale],
    description: { zh: '实习实践、研究与课程项目', en: 'Industry practice, research, and coursework projects' }[locale],
    openGraph: {
      title: { zh: `项目经历 | ${config.name}`, en: `Projects | Junsen Li` }[locale],
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const projects = await getProjectMeta(locale);
  return <ProjectsPageContent locale={locale} projects={projects} />;
}