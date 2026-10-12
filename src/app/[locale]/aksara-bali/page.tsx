import { aksaraRegulation } from '@taksu/content';
import { NameWriter } from '@taksu/ui/brand/name-writer';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AksaraSignage } from '@/components/robots/aksara-signage';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { SectionHeading } from '@/components/shared/section-heading';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Aksara' });
  return pageMetadata({
    locale,
    path: '/aksara-bali',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function AksaraPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Aksara');
  return (
    <>
      <section className="pt-16 pb-8">
        <Container>
          <SectionHeading as="h1" title={t('title')} intro={t('intro')} />
        </Container>
      </section>
      <section className="py-8">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-semibold">{t('ruleTitle')}</h2>
            <blockquote className="border-primary mt-5 border-l-4 pl-5">
              <p className="text-lg leading-relaxed">{aksaraRegulation.rule[locale]}</p>
            </blockquote>
            <ul className="text-muted-foreground mt-6 flex flex-col gap-2 text-sm">
              <li>{aksaraRegulation.pergub}</li>
              <li>{aksaraRegulation.perda}</li>
            </ul>
            <p className="bg-surface-muted text-muted-foreground mt-8 rounded-lg p-4 text-sm">
              {t('reviewNote')}
            </p>
          </div>
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">{t('signageTitle')}</h2>
              <AksaraSignage
                label={t('signageLabel')}
                placeholder={t('signagePlaceholder')}
                hint={t('signageHint')}
                initialValue="Kantor Désa Taman Sari"
              />
            </div>
            <NameWriter
              label={t('writerLabel')}
              placeholder={t('writerPlaceholder')}
              hint={t('writerHint')}
              emptyText={t('writerEmpty')}
              initialValue="Ni Luh Putu"
            />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
