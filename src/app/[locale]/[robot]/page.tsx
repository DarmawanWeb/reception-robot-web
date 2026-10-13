import { getRobot, getSite, pick, robots, specSourceNote } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import snowTimoBali from '@/assets/snow-timo-bali.webp';
import taksuKiosk from '@/assets/taksu-kiosk.webp';
import { priceKey } from '@/components/robots/lineup';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { SpecList } from '@/components/shared/spec-list';
import { Link } from '@/i18n/navigation';
import { robotDemoUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string; robot: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return robots.map((robot) => ({ robot: robot.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [locale, { robot: slug }] = await Promise.all([localeFromParams(params), params]);
  const robot = getRobot(slug);
  if (!robot) return {};
  return pageMetadata({
    locale,
    path: `/${robot.slug}`,
    title: `${robot.name} ${pick(robot.edition, locale)}`,
    description: pick(robot.summary, locale),
  });
}

export default async function RobotPage({ params }: Props) {
  const [locale, { robot: slug }] = await Promise.all([resolveLocale(params), params]);
  const robot = getRobot(slug);
  if (!robot) notFound();
  const site = getSite(robot.demoSite);
  const [t, robotsT, common, lineup] = await Promise.all([
    getTranslations('Robot'),
    getTranslations('Robots'),
    getTranslations('Common'),
    getTranslations('Home.lineup'),
  ]);
  const demo = robotDemoUrl(locale, robot.slug, robot.demoSite);
  const others = robots.filter((entry) => entry.slug !== robot.slug);

  return (
    <>
      <section className="pt-8 pb-14 sm:pt-10">
        <Container>
          <nav aria-label={t('breadcrumb')}>
            <ol className="text-muted-foreground flex flex-wrap gap-2 text-sm font-semibold">
              <li>
                <Link href="/" className="hover:text-primary hover:underline">
                  {t('back')}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-foreground">
                {robot.name}
              </li>
            </ol>
          </nav>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-border bg-surface overflow-hidden rounded-xl border">
              {robot.kind === 'mobile' ? (
                <Image
                  src={snowTimoBali}
                  alt={`${robot.name} ${pick(robot.edition, locale)}`}
                  placeholder="blur"
                  priority
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="h-auto w-full"
                />
              ) : (
                <Image
                  src={taksuKiosk}
                  alt={t('kioskImageAlt')}
                  placeholder="blur"
                  priority
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="h-auto w-full"
                />
              )}
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="gold">{pick(robot.edition, locale)}</Badge>
                <Badge variant="outline">
                  {robot.kind === 'static' ? robotsT('static') : robotsT('mobile')}
                </Badge>
                <Badge variant="outline">{robotsT('price', { tier: priceKey(robot) })}</Badge>
              </div>
              <h1 className="mt-4 text-6xl font-bold tracking-tight [font-stretch:82%] sm:text-7xl">
                {robot.name}
              </h1>
              <p className="text-primary mt-3 text-2xl font-semibold text-balance">
                {pick(robot.tagline, locale)}
              </p>
              <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
                {pick(robot.summary, locale)}
              </p>
              <p className="text-muted-foreground mt-3">{pick(robot.appearance, locale)}</p>
              <p className="mt-4 text-sm font-semibold">
                {t('height')}: {lineup('height', { cm: robot.heightCm })}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">{common('requestQuote')}</Link>
                </Button>
                <ExternalButton
                  size="lg"
                  variant="outline"
                  href={demo}
                  newTabLabel={common('newTab')}
                >
                  {common('tryDemo')}
                </ExternalButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-semibold [font-stretch:90%]">{t('specs')}</h2>
            <SpecList specs={robot.specs} locale={locale} />
            {robot.kind === 'mobile' ? (
              <p className="text-muted-foreground mt-4 text-xs">
                <span className="font-semibold">{t('sourceTitle')}: </span>
                {pick(specSourceNote, locale)}
              </p>
            ) : null}
            <h2 className="mt-10 mb-3 text-lg font-semibold">{t('localContent')}</h2>
            <p className="text-muted-foreground">{pick(robot.localContent, locale)}</p>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-semibold [font-stretch:90%]">
              {t('features', { name: robot.name })}
            </h2>
            <ul className="flex flex-col gap-6">
              {robot.features.map((feature) => (
                <li key={feature.title.en} className="border-primary border-l-2 pl-4">
                  <h3 className="font-semibold">{pick(feature.title, locale)}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {pick(feature.body, locale)}
                  </p>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 mb-3 text-lg font-semibold">{t('balinese')}</h2>
            <ul className="flex flex-col gap-2">
              {robot.balinese.map((item) => (
                <li key={item.en} className="flex gap-3 text-sm">
                  <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                  {pick(item, locale)}
                </li>
              ))}
            </ul>
            <h2 className="mt-10 mb-3 text-lg font-semibold">{t('idealFor')}</h2>
            <ul className="flex flex-wrap gap-2">
              {robot.idealFor.map((place) => (
                <li key={place.en}>
                  <Badge variant="outline">{pick(place, locale)}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {site ? (
        <section className="py-12">
          <Container>
            <div className="dark border-border bg-background text-foreground rounded-xl border p-8 sm:p-12">
              <h2 className="text-3xl font-semibold [font-stretch:90%]">
                {t('demoTitle', { name: robot.name })}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                {t('demoBody', { name: robot.name, site: site.name })}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ExternalButton href={demo} newTabLabel={common('newTab')}>
                  {common('openDemo')}
                </ExternalButton>
                <Button asChild variant="outline">
                  <Link href="/compare">{t('compareCta')}</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-12">
        <Container className="grid gap-6 sm:grid-cols-2">
          {others.map((entry) => (
            <Link
              key={entry.slug}
              href={`/${entry.slug}`}
              className="border-border bg-surface hover:border-primary group flex items-center gap-5 rounded-xl border p-5 transition-colors"
            >
              <RobotIllustration kind={entry.slug} className="w-16 shrink-0" />
              <span>
                <span className="font-display group-hover:text-primary block text-2xl font-bold [font-stretch:85%]">
                  {entry.name}
                </span>
                <span className="text-muted-foreground block text-sm">
                  {pick(entry.tagline, locale)}
                </span>
              </span>
            </Link>
          ))}
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
