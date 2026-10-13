import type { Locale } from '@taksu/content';
import { PolengBand } from '@taksu/ui/brand/ornaments';
import { cn } from '@taksu/ui/lib/utils';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { companyUrl } from '@/lib/links';
import { Wordmark } from '../layout/wordmark';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

interface Row {
  id: 'culture' | 'content' | 'print' | 'offline' | 'procurement' | 'service';
  href: string;
  /** Pages on this site go through the locale-aware Link; anchors and other sites do not. */
  kind: 'page' | 'anchor' | 'external';
}

const proofClass =
  'decoration-primary mt-3 inline-block text-[0.9375rem] font-semibold underline decoration-2 underline-offset-4 hover:decoration-[3px]';

/**
 * Why venues pick our receptionists over the robots that end up as lobby ornaments: what is
 * often sold next to our answer, on a night-indigo column edged with poleng cloth.
 */
export async function WhyVenues({ locale, installId }: { locale: Locale; installId: string }) {
  const t = await getTranslations('Home.why');
  const rows: Row[] = [
    { id: 'culture', href: '/aksara-bali', kind: 'page' },
    { id: 'content', href: '/demo', kind: 'page' },
    { id: 'print', href: '/kiosk', kind: 'page' },
    { id: 'offline', href: companyUrl(locale, '/blog/saat-server-sibuk'), kind: 'external' },
    { id: 'procurement', href: '/compare', kind: 'page' },
    { id: 'service', href: `#${installId}`, kind: 'anchor' },
  ];

  const proof = (row: Row) => {
    const label = t(`rows.${row.id}.link`);
    return row.kind === 'page' ? (
      <Link href={row.href} className={proofClass}>
        {label}
      </Link>
    ) : (
      <a href={row.href} className={proofClass}>
        {label}
      </a>
    );
  };

  return (
    <section className="py-16 lg:py-24" aria-labelledby="why-venues">
      <Container>
        <SectionHeading id="why-venues" title={t('title')} intro={t('intro')} />

        {/* Wide screens: the table sits over one night-indigo column (47% = 100 - 20 - 33). */}
        <div className="relative mt-12 hidden md:block">
          <div
            aria-hidden
            className="dark border-border bg-background absolute inset-y-0 right-0 left-[53%] overflow-hidden rounded-xl border"
          >
            <PolengBand />
          </div>
          <table className="relative w-full table-fixed border-separate border-spacing-0 text-left">
            <caption className="sr-only">{t('caption')}</caption>
            <colgroup>
              <col className="w-[20%]" />
              <col className="w-[33%]" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="pb-5 align-bottom">
                  <span className="sr-only">{t('topic')}</span>
                </th>
                <th
                  scope="col"
                  className="text-muted-foreground pr-10 pb-5 align-bottom text-sm font-semibold"
                >
                  {t('often')}
                </th>
                <th scope="col" className="dark text-foreground px-8 pt-10 pb-6 align-bottom">
                  <Wordmark />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <th
                    scope="row"
                    className="border-border border-t py-6 pr-6 align-top text-lg leading-snug font-semibold [font-stretch:92%]"
                  >
                    {t(`rows.${row.id}.topic`)}
                  </th>
                  <td className="border-border text-muted-foreground border-t py-6 pr-10 align-top leading-relaxed">
                    {t(`rows.${row.id}.often`)}
                  </td>
                  <td
                    className={cn(
                      'dark border-border text-foreground border-t px-8 py-6 align-top leading-relaxed',
                      index === rows.length - 1 && 'pb-9',
                    )}
                  >
                    <p>{t(`rows.${row.id}.us`)}</p>
                    {proof(row)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: one night-indigo card with our answers, what is often sold under each. */}
        <div className="dark border-border bg-background text-foreground mt-10 overflow-hidden rounded-xl border md:hidden">
          <PolengBand />
          <div className="px-5 pt-6 pb-2">
            <Wordmark />
          </div>
          <ul>
            {rows.map((row) => (
              <li key={row.id} className="border-border border-t px-5 py-5 first:border-t-0">
                <h3 className="text-primary text-sm font-semibold">{t(`rows.${row.id}.topic`)}</h3>
                <p className="mt-1.5 leading-relaxed">{t(`rows.${row.id}.us`)}</p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t('often')}: {t(`rows.${row.id}.often`)}
                </p>
                {proof(row)}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
