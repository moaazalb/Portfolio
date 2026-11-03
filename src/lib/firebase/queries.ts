import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import type { Post, Project } from '@/types/content';
import { getDb } from './client';

/**
 * Fetches all projects from Firestore, ordered by their `order` field.
 * @returns The projects, or an empty array if Firestore is unreachable.
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const snap = await getDocs(query(collection(getDb(), 'projects'), orderBy('order')));
    return snap.docs.map((d) => ({ slug: d.id, ...(d.data() as Omit<Project, 'slug'>) }));
  } catch (error) {
    console.error('fetchProjects failed:', error);
    return [];
  }
}

/**
 * Fetches all blog posts, newest first.
 * @returns The posts, or an empty array if Firestore is unreachable.
 */
export async function fetchPosts(): Promise<Post[]> {
  try {
    const snap = await getDocs(query(collection(getDb(), 'posts'), orderBy('publishedAt', 'desc')));
    return snap.docs.map((d) => ({ slug: d.id, ...(d.data() as Omit<Post, 'slug'>) }));
  } catch (error) {
    console.error('fetchPosts failed:', error);
    return [];
  }
}

/**
 * Fetches one blog post by slug.
 * @param slug - Post slug (the Firestore document ID).
 */
export async function fetchPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const snap = await getDoc(doc(getDb(), 'posts', slug));
    return snap.exists() ? { slug: snap.id, ...(snap.data() as Omit<Post, 'slug'>) } : undefined;
  } catch (error) {
    console.error('fetchPostBySlug failed:', error);
    return undefined;
  }
}