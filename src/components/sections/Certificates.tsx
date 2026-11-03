import { Award, ExternalLink } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { certificates } from '@/data/certificates';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';

interface CertificatesProps {
  /** Active locale. */
  lang: Locale;
}

/** Grid of professional certificates with optional credential links. */
export default async function Certificates({ lang }: CertificatesProps) {
  const { t } = await getTranslation(lang);

  return (
    <section id="certificates" className="bg-muted/30 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t('certificates.title')} subtitle={t('certificates.subtitle')} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {certificates.map((certificate, index) => (
            <li key={certificate.id}>
              <Reveal delay={0.1 * index} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border bg-card p-6">
                  <span className="bg-brand-gradient flex size-12 items-center justify-center rounded-xl text-white">
                    <Award className="size-6" />
                  </span>
                  <h3 dir="auto" className="mt-5 text-xl font-bold">
                    {certificate.title}
                  </h3>
                  <p dir="auto" className="mt-1 flex-1 text-muted-foreground">
                    {certificate.issuer}
                  </p>
                  {certificate.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-gradient mt-5 inline-flex items-center gap-2 font-semibold"
                    >
                      {t('certificates.viewCredential')}
                      <ExternalLink className="size-4 text-fuchsia-500" />
                    </a>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}