import { Button, type ButtonProps } from '@taksu/ui/components/button';
import { ExternalLink } from 'lucide-react';

/** Link styled as a button that opens a demo app in a new tab. */
export function ExternalButton({
  href,
  children,
  newTabLabel,
  ...props
}: Omit<ButtonProps, 'asChild'> & { href: string; newTabLabel: string }) {
  return (
    <Button asChild {...props}>
      <a href={href} target="_blank" rel="noopener">
        {children}
        <ExternalLink aria-hidden />
        <span className="sr-only">{newTabLabel}</span>
      </a>
    </Button>
  );
}
