import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

/** Whether the required Firebase settings are present in the environment. */
export const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
);

/**
 * Returns the Firestore instance, creating the Firebase app on first use.
 * @throws If the Firebase environment variables are missing.
 */
export function getDb(): Firestore {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Check the NEXT_PUBLIC_FIREBASE_* values.');
  }
  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });
  return getFirestore(app);
}