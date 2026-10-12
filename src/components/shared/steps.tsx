import { cn } from '@taksu/ui/lib/utils';

export interface Step {
  id: string;
  title: string;
  body: string;
}

/** Numbered sequence. Only use for content that really happens in order. */
export function Steps({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn('grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {steps.map((step, index) => (
        <li key={step.id} className="border-primary relative flex flex-col gap-2 border-t-2 pt-4">
          <span className="font-display text-primary text-sm font-bold tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
