import SectionHeading from '@/components/ui/SectionHeading';
import { getProjects } from '@/lib/projects';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';
import ProjectsGrid from './ProjectsGrid';

interface ProjectsProps {
  /** Active locale. */
  lang: Locale;
}

/** Projects section for the home page. */
export default async function Projects({ lang }: ProjectsProps) {
  const { t } = await getTranslation(lang);
  const projects = await getProjects();

  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t('projects.title')} subtitle={t('projects.subtitle')} />
        <ProjectsGrid projects={projects} lang={lang} />
      </div>
    </section>
  );
}