'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/i18n/settings';
import LinkButton from '../ui/LinkButton';

/**
 * Link that switches the current page between English and Arabic
 * and remembers the choice in a cookie.
 */
export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { lang } = useParams<{ lang: Locale }>();

  const target: Locale = lang === 'en' ? 'ar' : 'en';
  const segments = pathname.split('/');
  segments[1] = target;

  /** Stores the chosen locale for the next visit. */
  const rememberLocale = () => {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <LinkButton
      href={segments.join('/')}
      hrefLang={target}
      variant="ghost"
      size="sm"
      aria-label={t('language.label')}
      onClick={rememberLocale}
    >
      {t('language.switch')}
    </LinkButton>
  );
}