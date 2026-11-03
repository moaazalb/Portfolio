import { Code, Link2, Mail, type LucideIcon } from 'lucide-react';
import { contactInfo } from '@/data/contact';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';

interface FooterProps {
  /** Active locale. */
  lang: Locale;
}

interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

/** Site footer with social links and copyright. */
export default async function Footer({ lang }: FooterProps) {
  const { t } = await getTranslation(lang);

  const links: SocialLink[] = [
    { icon: Code, label: 'GitHub', href: contactInfo.github },
    ...(contactInfo.linkedin
      ? [{ icon: Link2, label: 'LinkedIn', href: contactInfo.linkedin }]
      : []),
    { icon: Mail, label: 'Email', href: `mailto:${contactInfo.email}` },
  ];

  return (
    <footer className="border-t px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-start">
          <p className="font-semibold">
            © {new Date().getFullYear()} {t('hero.name')}. {t('footer.rights')}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{t('footer.built')}</p>
        </div>
        <ul className="flex gap-3" aria-label={t('footer.social')}>
          {links.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full border transition-colors hover:bg-muted"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}