'use client';

import { transliterate } from '@taksu/bali';
import { useId, useMemo, useState } from 'react';

/** Live preview of a Pergub-style sign: Aksara Bali above the Latin name. */
export function AksaraSignage({
  label,
  placeholder,
  hint,
  initialValue,
}: {
  label: string;
  placeholder: string;
  hint: string;
  initialValue: string;
}) {
  const id = useId();
  const [value, setValue] = useState(initialValue);
  const aksara = useMemo(() => transliterate(value), [value]);
  const latin = value.replace(/é/g, 'e').replace(/É/g, 'E');

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        value={value}
        maxLength={60}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        className="border-border bg-surface h-12 w-full rounded-md border px-4 text-lg font-semibold"
      />
      <p className="text-muted-foreground text-xs">{hint}</p>
      <div
        aria-live="polite"
        className="mt-3 rounded-lg border-[6px] border-[#5b3b1e] bg-[#1c1712] px-6 py-6 text-center text-[#f3e3b8] shadow-[inset_0_0_0_2px_#8a6a3a]"
      >
        <p lang="ban-Bali" className="aksara min-h-[2.3em] text-3xl break-words sm:text-4xl">
          {aksara}
        </p>
        <p className="font-display text-xl font-bold tracking-wide break-words uppercase sm:text-2xl">
          {latin}
        </p>
      </div>
    </div>
  );
}
