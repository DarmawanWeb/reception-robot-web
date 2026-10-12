import { robots } from '@taksu/content';
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';

const staticPaths = ['', '/compare', '/aksara-bali', '/demo', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...robots.map((robot) => `/${robot.slug}`)];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((entry) => [entry, `${siteConfig.url}/${entry}${path}`]),
        ),
      },
    })),
  );
}
