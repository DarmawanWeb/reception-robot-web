import { brand, names, robots } from '@taksu/content';
import { PolengBand } from '@taksu/ui/brand/ornaments';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { companyUrl, whatsappUrl } from '@/lib/links';
import { siteConfig } from '@/lib/site-config';
import { Container } from '../shared/container';
import { Wordmark } from './wordmark';

export async function SiteFooter() {
  const [t, nav, locale] = await Promise.all([
    getTranslations('Footer'),
    getTranslations('Nav'),
    getLocale(),
  ]);
  const whatsapp = whatsappUrl(`Om Swastiastu, ${names.robot}`);
  const explore = [
    { href: '/compare', label: nav('compare') },
    { href: '/aksara-bali', label: nav('aksara') },
    { href: '/demo', label: nav('demo') },
    { href: '/contact', label: nav('contact') },
  ];

  return (
    <footer className="bg-surface">
      <PolengBand />
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <Wordmark />
          <p className="text-muted-foreground max-w-sm text-sm">{t('tagline')}</p>
          <a href={companyUrl(locale)} className="self-start text-sm font-semibold hover:underline">
            {t('partOf', { company: names.company })}
          </a>
        </div>
        <nav aria-label={t('robots')}>
          <h2 className="text-muted-foreground mb-3 text-sm font-semibold">{t('robots')}</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {robots.map((robot) => (
              <li key={robot.slug}>
                <Link href={`/${robot.slug}`} className="hover:text-primary hover:underline">
                  {robot.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t('explore')}>
          <h2 className="text-muted-foreground mb-3 text-sm font-semibold">{t('explore')}</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-muted-foreground mb-3 text-sm font-semibold">{nav('contact')}</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li>{brand.contact.person}</li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary break-all hover:underline"
              >
                {siteConfig.email}
              </a>
            </li>
            {whatsapp ? (
              <li>
                <a href={whatsapp} className="hover:text-primary hover:underline">
                  WhatsApp
                </a>
              </li>
            ) : null}
            <li>{brand.location[locale]}</li>
          </ul>
        </div>
      </Container>
      <Container className="border-border text-muted-foreground border-t py-6 text-xs">
        {t('rights', { year: new Date().getFullYear(), brand: names.robot })}
      </Container>
    </footer>
  );
}
