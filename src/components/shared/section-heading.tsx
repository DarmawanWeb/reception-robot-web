import { AksaraText } from '@taksu/ui/brand/aksara-text';
import { cn } from '@taksu/ui/lib/utils';

export interface SectionHeadingProps {
  /**
   * Indonesian label transliterated into the Aksara Bali line above the heading,
   * mirroring Balinese signage where the script sits above the Latin. Use é for taling.
   */
  aksara?: string;
  title: string;
  intro?: string;
  as?: 'h1' | 'h2';
  /** For `aria-labelledby` on the section. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  aksara,
  title,
  intro,
  as: Heading = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {aksara ? (
        <AksaraText latin={aksara} decorative className="text-primary block text-lg" />
      ) : null}
      <Heading
        id={id}
        className={cn(
          'font-semibold tracking-tight [font-stretch:90%]',
          Heading === 'h1'
            ? 'text-4xl leading-[1.05] sm:text-5xl'
            : 'text-3xl leading-tight sm:text-4xl',
        )}
      >
        {title}
      </Heading>
      {intro ? <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{intro}</p> : null}
    </div>
  );
}
