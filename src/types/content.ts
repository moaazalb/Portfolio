import type { Locale } from '@/lib/i18n/settings';

/** A string translated into every supported locale. */
export type Localized = Record<Locale, string>;

/** A screenshot shown in a project's gallery. */
export interface ProjectImage {
  src: string;
  alt: Localized;
  device: 'desktop' | 'mobile';
  /** Pixel size of the image file; reserves space and avoids layout shift. */
  width?: number;
  height?: number;
}

/** A portfolio project. */
export interface Project {
  slug: string;
  title: Localized;
  summary: Localized;
  role: Localized;
  features: Localized[];
  tags: string[];
  category: 'ecommerce' | 'web' | 'mobile';
  cover: string;
  gallery: ProjectImage[];
  liveUrl: string;
  repoUrl: string;
  /** Whether the live site may be embedded in an iframe. */
  embeddable: boolean;
}

/** A group of related skills. */
export interface SkillGroup {
  id: 'frontend' | 'languages' | 'tools' | 'infra';
  items: string[];
}

/** An entry in the experience and education timeline. */
export interface TimelineItem {
  id: string;
  kind: 'work' | 'education';
  title: Localized;
  organization: string;
  period: Localized;
  points: TimelinePoint[];
}

/** A professional certificate. */
export interface Certificate {
  id: string;
  /** Official certificate name (kept in English). */
  title: string;
  issuer: string;
  /** Link to the verifiable credential, if available. */
  credentialUrl?: string;
}

/** A blog post. */
export interface Post {
  slug: string;
  title: Localized;
  excerpt: Localized;
  content: Localized;
  coverUrl: string;
  /** Publication date in ISO format (e.g. "2026-11-02"). */
  publishedAt: string;
}

/** A translated experience point with an optional external link. */
export interface TimelinePoint extends Localized {
  link?: string;
}

