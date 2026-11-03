import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import About from '@/components/sections/About';
import Blog from '@/components/sections/Blog';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import { getTranslation } from '@/lib/i18n/server';
import { isLocale } from '@/lib/i18n/settings';
import { createPageMetadata } from '@/lib/seo';

/** Refresh the page at most once an hour, so Firestore edits appear without a redeploy. */
export const revalidate = 3600;

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/** Home page metadata. */
export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { t } = await getTranslation(lang);
  return createPageMetadata({
    lang,
    title: t('meta.title'),
    description: t('meta.description'),
    absoluteTitle: true,
  });
}

/** Home page: composes all portfolio sections. */
export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Hero lang={lang} />
      <About lang={lang} />
      <Skills lang={lang} />
      <Projects lang={lang} />
      <Experience lang={lang} />
      <Certificates lang={lang} />
      <Blog lang={lang} />
      <Contact lang={lang} />
    </>
  );
}