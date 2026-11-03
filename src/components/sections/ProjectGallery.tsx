
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/settings';
import type { ProjectImage } from '@/types/content';

interface ProjectGalleryProps {
  images: readonly ProjectImage[];
  lang: Locale;
}

/** Desktop and mobile screenshots displayed side by side on larger screens. */
export default function ProjectGallery({ images, lang }: ProjectGalleryProps) {
  const desktop = images.filter((image) => image.device === 'desktop');
  const mobile = images.filter((image) => image.device === 'mobile');

  return (
    <div className="space-y-10">
      {(desktop.length > 0 || mobile.length > 0) && (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(220px,1fr)]">
          {/* Desktop screenshots */}
          {desktop.length > 0 && (
            <div className="grid min-w-0 content-start gap-6">
              {desktop.map((image) => (
                <figure
                  key={image.src}
                  className="w-full overflow-hidden rounded-2xl border bg-card shadow-lg"
                >
                  <div
                    className="flex gap-1.5 border-b bg-muted px-3 py-2"
                    aria-hidden
                  >
                    <span className="size-2.5 rounded-full bg-red-500" />
                    <span className="size-2.5 rounded-full bg-yellow-500" />
                    <span className="size-2.5 rounded-full bg-green-500" />
                  </div>

                  <Image
                    src={image.src}
                    alt={image.alt[lang]}
                    width={1897}
                    height={832}
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="block h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          )}

          {/* Mobile screenshots */}
          {mobile.length > 0 && (
            <div className="flex flex-wrap items-start justify-center gap-6">
              {mobile.map((image) => (
               <figure
                key={image.src}
                className="mx-auto w-48 max-w-full rounded-[2rem] border-4 border-foreground/80 bg-background p-1 shadow-lg"
              >
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] bg-background">
                  <Image
                    src={image.src}
                    alt={image.alt[lang]}
                    fill
                    sizes="192px"
                    className="object-contain scale-y-[1.18]"
                  />
                </div>
              </figure>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
