'use client';

import type { ComponentProps } from 'react';
import { buttonVariants } from '@/components/ui/button';
import HashLink from '@/components/ui/HashLink';
import { cn } from '@/lib/utils';

type ButtonStyle = NonNullable<Parameters<typeof buttonVariants>[0]>;

type LinkButtonProps = ComponentProps<typeof HashLink> & Pick<ButtonStyle, 'variant' | 'size'>;

/**
 * A link that looks like a shadcn Button.
 * Renders a single `<a>` element and scrolls reliably to `#section` targets.
 */
export default function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <HashLink className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}