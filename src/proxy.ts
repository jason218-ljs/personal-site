import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale, getLocaleFromPath } from '@/content/config/i18n';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocaleFromPath(pathname);
  
  if (!isValidLocale(locale)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml|search-index).*)',
  ],
};