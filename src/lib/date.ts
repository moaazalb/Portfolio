import type { Locale } from '@/lib/i18n/settings';

/**
 * Formats an ISO date (e.g. "2026-10-15") for display in the given locale.
 * Uses UTC so the server and the browser always produce the same text.
 * @param iso - ISO date string.
 * @param lang - Active locale.
 */
export function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(iso),
  );
}