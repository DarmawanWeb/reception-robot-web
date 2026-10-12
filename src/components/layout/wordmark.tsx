import { names } from '@taksu/content';
import { AksaraText } from '@taksu/ui/brand/aksara-text';
import { LogoMark } from '@taksu/ui/brand/logo';
import { cn } from '@taksu/ui/lib/utils';

/** Split-gate mark with the line's name in Aksara Bali above the Latin, as on Balinese signs. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="text-primary" />
      <span className="flex flex-col leading-none">
        <AksaraText
          latin={names.robot}
          decorative
          className="text-muted-foreground text-[0.7rem] leading-[1.4]"
        />
        <span className="font-display text-lg font-bold tracking-tight [font-stretch:88%]">
          {names.robot}
        </span>
      </span>
    </span>
  );
}
