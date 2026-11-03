import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/date';
import { fetchPostBySlug, fetchPosts } from '@/lib/firebase/queries';
import { getTranslation } from '@/lib/i18n/server';
import { isLocale, locales } from '@/lib/i18n/settings';
import { createPageMetadata } from '@/lib/seo';

/** Refresh the page at most once an hour, so edits appear without a redeploy. */
export const revalidate = 3600;

interface PostPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

/** Pre-renders every existing post in every locale. */
export async function generateStaticParams() {
  const posts = await fetchPosts();
  return locales.flatMap((lang) => posts.map((post) => ({ lang, slug: post.slug })));
}

/** Sets the title, description, canonical URL, hreflang links and Open Graph tags. */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = await fetchPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    lang,
    path: `/blog/${slug}`,
    title: post.title[lang],
    description: post.excerpt[lang],
    type: 'article',
  });
}

/** A single blog post. */
export default async function PostPage({ params }: PostPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();
  const { t } = await getTranslation(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28">
      <Button  variant="ghost" size="sm" className="mb-8">
        <Link href={`/${lang}/blog`}>
          <ArrowLeft className="me-2 size-4 rtl:rotate-180" />
          {t('blog.back')}
        </Link>
      </Button>

      <article>
        <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
          {formatDate(post.publishedAt, lang)}
        </time>
        <h1 className="text-brand-gradient mt-2 py-1 text-4xl font-extrabold sm:text-5xl">
          {post.title[lang]}
        </h1>
        {post.coverUrl && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border">
            <Image src={post.coverUrl} alt="" fill sizes="768px" className="object-cover" priority />
          </div>
        )}
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          {post.content[lang].split('\n\n').map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}