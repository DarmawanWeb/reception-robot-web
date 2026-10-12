'use client';

import { localeLabels, locales } from '@taksu/content';
import { LocaleMenu } from '@taksu/ui/brand/locale-menu';
import { hasLocale, useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const options = locales.map((value) => ({ value, label: localeLabels[value] }));

export function LocaleSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  return (
    <LocaleMenu
      current={locale}
      options={options}
      label={label}
      disabled={pending}
      onSelect={(next) => {
        if (!hasLocale(routing.locales, next) || next === locale) return;
        startTransition(() => router.replace(pathname, { locale: next }));
      }}
    />
  );
}
