import { names, robots } from '@taksu/content';
import { ThemeToggle } from '@taksu/ui/brand/theme-toggle';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';
import { Wordmark } from './wordmark';

export async function SiteHeader() {
  const t = await getTranslations('Nav');
  const items = [
    ...robots.map((robot) => ({ href: `/${robot.slug}`, label: robot.name })),
    { href: '/compare', label: t('compare') },
    { href: '/aksara-bali', label: t('aksara') },
    { href: '/demo', label: t('demo') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="border-border/70 bg-background/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0 rounded-md" aria-label={`${names.robot}, ${t('home')}`}>
          <Wordmark />
        </Link>
        <NavLinks items={items} className="hidden lg:block" />
        <div className="ml-auto flex items-center gap-1">
          <LocaleSwitcher label={t('language')} />
          <ThemeToggle label={t('theme')} />
          <MobileNav items={items} labels={{ menu: t('menu'), close: t('close') }} />
        </div>
      </div>
    </header>
  );
}
