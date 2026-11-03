import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogList from '@/components/sections/BlogList';
import SectionHeading from '@/components/ui/SectionHeading';
import { fetchPosts } from '@/lib/firebase/queries';
import { getTranslation } from '@/lib/i18n/server';
import { isLocale } from '@/lib/i18n/settings';
import { createPageMetadata } from '@/lib/seo';

/** Refresh the page at most once an hour, so new posts appear without a redeploy. */
export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{ lang: string }>;
}

/** Sets the title, description, canonical URL, hreflang links and Open Graph tags. */
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { t } = await getTranslation(lang);

  return createPageMetadata({
    lang,
    path: '/blog',
    title: t('blog.title'),
    description: t('blog.subtitle'),
  });
}

/** Blog index page. */
export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { t } = await getTranslation(lang);
  const posts = await fetchPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28">
      <SectionHeading title={t('blog.title')} subtitle={t('blog.subtitle')} />
      <BlogList posts={posts} lang={lang} />
    </div>
  );
}