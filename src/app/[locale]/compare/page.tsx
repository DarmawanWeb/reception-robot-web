import { comparison, pick, robots } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { SectionHeading } from '@/components/shared/section-heading';
import { Link } from '@/i18n/navigation';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Compare' });
  return pageMetadata({
    locale,
    path: '/compare',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function ComparePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Compare');
  return (
    <>
      <section className="pt-16 pb-8">
        <Container>
          <SectionHeading as="h1" title={t('title')} intro={t('intro')} />
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <div className="border-border bg-surface relative overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">{t('title')}</caption>
              <thead>
                <tr className="border-border border-b">
                  <th scope="col" className="text-muted-foreground w-1/4 p-5 font-semibold">
                    {t('feature')}
                  </th>
                  {robots.map((robot) => (
                    <th key={robot.slug} scope="col" className="p-5">
                      <Link
                        href={`/${robot.slug}`}
                        className="group flex flex-col items-start gap-2"
                      >
                        <RobotIllustration kind={robot.slug} className="w-20" />
                        <span className="font-display group-hover:text-primary text-xl font-bold">
                          {robot.name}
                        </span>
                        <span className="text-muted-foreground text-xs font-semibold">
                          {pick(robot.edition, locale)}
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label.en} className="border-border border-b last:border-0">
                    <th scope="row" className="p-5 font-semibold">
                      {pick(row.label, locale)}
                    </th>
                    {robots.map((robot) => (
                      <td key={robot.slug} className="text-muted-foreground p-5">
                        {pick(row.values[robot.slug], locale)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-xs">{t('note')}</p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
