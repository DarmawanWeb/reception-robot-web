import { type Locale, pick, type ReceptionRobot, robots } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { robotDemoUrl } from '@/lib/links';
import { ExternalButton } from '../shared/external-button';

/** Tight crops of each illustration, from the top of the head to the floor line. */
const crops: Record<ReceptionRobot['slug'], string> = {
  snow: '24 21 192 267',
  timo: '40 28 160 260',
  kiosk: '44 24 152 264',
};

/** Height the ruler runs to, a little above the tallest robot. */
const RULER_CM = 175;
const rulerMarks = [0, 50, 100, 150];
const percent = (cm: number) => `${(cm / RULER_CM) * 100}%`;

export const priceKey = (robot: ReceptionRobot) =>
  robot.priceTier === 1 ? 'low' : robot.priceTier === 2 ? 'mid' : 'high';

/**
 * The three receptionists standing on one floor line, drawn to their real heights,
 * so a buyer sees at a glance how each will look in a lobby.
 */
export async function Lineup({ locale }: { locale: Locale }) {
  const [t, robotsT, common] = await Promise.all([
    getTranslations('Home.lineup'),
    getTranslations('Robots'),
    getTranslations('Common'),
  ]);

  return (
    <div>
      <figure>
        <div className="relative grid h-[14rem] grid-cols-3 gap-4 pl-10 sm:h-[22rem] sm:gap-8 sm:pl-14 lg:h-[26rem]">
          <div aria-hidden className="absolute inset-y-0 left-0 w-8 sm:w-10">
            {rulerMarks.map((mark) => (
              <span
                key={mark}
                className="text-muted-foreground absolute left-0 flex w-full translate-y-1/2 items-center gap-1.5 text-[0.7rem] tabular-nums"
                style={{ bottom: percent(mark) }}
              >
                <span className="bg-muted-foreground/60 h-px w-2.5" />
                {mark}
              </span>
            ))}
          </div>
          {robots.map((robot) => (
            <Link
              key={robot.slug}
              href={`/${robot.slug}`}
              className="group relative flex items-end justify-center rounded-md"
            >
              <span
                className="text-muted-foreground absolute left-1/2 hidden -translate-x-1/2 pb-1 text-xs font-semibold tabular-nums sm:block"
                style={{ bottom: percent(robot.heightCm) }}
              >
                {t('height', { cm: robot.heightCm })}
              </span>
              <span className="flex justify-center" style={{ height: percent(robot.heightCm) }}>
                <RobotIllustration
                  kind={robot.slug}
                  label={robot.name}
                  viewBox={crops[robot.slug]}
                  className="h-full w-auto transition-transform duration-300 group-hover:-translate-y-1"
                />
              </span>
            </Link>
          ))}
        </div>
        <div aria-hidden className="bg-foreground ml-10 h-0.5 rounded-full sm:ml-14" />
        <figcaption className="text-muted-foreground mt-3 pl-10 text-sm sm:pl-14">
          {t('scale')}
        </figcaption>
      </figure>

      <ul className="mt-12 grid gap-12 sm:pl-14 lg:grid-cols-3 lg:gap-8">
        {robots.map((robot) => (
          <li key={robot.slug} className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <Badge variant="gold">{pick(robot.edition, locale)}</Badge>
              <Badge variant="outline">
                {robot.kind === 'static' ? robotsT('static') : robotsT('mobile')}
              </Badge>
            </div>
            <h3 className="mt-3 text-4xl font-bold tracking-tight [font-stretch:82%]">
              <Link href={`/${robot.slug}`} className="hover:text-primary">
                {robot.name}
              </Link>
            </h3>
            <p className="text-primary mt-1 font-semibold">{pick(robot.tagline, locale)}</p>
            <p className="text-muted-foreground mt-3 flex-1 leading-relaxed">
              {pick(robot.summary, locale)}
            </p>
            <dl className="border-border mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 border-t pt-4 text-sm">
              <dt className="text-muted-foreground">{robotsT('height')}</dt>
              <dd className="font-semibold tabular-nums">{t('height', { cm: robot.heightCm })}</dd>
              <dt className="text-muted-foreground">{robotsT('escort')}</dt>
              <dd className="font-semibold">
                {robot.capabilities.escort ? robotsT('yes') : robotsT('no')}
              </dd>
              <dt className="text-muted-foreground">{robotsT('printer')}</dt>
              <dd className="font-semibold">
                {robot.capabilities.printer === 'built-in'
                  ? robotsT('printerBuiltIn')
                  : robotsT('printerStation')}
              </dd>
              <dt className="text-muted-foreground">{robotsT('priceLabel')}</dt>
              <dd className="font-semibold">{robotsT('price', { tier: priceKey(robot) })}</dd>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild>
                <Link href={`/${robot.slug}`}>{common('viewDetails')}</Link>
              </Button>
              <ExternalButton
                variant="outline"
                href={robotDemoUrl(locale, robot.slug, robot.demoSite)}
                newTabLabel={common('newTab')}
              >
                {common('tryDemo')}
              </ExternalButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
