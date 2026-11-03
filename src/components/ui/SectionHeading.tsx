import Reveal from './Reveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

/** Large section title with a gradient underline and optional subtitle. */
export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal>
      <h2 className="text-4xl font-extrabold sm:text-5xl">{title}</h2>
      <div className="bg-brand-gradient mt-4 h-1.5 w-36 rounded-full" />
      {subtitle && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
    </Reveal>
  );
}