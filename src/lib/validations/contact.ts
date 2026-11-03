import { z } from 'zod';

/**
 * Schema for the contact form.
 * Error messages are i18n keys, translated where they are displayed.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'validation.name').max(80, 'validation.name'),
  email: z.string().trim().email('validation.email').max(120, 'validation.email'),
  subject: z.string().trim().min(3, 'validation.subject').max(120, 'validation.subject'),
  message: z.string().trim().min(10, 'validation.message').max(2000, 'validation.message'),
});

/** Validated contact form values. */
export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Form schema: the contact schema plus a hidden honeypot field.
 * Real users leave `website` empty; bots tend to fill it in.
 */
export const contactFormSchema = contactSchema.extend({
  website: z.string().optional(),
});

/** Values handled by the contact form. */
export type ContactFormValues = z.infer<typeof contactFormSchema>;