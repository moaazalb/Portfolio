import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Cairo, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import StoreProvider from '@/components/providers/StoreProvider';
import TranslationsProvider from '@/components/providers/TranslationsProvider';
import PersonJsonLd from '@/components/seo/PersonJsonLd';
import { initI18n } from '@/lib/i18n/init';
import { getDirection, isLocale, locales } from '@/lib/i18n/settings';
import { SITE_URL } from '@/lib/site';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo' });

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

/** Pre-renders one set of pages per supported locale. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Default metadata for every page, in the active language. */
export async function generateMetadata({ params }: RootLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = initI18n(lang).getFixedT(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('meta.title'), template: `%s | ${t('meta.siteName')}` },
    description: t('meta.description'),
    authors: [{ name: t('meta.siteName') }],
    twitter: { card: 'summary_large_image' },
    icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  };
}

/**
 * Root layout: language, direction, fonts, structured data, theme,
 * translations, Redux store, navigation, main landmark and footer.
 */
export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const i18n = initI18n(lang);
  const t = i18n.getFixedT(lang);

  return (
    <html lang={lang} dir={getDirection(lang)} suppressHydrationWarning>
      <head>
        <PersonJsonLd lang={lang} />
      </head>
      <body className={`${inter.variable} ${cairo.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreProvider>
            <TranslationsProvider locale={lang} resources={i18n.store.data}>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-lg"
              >
                {t('a11y.skip')}
              </a>
              <Navbar />
              <main id="main-content">{children}</main>
              <Footer lang={lang} />
            </TranslationsProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}