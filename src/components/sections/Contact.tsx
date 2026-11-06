import { Code, Link2, Mail, MapPin, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { contactInfo } from '@/data/contact';
import { getTranslation } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/settings';
import ContactForm from './ContactForm';

interface ContactProps {
  /** Active locale. */
  lang: Locale;
}

interface InfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

/** Contact section: contact details next to the message form. */
export default async function Contact({ lang }: ContactProps) {
  const { t } = await getTranslation(lang);

  const items: InfoItem[] = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Code,
      label: 'GitHub',
      value: contactInfo.github.replace('https://', ''),
      href: contactInfo.github,
    },
    ...(contactInfo.linkedin
      ? [
          {
            icon: Link2,
            label: 'LinkedIn',
            value: contactInfo.linkedin.replace('https://', ''),
            href: contactInfo.linkedin,
          },
        ]
      : []),
    { icon: MapPin, label: t('contact.location'), value: t('contact.locationValue') },
  ];

  return (
    <section id="contact" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t('contact.title')} subtitle={t('contact.subtitle')} />
       <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <Reveal className="space-y-4 lg:col-span-2">
            {items.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
                <span className="bg-brand-gradient flex size-12 shrink-0 items-center justify-center rounded-xl text-white">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      dir="ltr"
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="block truncate font-semibold hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}