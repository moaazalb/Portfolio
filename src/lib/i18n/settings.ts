/** Supported locales for the application. */
export const locales = ['en', 'ar'] as const;

/** A supported locale code. */
export type Locale = (typeof locales)[number];

/** Locale used when none can be detected. */
export const defaultLocale: Locale = 'en';

/** The single translation namespace used by the app. */
export const defaultNS = 'common';

/** Locales written right-to-left. */
const rtlLocales: readonly Locale[] = ['ar'];

/**
 * Type guard that checks whether a string is a supported locale.
 * @param value - Value to check.
 */
export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Returns the text direction for a locale.
 * @param locale - Locale code.
 */
export const getDirection = (locale: Locale): 'rtl' | 'ltr' =>
  rtlLocales.includes(locale) ? 'rtl' : 'ltr';