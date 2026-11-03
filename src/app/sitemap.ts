import type { MetadataRoute } from 'next';
import { fetchPosts } from '@/lib/firebase/queries';
import { locales } from '@/lib/i18n/settings';
import { getProjects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

/** Creates one sitemap entry per language for a path, each linking to its translations. */
function entries(path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${SITE_URL}/${lang}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
    },
  }));
}

/** Generates /sitemap.xml with every page in every language. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), fetchPosts()]);

  return [
    ...entries('', 1),
    ...entries('/blog', 0.7),
    ...projects.flatMap((project) => entries(`/projects/${project.slug}`, 0.8)),
    ...posts.flatMap((post) => entries(`/blog/${post.slug}`, 0.6, post.publishedAt)),
  ];
}