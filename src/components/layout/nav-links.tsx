'use client';

import { cn } from '@taksu/ui/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';

export interface NavItem {
  href: string;
  label: string;
}

export function NavLinks({
  items,
  className,
  onNavigate,
}: {
  items: NavItem[];
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'hover:bg-surface-muted block rounded-md px-3 py-2.5 text-lg font-semibold transition-colors lg:py-2 lg:text-sm',
                  active ? 'text-primary' : 'text-foreground/80',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
