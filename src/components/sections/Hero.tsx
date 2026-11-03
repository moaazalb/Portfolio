import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/ui/Reveal';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';

interface HeroProps {
  /** Active locale. */
  lang: Locale;
}

/**
 * Landing section with a big gradient headline and two calls to action.
 */
export default async function Hero({ lang }: HeroProps) {
  const { t } = await getTranslation(lang);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24"
    >
      {/* Decorative gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-gradient absolute -top-32 start-1/4 size-96 rounded-full opacity-30 blur-3xl" />
        <div className="bg-brand-gradient absolute bottom-0 end-1/4 size-80 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <Reveal delay={0.1}>
          <h1 className="text-brand-gradient py-2 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl rtl:tracking-normal">
            {t('hero.name')}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="text-2xl font-bold sm:text-4xl">{t('hero.role')}</h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t('hero.tagline')}</p>
        </Reveal>
        <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-4">
          <Button  size="lg" className="bg-brand-gradient border-0 text-white">
            <Link href={`/${lang}#projects`} className="inline-flex items-center justify-center gap-2">
              {t('hero.ctaProjects')}
              <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
            </Link>
          </Button>
          <Button  size="lg" variant="outline">
            <Link href={`/${lang}#contact`}>{t('hero.ctaContact')}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}