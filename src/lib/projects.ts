import { projects as fallbackProjects } from '@/data/projects';
import { fetchProjects } from '@/lib/firebase/queries';
import type { Project } from '@/types/content';

/**
 * Returns all projects from Firestore, falling back to the bundled data
 * if Firestore is empty or unavailable.
 */
export async function getProjects(): Promise<readonly Project[]> {
  const remote = await fetchProjects();
  return remote.length > 0 ? remote : fallbackProjects;
}

/**
 * Finds a project by slug.
 * @param slug - URL slug of the project.
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((project) => project.slug === slug);
}