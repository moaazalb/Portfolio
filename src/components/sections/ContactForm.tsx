'use client';

import type { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showError, showSuccess } from '@/lib/alerts';
import { sendContactMessage } from '@/lib/firebase/contact';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contact';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Label, control and (optional) validation message for one form field. */
function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Contact form validated with React Hook Form + Zod.
 * The submit button stays disabled until the form is valid, and while sending.
 */
export default function ContactForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
  });

  /** Saves the message to Firestore and notifies the visitor. */
  const onSubmit = async (values: ContactFormValues) => {
    if (values.website) {
      reset(); // honeypot filled: silently ignore the bot
      return;
    }
    try {
      await sendContactMessage(values);
      await showSuccess(t('contact.successTitle'), t('contact.successText'));
      reset();
    } catch (error) {
      console.error('Contact form failed:', error);
      await showError(t('contact.errorTitle'), t('contact.errorText'));
    }
  };

  /** Translates a validation message key, if present. */
  const err = (message?: string) => (message ? t(message) : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t('contact.form.name')} error={err(errors.name?.message)}>
          <Input
            id="name"
            suppressHydrationWarning
            autoComplete="name"
            maxLength={80}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
        </Field>
        <Field id="email" label={t('contact.form.email')} error={err(errors.email?.message)}>
          <Input
            id="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            maxLength={120}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </Field>
      </div>
      <Field id="subject" label={t('contact.form.subject')} error={err(errors.subject?.message)}>
        <Input
          id="subject"
          maxLength={120}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          {...register('subject')}
        />
      </Field>
      <Field id="message" label={t('contact.form.message')} error={err(errors.message?.message)}>
        <Textarea
          id="message"
          rows={6}
          maxLength={2000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
      </Field>

      {/* Honeypot: hidden from people and screen readers */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register('website')}
      />

      <Button
        type="submit"
        size="lg"
        disabled={!isValid || isSubmitting}
        className="bg-brand-gradient border-0 text-white"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="me-2 size-4 animate-spin" />
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            <Send className="me-2 size-4 rtl:-scale-x-100" />
            {t('contact.form.send')}
          </>
        )}
      </Button>
    </form>
  );
}