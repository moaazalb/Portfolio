'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/ui/Reveal';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/i18n/settings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProjectFilter } from '@/store/slices/uiSlice';
import type { Project } from '@/types/content';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: readonly Project[];
  lang: Locale;
}

/**
 * Project cards with a category filter stored in Redux.
 * The filter bar only appears when there is more than one category.
 */
export default function ProjectsGrid({ projects, lang }: ProjectsGridProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.ui.projectFilter);

  const categories = useMemo(() => [...new Set(projects.map((p) => p.category))], [projects]);
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {categories.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2" role="group">
          {['all', ...categories].map((category) => (
            <Button
              key={category}
              size="sm"
              variant={filter === category ? 'default' : 'outline'}
              aria-pressed={filter === category}
              onClick={() => dispatch(setProjectFilter(category))}
            >
              {category === 'all' ? t('projects.filter.all') : t(`projects.categories.${category}`)}
            </Button>
          ))}
        </div>
      )}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {visible.map((project, index) => (
          <Reveal key={project.slug} delay={0.1 * index}>
            <ProjectCard project={project} lang={lang} ctaLabel={t('projects.viewCase')} />
          </Reveal>
        ))}
      </div>
    </>
  );
}