import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/settings';
import type { Project } from '@/types/content';

interface ProjectCardProps {
  project: Project;
  lang: Locale;
  /** Translated "View case study" label. */
  ctaLabel: string;
}

/** Card linking to a project's case-study page. */
export default function ProjectCard({ project, lang, ctaLabel }: ProjectCardProps) {
  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={project.cover}
          alt={project.title[lang]}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold">{project.title[lang]}</h3>
        <p className="mt-2 flex-1 text-muted-foreground">{project.summary[lang]}</p>
        <ul className="mt-4 flex flex-wrap gap-2" dir="ltr">
          {project.tags.slice(0, 4).map((tag) => (
            <li key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              {tag}
            </li>
          ))}
        </ul>
        <span className="text-brand-gradient mt-5 inline-flex items-center gap-2 font-semibold">
          {ctaLabel}
          <ArrowRight className="size-4 text-fuchsia-500 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}