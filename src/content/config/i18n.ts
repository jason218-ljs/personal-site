export type Locale = 'zh' | 'en';

export const locales: Locale[] = ['zh', 'en'];
export const defaultLocale: Locale = 'zh';

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
};

export const localePaths: Record<Locale, string> = {
  zh: '/zh',
  en: '/en',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }
  return defaultLocale;
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (isValidLocale(firstSegment)) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPath(pathname);
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}