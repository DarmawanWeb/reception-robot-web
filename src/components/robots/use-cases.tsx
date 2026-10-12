import { getRobot, type Locale, pick, type UseCase, useCases } from '@taksu/content';
import { Hospital, Hotel, Landmark, type LucideIcon, Plane, School } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { robotDemoUrl } from '@/lib/links';

const icons: Record<UseCase['icon'], LucideIcon> = {
  hotel: Hotel,
  office: Landmark,
  hospital: Hospital,
  airport: Plane,
  school: School,
};

/** Venues as rows: what the robot does there, which robot fits, and a sample to open. */
export async function UseCases({ locale }: { locale: Locale }) {
  const [t, common] = await Promise.all([
    getTranslations('Home.useCases'),
    getTranslations('Common'),
  ]);
  return (
    <ul className="border-border border-t">
      {useCases.map((useCase) => {
        const Icon = icons[useCase.icon];
        const lead = useCase.robots[0];
        return (
          <li
            key={useCase.id}
            className="border-border grid gap-4 border-b py-6 sm:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr_14rem] lg:items-start"
          >
            <Icon className="text-primary size-7" aria-hidden />
            <div>
              <h3 className="text-xl font-semibold">{pick(useCase.title, locale)}</h3>
              <p className="text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                {pick(useCase.body, locale)}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm sm:col-start-2 lg:col-start-auto">
              <p className="text-muted-foreground">
                {t('recommended')}:{' '}
                {useCase.robots.map((slug, index) => (
                  <span key={slug}>
                    {index > 0 ? ', ' : null}
                    <Link
                      href={`/${slug}`}
                      className="text-foreground font-semibold hover:underline"
                    >
                      {getRobot(slug)?.name}
                    </Link>
                  </span>
                ))}
              </p>
              {useCase.demoSite && lead ? (
                <a
                  href={robotDemoUrl(locale, lead, useCase.demoSite)}
                  target="_blank"
                  rel="noopener"
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                >
                  {t('demoLink')}
                  <span className="sr-only"> {common('newTab')}</span>
                </a>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
