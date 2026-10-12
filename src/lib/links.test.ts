import { describe, expect, it } from 'vitest';
import { companyUrl, kioskUrl, mailtoUrl, robotDemoUrl, whatsappUrl } from './links';

describe('links', () => {
  it('builds kiosk demo links with the locale prefix', () => {
    expect(kioskUrl('id')).toBe('http://localhost:3001/id');
    expect(robotDemoUrl('en', 'snow', 'resort')).toBe('http://localhost:3001/en/snow/resort');
  });

  it('links back to the company profile', () => {
    expect(companyUrl('id', '/about')).toBe('http://localhost:3000/id/about');
  });

  it('only builds WhatsApp links when a number is set', () => {
    expect(whatsappUrl('Halo', '')).toBeNull();
    expect(whatsappUrl('Halo robot', '+62 812-3456')).toBe(
      'https://wa.me/628123456?text=Halo%20robot',
    );
  });

  it('encodes mail subjects and bodies', () => {
    expect(mailtoUrl('a@b.c', 'Demo robot', 'Baris 1\nBaris 2')).toBe(
      'mailto:a@b.c?subject=Demo%20robot&body=Baris%201%0ABaris%202',
    );
  });
});
