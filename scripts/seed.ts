import { cert, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { projects } from '@/data/projects';
import { seedPosts } from './seed-posts';

async function main() {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT is not configured.');
  }

  const key = JSON.parse(serviceAccount) as ServiceAccount;

  initializeApp({ credential: cert(key) });

  const db = getFirestore();
  const batch = db.batch();

  projects.forEach((project, index) => {
    const { slug, ...data } = project;
    batch.set(db.collection('projects').doc(slug), {
      ...data,
      order: index,
    });
  });

  seedPosts.forEach(({ slug, ...data }) => {
    batch.set(db.collection('posts').doc(slug), data);
  });

  await batch.commit();

  console.log(`Seeded ${projects.length} projects and ${seedPosts.length} posts.`);
}

main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});