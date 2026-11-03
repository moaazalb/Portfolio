import Reveal from '@/components/ui/Reveal';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';

interface AboutProps {
  /** Active locale. */
  lang: Locale;
}

/** Numeric highlights shown in the About section. Edit with your real numbers. */
const STATS = [
  { key: 'years', value: '1+' },
  { key: 'stores', value: '2' },
  { key: 'certificates', value: '3' },
] as const;

/**
 * About section with a short bio and key numbers.
 */
export default async function About({ lang }: AboutProps) {
  const { t } = await getTranslation(lang);

  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-4xl font-extrabold sm:text-5xl">{t('about.title')}</h2>
          <div className="bg-brand-gradient mt-4 h-1.5 w-24 rounded-full" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t('about.body')}
          </p>
        </Reveal>
        <dl className="mt-12 grid gap-6 sm:grid-cols-3">
          {STATS.map(({ key, value }, index) => (
            <Reveal key={key} delay={0.1 * index}>
              <div className="rounded-2xl border bg-card p-6">
                <dd className="text-brand-gradient text-5xl font-extrabold">{value}</dd>
                <dt className="mt-2 text-muted-foreground">{t(`about.stats.${key}`)}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}