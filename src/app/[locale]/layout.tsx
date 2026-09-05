import { ClientHeader } from '@/components/layout/ClientHeader';
import { Footer } from '@/components/layout/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/content/config/i18n';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const validLocale = isValidLocale(locale) ? locale : defaultLocale;

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <ClientHeader locale={validLocale} />
        <main className="flex-1">{children}</main>
        <Footer locale={validLocale} />
      </div>
    </ThemeProvider>
  );
}