'use client';

import type { ComponentProps, MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * A Next.js Link that always scrolls to its `#section` target when the target
 * is on the current page, even if the URL already contains the same hash.
 * Links to other pages navigate normally.
 */
export default function HashLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  /** Scrolls to the section manually instead of relying on the URL change. */
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || typeof href !== 'string') return;
    // Let the browser handle "open in new tab" style clicks.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const [path, hash] = href.split('#');
    if (!hash || path !== pathname) return; // another page: normal navigation

    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `${pathname}#${hash}`);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}