import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { fetchPosts } from '@/lib/firebase/queries';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';
import PostCard from './PostCard';

interface BlogProps {
  /** Active locale. */
  lang: Locale;
}

/** Home page blog section showing the three latest posts. */
export default async function Blog({ lang }: BlogProps) {
  const { t } = await getTranslation(lang);
  const posts = (await fetchPosts()).slice(0, 3);

  return (
    <section id="blog" className="bg-muted/30 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t('blog.title')} subtitle={t('blog.subtitle')} />
        {posts.length === 0 ? (
          <p className="mt-12 text-muted-foreground">{t('blog.empty')}</p>
        ) : (
          <>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={0.1 * index}>
                  <PostCard post={post} lang={lang} ctaLabel={t('blog.readMore')} />
                </Reveal>
              ))}
            </div>
            <div className="mt-10">
              <Button  variant="outline" size="lg">
                <Link href={`/${lang}/blog`}>{t('blog.viewAll')}</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}