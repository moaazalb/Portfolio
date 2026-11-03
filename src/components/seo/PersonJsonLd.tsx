import { contactInfo } from '@/data/contact';
import type { Locale } from '@/lib/i18n/settings';
import { SITE_URL } from '@/lib/site';

interface PersonJsonLdProps {
  /** Active locale. */
  lang: Locale;
}

/**
 * Structured data (schema.org Person) that helps search engines
 * understand who the site belongs to.
 */
export default function PersonJsonLd({ lang }: PersonJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Moaaz Albari',
    jobTitle: 'Front-end Developer',
    url: `${SITE_URL}/${lang}`,
    email: contactInfo.email,
    sameAs: [contactInfo.github, contactInfo.linkedin].filter(Boolean),
    address: { '@type': 'PostalAddress', addressLocality: 'Damascus', addressCountry: 'SY' },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}