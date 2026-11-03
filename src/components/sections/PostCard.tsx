import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/date';
import type { Locale } from '@/lib/i18n/settings';
import type { Post } from '@/types/content';

interface PostCardProps {
  post: Post;
  lang: Locale;
  /** Translated "Read article" label. */
  ctaLabel: string;
}

/** Card linking to a blog post. */
export default function PostCard({ post, lang, ctaLabel }: PostCardProps) {
  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden className="bg-brand-gradient size-full opacity-80" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
          {formatDate(post.publishedAt, lang)}
        </time>
        <h3 className="mt-2 text-xl font-bold">{post.title[lang]}</h3>
        <p className="mt-2 flex-1 text-muted-foreground">{post.excerpt[lang]}</p>
        <span className="text-brand-gradient mt-5 font-semibold">{ctaLabel}</span>
      </div>
    </Link>
  );
}