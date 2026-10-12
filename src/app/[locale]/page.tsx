import { OM_SWASTIASTU } from '@taksu/bali';
import { aksaraRegulation, type Locale, pick, receptionProcess } from '@taksu/content';
import { AksaraText } from '@taksu/ui/brand/aksara-text';
import { RobotFace } from '@taksu/ui/brand/robot-face';
import { Button } from '@taksu/ui/components/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import snowTimoBali from '@/assets/snow-timo-bali.webp';
import { Features } from '@/components/robots/features';
import { Lineup } from '@/components/robots/lineup';
import { UseCases } from '@/components/robots/use-cases';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { PawukonToday } from '@/components/shared/pawukon-today';
import { SectionHeading } from '@/components/shared/section-heading';
import { Steps } from '@/components/shared/steps';
import { Link } from '@/i18n/navigation';
import { robotDemoUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: '/', description: t('description') });
}

function localizeSteps(locale: Locale) {
  return receptionProcess.map((step) => ({
    id: step.id,
    title: pick(step.title, locale),
    body: pick(step.body, locale),
  }));
}

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([getTranslations('Home'), getTranslations('Common')]);
  const voiceDemo = robotDemoUrl(locale, 'snow', 'resort');

  return (
    <>
      <section className="dark bg-background text-foreground overflow-hidden">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20">
          <div>
            <AksaraText
              aksara={OM_SWASTIASTU.aksara}
              decorative
              className="text-primary block text-[clamp(1.9rem,3.6vw,2.8rem)]"
            />
            <h1 className="mt-1 text-[clamp(2.5rem,5.8vw,4.6rem)] leading-[1.02] font-bold tracking-tight text-balance [font-stretch:82%]">
              {t('hero.title')}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              {t('hero.body')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={voiceDemo} size="lg" newTabLabel={common('newTab')}>
                {t('hero.ctaDemo')}
              </ExternalButton>
              <Button asChild size="lg" variant="outline">
                <Link href="/compare">{t('hero.ctaCompare')}</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-[#e6bd52]/35">
            <Image
              src={snowTimoBali}
              alt={t('hero.imageAlt')}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading title={t('lineup.title')} intro={t('lineup.intro')} />
          <div className="mt-12">
            <Lineup locale={locale} />
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="dark border-border bg-background text-foreground grid items-center gap-10 overflow-hidden rounded-xl border p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <RobotFace
              variant="kiosk"
              mood="speaking"
              label={t('voice.title')}
              className="mx-auto max-w-72"
            />
            <div>
              <h2 className="text-3xl font-semibold [font-stretch:90%] sm:text-4xl">
                {t('voice.title')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {t('voice.body')}
              </p>
              <ExternalButton href={voiceDemo} className="mt-6" newTabLabel={common('newTab')}>
                {t('voice.cta')}
              </ExternalButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <SectionHeading title={t('features.title')} intro={t('features.intro')} />
          <Features locale={locale} className="mt-10" />
        </Container>
      </section>

      <section className="border-border bg-surface border-y py-16 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading title={t('aksara.title')} intro={t('aksara.intro')} />
            <blockquote className="border-primary mt-8 border-l-4 pl-5">
              <p className="leading-relaxed">{aksaraRegulation.rule[locale]}</p>
              <footer className="text-muted-foreground mt-2 text-sm font-semibold">
                {aksaraRegulation.pergub}
              </footer>
            </blockquote>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/aksara-bali">{t('aksara.cta')}</Link>
            </Button>
          </div>
          <div>
            <SectionHeading title={t('bali.title')} intro={t('bali.intro')} />
            <PawukonToday />
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading title={t('useCases.title')} intro={t('useCases.intro')} />
          <div className="mt-10">
            <UseCases locale={locale} />
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <SectionHeading title={t('process.title')} intro={t('process.intro')} />
          <Steps className="mt-12" steps={localizeSteps(locale)} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
