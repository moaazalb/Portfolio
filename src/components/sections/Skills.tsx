import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { skillGroups } from '@/data/skills';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';

interface SkillsProps {
  /** Active locale. */
  lang: Locale;
}

/** Skills grouped by category, shown as chips. */
export default async function Skills({ lang }: SkillsProps) {
  const { t } = await getTranslation(lang);

  return (
    <section id="skills" className="bg-muted/30 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t('skills.title')} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={0.1 * index}>
              <div className="h-full rounded-2xl border bg-card p-6">
                <h3 className="text-brand-gradient text-xl font-bold">
                  {t(`skills.groups.${group.id}`)}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      dir="ltr"
                      className="rounded-full border bg-background px-3 py-1 text-sm font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}