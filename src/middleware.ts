import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, locales, type Locale } from '@/lib/i18n/settings';

/**
 * Redirects requests without a locale prefix to the best matching locale,
 * using the NEXT_LOCALE cookie first, then the Accept-Language header.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookie = request.cookies.get('NEXT_LOCALE')?.value;
  const header = request.headers.get('accept-language')?.split(',')[0]?.slice(0, 2);
  const locale: Locale =
    [cookie, header].find((v): v is Locale => !!v && isLocale(v)) ?? defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };