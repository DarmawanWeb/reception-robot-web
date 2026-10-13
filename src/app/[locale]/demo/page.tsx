import { type DemoEntry, demos, pick } from '@taksu/content';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { kioskUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { robotScreen } from '@/lib/screens';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Demo' });
  return pageMetadata({
    locale,
    path: '/demo',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

const robotDemos: DemoEntry[] = demos.filter((demo) => demo.app === 'kiosk' && demo.robot);
const studio = demos.find((demo) => demo.id === 'kiosk-studio');

export default async function DemoPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([getTranslations('Demo'), getTranslations('Common')]);

  return (
    <>
      <section className="pt-14 pb-6 sm:pt-16">
        <Container>
          <SectionHeading as="h1" title={t('title')} intro={t('intro')} />
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <h2 className="text-2xl font-semibold [font-stretch:90%]">{t('robotsTitle')}</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {robotDemos.map((demo) => (
              <li
                key={demo.id}
                className="border-border bg-surface flex flex-col rounded-xl border p-6"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg bg-[#0e1335] ring-1 ring-black/5">
                  <Image
                    src={robotScreen(locale, demo.robot ?? 'kiosk').image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{pick(demo.title, locale)}</h3>
                <p className="text-muted-foreground mt-1 flex-1 text-sm leading-relaxed">
                  {pick(demo.description, locale)}
                </p>
                <ExternalButton
                  href={kioskUrl(locale, demo.path)}
                  className="mt-5 self-start"
                  newTabLabel={common('newTab')}
                >
                  {common('openDemo')}
                </ExternalButton>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-10">
        <Container className="grid gap-6 lg:grid-cols-2">
          {studio ? (
            <div className="border-border bg-surface flex flex-col rounded-xl border p-8">
              <h2 className="text-2xl font-semibold [font-stretch:90%]">{t('studioTitle')}</h2>
              <p className="text-muted-foreground mt-2 flex-1">
                {pick(studio.description, locale)}
              </p>
              <ExternalButton
                href={kioskUrl(locale, studio.path)}
                variant="outline"
                className="mt-6 self-start"
                newTabLabel={common('newTab')}
              >
                {common('openDemo')}
              </ExternalButton>
            </div>
          ) : null}
          <div className="dark border-border bg-background text-foreground flex flex-col rounded-xl border p-8">
            <h2 className="text-2xl font-semibold [font-stretch:90%]">{t('launcherTitle')}</h2>
            <p className="text-muted-foreground mt-2 flex-1">{t('launcherBody')}</p>
            <ExternalButton
              href={kioskUrl(locale)}
              className="mt-6 self-start"
              newTabLabel={common('newTab')}
            >
              {t('launcherCta')}
            </ExternalButton>
          </div>
        </Container>
        <Container>
          <p className="text-muted-foreground mt-8 text-sm">{t('tip')}</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
