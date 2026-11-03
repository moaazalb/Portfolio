import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { contactSchema, type ContactInput } from '@/lib/validations/contact';
import { getDb } from './client';

/** How long to wait for Firestore to confirm the write (milliseconds). */
const TIMEOUT_MS = 10_000;

/**
 * Validates and saves a contact message to Firestore.
 * @param input - Raw form values.
 * @throws If validation fails, Firebase isn't configured, the write is
 * rejected, or Firestore doesn't confirm it in time.
 */
export async function sendContactMessage(input: ContactInput): Promise<void> {
  const data = contactSchema.parse(input);
  const write = addDoc(collection(getDb(), 'messages'), {
    ...data,
    createdAt: serverTimestamp(),
  });

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Sending timed out')), TIMEOUT_MS);
  });

  try {
    await Promise.race([write, timeout]);
  } finally {
    clearTimeout(timer);
  }
}