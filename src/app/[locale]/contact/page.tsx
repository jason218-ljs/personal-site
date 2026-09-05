import { Metadata } from 'next';
import { Locale } from '@/content/config/i18n';
import { getContactContent, getSiteConfig } from '@/lib/content';
import { ContactPageContent } from './ContactPageContent';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const config = getSiteConfig();
  return {
    title: { zh: '联系方式', en: 'Contact' }[locale],
    description: { zh: '联系方式与社交链接', en: 'Contact information and social links' }[locale],
    openGraph: {
      title: { zh: `联系方式 | ${config.name}`, en: `Contact | Junsen Li` }[locale],
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const contact = await getContactContent(locale);
  return <ContactPageContent locale={locale} contact={contact} />;
}