import { Briefcase, GraduationCap } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { experience } from '@/data/experience';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';

interface ExperienceProps {
  /** Active locale. */
  lang: Locale;
}

/** Vertical timeline of work experience and education. */
export default async function Experience({ lang }: ExperienceProps) {
  const { t } = await getTranslation(lang);

  return (
    <section id="experience" className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={t('experience.title')} />
        <ol className="relative ms-3 mt-12 space-y-12 border-s-2">
          {experience.map((item) => {
            const Icon = item.kind === 'work' ? Briefcase : GraduationCap;
            return (
              <li key={item.id} className="relative ps-8">
                <span
                  aria-hidden
                  className="bg-brand-gradient absolute -start-[17px] top-0 flex size-8 items-center justify-center rounded-full text-white"
                >
                  <Icon className="size-4" />
                </span>
                <Reveal>
  <p className="text-sm font-medium text-muted-foreground">
    {item.period[lang]}
  </p>

  <h3 className="mt-1 text-2xl font-bold">
    {item.title[lang]}
  </h3>

  <p className="text-brand-gradient font-semibold">
    {item.organization}
  </p>

  {item.points.length > 0 && (
    <ul className="mt-4 list-disc space-y-2 ps-5 text-muted-foreground">
      {item.points.map((point) => (
        <li key={point.en}>
          {point.link ? (
            <a
              href={point.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              {point[lang]}
            </a>
          ) : (
            point[lang]
          )}
        </li>
      ))}
    </ul>
  )}
</Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}