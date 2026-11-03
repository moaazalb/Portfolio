'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

/** Localized "page not found" screen. */
export default function NotFound() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-16 text-center">
      <p className="text-brand-gradient text-8xl font-extrabold sm:text-9xl">404</p>
      <h1 className="mt-4 text-3xl font-bold">{t('notFound.title')}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">{t('notFound.text')}</p>
      <Button  size="lg" className="bg-brand-gradient mt-8 border-0 text-white">
        <Link href={`/${lang}`}>{t('notFound.home')}</Link>
      </Button>
    </div>
  );
}