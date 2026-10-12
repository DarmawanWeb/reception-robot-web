import { PolengBand } from '@taksu/ui/brand/ornaments';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from './container';

/** Closing call to action on the night-indigo band, edged with poleng cloth. */
export async function CtaBand() {
  const t = await getTranslations('Cta');
  return (
    <section className="pt-16 pb-20">
      <Container>
        <div className="dark border-border bg-background text-foreground overflow-hidden rounded-xl border">
          <PolengBand />
          <div className="flex flex-col gap-6 p-8 sm:p-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold [font-stretch:90%] sm:text-4xl">
                {t('title')}
              </h2>
              <p className="text-muted-foreground mt-3">{t('body')}</p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link href="/contact">{t('button')}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
