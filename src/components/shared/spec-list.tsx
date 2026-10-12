import { type Locale, pick, type RobotSpec } from '@taksu/content';
import { cn } from '@taksu/ui/lib/utils';

export function SpecList({
  specs,
  locale,
  className,
}: {
  specs: readonly RobotSpec[];
  locale: Locale;
  className?: string;
}) {
  return (
    <dl className={cn('divide-border border-border divide-y border-y', className)}>
      {specs.map((spec) => (
        <div key={spec.label.en} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3 text-sm">
          <dt className="text-muted-foreground">{pick(spec.label, locale)}</dt>
          <dd className="font-semibold">{pick(spec.value, locale)}</dd>
        </div>
      ))}
    </dl>
  );
}
