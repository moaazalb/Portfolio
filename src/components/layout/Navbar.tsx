'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeMobileMenu, toggleMobileMenu } from '@/store/slices/uiSlice';
import type { Locale } from '@/lib/i18n/settings';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

/** Section ids shown in the navigation, in order. */
const NAV_ITEMS = [
  'about',
  'skills',
  'projects',
  'experience',
  'certificates',
  'blog',
  'contact',
] as const;

/**
 * Fixed top navigation with section links, language and theme switchers,
 * and a mobile menu whose open state lives in Redux.
 */
export default function Navbar() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: Locale }>();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch(closeMobileMenu());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dispatch]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/70 backdrop-blur-lg">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
        aria-label="Main"
      >
        <Link href={`/${lang}`} className="text-brand-gradient text-xl font-extrabold">
          MA
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((id) => (
            <li key={id}>
              <Button variant="ghost" size="sm">
                <Link href={`/${lang}#${id}`}>{t(`nav.${id}`)}</Link>
              </Button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={t('nav.menu')}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => dispatch(toggleMobileMenu())}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {isOpen && (
        <ul
          id="mobile-menu"
          className="animate-in fade-in slide-in-from-top-2 border-t bg-background p-4 lg:hidden"
        >
          {NAV_ITEMS.map((id) => (
            <li key={id}>
              <Link
                href={`/${lang}#${id}`}
                onClick={() => dispatch(closeMobileMenu())}
                className="block rounded-md px-3 py-3 text-lg font-medium hover:bg-muted"
              >
                {t(`nav.${id}`)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}