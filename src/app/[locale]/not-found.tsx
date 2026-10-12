import { Button } from '@taksu/ui/components/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <section className="mx-auto flex max-w-xl flex-col items-start gap-4 px-5 py-28 sm:px-8">
      <p className="font-display text-primary text-7xl font-bold">404</p>
      <h1 className="text-3xl font-semibold">{t('title')}</h1>
      <p className="text-muted-foreground">{t('body')}</p>
      <Button asChild>
        <Link href="/">{t('back')}</Link>
      </Button>
    </section>
  );
}
