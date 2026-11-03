import { createInstance, type i18n } from 'i18next';
import ar from './locales/ar/common.json';
import en from './locales/en/common.json';
import { defaultLocale, defaultNS, locales, type Locale } from './settings';

/** Translation resources, bundled with the app (no async loading needed). */
export const resources = {
  en: { [defaultNS]: en },
  ar: { [defaultNS]: ar },
};

/**
 * Creates and synchronously initializes an i18next instance for a locale.
 * @param lng - Locale to use.
 * @returns A ready-to-use i18next instance.
 */
export function initI18n(lng: Locale): i18n {
  const instance = createInstance();
  instance.init({
    lng,
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    resources,
    ns: [defaultNS],
    defaultNS,
    interpolation: { escapeValue: false },
    initAsync: false, // on i18next v23 or older, use `initImmediate: false` instead
  });
  return instance;
}