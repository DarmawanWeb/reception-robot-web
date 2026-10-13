'use client';

import { cn } from '@taksu/ui/lib/utils';
import Image, { type StaticImageData } from 'next/image';
import { type KeyboardEvent, useId, useRef, useState } from 'react';

export interface ShowcaseItem {
  id: string;
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
}

/**
 * Real screens from the kiosk app behind a row of tabs: pick a service, see what the guest
 * sees. Every screenshot stays mounted so switching never waits on a download.
 */
export function ScreenShowcase({
  items,
  label,
  note,
  demo,
}: {
  items: ShowcaseItem[];
  label: string;
  /** Where the screenshots come from, shown under the screen. */
  note: string;
  /** The demo the screenshots were taken from, opened in a new tab. */
  demo: { href: string; label: string; newTab: string };
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const current = items[active];
  if (!current) return null;

  const select = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    const target = keys[event.key];
    if (target !== undefined) {
      event.preventDefault();
      select(target);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-12">
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <div
              key={item.id}
              role="presentation"
              className={cn(
                'shrink-0 lg:border-l-2 lg:py-3.5 lg:pl-5 lg:transition-colors',
                selected ? 'lg:border-primary' : 'lg:border-border',
              )}
            >
              <button
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`${base}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors',
                  'lg:rounded-sm lg:border-0 lg:bg-transparent lg:p-0 lg:text-left lg:text-base lg:whitespace-normal',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground lg:text-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {item.title}
              </button>
              {selected ? (
                <p className="text-muted-foreground mt-1.5 hidden text-[0.9375rem] leading-relaxed lg:block">
                  {item.body}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${current.id}`}>
        <div className="rounded-[1.25rem] bg-[#070a20] p-2 shadow-2xl ring-1 ring-[#e6bd52]/30 sm:p-3">
          <div className="relative aspect-video overflow-hidden rounded-[0.75rem] bg-[#0e1335]">
            {items.map((item, index) => (
              <Image
                key={item.id}
                src={item.image}
                alt={index === active ? item.alt : ''}
                aria-hidden={index !== active}
                fill
                sizes="(min-width: 1024px) 44rem, 100vw"
                className={cn(
                  'object-cover transition-opacity duration-300 motion-reduce:transition-none',
                  index === active ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
          </div>
        </div>
        <p className="text-muted-foreground mt-4 leading-relaxed lg:hidden">{current.body}</p>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-sm">
          <p className="text-muted-foreground">{note}</p>
          <a
            href={demo.href}
            target="_blank"
            rel="noopener"
            className="decoration-primary font-semibold underline decoration-2 underline-offset-4 hover:decoration-[3px]"
          >
            {demo.label}
            <span className="sr-only"> {demo.newTab}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
