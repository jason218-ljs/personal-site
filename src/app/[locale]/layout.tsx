import { notFound } from 'next/navigation';
import { ClientHeader } from '@/components/layout/ClientHeader';
import { Footer } from '@/components/layout/Footer';
import { isValidLocale } from '@/content/config/i18n';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <ClientHeader locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </ThemeProvider>
  );
}