import type { Locale, RobotSlug } from '@taksu/content';
import type { StaticImageData } from 'next/image';
import enAksara from '@/assets/screens/en/aksara.webp';
import enGuestbook from '@/assets/screens/en/guestbook.webp';
import enHome from '@/assets/screens/en/home.webp';
import enKioskHome from '@/assets/screens/en/kiosk-home.webp';
import enQueue from '@/assets/screens/en/queue.webp';
import enRoute from '@/assets/screens/en/route.webp';
import enSnowHome from '@/assets/screens/en/snow-home.webp';
import enVoice from '@/assets/screens/en/voice.webp';
import idAksara from '@/assets/screens/id/aksara.webp';
import idGuestbook from '@/assets/screens/id/guestbook.webp';
import idHome from '@/assets/screens/id/home.webp';
import idKioskHome from '@/assets/screens/id/kiosk-home.webp';
import idQueue from '@/assets/screens/id/queue.webp';
import idRoute from '@/assets/screens/id/route.webp';
import idSnowHome from '@/assets/screens/id/snow-home.webp';
import idVoice from '@/assets/screens/id/voice.webp';

/** Services shown in the home page showcase, in menu order. */
export const showcaseScreens = ['home', 'voice', 'queue', 'guestbook', 'route', 'aksara'] as const;
export type ShowcaseScreen = (typeof showcaseScreens)[number];

type ScreenKey = ShowcaseScreen | 'snowHome' | 'kioskHome';

/**
 * Screenshots of the kiosk app in each language, taken from the demo: Timo at the public
 * service office (landscape), Snow at the resort, and the Taksu Kiosk totem (portrait).
 */
const screens: Record<Locale, Record<ScreenKey, StaticImageData>> = {
  id: {
    home: idHome,
    voice: idVoice,
    queue: idQueue,
    guestbook: idGuestbook,
    route: idRoute,
    aksara: idAksara,
    snowHome: idSnowHome,
    kioskHome: idKioskHome,
  },
  en: {
    home: enHome,
    voice: enVoice,
    queue: enQueue,
    guestbook: enGuestbook,
    route: enRoute,
    aksara: enAksara,
    snowHome: enSnowHome,
    kioskHome: enKioskHome,
  },
};

export function screenImage(locale: Locale, key: ScreenKey): StaticImageData {
  return screens[locale][key];
}

/** Each robot's own start screen at its demo venue. Taksu Kiosk's screen is portrait. */
export function robotScreen(
  locale: Locale,
  robot: RobotSlug,
): { image: StaticImageData; portrait: boolean } {
  if (robot === 'kiosk') return { image: screens[locale].kioskHome, portrait: true };
  return { image: screens[locale][robot === 'snow' ? 'snowHome' : 'home'], portrait: false };
}
