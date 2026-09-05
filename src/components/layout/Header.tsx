'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getNavItems } from '@/content/config/nav';
import { siteConfig } from '@/content/config/site';
import { Locale } from '@/content/config/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { Icon } from '@/components/ui/Icon';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const navItems = getNavItems(locale);

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const themeLabels = {
    light: { zh: '浅色', en: 'Light' },
    dark: { zh: '深色', en: 'Dark' },
    system: { zh: '跟随系统', en: 'System' },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-[80rem] items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="font-semibold text-xl tracking-tight hover:opacity-80 transition-opacity" aria-label="Home">
            {siteConfig.name}
          </Link>
          
          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === `/${locale}${item.href}` || pathname.startsWith(`/${locale}${item.href}/`)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} />
          
          {/* Theme Toggle */}
          <div className="hidden md:flex md:items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
                const currentIndex = themes.indexOf(theme);
                const nextTheme = themes[(currentIndex + 1) % themes.length];
                setTheme(nextTheme);
              }}
              aria-label={locale === 'zh' ? '切换主题' : 'Toggle theme'}
              title={themeLabels[theme][locale]}
            >
              <Icon icon={themeIcons[theme]} className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex md:items-center gap-1"
            onClick={() => window.open(siteConfig.cvPdf[locale], '_blank')}
            aria-label={locale === 'zh' ? '查看简历' : 'View CV'}
          >
            CV
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t bg-background px-4 py-4">
          <div className="flex flex-col gap-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={cn(
                  'text-base font-medium transition-colors hover:text-primary',
                  pathname === `/${locale}${item.href}` || pathname.startsWith(`/${locale}${item.href}/`)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher locale={locale} className="pt-4 border-t" />
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => {
                  const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
                  const currentIndex = themes.indexOf(theme);
                  const nextTheme = themes[(currentIndex + 1) % themes.length];
                  setTheme(nextTheme);
                }}
              >
                <Icon icon={themeIcons[theme]} className="h-4 w-4" />
                {themeLabels[theme][locale]}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}