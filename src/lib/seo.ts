import type { Metadata } from 'next';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/settings';
import { SITE_NAME } from './site';

const OG_LOCALES: Record<Locale, string> = { en: 'en_US', ar: 'ar_AR' };

/**
 * Builds the hreflang map for a page.
 * @param path - Path after the locale, e.g. "/blog" (empty for the home page).
 */
export function buildLanguageAlternates(path = ''): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}${path}`])),
    'x-default': `/${defaultLocale}${path}`,
  };
}

interface PageMetadataInput {
  lang: Locale;
  /** Path after the locale, e.g. "/blog" (empty for the home page). */
  path?: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
  /** Skip the "| Site name" title suffix (used by the home page). */
  absoluteTitle?: boolean;
}

/**
 * Creates the title, description, canonical URL, hreflang links and
 * Open Graph tags for a page.
 */
export function createPageMetadata({
  lang,
  path = '',
  title,
  description,
  type = 'website',
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = `/${lang}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: buildLanguageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: SITE_NAME,
      locale: OG_LOCALES[lang],
    },
  };
}