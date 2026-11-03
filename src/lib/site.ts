/** Public base URL of the site, without a trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
);

/** Name used in Open Graph tags. */
export const SITE_NAME = 'Moaaz Albari';