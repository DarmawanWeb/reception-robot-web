import type { Locale, RobotSlug } from '@taksu/content';
import { siteConfig } from './site-config';

const trimSlash = (url: string) => url.replace(/\/+$/, '');

/** A page inside the kiosk demo app, with the locale prefix. */
export function kioskUrl(locale: Locale, path = ''): string {
  return `${trimSlash(siteConfig.kioskUrl)}/${locale}${path}`;
}

/** The kiosk demo of one robot at one sample venue. */
export function robotDemoUrl(locale: Locale, robot: RobotSlug, site: string): string {
  return kioskUrl(locale, `/${robot}/${site}`);
}

export function companyUrl(locale: Locale, path = ''): string {
  return `${trimSlash(siteConfig.companyUrl)}/${locale}${path}`;
}

/** wa.me deep link with a pre-filled message, or null when no number is configured. */
export function whatsappUrl(
  message: string,
  number: string = siteConfig.whatsappNumber,
): string | null {
  const digits = number.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
