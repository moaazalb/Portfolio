import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Code, ExternalLink } from 'lucide-react';
import LivePreview from '@/components/sections/LivePreview';
import ProjectGallery from '@/components/sections/ProjectGallery';
import { buttonVariants } from '@/components/ui/button';
import Reveal from '@/components/ui/Reveal';
import { getTranslation } from '@/lib/i18n/server';
import { isLocale, locales } from '@/lib/i18n/settings';
import { getProjectBySlug, getProjects } from '@/lib/projects';
import { createPageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';
import LinkButton from '@/components/ui/LinkButton';

/** Refresh the page at most every 5 minutes, so Firestore edits appear without a redeploy. */
export const revalidate = 300;

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

/** Pre-renders every project page in every locale. */
export async function generateStaticParams() {
  const projects = await getProjects();
  return locales.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

/** Sets the title, description, canonical URL, hreflang links and Open Graph tags. */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return createPageMetadata({
    lang,
    path: `/projects/${slug}`,
    title: project.title[lang],
    description: project.summary[lang],
  });
}

/** Case-study page for a single project. */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const { t } = await getTranslation(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28">
      <LinkButton href={`/${lang}#projects`} variant="ghost" size="sm" className="mb-8">
      <ArrowLeft className="size-4 rtl:rotate-180" />
      {t('projects.back')}
      </LinkButton>

      <Reveal>
        <h1 className="text-brand-gradient py-1 text-4xl font-extrabold sm:text-6xl">
          {project.title[lang]}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{project.summary[lang]}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="bg-brand-gradient border-0 text-white"
          >
            <ExternalLink className="size-4" />
            {t('projects.liveDemo')}
          </LinkButton>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            <Code className="size-4" />
            {t('projects.sourceCode')}
          </a>
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <Reveal className="min-w-0 lg:col-span-2">
          <h2 className="text-2xl font-bold">{t('projects.features')}</h2>
          <ul className="mt-6 space-y-4">
            {project.features.map((feature) => (
              <li key={feature.en} className="flex gap-3">
                <Check className="mt-1 size-5 shrink-0 text-fuchsia-500" />
                <span className="text-muted-foreground">{feature[lang]}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <h2 className="text-2xl font-bold">{t('projects.role')}</h2>
          <p className="mt-4 text-muted-foreground">{project.role[lang]}</p>
          <h2 className="mt-10 text-2xl font-bold">{t('projects.techStack')}</h2>
          <ul className="mt-4 flex flex-wrap gap-2" dir="ltr">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border bg-card px-3 py-1 text-sm font-medium">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {project.embeddable && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold">{t('projects.preview')}</h2>
          <LivePreview
            url={project.liveUrl}
            title={`${project.title[lang]} – ${t('projects.preview')}`}
            openLabel={t('projects.openLive')}
          />
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold">{t('projects.screenshots')}</h2>
          <ProjectGallery images={project.gallery} lang={lang} />
        </section>
      )}
    </div>
  );
}