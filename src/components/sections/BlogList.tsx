'use client';

import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import type { Locale } from '@/lib/i18n/settings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setBlogSearch } from '@/store/slices/uiSlice';
import type { Post } from '@/types/content';
import PostCard from './PostCard';

interface BlogListProps {
  posts: readonly Post[];
  lang: Locale;
}

/** All blog posts with a search box (search text lives in Redux). */
export default function BlogList({ posts, lang }: BlogListProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.ui.blogSearch);

  const needle = search.trim().toLowerCase();
  const visible = needle
    ? posts.filter((post) =>
        `${post.title[lang]} ${post.excerpt[lang]}`.toLowerCase().includes(needle),
      )
    : posts;

  return (
    <>
      <div className="relative mt-8 max-w-md">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          maxLength={80}
          onChange={(event) => dispatch(setBlogSearch(event.target.value))}
          placeholder={t('blog.searchPlaceholder')}
          aria-label={t('blog.searchLabel')}
          className="ps-9"
        />
      </div>
      {visible.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          {posts.length === 0 ? t('blog.empty') : t('blog.noResults')}
        </p>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} ctaLabel={t('blog.readMore')} />
          ))}
        </div>
      )}
    </>
  );
}