'use client';

import { useMemo, type ReactNode } from 'react';
import { createInstance, type Resource } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/settings';
import { defaultNS } from '@/lib/i18n/settings';

interface TranslationsProviderProps {
  children: ReactNode;
  locale: Locale;
  /** Translation resources loaded on the server, so the client needs no extra request. */
  resources: Resource;
}

/**
 * Makes translations available to Client Components via `useTranslation`.
 */
export default function TranslationsProvider({
  children,
  locale,
  resources,
}: TranslationsProviderProps) {
  const i18n = useMemo(() => {
    const instance = createInstance();
    instance.use(initReactI18next).init({
      lng: locale,
      resources,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      ns: [defaultNS],
      defaultNS,
      interpolation: { escapeValue: false },
      initAsync: false, // on i18next < 24 use `initImmediate: false`
    });
    return instance;
  }, [locale, resources]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}