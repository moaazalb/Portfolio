import { initI18n } from './init';
import type { Locale } from './settings';

/**
 * Returns a translation function for use in Server Components.
 * @param lang - Active locale.
 */
export function getTranslation(lang: Locale) {
  const i18n = initI18n(lang);
  return { t: i18n.getFixedT(lang), i18n };
}