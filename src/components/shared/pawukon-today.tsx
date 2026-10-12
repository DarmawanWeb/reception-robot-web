'use client';

import { formatPawukon, pawukonFromCycleDay, upcomingHolyDaysFromCycleDay } from '@taksu/bali';
import { AksaraText } from '@taksu/ui/brand/aksara-text';
import { usePawukonCycleDay } from '@taksu/ui/lib/use-pawukon-today';
import { useTranslations } from 'next-intl';

/** Today's Pawukon day, computed in the browser so a static page never shows a stale date. */
export function PawukonToday() {
  const t = useTranslations('Home.bali');
  const cycleDay = usePawukonCycleDay();

  if (cycleDay === null) {
    return <div aria-hidden className="border-border bg-background mt-10 h-44 rounded-lg border" />;
  }

  const day = pawukonFromCycleDay(cycleDay);
  const holyToday = day.holyDays[0];
  const next = upcomingHolyDaysFromCycleDay(cycleDay, 4).find((holyDay) => holyDay.inDays > 0);

  return (
    <figure className="border-border bg-background mt-10 rounded-lg border p-6">
      <figcaption className="text-muted-foreground text-sm font-semibold">
        {t('todayLabel')}
      </figcaption>
      <AksaraText
        latin={formatPawukon(day)}
        decorative
        className="text-primary mt-2 block text-2xl"
      />
      <p className="font-display text-2xl font-semibold [font-stretch:90%]">
        {day.saptawara.name} {day.pancawara.name}, wuku {day.wuku.name}
      </p>
      {holyToday ? (
        <p className="text-subak mt-2 font-semibold">{t('holyToday', { name: holyToday.name })}</p>
      ) : null}
      {next ? (
        <p className="text-muted-foreground mt-2 text-sm">
          {t('nextHoly', { name: next.name, days: next.inDays })}
        </p>
      ) : null}
    </figure>
  );
}
