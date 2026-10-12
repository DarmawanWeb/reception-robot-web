import { type Locale, pick, type ReceptionFeatureIcon, receptionFeatures } from '@taksu/content';
import { cn } from '@taksu/ui/lib/utils';
import {
  BookOpen,
  CalendarDays,
  type LucideIcon,
  Mic,
  Network,
  Printer,
  Puzzle,
  Route,
  ScrollText,
} from 'lucide-react';

const icons: Record<ReceptionFeatureIcon, LucideIcon> = {
  aksara: ScrollText,
  voice: Mic,
  print: Printer,
  guestbook: BookOpen,
  route: Route,
  org: Network,
  calendar: CalendarDays,
  custom: Puzzle,
};

/** What the kiosk software does, read like the menu on the robot's own screen. */
export function Features({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <dl
      className={cn(
        'border-border grid border-t sm:grid-cols-2 lg:grid-cols-4 [&>div]:border-border [&>div]:border-b',
        className,
      )}
    >
      {receptionFeatures.map((feature) => {
        const Icon = icons[feature.id];
        return (
          <div key={feature.id} className="py-6 sm:pr-8">
            <dt className="flex items-center gap-3 font-semibold">
              <span className="bg-accent-soft text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
                <Icon className="size-5" aria-hidden />
              </span>
              {pick(feature.title, locale)}
            </dt>
            <dd className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {pick(feature.body, locale)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
