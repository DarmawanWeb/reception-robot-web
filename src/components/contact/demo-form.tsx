'use client';

import { Button } from '@taksu/ui/components/button';
import { Input } from '@taksu/ui/components/input';
import { Label } from '@taksu/ui/components/label';
import { Textarea } from '@taksu/ui/components/textarea';
import { Mail, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FormEvent, useState } from 'react';
import { mailtoUrl, whatsappUrl } from '@/lib/links';

type Channel = 'whatsapp' | 'email';
const venues = ['office', 'hospitality', 'healthcare', 'other'] as const;
type Venue = (typeof venues)[number];

/**
 * Writes the demo request client-side and hands it to WhatsApp or the mail app,
 * so the site stays fully static with no form backend to secure.
 */
export function DemoForm({
  email,
  whatsappNumber,
  robots,
}: {
  email: string;
  whatsappNumber: string;
  robots: string[];
}) {
  const t = useTranslations('Contact.form');
  const [error, setError] = useState<string | null>(null);
  const hasWhatsapp = whatsappUrl('-', whatsappNumber) !== null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = (submitter?.value ?? 'email') as Channel;
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? '').trim();
    const name = value('name');
    const organization = value('organization');
    const message = value('message');
    if (!name || !organization || !message) {
      setError(t('required'));
      return;
    }
    setError(null);

    const venue = (value('venue') || 'other') as Venue;
    const text = t('template', {
      name,
      organization,
      venue: t(`venues.${venue}`),
      robot: value('robot') || t('robotUnsure'),
      message,
    });

    if (channel === 'whatsapp') {
      const url = whatsappUrl(text, whatsappNumber);
      if (url) window.open(url, '_blank', 'noopener');
      return;
    }
    window.location.href = mailtoUrl(email, t('subject'), text);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="organization">{t('organization')}</Label>
          <Input id="organization" name="organization" autoComplete="organization" required />
        </div>
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold">{t('venue')}</legend>
        <div className="flex flex-wrap gap-2">
          {venues.map((venue, index) => (
            <label
              key={venue}
              className="border-border bg-surface has-[:checked]:border-primary has-[:checked]:text-primary has-[:focus-visible]:outline-ring flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2"
            >
              <input
                type="radio"
                name="venue"
                value={venue}
                defaultChecked={index === 0}
                className="accent-primary"
              />
              {t(`venues.${venue}`)}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-2">
        <Label htmlFor="robot">{t('robot')}</Label>
        <select
          id="robot"
          name="robot"
          defaultValue=""
          className="border-border bg-surface h-11 w-full rounded-md border px-3 text-base sm:max-w-xs"
        >
          <option value="">{t('robotUnsure')}</option>
          {robots.map((robot) => (
            <option key={robot} value={robot}>
              {robot}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t('messagePlaceholder')}
          required
          rows={5}
        />
      </div>
      {error ? (
        <p role="alert" className="text-danger text-sm font-semibold">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" name="channel" value="whatsapp" size="lg" disabled={!hasWhatsapp}>
          <MessageCircle aria-hidden />
          {t('sendWhatsapp')}
        </Button>
        <Button type="submit" name="channel" value="email" size="lg" variant="outline">
          <Mail aria-hidden />
          {t('sendEmail')}
        </Button>
      </div>
      {!hasWhatsapp ? (
        <p className="text-muted-foreground text-xs">{t('whatsappMissing')}</p>
      ) : null}
    </form>
  );
}
