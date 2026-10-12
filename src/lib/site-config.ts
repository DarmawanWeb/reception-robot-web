import { brand, names } from '@taksu/content';

/** Public configuration, inlined at build time from NEXT_PUBLIC_* variables. */
export const siteConfig = {
  name: names.robot,
  url: process.env.NEXT_PUBLIC_ROBOT_URL ?? 'http://localhost:3004',
  kioskUrl: process.env.NEXT_PUBLIC_KIOSK_URL ?? 'http://localhost:3001',
  companyUrl: process.env.NEXT_PUBLIC_COMPANY_URL ?? 'http://localhost:3000',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  email: brand.contact.email,
} as const;
