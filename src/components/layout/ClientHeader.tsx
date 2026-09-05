'use client';

import dynamic from 'next/dynamic';
import { Locale } from '@/content/config/i18n';
import { siteConfig } from '@/content/config/site';

const Header = dynamic(() => import('@/components/layout/Header').then(mod => mod.Header), {
  ssr: false,
  loading: () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-[80rem] items-center justify-between px-4 py-4 sm:px-6 lg:px-8 h-16" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <span className="font-semibold text-xl tracking-tight">{siteConfig.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-[100px] h-10 bg-muted rounded-lg animate-pulse" />
        </div>
      </nav>
    </header>
  ),
});

interface ClientHeaderProps {
  locale: Locale;
}

export function ClientHeader({ locale }: ClientHeaderProps) {
  return <Header locale={locale} />;
}