import { cn } from '@taksu/ui/lib/utils';
import type { ComponentProps } from 'react';

/** Page-width wrapper with responsive gutters. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)} {...props} />;
}
